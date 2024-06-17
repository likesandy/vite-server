import { useMutation } from '@apollo/client'
import './App.css'
import { FIND } from './graphql/demo'

function App() {
  // const { loading, error, data } = useQuery(HELLOGRAPHQL)
  const [findUser, { loading, error, data }] = useMutation(FIND)

  const handler = () => {
    findUser({ variables: { id: 'd9d4e5c9-d00f-4485-8130-d11f7de0d73e' } })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return (
    <h2>
      {JSON.stringify(data)}
      <button onClick={handler}>点击</button>
    </h2>
  )
}

export default App

