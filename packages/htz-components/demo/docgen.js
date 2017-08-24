const fs = require('fs')
const path = require('path')
const glob = require('glob')
const docgen = require('react-docgen')

/**
 * `react-docgen` only knows how to extract `displayName` values from the old
 * `React.createClass` syntax. This adds support for using class names.
 */
const classNameHandler = (documentation, path) => {
  let displayName = documentation.get('displayName')
  if (!displayName) {
    if (path.value.type === 'ClassDeclaration') {
      if (path.value.id.type === 'Identifier') {
        displayName = path.value.id.name
      }
    }
  }
  documentation.set('displayName', displayName)
}

const RESOLVER = docgen.resolver.findAllExportedComponentDefinitions
const HANDLERS = docgen.defaultHandlers.concat([classNameHandler])
const BASE_PATH = path.join(__dirname, '..')
const COMPONENTS_PATH = path.join(BASE_PATH, 'src', '**', '*.js')

function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, source) => {
      if (err) {
        return reject(err)
      }
      return resolve(source)
    })
  })
}

function getComponentFiles() {
  return new Promise((resolve, reject) => {
    glob(COMPONENTS_PATH, (err, filenames) => {
      if (err) {
        return reject(err)
      }
      return resolve(filenames)
    })
  })
}

function getComponentDocs(filename) {
  return readFile(filename).then(source => {
    return docgen.parse(source, RESOLVER, HANDLERS).map(doc =>
      Object.assign({}, doc, {
        // Add the filename to the output.
        filename: path.relative(BASE_PATH, filename),
        // Transform `props` from an object into an array for easier use with
        // tools like GraphQL.
        props: Object.keys(doc.props || {}).map(key =>
          Object.assign({}, doc.props[key], { name: key })
        )
      })
    )
  })
}

module.exports = {
  getComponentFiles,
  getComponentDocs
}
