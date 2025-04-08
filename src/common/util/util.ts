import cookie from "js-cookie";

export const authJsonToken = (file?: boolean) => {
  const token = cookie.get("token");
  return {
    "Content-Type": file ? "multipart/form-data" : "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
};
