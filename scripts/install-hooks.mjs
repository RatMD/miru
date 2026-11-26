import { existsSync } from 'node:fs';

// Git dependency installs and production consumers must not modify a host repository's hooks.
if (
    !process.env.CI &&
    process.env.NODE_ENV !== 'production' &&
    process.env.HUSKY !== '0' &&
    existsSync(new URL('../.git', import.meta.url))
) {
    const { default: husky } = await import('husky');
    const message = husky();
    if (message) throw new Error(message);
}
