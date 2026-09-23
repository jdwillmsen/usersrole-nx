# Users Role Nx

[![CI](https://github.com/jdwillmsen/usersrole-nx/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/jdwillmsen/usersrole-nx/actions/workflows/ci.yml)

This is a frontend application that provides a template for users
authentication and authorization since these are common features used in
most applications. It also has additional features such as theme selection,
snackbar service, alerts service, and a general site layout with header,
collapsable sidebar/navigation, and main content area. This application is
also a Progressive Web App (PWA) and can be downloaded as an app on mobile
and desktop devices.

The authentication is provided by Firebase with Google Identity Platform and
the authorization is built off of a node server that makes use of Firebase
functions. The production server and all deployments are hosted with
Firebase hosting.

The main CI/CD tools used within this project include GitHub Actions and NX
Cloud with NX Caching.

## Start the app

To start the development server run `nx serve usersrole-nx`. Open your browser and navigate to http://localhost:4200/. Happy coding!

## Testing

### Running lint test

Run `nx lint <project>` or `nx run-many -t lint` to execute the lint testing via [ESLint](https://eslint.org/)

### Running unit tests

Run `nx test <project>` or `nx run-many -t test` to execute the unit tests via [Jest](https://jestjs.io/).

### Running component tests

Run `nx component-test <project> --watch` or `nx run-many -t component-test --watch` to execute component tests in watch mode.\
Run `nx component-test <project>` or `nx run-many -t component-test` to execute component tests in headless mode.\
The component tests are making use of a testing framework called [Cypress](https://docs.cypress.io/guides/component-testing/overview).

### Running end-to-end tests

Run `nx e2e <project> --watch` or `nx run-many -t e2e --watch` to execute e2e tests in watch mode.\
Run `nx e2e <project>` or `nx run-many -t e2e` to execute e2e tests in headless mode.\
The e2e tests are making use of a testing framework called [Cypress](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test). \
\*\* Note e2e testing is not performed currently in CI

## Release & deploy

Releases are automatic. After CI passes on a push to `main`, the Release
workflow runs [semantic-release](https://semantic-release.gitbook.io/), which
derives the next version from the [Conventional Commits](https://www.conventionalcommits.org/)
since the last tag:

- `feat` releases a minor, `fix` and `perf` a patch, and a `!` or
  `BREAKING CHANGE` footer a major.
- `chore(deps)` (a runtime dependency bump) releases a patch;
  `chore(deps-dev)`, `ci`, `build`, `docs`, `test` and other chores release
  nothing.

When a version is cut, the workflow tags the commit `vX.Y.Z`, publishes a
GitHub release with generated notes, builds that tag with the version shown on
the About page, and deploys it to Firebase Hosting. That deploy is the only
thing that changes production.

The Firebase Functions codebase goes out in the same deploy, ahead of hosting,
and only when the release actually changed something the functions bundle is
built from -- the job summary says which it was. `nx deploy
usersrole-nx-functions` still deploys them by hand from a machine that is
logged in to Firebase.

No changelog file is committed, since `main` accepts no direct pushes. The
GitHub releases are the changelog; `CHANGELOG.md` holds the history up to
3.0.1.

## Project Info

Production URL: https://users-role-nx.web.app/ \
Based on: https://github.com/jdwillmsen/usersrole

### Developers

- Jake Willmsen
