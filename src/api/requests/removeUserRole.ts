import { client } from "../client"
import { REMOVEUSERROLES } from "../endpoints"

export const removeUserRole = async ({userId, role}:{userId:number, role:string}) => {
    const response = await client.post(`${REMOVEUSERROLES}?userId=${userId}&role=${role}`);
    return response;
}