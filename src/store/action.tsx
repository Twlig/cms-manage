export enum actionsType {
    ADD_KEY = "ADD_KEY",
}
export type DataType = {
    myKey: number
}
export type actionObject = {
    type: string
    data?: DataType
}
/*
 * action 创建函数
 */

export function addKey() {
    return { type: actionsType.ADD_KEY }
}
