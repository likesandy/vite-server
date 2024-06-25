import { Button, Result } from 'antd'
import { FC } from 'react'

const Page_404: FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary">Back Home</Button>}
  />
)

export default Page_404

