export interface MarkdownSelection {
    value: string;
    start: number;
    end: number;
}
export type MarkdownTool = 'heading' | 'bold' | 'list' | 'ordered' | 'divider';
export interface MarkdownSyntax {
    heading: string;
    bold: string;
    bullet: string;
    divider: string;
}
const defaults: MarkdownSyntax = { heading: '# ', bold: '**', bullet: '- ', divider: '---' };
function escapePattern(value: string): string {
    return Array.from(value, (character) =>
        ['\\', '^', '$', '.', '*', '+', '?', '(', ')', '[', ']', '{', '}', '|'].includes(character)
            ? '\\' + character
            : character,
    ).join('');
}

/** Format the selected text while preserving a collapsed cursor when nothing is selected. */
export function formatMarkdown(
    selection: MarkdownSelection,
    tool: MarkdownTool,
    maxlength: number,
    options: Partial<MarkdownSyntax> = {},
): MarkdownSelection | null {
    const syntax = { ...defaults, ...options };
    const { value, start, end } = selection;
    let result: MarkdownSelection;
    if (tool === 'divider') {
        const before = value.slice(0, start);
        const after = value.slice(end);
        const trailing = before.match(/\n*$/)?.[0].length ?? 0;
        const leading = after.match(/^\n*/)?.[0].length ?? 0;
        const prefix = '\n'.repeat(Math.max(0, (before === '' ? 1 : 2) - trailing));
        const suffix = '\n'.repeat(Math.max(0, 2 - leading));
        const cursor = before.length + prefix.length + syntax.divider.length + Math.max(2, leading);
        result = {
            value: before + prefix + syntax.divider + suffix + after,
            start: cursor,
            end: cursor,
        };
    } else if (tool === 'bold') {
        const text = value.slice(start, end);
        if (
            value.slice(Math.max(0, start - syntax.bold.length), start) === syntax.bold &&
            value.slice(end, end + syntax.bold.length) === syntax.bold
        ) {
            result = {
                value:
                    value.slice(0, start - syntax.bold.length) +
                    text +
                    value.slice(end + syntax.bold.length),
                start: start - syntax.bold.length,
                end: end - syntax.bold.length,
            };
        } else if (
            text.length >= syntax.bold.length * 2 &&
            text.startsWith(syntax.bold) &&
            text.endsWith(syntax.bold)
        ) {
            result = {
                value:
                    value.slice(0, start) +
                    text.slice(syntax.bold.length, -syntax.bold.length) +
                    value.slice(end),
                start,
                end: end - syntax.bold.length * 2,
            };
        } else {
            result = {
                value:
                    value.slice(0, start) +
                    `${syntax.bold}${text}${syntax.bold}` +
                    value.slice(end),
                start: start + syntax.bold.length,
                end: end + syntax.bold.length,
            };
        }
    } else {
        const lineStart = start === 0 ? 0 : value.lastIndexOf('\n', start - 1) + 1;
        // A selection ending at the start of the next line must not format that line.
        const lastPosition = end > start && value[end - 1] === '\n' ? end - 1 : end;
        const nextBreak = value.indexOf('\n', lastPosition);
        const lineEnd = nextBreak < 0 ? value.length : nextBreak;
        const lines = value.slice(lineStart, lineEnd).split('\n');
        const active =
            tool === 'heading'
                ? new RegExp('^' + escapePattern(syntax.heading))
                : tool === 'list'
                  ? new RegExp('^' + escapePattern(syntax.bullet))
                  : /^\d+\.[ \t]+/;
        const remove = lines.every((line) => active.test(line));
        const edits = lines.map((line, index) => {
            const oldPrefix =
                line.match(
                    new RegExp(
                        '^(?:' +
                            escapePattern(syntax.heading) +
                            '|' +
                            escapePattern(syntax.bullet) +
                            '|#{1,6}[ \\t]+|[*+-][ \\t]+|\\d+\\.[ \\t]+)',
                    ),
                )?.[0] ?? '';
            const prefix = remove
                ? ''
                : tool === 'heading'
                  ? syntax.heading
                  : tool === 'list'
                    ? syntax.bullet
                    : `${index + 1}. `;
            return { line, oldPrefix, prefix, text: prefix + line.slice(oldPrefix.length) };
        });
        const mapPosition = (position: number): number => {
            let oldOffset = lineStart;
            let newOffset = lineStart;
            for (const edit of edits) {
                if (position <= oldOffset + edit.line.length) {
                    const offset = Math.max(0, position - oldOffset);
                    return (
                        newOffset + edit.prefix.length + Math.max(0, offset - edit.oldPrefix.length)
                    );
                }
                oldOffset += edit.line.length + 1;
                newOffset += edit.text.length + 1;
            }
            return newOffset - 1 + Math.max(0, position - lineEnd);
        };
        result = {
            value:
                value.slice(0, lineStart) +
                edits.map((edit) => edit.text).join('\n') +
                value.slice(lineEnd),
            start: mapPosition(start),
            end: mapPosition(end),
        };
    }
    return result.value.length <= maxlength ? result : null;
}

