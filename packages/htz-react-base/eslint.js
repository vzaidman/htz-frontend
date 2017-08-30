/* eslint-disable quotes, comma-dangle */
/* prettier-ignore */
module.exports = {
  /* Extend airbnb's style-guide enforcement */
  extends: "airbnb",

  overrides: {
    files: [ "*.test.js" ],
    plugins: [
      "jest"
    ],
    env: {
      jest: true
    }
  },


  rules: {
    "brace-style": [ 2, "stroustrup", { allowSingleLine: true } ],
    /* Warn about long line */
    "max-len": [ 1, 100, 2 ],
    /* Warn about use of console */
    "no-console": [ 1 ],
    /* Warn about use of debugger */
    "no-debugger": [ 1, ],
    /* Allow nested ternaries */
    "no-nested-ternary": 0,
    /* Warn when declaring a variable with a name that already exists in the containing scope */
    "no-shadow": [ 1 ],
    /* Forbid referencing a variable before it is defined, but allow using declared functions */
    "no-use-before-define": [ 2, "nofunc" ],
    /* Warn when referencing an undefined variable */
    "no-undef": [ 1 ],
    /* Forbid expressions that are never used */
    "no-unused-expressions": [
      2,
      { allowShortCircuit: true, allowTernary: true }
    ],
    /* Warn when declaring a variable without using it */
    "no-unused-vars": [ 1, { vars: "local", args: "none", } ],
    "no-warning-comments": [ 1, { terms: [ "fixme", "todo", ], location: "start", } ],
    "valid-jsdoc": [
      2,
      {
        requireReturn: false,
        requireParamDescription: false,
        requireReturnDescription: false
      }
    ],
    /* Opinionated comma dangling rules */
    "comma-dangle": [
      "error",
      {
        arrays: "always",
        objects: "always",
        imports: "always",
        exports: "always",
        functions: "ignore"
      }
    ],
    /* Array brackets */
    "array-bracket-spacing": [ "error", "always" ],
    /* Arrow function rules */
    "arrow-parens": [ "error", "as-needed" ],
    /* disallow certain syntax forms */
    "no-restricted-syntax": [
      2,
      "DebuggerStatement",
      "LabeledStatement",
      "WithStatement"
    ],
    /* Import related rules */
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false
      }
    ],

    /* React related rules */
    "react/jsx-filename-extension": [ 1, { extensions: [ ".js", ".jsx" ] } ]
  }
};
