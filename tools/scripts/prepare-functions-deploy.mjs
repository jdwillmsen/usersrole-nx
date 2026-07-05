// The esbuild executor's generated package.json lists every third-party
// package reachable through the Nx graph (Angular, @nx/angular, ...), not
// just what the bundle imports, and it always emits a lockfile that ends up
// out of sync with that list — both break the Cloud Functions buildpack
// install. Rewrite dependencies to the bare imports actually present in the
// bundle and drop the lockfile so the buildpack runs a plain npm install.
import { readFileSync, writeFileSync, rmSync } from 'node:fs';

const distDir = 'dist/apps/usersrole-nx-functions';

const bundle = readFileSync(`${distDir}/main.js`, 'utf8');
const bareImports = new Set(
  [...bundle.matchAll(/(?:from\s*|require\()\s*["']([^."'][^"']*)["']/g)].map(
    ([, spec]) =>
      spec.startsWith('@')
        ? spec.split('/').slice(0, 2).join('/')
        : spec.split('/')[0],
  ),
);

const rootDeps = JSON.parse(readFileSync('package.json', 'utf8')).dependencies;
const nodeBuiltins = /^node:/;
const dependencies = {};
for (const name of [...bareImports].sort()) {
  if (nodeBuiltins.test(name)) continue;
  if (!rootDeps[name]) {
    throw new Error(
      `Bundle imports "${name}" but it is not in root package.json dependencies`,
    );
  }
  dependencies[name] = rootDeps[name];
}

const pkgPath = `${distDir}/package.json`;
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
pkg.dependencies = dependencies;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
rmSync(`${distDir}/package-lock.json`, { force: true });

console.log(
  `Rewrote ${pkgPath} with runtime dependencies: ${Object.keys(
    dependencies,
  ).join(', ')}`,
);
