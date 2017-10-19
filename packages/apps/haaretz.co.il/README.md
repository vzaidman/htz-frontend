# haaretz.co.il

The site for the Hebrew edition of Haaretz.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Architecture](#architecture)
  - [SSR](#ssr)
  - [Data and State](#data-and-state)
  - [Styling](#styling)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Architecture

### SSR
TODO: Document NextJs usage

### Data and State
TODO: Document Apollo usage

### Styling
This application uses [Fela](https://fela.js.org) for its styling layer, and makes use of the 
[Polished](https://polished.js.org) and `@haaretz/htz-css-tools` libraries for styling helpers.

The `@Haaretz/htz-theme` theme is available in the application React context, through Fela's 
[<ThemeProvider>](https://github.com/rofrischmann/fela/blob/master/packages/react-fela/docs/ThemeProvider.md), 
which passes it down.

