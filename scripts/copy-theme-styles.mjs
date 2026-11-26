import { cpSync } from 'node:fs';

// Publish the authored stylesheets unchanged. No palettes or foregrounds are calculated here.
cpSync(new URL('../src/themes/', import.meta.url), new URL('../dist/themes/', import.meta.url), {
    recursive: true,
});
