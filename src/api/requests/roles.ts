import { baseUrl } from "../../utils/constants";
import { client } from "../client";
import { ROLES } from "../endpoints";

export const getRoles = async () => {
    const response = await client.get(`${baseUrl}${ROLES}`);
    return response;
};

export const addRole = async (role: { name: string, description: string }) => {
    const response = await client.post(`${baseUrl}${ROLES}`, role);
    return response;
};