import { configureStore } from "@reduxjs/toolkit";
import genericTaskSlice from "./Task/slice";

export const store = configureStore({
    reducer: {
        tasks: genericTaskSlice
    },
});