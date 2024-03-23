
import fs from 'node:fs';
import pkg from './package.json' with { type: 'json' };
import pkgLock from './package-lock.json' with { type: 'json' };

for (const [p, ver] of Object.entries(pkg.dependencies)) {
    let val = ver.slice(0, 1);
    if (ver.slice(1) != pkgLock.packages[`node_modules/${p}`].version) {
        pkg.dependencies[p] = val + pkgLock.packages[`node_modules/${p}`].version;
    }
}

for (const [p, ver] of Object.entries(pkg.devDependencies)) {
    let val = ver.slice(0, 1);
    if (ver.slice(1) != pkgLock.packages[`node_modules/${p}`].version) {
        pkg.devDependencies[p] = val + pkgLock.packages[`node_modules/${p}`].version;
    }
}

fs.writeFileSync('package.json', JSON.stringify(pkg, void 0, 4))
