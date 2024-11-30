import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  imgURL: string;
  email: string;
  userId: string;
}

const initialState: IUser = {
  imgURL: "",
  email: "",
  userId: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setImgURL: (state, action) => {
      state.imgURL = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setImgURL, setEmail, setUserId } = userSlice.actions;

export default userSlice.reducer;
