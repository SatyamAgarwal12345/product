import axios from "axios";

const API_URL = "https://dummyjson.com/products";

export const fetchProducts = async (limit = 10, skip = 0) => {
  return await axios.get(`${API_URL}?limit=${limit}&skip=${skip}`);
};

export const fetchProductById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};
