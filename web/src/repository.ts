import { gql } from '@apollo/client'

const query = gql`
  query Hoge {
    rates(currency: "USD") {
      currency
      name
      rate
    }
  }
`

export const repository = {
  fetch() {},
}
