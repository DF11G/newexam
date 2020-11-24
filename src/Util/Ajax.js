import { enums } from '.././Enum/Enum'
import Axios from 'axios'

export function show(index) {
    alert(enums.get(index))
}

export function POST(url, data, method) {
    Axios.post(url, data).then((res) => {
        show(res.data.code)
        method()
    }).catch((err) => {
        console.error(err)
        alert('未知错误')
    })
}

export function PUT(url, data, method) {
    Axios.put(url, data).then((res) => {
        show(res.data.code)
        method()
    }).catch((err) => {
        console.error(err)
        alert('未知错误')
    })
}

export function GET(url, method) {
    Axios.get(url).then((res) => {
        show(res.data.code)
        method()
    }).catch((err) => {
        console.error(err)
        alert('未知错误')
    })
}

export function DELETE(url, method) {
    Axios.delete(url).then((res) => {
        show(res.data.code)
        method()
    }).catch((err) => {
        console.error(err)
        alert('未知错误')
    })
}