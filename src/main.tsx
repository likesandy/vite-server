import { ApolloProvider } from '@apollo/client'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import client from 'utils/apollo.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

