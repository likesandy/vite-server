import { getRouteKey, routes } from '@/router/routes'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'

/**
 * 通过key指定路由跳转
 * @returns
 */
export const useGoto = () => {
  const nav = useNavigate()

  const back = () => nav(-1)
  const go = (key: string, params?: Record<string, string | number>) => {
    if (!key) {
      nav('/')
      return
    }
    const route = getRouteKey(key)
    if (route && route.path) {
      if (!params) {
        nav(`/${route.path}`)
      }

      // page/:id => params:{id:1} => page/1
      const url = route.path.replace(/:([^/]+)/g, (_, key) => `${params![key]}`)
      nav(`/${url}`)
    }
  }
  return { back, go }
}

/**
 * 获取当前URL匹配到的路由
 * @returns
 */
export const useMathRoute = () => {
  const r = useLocation()
  const route = routes.find((item) => matchPath(item.path, r.pathname))
  return route
}

