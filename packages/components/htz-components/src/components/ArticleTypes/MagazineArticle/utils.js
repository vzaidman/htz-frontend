export function parseLayout(layout) {
  return {
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: [
      { until: 's', value: layout.maxWidth.s, },
      { from: 's', until: 'm', value: layout.maxWidth.m, },
      { from: 'm', until: 'l', value: layout.maxWidth.ml, },
      { from: 'l', until: 'xl', value: layout.maxWidth.l, },
      { from: 'xl', value: layout.maxWidth.xl, },
    ],
    paddingInlineStart: [
      { until: 's', value: layout.innerPadding.s, },
      { from: 's', until: 'm', value: layout.innerPadding.m, },
      { from: 'm', until: 'l', value: layout.innerPadding.ml.start, },
      { from: 'l', until: 'xl', value: layout.innerPadding.l.start, },
      { from: 'xl', value: layout.innerPadding.xl, },
    ],
    paddingInlineEnd: [
      { until: 's', value: layout.innerPadding.s, },
      { from: 's', until: 'm', value: layout.innerPadding.m, },
      { from: 'm', until: 'l', value: layout.innerPadding.ml.end, },
      { from: 'l', until: 'xl', value: layout.innerPadding.l.end, },
      { from: 'xl', value: layout.innerPadding.xl, },
    ],
  };
}
