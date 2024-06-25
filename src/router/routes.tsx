import { HomeOutlined, TikTokOutlined } from '@ant-design/icons'

interface IRoute {
  path: string
  name: string
  icon?: React.ReactNode
  hideInMenu?: boolean
}

export const ROUTE_KEY = {
  HOME: 'home',
  INDEX: 'index',
  PAGE_404: 'page404',
  ABOUT: 'about',
}

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: 'home',
    name: '首页',
    icon: <HomeOutlined />,
  },
  [ROUTE_KEY.INDEX]: {
    path: '',
    name: 'index',
    hideInMenu: true,
    icon: <TikTokOutlined />,
  },
  [ROUTE_KEY.ABOUT]: {
    path: 'about',
    name: '个人中心',
    icon: <TikTokOutlined />,
  },
  [ROUTE_KEY.PAGE_404]: {
    path: '*',
    hideInMenu: true,
    name: '404',
  },
}

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({ key, ...ROUTE_CONFIG[key] }))

export const getRouteKey = (key: string) => ROUTE_CONFIG[key]

