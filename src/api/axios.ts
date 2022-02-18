import axios from "axios";

const axiosGet = async (url: string, parameters?: object) => {
  const res = await axios.get(`http://localhost:8080/${url}`, {
    params: parameters
  });
  return res.data
}

const axiosPost = async (url: string, body?: object) => {
  const res = await axios.post(`http://localhost:8080/${url}`, body);
  return res.data
}  

export { axiosGet, axiosPost };
