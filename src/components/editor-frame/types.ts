import type { Component } from 'vue';

interface EditorSelection {
    value: string;
    start: number;
    end: number;
}

/** Instance-local API shared by toolbar extensions and custom editor surfaces. */
interface EditorFrameApi {
    readonly value: string;
    readonly disabled: boolean;
    readonly readonly: boolean;
    getTextarea(): HTMLTextAreaElement | null;
    getSelection(): EditorSelection;
    setValue(value: string): void;
    setSelection(start: number, end?: number): Promise<void>;
    replaceSelection(text: string): Promise<void>;
    focus(): void;
    execute(id: string): void;
}

interface EditorFrameCommand {
    id: string;
    label: string;
    icon?: Component;
    /** Read-only commands such as preview may explicitly opt out of mutation guards. */
    mutates?: boolean;
    disabled?: boolean;
    active?: boolean;
    run(api: EditorFrameApi): void | Promise<void>;
}

interface EditorFrameExtension {
    id: string;
    commands?: readonly EditorFrameCommand[];
}

export type { EditorSelection, EditorFrameApi, EditorFrameCommand, EditorFrameExtension };
