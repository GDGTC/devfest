# DevFestMN

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.29.

## Summary

1. `yarn setup`
2. Create local branch and make changes
3. `ng serve`
4. Submit PR
5. Marge PR into master
6. Firebase authentication - may not be required
7. Run `tools/deploy.sh`

## Project Setup

When you first checkout the repo, run `yarn setup` to install all dependencies.

Install Firebase Tools by running `npm install -g firebase-tools` and run `firebase login` to authenticate for deployment permissions.

## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng serve -o` to have the browser open once the initial build is complete.

## Pushing to GitHub

Create a branch and push a pull request to GitHub. Once the PR has succesfully passed Travis tests, and has been approved and merged, the update will be automatically be pushed to GitHub pages `https://gdgtc.github.io/devfest/`.

## Deploying to live http://devfest.mn website

Run `tools/deploy.sh`

## Common Errors

If you see an 'HTTP Error: 401, Request had invalid authentication credentials.' error:
- First try running `firebase login`

If 'Already logged in as ..':
- Run `firebase logout`
- Run `firebase login` and supply credentials
- Try re-running `tools/deploy.sh`

## Further Help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
