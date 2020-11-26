import { enums } from '.././Enum/Enum'
import Axios from 'axios'
import { message } from 'antd'

export function show(index) {
    if (index === 101) {
        message.success(enums.get(index));
        return true
    } else {
        message.error(enums.get(index))
        return false
    }
}

export function POST(url, data, method) {
    Axios.post(url, data).then((res) => {
        if (show(res.data.code)) {
            method(res)
        }
    }).catch((err) => {
        console.error(err)
        alert('未知错误')
    })
}

export function PUT(url, data, method) {
    Axios.put(url, data).then((res) => {
        if (show(res.data.code)) {
            method(res)
        }
    }).catch((err) => {
        console.error(err)
        alert('未知错误')
    })
}

export function GET(url, method) {
    Axios.get(url).then((res) => {
        if (show(res.data.code)) {
            method(res)
        }
    }).catch((err) => {
        console.error(err)
        alert('未知错误')
    })
}

export function DELETE(url, method) {
    Axios.delete(url).then((res) => {
        if (show(res.data.code)) {
            method(res)
        }
    }).catch((err) => {
        console.error(err)
        alert('未知错误')
    })
}