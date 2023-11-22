import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface GenericTask {
    nameGenericTask: string;
    description: string;
    categoryId: number;
    statusTypeId: number;
    dueDate: string | null;
}

export interface TaskWithId extends GenericTask {
    id: number
}

export interface GenericTaskDto extends GenericTask {
    nameCategory: string;
    nameStatusType: string;
    createdDate: string;
    createdBy: string;
}

const initialState: TaskWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	return persistedState ? JSON.parse(persistedState).GenericTaskDto : [];
})();

export const genericTask = createSlice({
	name: "Tasks",
	initialState,
	reducers: {},
});

export default genericTask.reducer;