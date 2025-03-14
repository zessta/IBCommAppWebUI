import { baseUrl } from "../../utils/constants";
import { client } from "../client"
import { REGISTER } from "../endpoints";


export const inviteUser = async ({name, email, role, badgeId}:{name:string, email:string, role:string, badgeId:string}) => {
    const response = await client.post(`${baseUrl}${REGISTER}`,{fullName:name, email, role:role.toLowerCase(), badgeId});
    return response;
}