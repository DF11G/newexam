import { GET_USER_INF, LOG_OUT } from './ActionType'

const dataState = {
    name: null,//登录用户姓名
    type: null,//登录用户类型
}

export default (state = dataState, action) => {
    if (action.type === GET_USER_INF) { // 登录获取用户名 更改登录状态
        const newState = JSON.parse(JSON.stringify(state))
        newState.name = action.userInfo.name
        newState.type = action.userInfo.type
        return newState
    } else if (action.type === LOG_OUT) { // 登出修改用户状态
        const newState = JSON.parse('{}')
        newState.name = null
        newState.name = null
        return newState
    }
    return state
}