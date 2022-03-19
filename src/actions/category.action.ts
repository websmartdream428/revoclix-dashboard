import axios from "axios";
import { API_URL } from "config";

export const getAllCategory = async () => {
  try {
    const res = await axios.get(`${API_URL}/category/get`);
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};
