import { Client, Databases, Storage as AppwriteStorage } from "node-appwrite";

const APPWRITE_PROJECT_ID = "66ac3178000ea35e28d7";
const APPWRITE_KEY =
    "fa1a4d192dc3c4dd3a8b0604f20518168793e739ad129167aaa19f31a4afb4b771635a0eed04d4060eb98159c0caaa6feb374f3ec5914bd4cbf6adc098b20fdd1903529e0a55098d5e5791326d0c6d7bfba87620bfbcb4f565f5d43caf5259288ae880c4b50d380dea1b20df9722e6ee882a476ba580d6ff1de12109de29ee91";
const APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1";

const appwriteClient = new Client();
appwriteClient
    .setProject(APPWRITE_PROJECT_ID)
    .setEndpoint(APPWRITE_ENDPOINT)
    .setKey(APPWRITE_KEY);

export const database = new Databases(appwriteClient);
export const storage = new AppwriteStorage(appwriteClient);
