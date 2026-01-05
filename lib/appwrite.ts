import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  platform: "com.md.foodorderin",
  databaseId: "6956b7cf0010b5196d19",
  userCollectionId: "6958f8ab00279c1dd3b4",
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async ({
  email,
  password,
  name,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw new Error("Failed to create account");

    // await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name).toString();

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      newAccount.$id,
      { email, name, avatar: avatarUrl }
    );
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    try {
      await account.deleteSession("current");
    } catch {
      // No active session, proceed
    }
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
