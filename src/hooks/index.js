import axios from 'axios'
import { useState, useEffect } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')
    const onChange = ({ target }) => setValue(target.value)
    const onReset = () => setValue('')

    return {
        type,
        value,
        onChange,
        onReset
    }
}

export const useResource = (url) => {
    const [source, setSource ] = useState(null)

    useEffect(() => {
        axios.get(url)
            .then(({data}) => {
                setSource(data)
            })
            .catch((e) => setSource(null))
    }, [url])

    const create = (obj) => {
        console.log(obj)
        axios
            .post(url, obj)
            .then(({data}) => setSource(source.concat(data)))
    }
    const service = {create}

    return [source, service]
}


//
// let token = null
//
// const setToken = newToken => {
//     token = `bearer ${newToken}`
// }
//
// const getAll = async () => {
//     const response = await axios.get(baseUrl)
//     return response.data
// }
//
// const create = async newObject => {
//     const config = {
//         headers: { Authorization: token },
//     }
//
//     const response = await axios.post(baseUrl, newObject, config)
//     return response.data
// }
//
// const update = async (id, newObject) => {
//     const response = await axios.put(`${ baseUrl }/${id}`, newObject)
//     return response.data
// }
//
// export default { getAll, create, update, setToken }