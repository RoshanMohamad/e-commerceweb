import { Client,Databases,Account } from 'appwrite';

export const PROJECT_ID = '681e166d001d64296582'
export const DATABASE_ID= '681e189b0024f2fe4f2c'
export const COLLECTION_ID_MESSAGE= '681e18c0003c117d47d3'

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('681e166d001d64296582')

    export const account = new Account(client)
    export const databases = new Databases(client);

export default client