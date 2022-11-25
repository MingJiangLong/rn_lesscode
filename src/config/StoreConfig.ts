import React from "react";
import { I_DispathType } from "../modules/I_DispathType";
import I_Node from "../modules/I_Node";
import { I_PhoneState } from "../modules/I_PhoneState";
import { RNImage, RNText, RNTextInput, RNView } from "./constance";
/**
 * Context初始化信息
 */
export const initState: I_PhoneState = {
    store: {
        clickInfo: {
            id: "",
            reactNativeType: '',
            reactType: '',
            props: {},
        },
        draggedNode: {
            id: '',
            reactNativeType: '',
            reactType: '',
            props: {}
        },
        phoneRenderJson: {
            id: "$$0$$",
            reactNativeType: RNView,
            reactType: 'div',
            props: {
                style: {
                    width: '375px',
                    height: '667px',
                    backgroundColor: 'white'
                }
            },
        },
        initBaseComponents: [
            {
                id: '__View__',
                reactNativeType: RNView,
                reactType: 'div',
                name: "View",
                desc: "用于把视图分割为独立的、不同的部分",
                props: {
                    style: {
                        backgroundColor: 'pink',
                        height: '40px',
                        fontSize: '12px',
                        flex: 1
                    },
                },
            },
            {
                id: '__Text__',
                reactNativeType: RNText,
                reactType: 'span',
                name: "Text/文本",
                desc: "用于放置文本内容",
                props: {
                    style: {
                        color: 'white',
                        fontSize: '14px',
                        lineHeight: "20px",
                        padding: '5px',
                        height: '20px',
                        background: 'purple'
                    },
                },
                children: 'hello,world'
            },
            {
                id: '__Image__',
                reactNativeType: RNImage,
                reactType: 'img',
                name: "Image/图片",
                desc: "展示图片",
                props: {
                    style: {
                        height: '30px',
                        backgroundColor: 'blue',
                        margin: '5px',
                        fontSize: '12px'
                    }
                },
            },
            {
                id: '__TextInput__',
                reactNativeType: RNTextInput,
                reactType: 'input',
                name: "输入框",
                desc: "",
                props: {
                    style: {}
                },
            },
            {
                id: '__Horizontal__',
                reactNativeType: RNView,
                reactType: 'div',
                name: "水平Horizontal布局",
                desc: "布局组件",
                props: {
                    style: {
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: 'blue',
                        height: "20%",
                    }
                },
            },
            {
                id: '__Vertical__',
                reactNativeType: RNView,
                reactType: 'div',
                name: "垂直Column布局",
                desc: "布局组件",
                props: {
                    style: {
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        backgroundColor: 'blue',
                        height: "20%",
                    }
                },
            },
            {
                id: '__Page__',
                reactNativeType: RNView,
                reactType: 'div',
                name: "页面容器",
                desc: "",
                props: {
                    style: {
                        height: '100%',
                        width: '100%',
                        background: 'yellow'
                    }
                },
            },
            {
                id: '__Divide__',
                reactNativeType: RNView,
                reactType: 'div',
                name: "分割线",
                desc: "",
                props: {
                    style: {
                        height: '1px',
                        width: '100%',
                        background: 'yellow'
                    }
                },
            },
        ],
    },

    dispatch<T extends I_Node>(type: I_DispathType, value: T | T[]) {

    },
}
