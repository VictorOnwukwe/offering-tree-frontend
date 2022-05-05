import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import SimpleReactValidator from "simple-react-validator";

const initialState: {
  validator: {
    value: SimpleReactValidator | null;
    watcher: number;
    for: Array<string> | null;
  };
} = { validator: { value: null, watcher: 0, for: null } };

export const appStore = createSlice({
  name: "appStore",
  initialState,
  reducers: {
    validate(
      state,
      action: PayloadAction<
        { value?: SimpleReactValidator; for?: Array<string> | null } | undefined
      >
    ) {
      return {
        ...state,
        validator: {
          ...state.validator,
          for: null,
          ...(action.payload ? action.payload : {}),
          watcher: state.validator.watcher + 1,
        },
      };
    },
  },
});

export const { validate } = appStore.actions;
