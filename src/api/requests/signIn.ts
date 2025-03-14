import { baseUrl } from "../../utils/constants"
import { client } from "../client"
import { LOGIN } from "../endpoints"


export const signInApi = async ({email, password}: {email: string, password: string}) => {
    const response = await client.post(`${baseUrl}${LOGIN}`, { email, password });
    return response;
}