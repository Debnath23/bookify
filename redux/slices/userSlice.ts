import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  userId: string;
  name: string;
  email: string;
}

const initialState: UserInfo = {
  userId: "",
  name: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      return action.payload;
    },
    clearUserInfo: () => initialState,
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
