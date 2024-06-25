import Home from '@/app/home'
import { ROUTE_KEY } from './routes'
import Index from '@/app/'
import Page_404 from '@/app/404'
import About from '@/app/about'

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.INDEX]: Index,
  [ROUTE_KEY.PAGE_404]: Page_404,
  [ROUTE_KEY.ABOUT]: About,
}

