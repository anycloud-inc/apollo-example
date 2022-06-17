import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client'
import { Box } from '@mui/material'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`

interface ExchangeRate {
  currency: string
  rate: string
}

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache(),
})

async function fetchData() {
  const result = await client.query<{ rates: ExchangeRate[] }>({
    query: EXCHANGE_RATES,
  })
  return result.data
}

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<ExchangeRate[]>([])

  useEffect(() => {
    fetchData().then(data => {
      setData(data.rates)
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
            {exchangeRate.currency}: {exchangeRate.rate}
          </p>
        )
      })}
    </Box>
  )
}

export default Home
