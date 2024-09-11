import axios from "axios"

const axiosUri = axios.create({
    // baseURL: "http://localhost:3000",
    // baseURL: "http://192.168.0.100:3000",
    baseURL: "https://sge-reg.vercel.app",
    withCredentials: true
})

function UseAxios() {
  return axiosUri
}

export default UseAxios