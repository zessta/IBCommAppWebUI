import { baseUrl } from "../../utils/constants";
import { client } from "../client";
import { GETDASHBOARDTAGDATA } from "../endpoints";

export const getTagDataForDashboard = async () => {
  const response = await client.get(`${baseUrl}${GETDASHBOARDTAGDATA}`);
  return response;
};
