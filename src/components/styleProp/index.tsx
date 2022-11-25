import React, { CSSProperties, useContext, useEffect, useState } from "react";
import { GLOBAL } from "../../App";
import { findTarget } from "../../util";
import { isBaseComponent, isPhoneRenderComponent } from "../../util/is";
import Horizontal from "../horizontal";
import {
    Popconfirm, Modal,
    Form, Select, Input
} from 'antd';
import './index.css'
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

export default function StyleProp(props: {
    style: { [key: string]: any },
    storeId: string
}) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { store: {
        initBaseComponents,
        phoneRenderJson }, dispatch } = useContext(GLOBAL)

    const [form, setForm] = useState<FormData>({})

    const [form2] = Form.useForm();

    useEffect(() => {

        // TODO:当props变化会修改 编辑模式,可以遍历查找修改状态
        const state = Object.keys(props.style).reduce((item, current) => {
            return {
                ...item,
                [current]: {
                    editModel: false,
                    value: props.style[current]
                }
            }
        }, {})
        setForm(state)
    }, [props])

    /**
     * 添加prop
     */
    function onAddPropsCallback() {
        const { styleKey, styleKeyValue } = form2.getFieldsValue()

        form[styleKey] = {
            editModel: false,
            value: styleKeyValue
        }

        setForm({ ...form });
        onSaveData(props.storeId, form)
        setIsModalOpen(false)
    }

    function onEdit(e: React.ChangeEvent<HTMLInputElement>, key: string) {
        const { value } = e.target;
        form[key].value = value;
        setForm({ ...form })
    }

    function buildFormData2StoreData(key: string, formData?: FormData) {
        return Object.keys(formData || form).reduce<{ [k: string]: any }>((count, current) => {
            if (form[current].editModel && key !== current) return count;
            count[current] = form[current].value
            return count;
        }, {})
    }
    /**
     * 保存数据修改
     */
    function onSaveData(key: string, formData?: FormData) {
        // 修改基础组件属性
        if (isBaseComponent(props.storeId)) {
            const find = initBaseComponents.find(item => item.id === props.storeId);
            if (!find) return;
            if (!find.props.style) {
                find.props.style = {}
            }
            find.props.style = buildFormData2StoreData(key, formData)
            dispatch("setInitBaseComponents", [...initBaseComponents])
            dispatch("setClickInfo", { ...find })
        }

        // 修改模拟器
        if (isPhoneRenderComponent(props.storeId)) {
            const find = findTarget(props.storeId, phoneRenderJson)
            if (!find) return;
            find.props.style = buildFormData2StoreData(key, formData)
            dispatch("setPhoneRenderJson", { ...phoneRenderJson })
            dispatch("setClickInfo", { ...find })
        }

    }
    function changeModel(key: string, value: boolean) {
        form[key].editModel = value
        setForm({ ...form })
    }

    function onConfirm(key: string) {
        if (form[key].editModel) return;
        delete form[key];
        setForm({ ...form })
        onSaveData(key, form)
    }

    return (
        <div>
            <Horizontal
                style={{
                    alignItems: 'center'
                }}
            >
                <span className="styleProp-main_text">Style:</span>
                <img className="styleProp-delete" src={require("../../imgs/add.png")} onClick={() => {
                    setIsModalOpen(true)
                }} />
            </Horizontal>
            {

                Object.keys(form).map((key) => {
                    const { editModel, value } = form[key];
                    return (
                        <Horizontal key={key} style={{ padding: '10px 40px' }}>
                            <div className="styleProp-key">{key}:</div>
                            {
                                editModel ? (
                                    <input className="styleProp-input" value={value} onChange={e => {
                                        onEdit(e, key)
                                    }} />
                                ) : (
                                    <div className="styleProp-input">{value}</div>
                                )
                            }
                            {
                                editModel ? (
                                    <img
                                        onClick={() => {
                                            onSaveData(key)
                                            changeModel(key, false);
                                        }}
                                        className="styleProp-delete" src={require("../../imgs/correct.png")} />

                                ) : (
                                    <img
                                        onClick={() => changeModel(key, true)}
                                        className="styleProp-delete" src={require("../../imgs/edit.png")} />
                                )
                            }
                            <Popconfirm
                                title="确定移除该属性吗?"
                                onConfirm={() => {
                                    onConfirm(key)
                                }}
                                okText="确定"
                                cancelText="取消"
                            >
                                <img className="styleProp-delete" src={require("../../imgs/delete.png")} />
                            </Popconfirm>
                        </Horizontal>
                    )

                })
            }
            <Modal
                centered
                title="添加属性"
                okText="确定"
                cancelText="取消"
                open={isModalOpen} onOk={onAddPropsCallback}
                onCancel={() => { setIsModalOpen(false) }}
            >
                <Form {...layout} form={form2} name="control-hooks" >

                    <Form.Item name="styleKey" label="样式名" rules={[{ required: true }]}>
                        <Input.TextArea placeholder="输入样式名" />
                    </Form.Item>
                    <Form.Item name="styleKeyValue" label="样式值" rules={[{ required: true }]}>
                        <Input.TextArea placeholder="输入对应样式值" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export type PropsRenderProps = {
    renderProps: { [key: string]: any },
    storeId: string
}
type FormData = { [key: string]: { editModel: boolean, value: any } }