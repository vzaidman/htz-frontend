<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

* [Params](#params)
* [Example](#example)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

A utility that appends a `<script/>` onto the DOM, and with a provided unique id, it makes sure that the script element does not repeat itself in the DOM.

### Params

| Param          | Type     | Default  | Description                                                                                                                                   |
| -------------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| src            | string   | Required | The script source url.                                                                                                                        |
| id             | string   | Required | A unique id for this script, to avoid duplications.                                                                                           |
| isAsync        | boolean  | false    | Is this script is async or not.                                                                                                               |
| onLoadFunction | function | null     | An init function (not required).                                                                                                              |
| updateFunction | function | null     | update function (not required), in case that the script already exist in the DOM, but you're in need to refresh the already mounted elements. |
| attributes     | object   | null     | An object with additional attributes to be assign to the Script tag (not required).                                                           |

### Example

```js static
import { appendScript, } from '../../../utils/scriptTools';

 const updateScript = () => {
   doBuild();
 };

 appendScript({
   src: '//assets.pinterest.com/js/pinit.js',
   id: 'pinterest-js',
   isAsync: true,
   onLoadFunction: null,
   updateFunction: updateScript,
   attributes: { 'data-pin-build': 'doBuild', },
   });
```
