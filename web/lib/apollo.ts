import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { OperationDefinitionNode } from 'graphql'
import { WebSocketLink } from '@apollo/client/link/ws'

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/v1/graphql',
})

const link =
  typeof window !== 'undefined'
    ? split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(
            query
          ) as OperationDefinitionNode
          return kind === 'OperationDefinition' && operation === 'subscription'
        },
        new WebSocketLink({
          uri: 'ws://localhost:8080/v1/graphql',
          options: {
            reconnect: true,
          },
        }),
        httpLink
      )
    : httpLink

const apollo = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default apollo
