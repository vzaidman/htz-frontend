const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = `
  type Query {
    components: [Component]!
  }

  type Component {
    displayName: String
    description: String
    filename: String!
    exportName: String
    props: [Prop]!
  }

  type Prop {
    name: String!
    description: String
    type: PropType!
    required: Boolean!
    defaultValue: PropValue
  }

  type PropValue {
    value: String!
    computed: Boolean!
  }

  type PropType {
    name: String!
  }
`

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
})
