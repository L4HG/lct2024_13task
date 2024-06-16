import React from "react";
import { Form, Select } from 'antd'
import { _chanal, _product } from "./consts";

const SelectItem = (props) => {
    const { data, name, label } = props
    const options = Object.keys(data).map(value => ({ value, label: data[value] }))
    return (
        <Form.Item name={name} label={label}>
            <Select options={options} />
        </Form.Item>
    )
}

export const Product = () => {
    return <SelectItem data={_product} name={'product'} label={"Данные о продукте"} />
}

export const Canal = () => {
    return <SelectItem data={_chanal} name={'canal'} label={"Канал"} />
}