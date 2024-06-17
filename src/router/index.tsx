// src/main.jsx
import { Suspense, type FC } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

// 自动导入 src/app 目录下的所有组件
const modules = import.meta.glob('../app/**/page.ts', { eager: true, import: 'default' })
const components = import.meta.glob('../app/**/index.tsx', { eager: true, import: 'default' })

const routes = Object.entries(modules).map(([key, meta]) => {
  const path = key.replace('../app', '').replace('/page.ts', '') || '/'
  const compPath = key.replace('/page.ts', '/index.tsx')
  const name = path.split('/').pop() || ''
  const Component = components[compPath] as FC
  return {
    path,
    name,
    Component,
    meta,
  }
})

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </Suspense>
  </Router>
)

export default App

