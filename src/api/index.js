import axios from "axios"

export function createRequest(request) {
  return axios({
    method: request.method,
    url: process.env.REACT_APP_API_URL + request.url,
    data: request.data,
    headers: {
      "Accept": "application/json",
    },
  })
}