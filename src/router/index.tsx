// src/main.jsx
import Login from '@/app/login'
import Layout from '@/components/Layout'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AuthRouter from './authRouter'
import { ROUTE_COMPONENT } from './component'
import { routes } from './routes'

// 自动导入 src/app 目录下的所有组件
// const modules = import.meta.glob('../app/**/page.ts', { eager: true, import: 'default' })
// const components = import.meta.glob('../app/**/index.tsx', { eager: true, import: 'default' })

// const routes = Object.entries(modules).map(([key, meta]) => {
//   const path = key.replace('../app', '').replace('/page.ts', '') || '/'
//   const compPath = key.replace('/page.ts', '/index.tsx')
//   const name = path.split('/').pop() || ''
//   const Component = components[compPath] as FC
//   return {
//     path,
//     name,
//     Component,
//     meta,
//   }
// })

const App = () => (
  <Router>
    <AuthRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          {routes.map((item) => {
            const Element = ROUTE_COMPONENT[item.key]
            return <Route key={item.path} path={item.path} element={<Element />} />
          })}
        </Route>
      </Routes>
    </AuthRouter>
  </Router>
)

export default App

