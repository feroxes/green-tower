export type LoginOrRegistrationResponseType = {
  body: {
    accessToken: string;
  };
  user: {
    id: string;
  };
};

export type LoginOrRegistrationResponseBodyType = {
  accessToken: string;
};
