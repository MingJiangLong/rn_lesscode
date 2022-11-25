import React from "react"
/**
 * 自定义节点信息
 */
export default interface I_Nodes {

    id: string
    reactNativeType: string,
    reactType: string,
    parentID?: string
    name?: string
    desc?: string

    /**
     * 用于寻找子节点
     */
    sons?: I_Nodes[]

    props: {
        id?: string
        style?: React.CSSProperties,
        [key: string]: any
    }

}