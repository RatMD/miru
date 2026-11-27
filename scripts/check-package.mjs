import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import ts from 'typescript';

// Use npm's JS CLI directly to work on Windows without shell quoting.
const npmCli = process.env.npm_execpath;
assert.ok(npmCli, 'Run this check through npm run check:package.');
const result = spawnSync(
    process.execPath,
    [npmCli, 'pack', '--dry-run', '--json', '--ignore-scripts'],
    {
        encoding: 'utf8',
    },
);
assert.equal(result.status, 0, result.stderr);
const packed = JSON.parse(result.stdout);
const [pack] = Array.isArray(packed) ? packed : Object.values(packed);
assert.ok(pack && Array.isArray(pack.files), 'Unexpected npm pack JSON output.');
const paths = pack.files.map(({ path }) => path);
for (const required of ['dist/index.js', 'dist/index.d.ts', 'dist/style.css', 'package.json']) {
    assert.ok(paths.includes(required), `Missing package file: ${required}`);
}
assert.ok(
    paths.every(
        (path) =>
            path.startsWith('dist/') ||
            ['package.json', 'README.md', 'LICENSE', 'LICENSE.md'].includes(path),
    ),
);
assert.ok(paths.every((path) => !/stories|storybook|node_modules/.test(path)));
const manifest = JSON.parse(readFileSync('package.json', 'utf8'));
assert.ok(!paths.some((path) => path.startsWith('dist/form-adapters')));
assert.ok(!paths.includes('dist/adapters.js'));
assert.ok(!paths.includes('dist/plugins/inertia.js'));
assert.ok(!paths.includes('dist/plugins/inertia.d.ts'));
assert.ok(!paths.includes('dist/support/navigation.js'));
for (const removed of [
    './adapters',
    './form-adapters',
    './form-adapters/ajax',
    './form-adapters/inertia',
    './plugins/inertia',
    './support/navigation',
]) {
    await assert.rejects(import(manifest.name + removed.slice(1)), (error) =>
        ['ERR_PACKAGE_PATH_NOT_EXPORTED', 'ERR_MODULE_NOT_FOUND'].includes(error.code),
    );
}
for (const [subpath, entry] of Object.entries(manifest.exports)) {
    const targets = typeof entry === 'string' ? { default: entry } : entry;
    if (!subpath.includes('*')) {
        for (const target of Object.values(targets)) {
            assert.ok(existsSync(target), `Missing export: ${target}`);
        }
        continue;
    }

    // Expand against the files npm will actually ship, then verify JS and types together.
    const [prefix, suffix] = targets.import.slice(2).split('*');
    const modules = paths
        .filter((path) => path.startsWith(prefix) && path.endsWith(suffix))
        .map((path) => path.slice(prefix.length, -suffix.length));
    assert.ok(modules.length, `Export pattern matches no packaged modules: ${subpath}`);
    for (const name of modules) {
        const specifier = manifest.name + subpath.slice(1).replace('*', name);
        for (const target of Object.values(targets)) {
            const path = target.replace('*', name);
            assert.ok(paths.includes(path.slice(2)), `Missing packaged export: ${path}`);
        }
        assert.equal(
            import.meta.resolve(specifier),
            new URL('../' + targets.import.replace('*', name), import.meta.url).href,
            `Incorrect runtime resolution: ${specifier}`,
        );
        const module = await import(specifier);
        if (subpath.startsWith('./support/')) {
            assert.ok(!('default' in module), `Support modules use named exports: ${specifier}`);
        }
        const resolved = ts.resolveModuleName(
            specifier,
            resolve('package-consumer.ts'),
            { moduleResolution: ts.ModuleResolutionKind.Bundler, module: ts.ModuleKind.ESNext },
            ts.sys,
        ).resolvedModule;
        assert.equal(
            resolved?.resolvedFileName,
            resolve(targets.types.replace('*', name)).replaceAll('\\', '/'),
            `Incorrect TypeScript resolution: ${specifier}`,
        );
    }
}
// Application-specific font assets must not leak into the shared UI package.
const stylesheet = readFileSync('dist/style.css', 'utf8');
assert.ok(!/Saira Semi Condensed|saira-semi-condensed/.test(stylesheet));
assert.ok(!paths.some((path) => /saira-semi-condensed/i.test(path)));
for (const [, value] of stylesheet.matchAll(/url\(["']?([^"')]+\.woff2)["']?\)/g)) {
    assert.ok(!value.startsWith('/'), 'Font URL must be package-relative: ' + value);
    const asset = new URL(value, 'file:///dist/style.css').pathname.slice(1);
    assert.ok(paths.includes(asset), 'Missing packaged font: ' + asset);
}
for (const removed of ['./support/propertyNumberFormat', './support/richText', './support/utils'])
    await assert.rejects(import(manifest.name + removed.slice(1)), {
        code: 'ERR_MODULE_NOT_FOUND',
    });
const helpers = await import('../dist/support.js');
const entry = await import(manifest.name + '/miru');
const composables = await import(manifest.name + '/composables');
const layouts = await import(manifest.name + '/layouts');
const root = await import(manifest.name);
for (const name of ['AuthPage', 'DashboardPage', 'PageRoot']) {
    assert.equal(typeof layouts[name], 'object', `Missing layout: ${name}`);
    assert.equal(root[name], layouts[name], `Root layout export differs: ${name}`);
}
assert.equal(typeof root.Spinner, 'object');
for (const name of [
    'InputDateTime',
    'Slider',
    'EditorFrame',
    'EditorJson',
    'EditorMarkdown',
    'FloatingAppBar',
    'Anchor',
    'Code',
    'Kbd',
    'KbdGroup',
    'UploadZone',
    'Backdrop',
    'Breakpoint',
    'Deferred',
    'ContextMenu',
    'ContextMenuSubContent',
    'Item',
    'ItemGroup',
]) {
    assert.equal(typeof root[name], 'object', `Missing public component: ${name}`);
}
assert.ok(
    !('InputDate' in root) && !('InputTime' in root),
    'Date/time pickers are internal to InputDateTime.',
);
assert.ok(!('Link' in root), 'Anchor avoids host Link naming conflicts.');
assert.ok(!('UploadDropzone' in root), 'UploadZone replaces the old component name.');
assert.equal(typeof entry.createMiru, 'function');
assert.equal(typeof composables.useMiru, 'function');
assert.equal(typeof composables.useI18n, 'function');
assert.equal(typeof composables.useValidation, 'function');
assert.equal(typeof composables.useBreakpoint, 'function');
assert.equal(root.defaultBreakpoints.md, 768);
assert.ok(!('useUiI18n' in composables));
assert.ok(!('useMiru' in helpers) && !('useI18n' in helpers));
assert.equal(typeof helpers.numberFormat, 'function');
assert.equal(typeof helpers.MiruStorage, 'function');
assert.ok(!('CentralStorage' in helpers));
for (const name of ['isValidMailAddress', 'isValidGtin', 'isValidIban', 'isValidCreditCard']) {
    assert.equal(typeof helpers[name], 'function', `Missing validator: ${name}`);
}
assert.ok(!('isValid' in helpers) && !('isEmailAddress' in helpers));
assert.ok(!('propertyNumberFormat' in helpers));
assert.ok(!('vRichText' in helpers) && !('vTinymce' in helpers));
const tiny = await import('../dist/plugins/tinymce.js');
assert.equal(typeof tiny.vTinymce.mounted, 'function');
assert.equal(typeof tiny.TinymcePlugin.install, 'function');
assert.equal(typeof tiny.configureTinymce, 'function');
console.log('Package exports and build-only file list verified.');
