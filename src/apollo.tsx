import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { Component, DefineComponent, defineComponent, provide } from 'vue'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://api.sancus.credit/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('authorization-token')
  return {
    headers: {
      ...(headers as Record<string, string>),
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

// Cache implementation
const cache = new InMemoryCache({})

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const injectApollo = (MainComponent: DefineComponent<any, any, any>): Component =>
  defineComponent({
    name: 'ApolloInjector',
    setup() {
      provide(DefaultApolloClient, apolloClient)

      return () => <MainComponent />
    },
  })
