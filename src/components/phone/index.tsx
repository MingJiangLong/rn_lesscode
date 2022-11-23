import React, { Fragment, ReactNode, useContext, useMemo, useRef, useState } from 'react';
import { GLOBAL } from '../../App';
import I_Nodes from '../../modules/I_Nodes';
import { findTarget } from '../../util';
import './index.css';
export default function Phone() {

    const { store: { draggedNode, phoneRenderJson, initBaseComponents }, dispatch } = useContext(GLOBAL)

    const primaryKey = useRef(0)

    /**
     * 拖拽drop
     * @param e 
     */
    function onDrop(e: React.DragEvent<HTMLDivElement>) {
        const htmlElement = e.target as HTMLElement;
        const id = htmlElement.dataset.id as string
        let find = findTarget(id, phoneRenderJson as I_Nodes);
        if (!find) return
        primaryKey.current += 1;
        if (!Array.isArray(find.sons)) {
            find.sons = []
        }
        find.sons.push({
            id: `$$${primaryKey.current}$$`,
            props: {
                ...draggedNode.props
            },
            parentID: find.id,
            reactNativeType: draggedNode.reactNativeType,
            reactType: draggedNode.reactType,
            sons: []
        })

        dispatch('setPhoneRenderJson', {
            ...phoneRenderJson
        })

    }

    /** 用于开启drop事件 */
    function onDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    function onPhoneElementClick(props: I_Nodes) {
        dispatch("setClickInfo", { ...props })
    }

    function parseRenderJson(data: I_Nodes, parentType?: string): ReactNode {
        // 需要把一些属性和react native同步
        const props = data.props;
        const sons = data.sons;
        const reactType = data.reactType
        // 如果父级是text children不能再使用div 改用span 才可以嵌套
        // if(parentType==='Text')
        return React.createElement(reactType, {
            ...props,
            onClick(e: any) {
                e.stopPropagation()
                onPhoneElementClick(data)
            },
            "data-id": data.id
        }, sons?.map(item => (
            <Fragment key={item.id}>
                {parseRenderJson(item, reactType)}
            </Fragment>
        )))
        // return (
        //     <div
        //         {...props}
        //         key={data.id}
        //         // 用于点击模拟器显示点击信息
        //         onClick={(e) => {
        //             e.stopPropagation()
        //             onPhoneElementClick(data)
        //         }}
        //         // 用于onDrop寻找落点
        //         data-id={data.id}
        //     >
        //         {
        //             (sons || []).map((item, index) => (
        //                 <Fragment key={item.id}>
        //                     {parseRenderJson(item, type === 'Text' ? 'Text' : undefined)}
        //                 </Fragment>
        //             ))
        //         }
        //     </div>
        // )
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