module.exports = {
  client: {
    service: {
      name: 'my-app',
      url: 'http://localhost:4000/graphql',
    },
    // Files processed by the extension
    includes: ['src/**/*.graphql'],
  },
}
