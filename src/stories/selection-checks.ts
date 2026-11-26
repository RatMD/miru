import { expect, userEvent, waitFor, within } from 'storybook/test';

/** Exercise inherited colors and keep native editing/selection behavior intact. */
function selectionVariantsPlay(kind: 'checkbox' | 'radio' | 'tags' | 'tabs') {
    return async ({ canvasElement }: { canvasElement: HTMLElement }) => {
        const canvas = within(canvasElement);
        const row = canvasElement.querySelector<HTMLElement>('[data-variant-example="primary"]')!;
        const scope = within(row);
        const selector =
            kind === 'checkbox'
                ? '[data-slot="checkbox"]'
                : kind === 'radio'
                  ? '[data-slot="radio-group-item"]'
                  : kind === 'tags'
                    ? '[data-slot="tags-input-item"]'
                    : '[data-slot="tabs-trigger"][data-state="active"]';
        const control = row.querySelector<HTMLElement>(selector)!;
        const color = () =>
            getComputedStyle(control)[kind === 'tabs' ? 'color' : 'backgroundColor'];
        const before = color();
        await userEvent.selectOptions(canvas.getByRole('combobox'), 'danger');
        await waitFor(() => expect(control).toHaveAttribute('data-variant', 'danger'));
        await waitFor(() => expect(color()).not.toBe(before));

        if (kind === 'checkbox') {
            await expect(scope.getByRole('checkbox', { name: 'Mixed' })).toHaveAttribute(
                'aria-checked',
                'mixed',
            );
            await userEvent.click(scope.getByRole('checkbox', { name: 'Selected' }));
            await expect(scope.getByRole('checkbox', { name: 'Selected' })).toHaveAttribute(
                'aria-checked',
                'false',
            );
            await expect(scope.getByRole('checkbox', { name: 'Disabled' })).toBeDisabled();
        } else if (kind === 'radio') {
            await userEvent.click(scope.getByRole('radio', { name: 'Second' }));
            await expect(scope.getByRole('radio', { name: 'Second' })).toHaveAttribute(
                'aria-checked',
                'true',
            );
            await expect(scope.getByRole('radio', { name: 'First' })).toHaveAttribute(
                'aria-checked',
                'false',
            );
        } else if (kind === 'tags') {
            await userEvent.type(scope.getByRole('textbox'), 'New{Enter}');
            await expect(scope.getByText('New', { exact: true })).toBeInTheDocument();
            await userEvent.click(scope.getByRole('button', { name: 'Remove Vue' }));
            await expect(scope.queryByText('Vue', { exact: true })).not.toBeInTheDocument();
        } else {
            await userEvent.click(scope.getByRole('tab', { name: 'Activity' }));
            await expect(scope.getByRole('tab', { name: 'Activity' })).toHaveAttribute(
                'aria-selected',
                'true',
            );
            await expect(scope.getByRole('tab', { name: 'Disabled' })).toBeDisabled();
            const indicator = row.querySelector<HTMLElement>('[data-slot="tabs-indicator"]');
            if (indicator) {
                await waitFor(() =>
                    expect(getComputedStyle(indicator).color).toBe(
                        getComputedStyle(scope.getByRole('tab', { name: 'Activity' })).color,
                    ),
                );
            } else {
                await expect(row.querySelector('[data-slot="tabs"]')!).toHaveAttribute(
                    'data-appearance',
                    'buttons',
                );
                await expect(
                    getComputedStyle(scope.getByRole('tab', { name: 'Activity' })).backgroundColor,
                ).not.toBe('rgba(0, 0, 0, 0)');
            }
        }
    };
}

export { selectionVariantsPlay };
