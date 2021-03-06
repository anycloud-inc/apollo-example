import { gql } from '@apollo/client'
import { Box } from '@mui/material'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import apollo from '../lib/apollo'

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates {
      id
      name
      currency
      rate
    }
  }
`

interface ExchangeRate {
  name: string
  currency: string
  rate: string
}

async function fetchData() {
  const result = await apollo.query<{ rates: ExchangeRate[] }>({
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
            {exchangeRate.currency}（{exchangeRate.name}）: {exchangeRate.rate}
          </p>
        )
      })}
    </Box>
  )
}

export default Home
