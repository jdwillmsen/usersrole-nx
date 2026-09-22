# Changelog

Releases after 3.0.1 are recorded on
[GitHub Releases](https://github.com/jdwillmsen/usersrole-nx/releases), which
semantic-release writes when it tags a version. This file is kept as the
history up to 3.0.1 and is no longer updated.

## [3.0.1](https://github.com/jdwillmsen/usersrole-nx/compare/v3.0.0...v3.0.1) (2026-09-22)


### Bug Fixes

* **ci:** push the release PR with a token CI will run for ([9d26349](https://github.com/jdwillmsen/usersrole-nx/commit/9d2634980e7d92590505929ed30c35497febc8bb))


### Reverts

* stop dispatching CI on the release PR ([4a6e98f](https://github.com/jdwillmsen/usersrole-nx/commit/4a6e98fc55ea4688365714c3d8435af0e98a111f))

## [3.0.0](https://github.com/jdwillmsen/usersrole-nx/compare/v2.1.2...v3.0.0) (2026-09-22)


### ⚠ BREAKING CHANGES

* **deps:** move to express 5, and type the route parameter it broke
* **deps:** upgrade Angular 21 → 22 and nx 23.0 → 23.2.1 ([#43](https://github.com/jdwillmsen/usersrole-nx/issues/43))

### Bug Fixes

* **ci:** keep majors out of dependency groups so the rest can auto-merge ([#44](https://github.com/jdwillmsen/usersrole-nx/issues/44)) ([aca7c1f](https://github.com/jdwillmsen/usersrole-nx/commit/aca7c1f6218c6cd990b05ee23512736ab3d20a3d))
* **ci:** keep prettier off the release-please changelog ([bab8b00](https://github.com/jdwillmsen/usersrole-nx/commit/bab8b0024dbea73cf82bcff1341253218472f854))
* **ci:** make the Angular dependency group actually match ([#50](https://github.com/jdwillmsen/usersrole-nx/issues/50)) ([6b0cc7e](https://github.com/jdwillmsen/usersrole-nx/commit/6b0cc7ed08a54afe953dcb13e48c7b25d6acf12b))
* **ci:** run CI on the release PR so it can merge ([d8a0a5e](https://github.com/jdwillmsen/usersrole-nx/commit/d8a0a5ea36489f1d6e469ccb4e93630fce7b754a))
* **ci:** use rebase, the only merge method these repositories allow ([24569d2](https://github.com/jdwillmsen/usersrole-nx/commit/24569d21f2e1e11182ca4c213d00b43af4cda068))
* **deps:** move to express 5, and type the route parameter it broke ([9bd6a5c](https://github.com/jdwillmsen/usersrole-nx/commit/9bd6a5ceaa535a8bd0bce8f3bf3de6d637444cea))
* **deps:** override csv-parse, having tested that firebase-tools survives it ([a00a4a5](https://github.com/jdwillmsen/usersrole-nx/commit/a00a4a56ae785aa478b5310f48ea7dcaafe6151a))
* **deps:** override the two transitive advisories that have a patched release ([7d143ba](https://github.com/jdwillmsen/usersrole-nx/commit/7d143bac0c1cebedd6819f8b726c228b3d20c0ff))
* **deps:** patch axios and realign the Angular packages ([#34](https://github.com/jdwillmsen/usersrole-nx/issues/34)) ([e26e7fa](https://github.com/jdwillmsen/usersrole-nx/commit/e26e7faa3760d7e49154a77e7c222d335ce67c51))


### Miscellaneous Chores

* **deps:** upgrade Angular 21 → 22 and nx 23.0 → 23.2.1 ([#43](https://github.com/jdwillmsen/usersrole-nx/issues/43)) ([8f848b2](https://github.com/jdwillmsen/usersrole-nx/commit/8f848b20ad15b6a7ef5b40b970775be8c42851fd))

## [2.1.2](https://github.com/jdwillmsen/usersrole-nx/compare/v2.1.1...v2.1.2) (2026-07-05)


### Bug Fixes

* **app:** register DI interceptors with HttpClient; auto-reload on SW update ([24a9bf2](https://github.com/jdwillmsen/usersrole-nx/commit/24a9bf2d793c5b5a441d877da3cebc1e55913755))

## [2.1.1](https://github.com/jdwillmsen/usersrole-nx/compare/v2.1.0...v2.1.1) (2026-07-05)


### Bug Fixes

* **main:** include git commit and root package.json in app build hash ([827a263](https://github.com/jdwillmsen/usersrole-nx/commit/827a2632ac3d21e6241579e3562f938f311ff153))
* **main:** label version-info environment as production ([b129183](https://github.com/jdwillmsen/usersrole-nx/commit/b1291833a748c83f8331b49dce8c07f6156b8bb4))
