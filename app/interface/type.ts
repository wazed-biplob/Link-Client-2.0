export interface IPost {
  _id: string;
  userId: string;
  postHeading: string;
  postContent: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  imgURL: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// export interface UserLoginAuth {
//   success: boolean;
//   message: string;
//   data: User;
// }
