export const DefaultStatus = {
  isFetching: false,
  isError: false,
  isSuccess: false,
  errorMessage: "",
};

export const DefaultUserInfo = {
  user: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    imagePath: "",
    role: "",
  },
  exp: 0,
  iat: 0,
};

export const DefaultFeedPosts = {
  body: "",
  author: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    imagePath: "",
    role: "",
  },
};
