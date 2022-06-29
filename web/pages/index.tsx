// import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client'
import { GraphQLClient } from 'graphql-request'

import { Box } from '@mui/material'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { getSdk } from '../src/generated/graphql'
import { gql } from '@apollo/client'

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
      name
    }
  }
`

interface ExchangeRate {
  name?: string | null
  currency?: string | null
  rate?: string | null
}

// const client = new ApolloClient({
//   uri: 'https://48p1r2roz4.sse.codesandbox.io',
//   cache: new InMemoryCache(),
// })

const sdk = getSdk(new GraphQLClient('https://48p1r2roz4.sse.codesandbox.io'))

async function fetchData() {
  // const result = await client.query<{ rates: ExchangeRate[] }>({
  //   query: EXCHANGE_RATES,
  // })
  // return result.data
  return (await sdk.GetExchangeRates()).rates as ExchangeRate[]
}

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<ExchangeRate[]>([])

  useEffect(() => {
    fetchData().then(data => {
      setData(data)
      setLoading(false)
    })
  }, [])
  if (loading) return <p>Loading...</p>
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column"
    >
      <h1>Apollo Example</h1>
      <h2 style={{ marginTop: 16 }}>Exchange Rates</h2>
      {data?.map(exchangeRate => {
        return (
          <p key={exchangeRate.currency}>
            {exchangeRate.currency}（{exchangeRate.name}）: {exchangeRate.rate}
          </p>
        )
      })}
    </Box>
  )
}

export default Home
