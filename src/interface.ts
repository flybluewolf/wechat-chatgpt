import { ChatGPTConversation, ChatGPTAPI } from "chatgpt";
export interface AccountWithUserInfo {
  password: string;
  email: string;
}
export interface AccountWithSessionToken {
  session_token: string;
}

export interface OpenAIAuthOptions {
  sessionToken: string,
  clearanceToken: string,
  userAgent: string,
  apiBaseUrl?: string,
  backendApiBaseUrl?: string,
  accessTokenTTL?: number,
  accessToken?: string,
  heaaders?: any,
  debug?: boolean,
}

export interface AccountWithOpenAIAuth {
  openAIAuth: OpenAIAuthOptions;
}
export const isAccountWithUserInfo = (
  account: IAccount
): account is AccountWithUserInfo => {
  return (
    !!(account as AccountWithUserInfo).email &&
    !!(account as AccountWithUserInfo).password
  );
};
// export const isAccountWithSessionToken = (
//   account: IAccount
// ): account is AccountWithSessionToken => {
//   return !!(account as AccountWithSessionToken).session_token;
// };

export const isAccountWithOpenAIAuth = (
  account: IAccount
): account is AccountWithOpenAIAuth => {
  return !!(account as AccountWithOpenAIAuth).openAIAuth;
};

// Account will be one in the session token or email and password
export type IAccount = AccountWithUserInfo | AccountWithOpenAIAuth;

export interface IChatGPTItem {
  chatGpt: ChatGPTAPI;
  account: IAccount;
}
export interface IConversationItem {
  conversation: ChatGPTConversation;
  account: IAccount;
}

export interface IConfig {
  chatGPTAccountPool: IAccount[];
  chatGptRetryTimes: number;
  chatPrivateTiggerKeyword: string;
  openAIProxy?: string;
  clearanceToken: string;
  userAgent: string;
}
