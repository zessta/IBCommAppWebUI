import { CREATEPASSWORD, EMAILCONFIRMATION } from "../../routes/routePaths";
import { baseUrl } from "../../utils/constants";
import { client } from "../client";
import { ALLUSERS, GETUSERMETRICS, GETUSERSFORROLE, REGISTER } from "../endpoints";

export const getUsers = async () => {
  const response = await client.get(`${baseUrl}${ALLUSERS}`);
  return response;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerUser = async ({newUser}:{newUser:any}) => {
    const response = await client.post(`${baseUrl}${REGISTER}`,newUser);
    return response;
}

export const isUserPasswordCreated = async ({token}:{token:string}) => {
  const response = await client.post(`${baseUrl}${EMAILCONFIRMATION}`, {token});
  return response;
}

export const createPassword = async ({token, newPassword}:{token:string, newPassword:string}) => {
  const response = await client.post(`${baseUrl}${CREATEPASSWORD}?Token=${token}&NewPassword=${newPassword}`);
  return response;
}

export const getUserMetrics = async () => {
  const response = await client.get(`${baseUrl}${GETUSERMETRICS}`);
  return response;
};

export const getUserForRole = async (rank:string) => {
  const response = await client.get(`${baseUrl}/policies/${rank}${GETUSERSFORROLE}`);
  return response;
};