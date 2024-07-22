import { configureStore } from "@reduxjs/toolkit";
import { UrlState, UserState } from "@/@types";
import userReducer from "./state/user/user.slice";
import urlReducer from "./state/url/url.slice";
export interface AppStore {
  user: UserState;
  url: UrlState;
}

const store = configureStore<AppStore>({
  reducer: {
    user: userReducer,
    url: urlReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
