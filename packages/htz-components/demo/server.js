const next = require('next')
const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const schema = require('./graphql/schema')

const DEV = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 3000
const app = next({ dev: DEV })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
    server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(PORT, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })

module.exports = { app }
