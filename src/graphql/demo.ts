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

export const SEND_CODE_MES = gql`
  mutation sendCodeMes($tel: String!) {
    sendCodeMsg(tel: $tel) {
      code
      message
    }
  }
`

export const LOGIN = gql`
  mutation login($tel: String!, $code: String!) {
    login(tel: $tel, code: $code) {
      code
      message
      data
    }
  }
`

export const GET_USERINFO = gql`
  query getUserInfo {
    getUserInfo {
      tel
      name
      desc
      avatar
      id
    }
  }
`

