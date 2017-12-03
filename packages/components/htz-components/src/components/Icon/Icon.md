<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [**Legend:**](#legend)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Inidividual `<Icon* />` components are automatically generated from svg 
files by a script. 

To create a new icon component or update an existing one, either place a new 
svg in the `src/components/Icon/svgs` directory, or edit an exiting one. Then, 
when the svg files are ready, run `yarn run icons`. This will convert `svg` 
files in the above directory into styled React components and place them in 
the `src/components/Icon/icons` directory. 

Svg files are converted based on the `src/components/Icon/iconTemplate.js` 
template. When updating or overwriting an existing an existing svg, please 
keep in mind that it's corresponding component in `icons` will be overwritten.
As long as the original was versioned, it is possible to `git diff` and 
reconcile the change, if needed.

If you'd like to diverge from the template, remove the original `svg` file 
from the `svgs` directory, to ensure that edits you make to the generated 
component are not later overwritten by the script.

An legend containing all the icons will be automatically generated base on the
`src/components/Icon/exampleTemplate.js` template, and automatically presented
together in the styleguide.

### **Legend:**

```js
<Icons size={null}/>
```
