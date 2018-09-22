A helper function for setting color-related style properties
(color, backgroundColor, fill, etc.) in a generic manner

### Signature
<code>
(
  prop: string, 
  value: string|[string, string?, ColorPallete?], 
  getColor: ColorGetter
) => { [prop]: string }
</code>

### Params
| param | type | description |
|-------|------|-------------|

 prop | string | The color-related property to be set
 value | string|[string, string?, ColorPallete?] | The argument that will be passed to the colorGetter function. Can either be `string` representing a named color, or a `tuple` holding a `string` representing a named color, an optional string representing a variant of the named color and an optional `ColorPalette` to get the color values from instead of the default one.
 getColor | function | A `ColorPalette` function

### Return
A single-prop style object with a color value assigned to the key.
 

