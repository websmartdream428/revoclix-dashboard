export const addValidation = (data: any) => {
  if (data.name === "") {
    return { valid: false, message: "Name field is required." };
  } else {
    return { valid: true, message: "" };
  }
};
