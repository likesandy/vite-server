import { useGoto } from '@/hooks/route'
import { ROUTE_KEY } from '@/router/routes'
import { Button } from 'antd'

export default function Home() {
  const { go } = useGoto()
  return (
    <div>
      <Button onClick={() => go(ROUTE_KEY.ABOUT)}>去个人中心</Button>
    </div>
  )
}

