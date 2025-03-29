/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseUrl } from "../../utils/constants";
import { client } from "../client";
import { ALLROLES, CREATEROLE, GETMODULEACTIONS } from "../endpoints";

export const getRoles = async () => {
  const response = await client.get(`${baseUrl}${ALLROLES}`);
  return response;
};

export const createRole = async (body: {
  rank: string;
  moduleActions: any[];
}) => {
  const response = await client.post(
    `${baseUrl}${CREATEROLE}/${body.rank}`,
    body.moduleActions
  );
  return response;
};

export const getModuleActions = async () => {
  const response = await client.get(`${baseUrl}${GETMODULEACTIONS}`);
  return response;
};