/** Continue the current list on Enter, or remove an empty item to return to plain text. */
export function continueMarkdownList(
    selection: MarkdownSelection,
    maxlength: number,
    options: Partial<MarkdownSyntax> = {},
): MarkdownSelection | null {
    const syntax = { ...defaults, ...options };
    const { value, start, end } = selection;
    const lineStart = start === 0 ? 0 : value.lastIndexOf('\n', start - 1) + 1;
    const nextBreak = value.indexOf('\n', start);
    const lineEnd = nextBreak < 0 ? value.length : nextBreak;
    if (end > lineEnd) return null;
    const line = value.slice(lineStart, lineEnd);
    const match = line.match(
        new RegExp(
            '^([ \\t]*)(' + escapePattern(syntax.bullet.trim()) + '|[*+-]|\\d+\\.)([ \\t]+)(.*)$',
        ),
    );
    if (!match) return null;
    const [, indent, marker, spacing, content] = match;
    if (content.trim() === '') {
        const following = value.slice(lineEnd);
        const separator = following.startsWith('\n') ? '' : '\n';
        const cursor = lineStart + 1;
        return {
            value: value.slice(0, lineStart) + separator + following,
            start: cursor,
            end: cursor,
        };
    }
    if (start < lineStart + indent.length + marker.length + spacing.length) return null;
    let nextMarker = marker;
    if (/^\d+\.$/.test(marker)) {
        const number = Number(marker.slice(0, -1));
        if (!Number.isSafeInteger(number + 1)) return null;
        nextMarker = `${number + 1}.`;
    }
    const insert = `\n${indent}${nextMarker} `;
    const result = value.slice(0, start) + insert + value.slice(end);
    const cursor = start + insert.length;
    return result.length <= maxlength ? { value: result, start: cursor, end: cursor } : null;
}

interface HistoryEntry {
    before: MarkdownSelection;
    after: MarkdownSelection;
    group: string | null;
    timestamp: number;
}

/** One bounded history for typing, pasting and toolbar edits, including cursor restoration. */
export class MarkdownHistory {
    private undoEntries: HistoryEntry[] = [];
    private redoEntries: HistoryEntry[] = [];
    get canUndo(): boolean {
        return this.undoEntries.length > 0;
    }
    get canRedo(): boolean {
        return this.redoEntries.length > 0;
    }
    record(
        before: MarkdownSelection,
        after: MarkdownSelection,
        group: string | null = null,
        timestamp = Date.now(),
    ): void {
        if (before.value === after.value) return;
        const previous = this.undoEntries.at(-1);
        if (
            group !== null &&
            previous?.group === group &&
            timestamp - previous.timestamp < 1000 &&
            previous.after.value === before.value &&
            previous.after.start === before.start &&
            previous.after.end === before.end &&
            before.start === before.end &&
            after.start === after.end &&
            this.redoEntries.length === 0
        ) {
            previous.after = { ...after };
            previous.timestamp = timestamp;
        } else {
            this.undoEntries.push({ before: { ...before }, after: { ...after }, group, timestamp });
            if (this.undoEntries.length > 100) this.undoEntries.shift();
        }
        this.redoEntries = [];
    }
    undo(): MarkdownSelection | null {
        const entry = this.undoEntries.pop();
        if (!entry) return null;
        this.redoEntries.push(entry);
        return { ...entry.before };
    }
    redo(): MarkdownSelection | null {
        const entry = this.redoEntries.pop();
        if (!entry) return null;
        this.undoEntries.push(entry);
        return { ...entry.after };
    }
    clear(): void {
        this.undoEntries = [];
        this.redoEntries = [];
    }
}
