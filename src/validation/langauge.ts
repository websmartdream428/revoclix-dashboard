export const addValidation = (editId: number, data: any) => {
  if (data.name === "") {
    return { valid: false, message: "Language name is required." };
  } else if (data.iso_code === "") {
    return { valid: false, message: "ISO code is required." };
  } else if (data.iso_code.length > 10 || data.iso_code.length < 2) {
    return {
      valid: false,
      message: "ISO code must be between 2 and 10 characters.",
    };
  } else if (data.code === "") {
    return { valid: false, message: "Language code is required." };
  } else if (data.code.length > 10 || data.code.length < 2) {
    return {
      valid: false,
      message: "Language code must be between 2 and 10 characters.",
    };
  } else if (data.date_format === "") {
    return { valid: false, message: "Date Formart is required." };
  } else if (data.date_format_full === "") {
    return { valid: false, message: "Date Format(full) is required." };
  } else if (data.file.length <= 0 && editId < 0) {
    return {
      valid: false,
      message: "Please select the flag image from your device.",
    };
  } else {
    return { valid: true, message: "" };
  }
};
