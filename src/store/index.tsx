import { createStore } from "redux"

import reducer from "./reducer"
import { DataType, actionObject } from "./action"

export default createStore<DataType, actionObject, unknown, unknown>(reducer)
