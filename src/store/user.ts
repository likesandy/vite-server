import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const userStore = create(
  devtools((set) => ({
    userInfo: {},
    setUserInfo: (newUserInfo: any) => set({ userInfo: newUserInfo }),
    logout: () => {
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
    },
  }))
)

export default userStore

