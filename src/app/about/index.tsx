import OSSImageUpload from '@/components/OSSImageUpload'
import { UPDATE_USER } from '@/graphql/user'
import userStore from '@/store/user'
import { FormInstance, ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import { useMutation } from '@apollo/client'
import { Col, Form, Row, message } from 'antd'
import { useEffect, useRef } from 'react'

export default function About() {
  const userInfo = userStore((state: any) => state.userInfo)
  const setUserInfo = userStore((state: any) => state.setUserInfo)

  const [updateUserInfo] = useMutation(UPDATE_USER)

  const formRef = useRef<FormInstance>()

  useEffect(() => {
    formRef.current?.setFieldsValue({
      tel: userInfo.tel,
      name: userInfo.name,
      desc: userInfo.desc,
      avatar: {
        url: userInfo.avatar,
      },
    })
  }, [userInfo])

  const submitHandler = async (values: any) => {
    const res = await updateUserInfo({
      variables: {
        id: userInfo.id,
        params: {
          name: values.name,
          desc: values.desc,
          avatar: values.avatar?.url || '',
        },
      },
    })

    if (res.data.updateUserInfo.code === 200) {
      userInfo.refetchHandler?.()?.then((data: any) => {
        setUserInfo({ ...userInfo, ...data.data.getUserInfo })
      })
      message.success(res.data.updateUserInfo.message)
      return
    }
    message.error(res.data.updateUserInfo.message)
  }

  return (
    <ProForm formRef={formRef} onFinish={submitHandler} submitter={{ resetButtonProps: false }}>
      <Row gutter={20}>
        <Col>
          <ProFormText name="tel" label="手机号" tooltip="不能修改" disabled />
          <ProFormText name="name" label="昵称" placeholder="请输入昵称" />
          <ProFormTextArea name="desc" label="简介" placeholder="请输入简介信息" />
        </Col>
        <Col>
          <Form.Item name="avatar">
            <OSSImageUpload />
          </Form.Item>
        </Col>
      </Row>
    </ProForm>
  )
}

