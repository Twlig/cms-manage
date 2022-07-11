import { actionsType, DataType, actionObject } from "./action"

const defaultState: DataType = {
    myKey: 3,
}

const reducer = (preState = defaultState, action: actionObject) => {
    const { type, data } = action
    switch (type) {
        case actionsType.ADD_KEY:
            return Object.assign({}, preState, { myKey: ++preState.myKey })
        default:
            return preState
    }
}
export default reducer
