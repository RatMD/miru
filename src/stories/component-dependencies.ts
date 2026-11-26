type DependencyLink = { name: string; url: string; storybook?: string };
type Dependencies = {
    components?: readonly DependencyLink[];
    packages?: readonly string[];
    primitives?: readonly DependencyLink[];
};

/** Keep every dependency group alphabetised on both documentation sites, including future components. */
export function componentDependenciesMarkdown(
    dependencies: Dependencies,
    storybook = false,
): string {
    const links = (items: readonly DependencyLink[]) =>
        [...items]
            .sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }))
            .map((item) => `[${item.name}](${storybook ? (item.storybook ?? item.url) : item.url})`)
            .join(', ');
    const groups: [string, readonly DependencyLink[]][] = [
        ['UI', dependencies.components ?? []],
        [
            'Packages',
            (dependencies.packages ?? []).map((name) => ({
                name,
                url: `https://www.npmjs.com/package/${name}`,
            })),
        ],
        ['Primitive', dependencies.primitives ?? []],
    ];
    return groups
        .filter(([, items]) => items.length)
        .map(([label, items]) => `- **${label}:** ${links(items)}`)
        .join('\n');
}
