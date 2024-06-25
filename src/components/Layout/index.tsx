import { useGoto } from '@/hooks/route'
import { ROUTE_KEY, routes } from '@/router/routes'
import userStore from '@/store/user'
import { TOKEN } from '@/utils/constants'
import { LogoutOutlined } from '@ant-design/icons'
import { MenuDataItem, PageContainer, ProLayout } from '@ant-design/pro-components'
import { Space } from 'antd'
import { Link, useNavigate, useOutlet } from 'react-router-dom'

export default function Layout() {
  const outlet = useOutlet()
  const nav = useNavigate()
  const { go } = useGoto()
  const userInfo = userStore((state: any) => state.userInfo)

  const menuItemRender = (item: MenuDataItem, defaultDom: React.ReactNode) => (
    <Link to={item.path ?? ''}>{defaultDom}</Link>
  )

  const logoutHandler = () => {
    sessionStorage.setItem(TOKEN, '')
    localStorage.setItem(TOKEN, '')
    nav('/login')
  }
  return (
    <>
      <ProLayout
        layout="mix"
        title={false}
        avatarProps={{
          title: userInfo.tel,
          src: userInfo.avatar,
          size: 'small',
          onClick: () => go(ROUTE_KEY.ABOUT),
        }}
        logo={
          <img
            src="https://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/henglogo.png"
            alt="logo"
          />
        }
        route={{
          routes,
        }}
        menuItemRender={menuItemRender}
        links={[
          <Space size={20} onClick={logoutHandler}>
            <LogoutOutlined />
            退出
          </Space>,
        ]}
      >
        <PageContainer>{outlet}</PageContainer>
      </ProLayout>
    </>
  )
}

