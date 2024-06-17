import { ApolloProvider } from '@apollo/client'
import ReactDOM from 'react-dom/client'
import client from 'utils/apollo.ts'
import './index.css'
import AppRouter from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <AppRouter />
  </ApolloProvider>
)

