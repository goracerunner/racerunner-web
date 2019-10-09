# Race Runner Web

This is project is a online platform for co-ordinating a Race Runner event.

// TODO: add more information about Race Runner

This repository is currently maintained by Ben Yap (contact@benyap.com).

## Project set up

The root `package.json` file contains packages that are required by all project components.
These should be installed using the command `yarn` in the root directory. The following project
components also contain scoped `package.json` files, which need to be installed within their
respective directories using the command `yarn`.

```
app/
functions/
```

Alternatively, use the command `yarn install-all` to install all required packages automatically.

## Project structure

```
app         // this directory contains the source code for the frontend site
config      // this directory contains configuration and security rules for the Firebase project
functions   // this directory contains the source code for Firebase functions
test        // this directory contains tests for the security rules for Realtime database and Firestore
```

## Project structure

```
.
├── app/                        # source code for the frontend site
│   ├── bin/                    # scripts for local frontend development
│   ├── public/                 # public assets
│   ├── src/                    # frontend source
│   │   ├── assets/...          # assets (must be imported in source code)
│   │   ├── modules/...         # the site is split into 'modules' (see the modules section in the Wiki for more information)
│   │   │   ├── base/...
│   │   │   ├── core/...
│   │   │   └   ...
│   │   ├── styles/...          # global styles
│   │   ├── utils/...           # shared utilities used by the frontend
│   │   └   ...
│   └   ...
├── config/                     # configuration and security rules for the Firebase project
├── functions/                  # source code for Firebase functions
├── internals/                  # scripts and configuration
├── test/                       # tests for the security rules for Firestore
├── package.json                # project level scripts and packages
├── .firebaserc                 # configure the Firebase project that this project deploys to
└── ...                         # other configuration files
```

## Local development

To run this application locally, you must install the Firebase CLI and be logged in with an account that has access to the project.

To install Firebase CLI:

```
npm install -g firebase-tools
```

To log in with your account:

```
firebase login
```

### Frontend app

Navigate to the `app` directory.

```
cd app
```

To build the frontend app:

```
yarn build
```

To start the development server for the frontend app:

```
yarn start
```

### Firebase functions

Navigate to the `functions` directory.

```
cd functions
```

To build the functions:

```
yarn build
```

To run the functions locally via shell, use this command:

```
yarn start
```

### File generation

The frontend site (`app`) has file generation to help automate the creation
of standardised components for this project. For more information about the
standards and conventions used, see the
[GitLab wiki](https://gitlab.com/cccvcommunity/cccvcommunity.org/wikis/home) (WIP).
To use a generator, use this command:

```
yarn generate <generator>
```

The following generators are available:

**component**

Create a React component in `app/src/modules/{module}/components`.

**context**

Create a React context in `app/src/modules/{module}/contexts`.

**page**

Create a page in `app/src/modules/{module}/pages`.

## Testing

There are tests for the security rules for Firestore.
These are located in the `test` directory.

To run these tests, first make sure you have the appropriate emulators installed.
Use these commands to install them:

```
// Install Firestore emulator
firebase setup:emulators:firestore
```

To run the tests, first start the appropriate emulator
(and leave them running throughout while you run the tests):

```
// Start the Firestore emulator
yarn emulate:firestore
```

Then run the tests using these commands:

```
// Run all tests
yarn test

// Run Firestore tests
yarn test:firestore
```

## Deployment

**IMPORTANT**: See [CONTRIBUTING.md](CONTRIBUTING.md) for the `git` branching work flow and
merge request conventions used in this project.

Deployment to the **staging** environment can be triggered by running the release process.
Deployment to the **production** environment can be manually triggered after a successful
deployment to **staging**. See [RELEASE.md](RELEASE.md) for more information.

## Logging during development

To make full use of the `LoggerUtil` class found in `app/src/app/core/utils/logger.ts`
when using Google Chrome's dev tools, you should enable "blackboxing" so that logs
to the console reference you to the source file where the call **to** `LoggerUtil`
originated from, rather of showing the line inside `logger.ts` that makes the call
to `console.log`.

To enable this feature, go to dev tool's **Settings** > **Blackboxing** and add the
following pattern with "blackbox" behaviour:

```
logger\.ts$
```

For more information on blackboxing in Google Chrome, go to the
[documentation](https://developer.chrome.com/devtools/docs/blackboxing).

## License

[MIT License](LICENSE)
