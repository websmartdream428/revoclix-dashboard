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

export const addCategory = async (data: any) => {
  let formData = new FormData();
  formData.append("name", data.name);
  formData.append("id_lang", data.id_lang);
  formData.append("active", data.active);
  formData.append("id_parent", data.id_parent);
  formData.append("level_depth", data.level_depth);
  formData.append("iconFamily", data.iconFamily);
  formData.append("backgroundColor", data.backgroundColor);
  formData.append("color", data.color);
  formData.append("description", data.description);
  formData.append("url_rewriting", data.url_rewriting);
  formData.append("meta_title", data.meta_title);
  formData.append("meta_keywords", data.meta_keywords);
  formData.append("meta_description", data.meta_description);
  formData.append("icon", data.icon);
  // formData.append("file", data.file[0]);

  try {
    const res = await axios.post(`${API_URL}/category/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const editCategory = async (id: any, data: any) => {
  let formData;
  // if (data.flag_updated) {
  //   formData = new FormData();
  //   formData.append("id", id);
  //   formData.append("name", data.name);
  //   formData.append("id_lang", data.id_lang);
  //   formData.append("active", data.active);
  //   formData.append("id_parent", data.id_parent);
  //   formData.append("level_depth", data.level_depth);
  //   formData.append("iconFamily", data.iconFamily);
  //   formData.append("backgroundColor", data.backgroundColor);
  //   formData.append("color", data.color);
  //   formData.append("description", data.description);
  //   formData.append("url_rewriting", data.url_rewriting);
  //   formData.append("meta_title", data.meta_title);
  //   formData.append("meta_keywords", data.meta_keywords);
  //   formData.append("meta_description", data.meta_description);
  //   formData.append("icon", data.icon);
  //   // formData.append("flag_updated", data.flag_updated);
  //   // formData.append("file", data.file[0]);
  //   try {
  //     const res = await axios.post(`${API_URL}/category/edit`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     return res.data;
  //   } catch (err: any) {
  //     return err.response.data;
  //   }
  // } else {
  formData = {
    ...data,
    id,
  };
  try {
    const res = await axios.post(`${API_URL}/category/edit`, formData);
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
  // }
};

export const removeCategory = async (category_id: number) => {
  try {
    const res = await axios.post(`${API_URL}/category/remove`, { category_id });
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};
