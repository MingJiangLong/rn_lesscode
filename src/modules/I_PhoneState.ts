import { I_DispathType } from "./I_DispathType"
import I_Node from "./I_Node"

export type I_PhoneState = {
    store: {

        /** 点击信息 */
        clickInfo: I_Node,

        /** 拖拽信息 */
        draggedNode: I_Node,
        phoneRenderJson: I_Node,
        /** 基础组件信息 */
        initBaseComponents: I_Node[],
    }
    dispatch: <T extends I_Node>(type: I_DispathType, value: T | T[]) => void
}
