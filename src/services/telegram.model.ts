enum Status {}

export type UserType = {
  chatId: number;
  first_name: string;
  language_code: string;
  username: string;
  params: LinkParamsType[];
  status: Status;
};

export type BotType = {
  firstName: string;
  username: string;
  banner: banner[];
  pushBanner: pushBanner[];
  users: UserType[];
};

export type banner = {
  appUrl: string;
  imageUrl: string;
  textUrl: string;
  buttonText: string;
  language: string;
};

export type pushBanner = {
  appUrl: string;
  imageUrl: string;
  textUrl: string;
  buttonText: string;
  language: string;
  status: Status;
};

export type LinkParamsType = {
  key: string;
  params: string;
  botUserName: string;
};
