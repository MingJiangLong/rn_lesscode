import React, { Fragment, ReactNode, useContext, useMemo, useRef, useState } from 'react';
import { GLOBAL } from '../../App';
import { RNText } from '../../config/constance';
import I_Node from '../../modules/I_Node';
import { findTarget, isNode } from '../../util';
import { isPhoneRenderComponent } from '../../util/is';
import './index.css';
export default function Phone() {

    const { store: { draggedNode, phoneRenderJson, initBaseComponents, clickInfo }, dispatch } = useContext(GLOBAL)

    const primaryKey = useRef(0)

    /**
     * 拖拽drop
     * @param e 
     */
    function onDrop(e: React.DragEvent<HTMLDivElement>) {
        const htmlElement = e.target as HTMLElement;
        const id = htmlElement.dataset.id as string
        let find = findTarget(id, phoneRenderJson as I_Node);
        if (!find) return
        primaryKey.current += 1;

        if (!Array.isArray(find.children)) {
            if (!find.children) {
                find.children = []
            } else {
                find.children = [find.children]
            }
        }

        find.children.push({
            id: `$$${primaryKey.current}$$`,
            props: {
                ...draggedNode.props
            },
            reactNativeType: draggedNode.reactNativeType,
            reactType: draggedNode.reactType,
            children: draggedNode.children
        })

        // 此时如果点击信息是模拟器需要同步点击信息
        if (isPhoneRenderComponent(clickInfo.id)) {
            const find = findTarget(clickInfo.id, phoneRenderJson)
            if (find) {
                dispatch("setClickInfo", find)
            }
        }
        dispatch('setPhoneRenderJson', {
            ...phoneRenderJson
        })


    }

    /** 用于开启drop事件 */
    function onDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    function onPhoneElementClick(props: I_Node) {
        dispatch("setClickInfo", { ...props })
    }

    function parseRenderJson(data: I_Node, parentType?: string): ReactNode {

        // 需要把一些属性和react native同步
        const props = data.props;
        const children = data.children;
        const reactType = data.reactType;
        const reactNativeType = data.reactNativeType;

        const realChildren = Array.isArray(children) ? children : !children ? [] : [children]

        /**处理嵌套text */
        const realReactType = parentType != RNText && reactNativeType == RNText ? 'div' : reactType

        return React.createElement(realReactType, {
            ...props,
            onClick(e: any) {
                e.stopPropagation()
                onPhoneElementClick(data)
            },
            "data-id": data.id
        }, realChildren.map(item => {
            if (isNode(item)) {
                return (
                    <Fragment key={item.id}>
                        {parseRenderJson(item, reactNativeType)}
                    </Fragment>
                )
            }

            return item

        }))
    }
    const children = useMemo(() => {
        return parseRenderJson(phoneRenderJson as any);
    }, [phoneRenderJson])
    return (
        <div
            data-id="simulator"
            className="phone_container"
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            {children}
        </div>
    )
}