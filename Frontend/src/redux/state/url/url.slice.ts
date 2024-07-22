import { Url, UrlState } from "@/@types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import urlService from "./url.service";

const initialState: UrlState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  urls: [],
  lastUrl: null,
  message: null,
};

export const createUrl = createAsyncThunk<
  { success: boolean; url: Url },
  Url,
  { rejectValue: string }
>("url/createUrl", async (url: Url, thunkApi) => {
  try {
    return await urlService.createUrl(url);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkApi.rejectWithValue(message);
  }
});

export const getAllUrls = createAsyncThunk<
  { success: boolean; urls: Url[] },
  void,
  { rejectValue: string }
>("url/getAllUrls", async (_, thunkApi) => {
  try {
    return await urlService.getAllUrls();
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkApi.rejectWithValue(message);
  }
});

export const updateUrl = createAsyncThunk<
  { success: boolean; url: Url },
  Url,
  { rejectValue: string }
>("url/updateUrl", async (url: Url, thunkApi) => {
  try {
    return await urlService.updateUrl(url);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkApi.rejectWithValue(message);
  }
});

export const removeUrl = createAsyncThunk<
  { success: boolean; message: string; idurl: string },
  string,
  { rejectValue: string }
>("url/removeUrl", async (url, thunkApi) => {
  try {
    return await urlService.removeUrl(url);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkApi.rejectWithValue(message);
  }
});

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.lastUrl = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUrl.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createUrl.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.urls = [...state.urls, action.payload.url];
      state.lastUrl = action.payload.url;
      state.message = null;
    });
    builder.addCase(createUrl.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(getAllUrls.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUrls.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.urls = action.payload.urls;
    });
    builder.addCase(getAllUrls.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(removeUrl.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeUrl.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.urls = state.urls.filter((url) => url._id !== action.payload.idurl);
      state.message = action.payload.message;
    });
    builder.addCase(removeUrl.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(updateUrl.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUrl.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.urls = state.urls.map((url) =>
        url._id === action.payload.url._id ? action.payload.url : url
      );
      state.message = null;
    });
    builder.addCase(updateUrl.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = urlSlice.actions;

export default urlSlice.reducer;
