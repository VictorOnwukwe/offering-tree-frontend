import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { appStore } from "./app/app.store";

const rootReducer = combineReducers({
  app: appStore.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
