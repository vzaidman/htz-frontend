# htz-react-server

Application server for Next.js and React powered apps.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Installation](#installation)
- [Usage](#usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```console
$ yarn add @haaretz/htz-react-server
```

## Usage

Installing `htz-react-server` will make an `htz-react-server` executable
available to the consuming package, which can be run like so:

```console
$ ./node_modules/.bin/htz-react-server
```

For ease of use, it is recommended that you add `dev` and `start` scripts to
your `package.json`:

```json
  "scripts": {
    "dev": "htz-react-server",
    "start": "NODE_ENV=production htz-react-server"
  }
```
