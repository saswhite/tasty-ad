import React,{ useState } from 'react';
import { useHistory } from 'react-router-dom';

/* anted */
import { Form, Input, Button,Drawer,Card ,message } from 'antd';

/* style */
import './login.scss';

/* request */
import { login } from '../../Request/login';

/* common */
import { setStorage } from '../../Common/utils';

export default function Login () {

    const history = useHistory();

    const [ visible, setVisible ] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const onFinish = async values => {
        try {
            let loginInfo =  await login(values);
            setStorage('admin-user',loginInfo);
            history.push('/admin/restaurant');
        } catch (err) {
            message.error(err.message);
        }

    };

    return (
        <div>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={ onFinish }
                className="login-input-container"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    className="login-input"
                    rules={ [ { required: true, message: 'Please input your username!' } ] }
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    className="login-input"
                    rules={ [ { required: true, message: 'Please input your password!' } ] }
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                      登陆
                    </Button>
                    <Button
                        type="primary"
                        className="btn"
                        onClick={ showDrawer }>
                      显示登陆信息
                    </Button>
                </Form.Item>
            </Form>
            <Drawer
                title="Basic Drawer"
                placement="right"
                closable={ false }
                onClose={ onClose }
                visible={ visible }
            >
                <Card  style={{ width : 300,marginTop :'20px' }}>
                    <p>管理员</p>
                    <p>username: admin</p>
                    <p>password: 随意</p>
                </Card>
                <Card style={{ width : 300,marginTop :'20px' }}>
                    <p>部门员工</p>
                    <p>username: employee</p>
                    <p>password: 随意</p>
                </Card>
                <Card style={{ width : 300,marginTop :'20px' }}>
                    <p>游客</p>
                    <p>username: visitor</p>
                    <p>password: 随意</p>
                </Card>
            </Drawer>
        </div>
    );
}
