import I_Node from "../modules/I_Node";

/**
 * 找到目标节点
 * @param id 
 * @param data 
 * @returns 
 */
export function findTarget(id: string, data: I_Node | string | number): I_Node | null {

    if (!isNode(data)) return null
    if (data.id === id) return data;
    if (!Array.isArray(data.children) || !data.children.length) return null;
    for (let i = 0; i < data.children.length; i++) {
        let find = findTarget(id, data.children[i]);
        if (find) return find;
    }
    return null;
}


export function isNode(value: any): value is I_Node {

    if (typeof value === 'object' && !Array.isArray(value) && value != null) {
        const keys = ['id', 'props', 'reactType', 'reactNativeType'];
        for (let i = 0; i < keys.length; i++) {
            if (!(keys[i] in value)) return false
        }
        return true
    }
    return false
}