import React, { useState } from 'react';
import { Button, ConfigProvider, Form, Input, Col, Radio, Row, InputNumber, Select, Image, Typography, Empty } from 'antd';
import { Canal, Product } from './SelectItem';

const theme = {
    components: {
        Form: {
            itemMarginBottom: 12
        },
    },
}

const init = {
    age: '18',
    canal: 'KND',
    otherData: '',
    pictureFormat: 'JPEG',
    product: 'PC',
    region: '',
    sex: 'Мужчина',
    x: '500',
    y: '500'
}
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
export const PictureGen = () => {
    const [form] = Form.useForm()

    const [img, setImg] = useState('')

    const handleAgeChange = (v) => {
        form.setFieldsValue({ age: v.toString() });
    }
    const handleXChange = (v) => {
        form.setFieldsValue({ x: v.toString() });
    }
    const handleYChange = (v) => {
        form.setFieldsValue({ y: v.toString() });
    }
    const onFinish = async (values) => {
        try {
            const res = await fetch('https://lct.toai.ru/get_image/', {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            })
            const { s3url } = await res.json()

            setImg(String(s3url).replace('5math.photo', 'task13'))

        }
        catch (e) {
            console.error(e)
        }
    };

    return (
        <Col md={24}>
            <Row gutter={12}>
                <Col md={10}>

                    <ConfigProvider
                        theme={theme}
                    >
                        <Form
                            form={form}
                            name="picture-generator"
                            id="picture-generator"
                            initialValues={init}
                            onFinish={onFinish}
                            layout='vertical'
                            style={{ maxWidth: 600, margin: '0 20px' }}
                        >
                            <Form.Item name='sex'>
                                <Radio.Group>
                                    <Radio id='man' value="0"> Мужчина </Radio>
                                    <Radio id='wooman' value="1"> Женщина </Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                label="Возраст"
                                name="age"
                            >
                                <InputNumber style={{ width: '100%' }} onChange={handleAgeChange} />
                            </Form.Item>

                            <Product />
                            <Canal />

                            <Form layout="inline">
                                <Form.Item
                                    label="Высота картинки (y)"
                                    name="y"
                                >
                                    <InputNumber style={{ width: '100%' }} onChange={handleYChange} />
                                </Form.Item>
                                <Form.Item

                                    label="Ширина картинки (x)"
                                    name="x"
                                >
                                    <InputNumber style={{ width: '100%' }} onChange={handleXChange} />
                                </Form.Item>

                            </Form>
                            <Form.Item name='pictureFormat' label='Формат'>
                                <Radio.Group >
                                    <Radio value="JPEG"> JPEG </Radio>
                                    <Radio value="PNG"> PNG </Radio>
                                    <Radio value="WebP"> WebP </Radio>
                                    <Radio value="SVG"> SVG </Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name='otherData' label="Дополнительная информация">
                                <Input.TextArea rows={2} />
                            </Form.Item>
                            <Form.Item

                            >
                                <Button type="primary" htmlType="submit">
                                    Сгенерировать изображение
                                </Button>
                            </Form.Item>
                        </Form>
                    </ConfigProvider>

                </Col>
                <Col md={14}>
                    <Row gutter={[10, 12]}>
                        <Col md={24} style={{ textAlign: 'center' }}>
                            <Typography.Title level={5} style={{ marginLeft: 20 }}>
                                Сгенерированное изображение
                            </Typography.Title>
                        </Col>
                        <Col md={24} style={{ textAlign: 'center' }}>
                            {img == '' ? <Empty description={'Ничего нет. Сгенерируйте изображение'} /> :
                                <Image src={img}
                                    width={'80%'} />}
                        </Col>
                    </Row>
                </Col>

            </Row>

        </Col>
    )
};