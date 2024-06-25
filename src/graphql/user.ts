import { gql } from '@apollo/client'

export const UPDATE_USER = gql`
  mutation updateUser($id: String!, $params: UserInput!) {
    updateUserInfo(id: $id, params: $params) {
      code
      message
    }
  }
`

