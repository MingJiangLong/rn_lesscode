import { useContext, useEffect, useMemo, useState } from "react"
import { GLOBAL } from "../../App"
import Horizontal from "../horizontal";
import '../../App.css'
import {
    Popconfirm,
    Input
} from 'antd';
import { isBaseComponent, isPhoneRenderComponent } from "../../util/is";
import { findTarget, isNode } from "../../util";
import I_Node from "../../modules/I_Node";
export default function Children() {
    const { store: { clickInfo, initBaseComponents, phoneRenderJson }, dispatch } = useContext(GLOBAL)

    function isChildrenArray(value: any): value is Array<any> {
        return Array.isArray(value)
    }

    function onAddChild() {

    }

    function onUpdateChild() {

    }

    function onNodeClick(item: I_Node) {
        dispatch("setClickInfo", item)
    }

    /**
     * 移除子节点
     * @param key 
     * @returns 
     */
    function onDeleteChild(key: number) {
        const { id } = clickInfo;
        if (isBaseComponent(id)) {
            const find = initBaseComponents.find(item => item.id == id)
            if (!find) return;

            if (isChildrenArray(find.children)) {
                find.children.splice(key, 1);
            } else {
                find.children = []
            }

            dispatch("setClickInfo", find)
            return dispatch("setInitBaseComponents", [...initBaseComponents])
        }
        if (isPhoneRenderComponent(id)) {
            const find = findTarget(id, phoneRenderJson);
            if (!find) return;
            if (isChildrenArray(find.children)) {
                find.children.splice(key, 1);
            } else {
                find.children = []
            }

            dispatch("setClickInfo", find)
            return dispatch("setPhoneRenderJson", { ...phoneRenderJson })
        }

    }

    const [childrenState, setChildrenState] = useState<{
        editModel: boolean
        child: I_Node | string | number
    }[]>();


    function changeModel(index: number, value: boolean) {
        if (!childrenState) return;
        childrenState[index].editModel = value;
        setChildrenState([...childrenState])

    }

    /**
     * 点击信息变化更新children信息
     * @param value 
     */
    function updateChildrenState(value: I_Node) {
        const children = Array.isArray(value.children) ?
            value.children : value.children ?
                [value.children] :
                [];

        const tempt = children.map(item => {
            return {
                editModel: false,
                child: item
            }
        })
        setChildrenState(tempt)

    }

    function onSaveData(key: number) {
        if (!childrenState) return;
        const child = childrenState[key].child;
        const clickedId = clickInfo.id;
        if (isBaseComponent(clickedId)) {
            const find = initBaseComponents.find(item => item.id == clickedId)
            if (!find) return;
            find.children = [child]

            dispatch("setClickInfo", find)
            return dispatch("setInitBaseComponents", [...initBaseComponents])
        }

        if (isPhoneRenderComponent(clickedId)) {
            const find = findTarget(clickedId, phoneRenderJson);
            if (!find) return;
            find.children = [child]
            dispatch("setClickInfo", find)
            return dispatch("setPhoneRenderJson", { ...phoneRenderJson })
        }

    }
    function onEdit(e: React.ChangeEvent<HTMLInputElement>, key: number) {
        if (!childrenState) return;
        const { value } = e.target;

        childrenState[key].child = value;
        setChildrenState([...childrenState])
    }
    useEffect(() => {
        updateChildrenState(clickInfo)
    }, [clickInfo])

    const render = useMemo(() => {
        if (!childrenState) return void 0;

        return (
            <>
                {childrenState.map((item, index) => {
                    const { child, editModel } = item;
                    return (
                        <Horizontal key={index} style={{ margin: "0px 40px" }}>

                            {
                                isNode(child) && (
                                    <div
                                        style={{ flex: 1 }}
                                        onClick={() => {
                                            onNodeClick(child)
                                        }}>
                                        {
                                            child.reactNativeType
                                        }
                                    </div>
                                )
                            }

                            {
                                !isNode(child) && !editModel && (
                                    <div style={{ flex: 1 }}>
                                        {child}
                                    </div>
                                )
                            }
                            {
                                !isNode(child) && editModel && <input style={{
                                    flex: 1
                                }}
                                    value={child}
                                    onChange={e => onEdit(e, index)}
                                />
                            }

                            <Popconfirm
                                title="确定移除该子节点吗?"
                                onConfirm={() => {
                                    onDeleteChild(index)
                                }}
                                okText="确定"
                                cancelText="取消"
                            >
                                <img
                                    className="App-icon"
                                    src={require("../../imgs/delete.png")}

                                />
                            </Popconfirm>
                            {

                                editModel && !isNode(child) && (
                                    <img
                                        onClick={() => {
                                            onSaveData(index)
                                            changeModel(index, false)
                                        }}
                                        className="styleProp-delete" src={require("../../imgs/correct.png")} />
                                )
                            }

                            {

                                !editModel && !isNode(child) && (
                                    <img
                                        onClick={() => {
                                            changeModel(index, true)
                                        }}
                                        className="styleProp-delete" src={require("../../imgs/edit.png")} />
                                )
                            }
                        </Horizontal>
                    )
                })}
            </>
        )
    }, [childrenState])
    return (
        <div>
            {

                render
            }
        </div>
    )
}