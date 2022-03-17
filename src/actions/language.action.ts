import axios from "axios";

export const getAllLanguage = async () => {
  try {
    const res = await axios.get("/lang/get");
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const addLanguage = () => {};
