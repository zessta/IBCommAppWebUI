import { baseUrl } from "../../utils/constants";
import { client } from "../client";
import { CREATERANK, GETALLRANKUSERS } from "../endpoints";

export const createRank = async (rankName: string) => {
  const response = await client.post(`${baseUrl}${CREATERANK}`, { rankName });
  return response;
};

export const getAllRanks = async () => {
    const response = await client.get(`${baseUrl}${GETALLRANKUSERS}`);
    return response;
}