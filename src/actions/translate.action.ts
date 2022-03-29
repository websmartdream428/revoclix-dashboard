import axios from "axios";
import { API_URL } from "config";

export const getAllTranslate = async () => {
  try {
    const res = await axios.get(`${API_URL}/translate/get`);
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const addTranslate = async (data: any) => {
  try {
    const res = await axios.post(`${API_URL}/translate/add`, data);
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const editTranslate = async (id: any, data: any) => {
  try {
    const res = await axios.post(`${API_URL}/translate/edit`, { ...data, id });
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const removeTranslate = async (id: number) => {
  try {
    const res = await axios.post(`${API_URL}/translate/remove`, { id });
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};
