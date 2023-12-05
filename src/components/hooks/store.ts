//store.ts
import { configureStore } from "@reduxjs/toolkit";
import genericTaskReducer from "../../store/Task/slice";

export const store = configureStore({
    reducer: {
        tasks: genericTaskReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;