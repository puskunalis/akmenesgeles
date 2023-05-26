import axios from "axios";

export function axiosGet(url: string) {
    const response = axios
    .get(url, { validateStatus: function (status) {
        return status >= 200 && status < 500;
    } })
    .then((res) => (
        {
        status: res.status,
        data: res.data
        }
        ))
    .catch((err) => console.log(err));
    return response;
}

export function axiosPut(url: string, data: any) {
    const response = axios
    .put(url, data, { validateStatus: function (status) {
        return status >= 200 && status < 500;
    } })
    .then((res) => (
        {
        status: res.status,
        data: res.data
        }
        ))
    .catch((err) => console.log(err));
    return response;
}

export function axiosPost(url: string, data: any) {
    const response = axios
    .post(url, data, { validateStatus: function (status) {
        return status >= 200 && status < 500;
    } })
    .then((res) => (
        {
        status: res.status,
        data: res.data
        }
        ))
    .catch((err) => console.log(err));
    return response;
}

export function axiosDelete(url: string) {
    const response = axios
    .delete(url, { validateStatus: function (status) {
        return status >= 200 && status < 500;
    } })
    .then((res) => (
        {
        status: res.status,
        data: res.data
        }
        ))
    .catch((err) => console.log(err));
    return response;
}

export function axiosPatch(url: string) {
    const response = axios
    .patch(url, undefined, { validateStatus: function (status) {
        return status >= 200 && status < 500;
    } })
    .then((res) => (
        {
        status: res.status,
        data: res.data
        }
        ))
    .catch((err) => console.log(err));
    return response;
}