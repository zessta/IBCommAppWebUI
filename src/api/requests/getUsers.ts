import { baseUrl } from "../../utils/constants";
import { client } from "../client";
import { ALLUSERS } from "../endpoints";

export const getUsers = async () => {
  const response = await client.get(`${baseUrl}${ALLUSERS}`);
  return response;
};
