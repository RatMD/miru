import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { test } from 'vitest';

const root = fileURLToPath(new URL('..', import.meta.url));

test('published core entry points load when resolving any Inertia module is forbidden', () => {
    const script = `
        import { registerHooks } from 'node:module';
        registerHooks({ resolve(specifier, context, nextResolve) {
            if (specifier.startsWith('@inertiajs/')) throw new Error('Unexpected Inertia import: ' + specifier);
            return nextResolve(specifier, context);
        }});
        for (const path of ['index', 'miru', 'composables', 'adapters/ajax', 'adapters/adonis', 'adapters/laravel', 'plugins', 'support', 'layouts']) {
            await import('./dist/' + path + '.js');
        }
    `;
    const result = spawnSync(process.execPath, ['--input-type=module', '-e', script], {
        cwd: root,
        encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr);
});

test('core declarations do not require Inertia types and optional entries remain external', () => {
    const seen = new Set();
    function check(file) {
        if (seen.has(file)) return;
        seen.add(file);
        for (const { fileName: name } of ts.preProcessFile(readFileSync(file, 'utf8'), true)
            .importedFiles) {
            assert.ok(!name.startsWith('@inertiajs/'), `Unexpected Inertia type in ${file}`);
            if (!name.startsWith('.') || name.endsWith('.css')) continue;
            const base = resolve(dirname(file), name);
            const target = [
                base,
                base.replace(/\.(?:ts|js)$/, '.d.ts'),
                base + '.d.ts',
                base + '.vue.d.ts',
                resolve(base, 'index.d.ts'),
            ].find((candidate) => candidate.endsWith('.d.ts') && existsSync(candidate));
            assert.ok(target, `Unresolved declaration ${name} in ${file}`);
            check(target);
        }
    }
    for (const path of [
        'index',
        'miru',
        'composables/index',
        'adapters/ajax',
        'adapters/adonis',
        'adapters/laravel',
        'plugins/index',
        'support/index',
        'layouts/index',
    ]) {
        check(resolve(root, 'dist', path + '.d.ts'));
    }
    function runtimeImports(file, seen = new Set()) {
        if (seen.has(file)) return [];
        seen.add(file);
        return ts
            .preProcessFile(readFileSync(file, 'utf8'), true)
            .importedFiles.flatMap(({ fileName }) =>
                fileName.startsWith('.') && fileName.endsWith('.js')
                    ? runtimeImports(resolve(dirname(file), fileName), seen)
                    : [fileName],
            );
    }
    for (const path of ['adapters/inertia']) {
        assert.ok(runtimeImports(resolve(root, 'dist', path + '.js')).includes('@inertiajs/vue3'));
    }
    const manifest = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
    for (const name of ['@inertiajs/core', '@inertiajs/vue3']) {
        assert.equal(manifest.dependencies[name], undefined);
        assert.ok(manifest.devDependencies[name]);
    }
});
