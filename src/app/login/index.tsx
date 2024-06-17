import { LOGIN, SEND_CODE_MES } from '@/graphql/demo'
import { LockOutlined, MobileOutlined } from '@ant-design/icons'
import { LoginForm, ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-components'
import { useMutation } from '@apollo/client'
import { message, theme } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.less'

interface ILogin {
  phone: string
  code: string
}

export default () => {
  const { token } = theme.useToken()
  const [send] = useMutation(SEND_CODE_MES)
  const [login] = useMutation(LOGIN)
  const nav = useNavigate()

  const loginHandler = async (values: ILogin) => {
    const res = await login({ variables: values })
    if (res.data.login.code === 200) {
      message.success(res.data.login.message)
      nav('/')
      return
    }
    message.error(res.data.login.message)
  }

  return (
    <div style={{ backgroundColor: token.colorBgContainer }} className={styles.container}>
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

