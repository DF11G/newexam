import Axios from 'axios'
import * as ResultEnum from '../enum/ResultEnum'
import { message } from 'antd';

export function failedProcess(code, history, msg) {
    switch (code) {
        case ResultEnum.NEED_TO_LOGIN:
            history.push('/login');
            break;
        default:
            message.error(msg)
            break;
    }
}

export function ajaxProcess(ajaxMethod, method, history) {
    ajaxMethod.then((res) => {
        let code = res.data.code;
        if (code === ResultEnum.SUCCESS) {
            method(res)
        } else {
            failedProcess(code, history, res.data.msg)
        }
    }).catch((err) => {
        console.error(err)
        alert('未知错误')
    })
}

export function POST(url, data, method, history) {
    ajaxProcess(Axios.post(url, data), method, history)
}

export function PUT(url, data, method, history) {
    ajaxProcess(Axios.put(url, data), method, history)
}

export function GET(url, method, history) {
    ajaxProcess(Axios.get(url), method, history)
}

export function DELETE(url, method, history) {
    ajaxProcess(Axios.delete(url), method, history)
}