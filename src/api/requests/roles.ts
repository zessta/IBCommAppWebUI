/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseUrl } from "../../utils/constants";
import { client } from "../client";
import { ALLROLES, CREATERANK, GETMODULEACTIONS } from "../endpoints";

export const getRoles = async () => {
    const response = await client.get(`${baseUrl}${ALLROLES}`);
    return response;
};

export const createRank = async (body:{rank:string, moduleActions:any[]}) => {
    const response = await client.post(`${baseUrl}${CREATERANK}/${body.rank}`, body.moduleActions);
    return response;
};

export const getModuleActions = async () => {
    const response = await client.get(`${baseUrl}${GETMODULEACTIONS}`);
    return response;
}