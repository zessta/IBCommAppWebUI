import { baseUrl } from "../../utils/constants";
import { client } from "../client";
import { ALLROLES } from "../endpoints";

export const getRoles = async () => {
    const response = await client.get(`${baseUrl}${ALLROLES}`);
    return response;
};

export const addRole = async (role: { name: string, description: string }) => {
    const response = await client.post(`${baseUrl}${ALLROLES}`, role);
    return response;
};