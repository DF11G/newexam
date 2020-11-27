import Axios from 'axios'
import {SUCCESS, NEED_TO_LOGIN} from '../enum/ResultEnum'


export function failedProcess(code, history) {
    switch (code) {
        case NEED_TO_LOGIN:
            history.push('/login');
            break;
        default:
            // 同一的处理
            break;
    }
}

export function ajaxProcess(ajaxMethod, method, history) {
    ajaxMethod.then((res) => {
        let code = res.data.code;
        if (code === SUCCESS) {
            method(res)
        } else {
            failedProcess(code, history)
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