import { baseUrl } from "../../utils/constants";
import { client } from "../client";
import { USERSNROLES } from "../endpoints";

export const getUsers = async () => {
  const response = await client.get(`${baseUrl}${USERSNROLES}`);
  return response;
};
