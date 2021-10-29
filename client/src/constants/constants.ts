export const DefaultStatus = {
  isFetching: false,
  isError: false,
  isSuccess: false,
  errorMessage: "",
};

// Returns all posts of a single user
export const DefaultAllFeedPosts = {
  id: 0,
  body: "",
  createdAt: "",
};

export const DefaultUserInfo = {
  user: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    imagePath: "",
    role: "",
    feedPosts: new Array<typeof DefaultAllFeedPosts>(),
  },
  exp: 0,
  iat: 0,
};

export const DefaultFeedPosts = {
  id: 0,
  imagePath: "",
  body: "",
  createdAt: "",
  author: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    imagePath: "",
    role: "",
  },
};

export const DefaultUserAllInfo = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  imagePath: "",
  role: "",
  feedPosts: new Array<typeof DefaultAllFeedPosts>(),
};
