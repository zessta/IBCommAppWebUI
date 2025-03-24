import { baseUrl } from "../../utils/constants";
import { client } from "../client";
import { ALLEVENTTAGS, CREATEEVENTTAGS, EVENTTAGS } from "../endpoints";

export const getEventTags = async () => {
  const response = await client.get(`${baseUrl}${ALLEVENTTAGS}`);
  return response;
};

export const addEventTag = async ({name, description}:{name: string, description:string}) => {
  const response = await client.post(`${baseUrl}/${CREATEEVENTTAGS}`, { name, description });
  return response;
};

export const addTagStatus = async ({eventTagId, status}:{eventTagId: string, status:string}) => {
  const response = await client.post(`${baseUrl}${EVENTTAGS}/${eventTagId}//statuses`, { statusName: status });
  return response;
}

export const getEventTagById = async (eventTagId: string) => {
  const response = await client.get(`${baseUrl}${EVENTTAGS}/${eventTagId}`);
  return response;
}

export const removeTagStatus = async (statusId: string) => {
  const response = await client.delete(`${baseUrl}${EVENTTAGS}/statuses/${statusId}`);
  return response;
}