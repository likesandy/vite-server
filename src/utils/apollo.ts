import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { TOKEN } from './constants'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
})

// 拦截器
const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem(TOKEN) || localStorage.getItem(TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client

