import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Login, User, UserState } from "@/@types";
import userService from "./user.service";

const initialState: UserState = {
  isLoading: null,
  isSuccess: false,
  isAuthenticated: false,
  isError: false,
  message: "",
  user: null,
};

export const register = createAsyncThunk<
  { success: boolean; user: User },
  User,
  { rejectValue: string }
>("user/register", async (user: User, thunkApi) => {
  try {
    return await userService.register(user);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkApi.rejectWithValue(message);
  }
});

export const login = createAsyncThunk<
  { success: boolean; user: User },
  Login,
  { rejectValue: string }
>("user/login", async (user: Login, thunkApi) => {
  try {
    return await userService.login(user);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkApi.rejectWithValue(message);
  }
});

export const loadUser = createAsyncThunk<
  { success: boolean; user: User },
  void,
  { rejectValue: string }
>("user/loadUser", async (_, thunkApi) => {
  try {
    return await userService.loadUser();
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkApi.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk<
  { success: boolean; message: string },
  void,
  { rejectValue: string }
>("user/logout", async (_, thunkApi) => {
  try {
    return await userService.logout();
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkApi.rejectWithValue(message);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = null;
      state.isSuccess = false;
      state.isAuthenticated = false;
      state.isError = false;
      state.message = "";
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isAuthenticated = true;
      state.isError = false;
      state.message = "";
      state.user = action.payload.user;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isAuthenticated = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isAuthenticated = true;
      state.isError = false;
      state.message = "";
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isAuthenticated = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    });
    builder.addCase(loadUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isAuthenticated = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    });
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isAuthenticated = false;
      state.isError = false;
      state.message = action.payload.message;
      state.user = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
