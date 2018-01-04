<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Params](#params)
- [Example](#example)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

A utility that get a unique identifier (id, inputTemplate, etc) as a String, and returns the correspondent component

### Params
| Param | Type | Default | Description |
|-------|------|-------------|---------------|
| inputTemplate | string | Required | A unique components identifier |

### Example

```js static

import { inputTemplateToComponent, } from '../../../utils/componentFromInputTemplate';

 inputTemplateToComponent('com.tm.Image')
```
