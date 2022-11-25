import React from "react"
/**
 * 自定义节点信息
 */
export default interface I_Node {

    /** id */
    id: string

    /** 父节点 */
    parentId?: string

    /** 左边兄弟节点 id */
    leftSablingId?: string

    /** 右边兄弟节点 id */
    rightSablingId?: string

    /** 子节点 */
    children?: (I_Node | string | number)[] | string | number

    /** props */
    props: {
        id?: string
        style?: React.CSSProperties,
        [key: string]: any
    }

    /** react native 类型 */
    reactNativeType: string,

    /** react 类型 */
    reactType: string,

    /** 别名 */
    name?: string

    /** 描述 */
    desc?: string
}