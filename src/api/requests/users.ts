import { baseUrl } from "../../utils/constants";
import { client } from "../client";
import { ALLUSERS, REGISTER } from "../endpoints";

export const getUsers = async () => {
  const response = await client.get(`${baseUrl}${ALLUSERS}`);
  return response;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerUser = async ({newUser}:{newUser:any}) => {
    const response = await client.post(`${baseUrl}${REGISTER}`,newUser);
    return response;
}