module.exports = {
  client: {
    service: {
      name: 'exchange-rate',
      url: 'http://localhost:8080/v1/graphql',
    },
    includes: ['./**/*.tsx', './**/*.tsx'],
  },
}
