<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Examples](#examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
Error boundary catches JavaScript errors anywhere in its child component tree,
log those errors, and display a fallback UI instead of the component tree that crashed.
Error boundary catches errors during rendering, in lifecycle methods, and in constructors of the whole tree below him.
