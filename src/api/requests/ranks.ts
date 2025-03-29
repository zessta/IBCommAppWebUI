import { baseUrl } from "../../utils/constants";
import { client } from "../client";
import { CREATERANK, GETALLRANKUSERS, REMOVERANK, REMOVERANKFROMUSER } from "../endpoints";

export const createRank = async (rankName: string) => {
  const response = await client.post(`${baseUrl}${CREATERANK}`, { rankName });
  return response;
};

export const getAllRanks = async () => {
    const response = await client.get(`${baseUrl}${GETALLRANKUSERS}`);
    return response;
}

export const getUsersByRankId = async (rankId:number) => {
    const response = await client.get(`${baseUrl}${GETALLRANKUSERS}/${rankId}`);
    return response;
}

export const removeRankFromUser = async (userId:number) => {
    const response = await client.delete(`${baseUrl}${REMOVERANKFROMUSER}/${userId}`);
    return response;
}

export const removeRank = async (rankId:number) => {
    const response = await client.delete(`${baseUrl}${REMOVERANK}/${rankId}`);
    return response;
}