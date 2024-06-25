import { gql } from '@apollo/client'

export const GET_OSS_INFO = gql`
  query getOssInfo {
    getOssInfo {
      policy
      signature
      accessId
      dir
      host
      expire
    }
  }
`

