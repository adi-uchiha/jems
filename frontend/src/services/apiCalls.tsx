import { DefaultGETRequest, DefaultPOSTRequest } from "./apiCallTemplates";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL as string;

export const POSTLoginUser = async (requestBody: object) => {
  return await DefaultPOSTRequest(`${BASE_URL}/authenticate/admin`, requestBody)
}

export const POSTRegisterUser = (requestBody: object) => {
  return DefaultPOSTRequest(`${BASE_URL}/users/registerUsers`, requestBody)
};


export const POSTGetToken = (requestBody: object) => {
  return DefaultPOSTRequest(`${BASE_URL}/users/activateaccount`, requestBody)
}

export const GETServiceTypes = () => {
  console.log("GETServiceTypes called")
  return DefaultGETRequest(`${BASE_URL}/categories/getServices/0`)
}

export const POSTAddServiceType = (requestBody: object) => {
  console.log("POSTAddServiceType called")
  return DefaultPOSTRequest(`${BASE_URL}/categories/insertServices`, requestBody)
}

export const POSTDeleteServiceType = () => {
  console.log("POSTDeleteServiceType called")
  // return DefaultPOSTRequest(`${BASE_URL}/categories/deleteServices`, requestBody)
}

export const POSTEditServiceType = (requestBody: object) => {
  console.log("POSTEditServiceType called")
  return DefaultPOSTRequest(`${BASE_URL}/categories/editService`, requestBody)
}