import React, { HTMLAttributes } from "react"
import { I_DispathType } from "./I_DispathType"
import I_Nodes from "./I_Nodes"

export type I_PhoneState = {
    store: {
        /**
         * 点击信息
         */
        clickInfo: I_Nodes,
        draggedNode: I_Nodes,
        phoneRenderJson: I_Nodes,
        initBaseComponents: I_Nodes[]

    }
    dispatch: <T extends I_Nodes>(type: I_DispathType, value: T | T[]) => void
}
