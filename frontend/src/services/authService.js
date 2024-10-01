import axios from 'axios';

const API_ENDPOINT_URL = import.meta.env.VITE_API_ENDPOINT_URL;

export const registerUser = async (name, email, password, confirmPassword) => {
  return axios.post(`${API_ENDPOINT_URL}/user`, {
    name,
    email,
    password,
    confirmPassword,
  });
}

export const loginUser = async (email, password) => {
  return axios.post(`${API_ENDPOINT_URL}/user/access-token`, {
    email,
    password,
  });
}
