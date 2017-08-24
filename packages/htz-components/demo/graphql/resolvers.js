const { getComponentFiles, getComponentDocs } = require('../docgen')

module.exports = {
  Query: {
    components() {
      return getComponentFiles()
        .then(filenames => {
          return Promise.all(
            filenames.map(filename => {
              return getComponentDocs(filename).catch(err => {
                // `react-docgen` throws an error if it parses a file with no
                // component definitions, but we should just skip those.
                console.warn('Error when parsing source file, skipping:')
                console.warn(`  ${filename}`)
                console.warn(`  ${err}`)
                return []
              })
            })
          )
        })
        .then(componentDocs => {
          // Flatten the file-grouped component lists into a single list.
          return [].concat(...componentDocs)
        })
    }
  },
  Component: {}
}
