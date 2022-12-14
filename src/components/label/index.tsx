import { useContext } from 'react'
import { GLOBAL } from '../../App';
import I_Node from '../../modules/I_Node';
import './index.css';
export default function Label(props: LabelProps) {

    const { dispatch } = useContext(GLOBAL)
    function onDragStart() {
        // 将拖拽信息添加到缓存
        dispatch('setDraggedNode', {
            ...props
        })
    }

    function onDragEnd() {
        // 将拖拽信息从缓存移除
        dispatch('setDraggedNode', {
            id: '',
            reactNativeType: '',
            reactType: '',
            props: {},
            parentId: '',
            children: [],
            leftSablingId: '',
            rightSablingId: '',
        })
    }

    function onLabelClick() {
        dispatch("setClickInfo", {
            ...props
        })
    }

    return (
        <div
            id={props.id}
            draggable
            className='label_container'
            onClick={onLabelClick}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >{props.name}</div>
    )
}

type LabelProps = I_Node