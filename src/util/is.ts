/**
 * 约定 组件区id： __字母__
 * @param id 
 * @returns 
 */
export function isBaseComponent(id: string) {
    const regexp = /^__\w+__$/g
    return regexp.test(id);
}

/**
 * 约定 模拟器id: $$数字$$
 * @param id 
 * @returns 
 */
export function isPhoneRenderComponent(id: string) {
    const regexp = /^\$\$\d+\$\$$/g
    return regexp.test(id);
}