<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Signature](#signature)
- [Params](#params)
- [Return](#return)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Generate strings for the `src` and `srcset` attributes of images. 
 
### Signature
<code>(contentId: string, data: Object, options: Object, excludeWidthDescriptor?: boolean) => Function</code>

### Params
| param | type | description | default value |
|-------|------|-------------|---------------|
| contentId| string | the image's Polopoly contentId. |
| data| Object | An object containing basic data about the image, for example, as obtained from the Apollo store. |
| options | Object[] | User-defined options affecting the generated url. Each options object in the array will result in an item in the returned array.|  
| options[].width | string | The width, in pixels, of the image the generated url points to. Equivalent to the w descriptor in the srcset attribute.|
| options[].height | string | The height of the file returned from the url. (optional) | Automatically determined by the aspect when not passed | 
| options[].quality | string | The image's quality. (optional) | 'auto' |
| options[].aspect | string | The image's aspect ratio. (optional) | 'full' |
| options[].isProgresive | boolean | Generate a progressive jpeg, if true progressive is 'steep', otherwise 'none'. (optional)|  false |
| options[].transforms | string[] | An array of strings with additional transforms to apply to the image url. (optional)|
| options[].flags | string[] | An array of strings with additional flags to apply to the image. (optional)|
| excludeWidthDescriptor | boolean | Omit the `width` descriptor from generated strings. (optional)|

### Return
an array with a url-string for each item in `options`  

  `[ <urlString>, <urlString>,... ]`
