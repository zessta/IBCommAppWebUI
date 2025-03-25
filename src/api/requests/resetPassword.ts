import { baseUrl } from "../../utils/constants";
import { client } from "../client";
import { SENDRESETLINK, VERIFYRESETTOKEN } from "../endpoints";

export const sendResetPasswordEmail = async ({email}:{email:string}) => {
    const response = await client.post(`${baseUrl}${SENDRESETLINK}`, {email});
    return response
}

export const updatePasswordApi = async ({token, newPassword}:{token:string, newPassword:string}) => {
    const response = await client.post(`${baseUrl}${VERIFYRESETTOKEN}`,{token, newPassword});
    return response;
}