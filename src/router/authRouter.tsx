import { GET_USERINFO } from '@/graphql/demo'
import userStore from '@/store/user'
import { useQuery } from '@apollo/client'
import { Spin } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function AuthRouter({ children }: any) {
  const nav = useNavigate()
  const setUserInfo = userStore((state: any) => state.setUserInfo)

  const { loading, refetch } = useQuery(GET_USERINFO, {
    onCompleted: (data) => {
      if (data.getUserInfo.tel) {
        const { id, name, tel, desc, avatar } = data.getUserInfo
        setUserInfo({
          id,
          name,
          tel,
          desc,
          avatar,
          refetchHandler: refetch,
        })
        // 当前在登录页面，且已经登录了，那就直接跳到首页
        if (location.pathname === '/login') {
          nav('/')
        }
        return
      }
      setUserInfo({ refetchHandler: refetch })
      // 如果不在登录页面，但是目前没有登录，那就直接跳到登录页面
      if (location.pathname !== '/login') {
        nav(`/login?orgUrl=${location.pathname}`)
      }
    },
    onError: () => {
      setUserInfo({ refetchHandler: refetch })
      // 如果不在登录页面，但是目前登录异常，那就直接跳到登录页面
      if (location.pathname !== '/login') {
        nav(`/login?orgUrl=${location.pathname}`)
      }
    },
  })

  return (
    <Spin spinning={loading}>
      <div style={{ height: '100vh' }}>{children}</div>
    </Spin>
  )
}

