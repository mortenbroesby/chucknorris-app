# Assignment

## Introduction

This project has mainly been tested in Chrome and Canary, although it should work in other browsers.

It is built with parcel as build tool, and utilises Vue.js with TypeScript, VueX for state management, and vue-router for route navigation.

Jest is used to unit test core component(s).

### About the application itself

The application is a platform that gives the user the ability to consume Chuck Norris jokes. He can also favorite items - up to a limit of 10.
Should he be lazy, there's an auto-favorite button as well.

To allow the user to retain his session, a login form is displayed.

_Note: In the trial period, anonymous users can favorite as well. This is subject to change at any time_.

The login form fields has the following rules:
- Username cannot be empty.
- Password cannot be empty.
- Passwords must include one increasing straight of at least three letters, like abc, cde, fgh,and so on, up to xyz. They cannot skip letters; acd doesn't count.
- Passwords may not contain the letters i, O, or l, as these letters can be mistaken for other characters and are therefore confusing.
- Passwords must contain at least two non-overlapping pairs of letters, like aa, bb, or cc.
- Passwords cannot be longer than 32 characters.
- Passwords can only contain lower case characters.
- Passwords can only contain alphabetic characters.

When the user is logged in successfully, his session is retained in local-storage, and used when reloading the application from cold boot (refresh).

---

## Installation

Prerequisites:

- Install NPM dependencies

```
npm install
```

To serve the project in the browser, run this command in the terminal:

```
npm run dev
```

To build the project for distribution:

```
npm run build
```

See here for more information: [https://parceljs.org/getting_started.html](https://parceljs.org/getting_started.html)

---

## Future considerations
- Ensure application is responsive and adaptive, e.g. for mobile devices or large screens.
- Further atomise components where applicable.
- Create more re-usable popup handling.
- Add end-to-end tests using Cypress.
- Increase unit test code coverage.