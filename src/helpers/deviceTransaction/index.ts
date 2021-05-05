import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const blockchainAxiosConfig: AxiosRequestConfig = {
  baseURL: process.env.BLOCKCHAIN_HOST,
  timeout: 10000,
  timeoutErrorMessage: "Blockchain request time exceeded",
  headers: {
    "x-api-token": `${process.env.API_TOKEN}`,
  },
};

const blockchainInstance: AxiosInstance = axios.create(blockchainAxiosConfig);

export const createDeviceTransaction = async (
  sender: string,
  receiver: string,
  inventory1: string,
  inventory2: string,
  device: string,
  date: string
) => {
  try {
    const response = await blockchainInstance.post("/api/device", {
      sender,
      receiver,
      inventory1,
      inventory2,
      device,
      date,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getBcDeviceTransactionSvc = async (id: string) => {
  try {
    const response = await blockchainInstance.get(`/api/device/${id}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};
