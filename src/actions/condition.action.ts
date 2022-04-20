import axios from "axios";
import { API_URL } from "config";

export const getAllCondition = async () => {
  try {
    const res = await axios.get(`${API_URL}/condition/get`);
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const addCondition = async (data: any) => {
  try {
    const res = await axios.post(`${API_URL}/condition/add`, data);
    console.log(res);
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const editCondition = async (id: any, data: any) => {
  try {
    const res = await axios.post(`${API_URL}/condition/edit`, { ...data, id });
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const removeCondition = async (condition_id: number) => {
  try {
    const res = await axios.post(`${API_URL}/condition/remove`, {
      condition_id,
    });
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};
