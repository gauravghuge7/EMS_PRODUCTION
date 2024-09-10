import { USER_ROLE, ROLE_LOOKUP } from "../constant.js";

export const compareRole = (role, symbol) => {
  return ROLE_LOOKUP[role] === symbol;
};
