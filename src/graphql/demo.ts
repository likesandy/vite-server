import { gql } from '@apollo/client'

export const HELLOGRAPHQL = gql`
  query {
    hello
  }
`

export const FIND = gql`
  mutation find($id: String!) {
    find(id: $id) {
      name
    }
  }
`
