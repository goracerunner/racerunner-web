# Release process

We use [standard-version](https://github.com/conventional-changelog/standard-version)
to automate the release process in conjunction with Travis CI.

## Preparing for a release

Your changes should be already merged into the `develop` branch from a feature/fix branch.
Please review the [CONTRIBUTING](CONTRIBUTING.md) guidelines for this process.
To prepare a set of changes for release:

1. Create a pull request from `develop` into `master`.
   The pull request title/body should **NOT** follow the
   [conventional commits specification](https://www.conventionalcommits.org)
   as this commit message should not appear as part of the
   change log. Rather, the description should contain any
   information about actions that need to be taken as a
   result of this PR, such as any manual changes that should
   be made to external integrations, if needed.

2. Once the pull request has been reviewed and approved,
   accept the merge request. **DO NOT** squash the commit.
   Each feature/fix should now be merged from the `develop`
   branch into the `master` branch as a single commit per
   feature/fix.

## Deploying a release

1. Run one of the following `release` commands to do the following:

   - pull the latest changes from the `master` branch
   - bump the version number
   - generate an updated changelog
   - tag the `master` branch with the release version

   This project uses [SemVer](https://semver.org/). When the `release` command is given
   no arguments, it will bump the `patch` version unless there is a breaking change, in
   which case it will bump the `minor` version. It will never automatically bump the `major`
   version; this must be done manually. It is usually fine to use the automatic `release`
   script (as long as breaking changes are documented correctly!), unless a `major` version
   bump is required.

```
yarn release
yarn release --release-as patch
yarn release --release-as minor
yarn release --release-as major
```

2. Verify that the [changelog](CHANGELOG.md) shows the correct changes.

3. Run the following command to push the changes to the remote,
   which will trigger Gitlab pipelines to deploy the project to
   the **STAGING** environment.

```
yarn release:push
```

4. Verify that the **STAGING** environment has been deployed correctly.

5. To deploy to the **PRODUCTION** environment:

// TODO: fill this in

6. Once deployment has been successful, run the following command to
   update the `develop` branch to prepare for future commits:

```
yarn release:finish
```

## Manual deployment

**This is only here as a reference; manual deployment should not be necessary.**

To deploy to Firebase:

1. Ensure you have `firebase-tools` installed. If you do not, use `npm install -g firebase-tools` to install it.

2. Login to Firebase using `firebase login`.

3. Use one of the following commands to deploy a particular component of the project.
   Note that these commands will both **build** and **deploy** your project.

```
// Deploy app to dev environment (Firebase hosting)
yarn deploy:app

// Deploy app to prod environment (Firebase hosting)
yarn deploy:app:prod

// Deploy cloud functions to dev environment
yarn deploy:functions

// Deploy cloud functions to prod environment
yarn deploy:functions:prod

// Deploy rules for database, Firestore and storage to dev environment
yarn deploy:rules

// Deploy rules for database, Firestore and storage to prod environment
yarn deploy:rules:prod
```

Or alternatively, use these commands to deploy the entire application:

```
// Deploy the entire application to the dev environment
yarn deploy

// Deploy the entire application to the prod environment
yarn deploy:prod
```
