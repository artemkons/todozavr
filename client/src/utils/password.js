import md5 from "md5";

let salt = "solb";

export const createHash = (password) => {
  let hash = md5(password + salt);
  return salt + hash;
};
