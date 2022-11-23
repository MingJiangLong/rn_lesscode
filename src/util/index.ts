import I_Nodes from "../modules/I_Nodes";

/**
 * 找到目标节点
 * @param id 
 * @param data 
 * @returns 
 */
export function findTarget(id: string, data: I_Nodes): I_Nodes | null {
    if (data.id === id) return data;
    if (!Array.isArray(data.sons) || !data.sons.length) return null;
    for (let i = 0; i < data.sons.length; i++) {
        let find = findTarget(id, data.sons[i]);
        if (find) return find;
    }
    return null;
}