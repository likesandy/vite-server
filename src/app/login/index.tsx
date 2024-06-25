import { LOGIN, SEND_CODE_MES } from '@/graphql/demo'
import userStore from '@/store/user'
import { TOKEN } from '@/utils/constants'
import { LockOutlined, MobileOutlined } from '@ant-design/icons'
import { LoginForm, ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-components'
import { useMutation } from '@apollo/client'
import { message } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './index.module.less'

interface ILogin {
  phone: string
  code: string
  autoLogin: string
}

export default () => {
  const [send] = useMutation(SEND_CODE_MES)
  const [login] = useMutation(LOGIN)

  const [params] = useSearchParams()
  const nav = useNavigate()

  const refetchHandler = userStore((state: any) => state.userInfo.refetchHandler)

  const loginHandler = async (values: ILogin) => {
    const res = await login({ variables: values })
    if (res.data.login.code === 200) {
      refetchHandler?.()
      const token = res.data.login.data

      // 自动登录
      if (values.autoLogin) {
        localStorage.setItem(TOKEN, token)
      } else {
        // 当前登录态
        sessionStorage.setItem(TOKEN, token)
      }
      message.success(res.data.login.message)
      nav(params.get('orgUrl') ?? '/')
      return
    }
    message.error(res.data.login.message)
  }

  return (
    <div className={styles.container}>
      <LoginForm
        logo="http://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/henglogo.png"
        onFinish={loginHandler}
      >
        <>
          <ProFormText
            initialValue="19961344574"
            fieldProps={{
              size: 'large',
              prefix: <MobileOutlined className={'prefixIcon'} />,
            }}
            name="tel"
            placeholder={'手机号'}
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            captchaProps={{
              size: 'large',
            }}
            placeholder={'请输入验证码'}
            captchaTextRender={(timing, count) => {
              if (timing) {
                return `${count} ${'获取验证码'}`
              }
              return '获取验证码'
            }}
            phoneName="tel"
            name="code"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
            // 获取验证码
            onGetCaptcha={async (tel) => {
              const res = await send({
                variables: {
                  tel,
                },
              })
              if (res.data.sendCodeMsg.code === 200) {
                message.info(res.data.sendCodeMsg.message)
              } else {
                message.error(res.data.sendCodeMsg.message)
              }
            }}
          />
        </>
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
        </div>
      </LoginForm>
    </div>
  )
}

