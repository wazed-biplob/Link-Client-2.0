import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imgURL: "",
  email: "",
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
  },
});

export const { setImgURL, setEmail } = userSlice.actions;

export default userSlice.reducer;
