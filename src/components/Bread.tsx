import { HomeOutlined, UserOutlined } from "@ant-design/icons"
import { Breadcrumb } from "antd"

const Bread = () => (
    <Breadcrumb>
        <Breadcrumb.Item>
            <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Application</Breadcrumb.Item>
    </Breadcrumb>
)

export default Bread
