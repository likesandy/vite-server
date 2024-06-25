import { GET_OSS_INFO } from '@/graphql/oss'
import { useQuery } from '@apollo/client'
import type { UploadFile, UploadProps } from 'antd'
import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useRef } from 'react'

interface OSSDataType {
  dir: string
  expire: string
  host: string
  accessId: string
  policy: string
  signature: string
}

interface OSSUploadProps {
  value?: UploadFile
  onChange?: (file?: UploadFile) => void
  label?: string
}

const OSSImageUpload = ({ value, onChange, label = '上传图片' }: OSSUploadProps) => {
  const { data, refetch } = useQuery<{ getOssInfo: OSSDataType }>(GET_OSS_INFO)
  const key = useRef('')

  const OSSData = data?.getOssInfo

  const handleChange: UploadProps['onChange'] = ({ file }) => {
    if (file.status === 'removed') {
      onChange?.()
      return
    }

    const newFile = {
      ...file,
      url: `${OSSData?.host}/${key.current}`,
    }

    onChange?.(newFile)
  }

  const getExtraData: UploadProps['data'] = (file) => {
    const suffix = file.name.slice(file.name.lastIndexOf('.'))
    key.current = `${OSSData?.dir}${Date.now()}${suffix}`
    return {
      key: key.current,
      OSSAccessKeyId: OSSData?.accessId,
      policy: OSSData?.policy,
      Signature: OSSData?.signature,
    }
  }

  const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
    if (!OSSData) return false

    const expire = Number(OSSData.expire) * 1000

    if (expire < Date.now()) {
      await refetch()
    }

    return file
  }

  const uploadProps: UploadProps = {
    name: 'file',
    fileList: value ? [value] : [],
    action: OSSData?.host,
    onChange: handleChange,
    data: getExtraData,
    beforeUpload,
    listType: 'picture-card',
  }

  return (
    <ImgCrop rotationSlider>
      <Upload {...uploadProps}>{label}</Upload>
    </ImgCrop>
  )
}

export default OSSImageUpload

