import { GET_USER_INF, LOG_OUT } from './ActionType'


export const handleGetUserInfAction = (userInfo, value) => {
    return {
        type: GET_USER_INF,
        userInfo,
        value
    }
}
export const handleUserLogout = () => {
    return {
        type: LOG_OUT
    }
}