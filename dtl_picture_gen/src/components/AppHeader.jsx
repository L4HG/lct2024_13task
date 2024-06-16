import React, { useState } from 'react';
import { FileImageOutlined, HistoryOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Row, Col, Avatar, Divider } from 'antd';

const items = [
    {
        label: 'Генератор изображений',
        key: 'mail',
        icon: <FileImageOutlined />
    },

    {
        key: 'alipay',
        label: 'История действий',
        icon: <HistoryOutlined />
    },
];
export const AppHeader = () => {
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <Col md={24}>
            <Row wrap={false}>
                <Col flex={'0 0 70px'} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    height: 44
                }} >

                    <Avatar icon={<UserOutlined />} />
                    <Divider type="vertical" style={{ height: 30 }} />
                </Col>
                <Col flex={'1 0 300px'}>
                    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
                </Col>
            </Row>
        </Col>

    );
};
