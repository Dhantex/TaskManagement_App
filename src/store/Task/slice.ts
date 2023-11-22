import { createSlice,PayloadAction } from "@reduxjs/toolkit";

export interface GenericTask {
    nameGenericTask: string;
    description: string;
    categoryId: number;
    statusTypeId: number;
    dueDate: string | null;
}

export interface StatusType {
    "genericTaskId": number,
    "statusTypeId": number
}

export interface Category{
    "id": number,
    "name": string
  }

export interface TaskWithId extends GenericTask {
    id: number;
    nameCategory: string;
    nameStatusType: string;
    createdDate: string;
    createdBy: string;
}

export interface TaskState {
    tasks: TaskWithId[];
    categories: CategoryResponse[];
    statuses: StatusType[];
}

const initialState: TaskState = {
    tasks: [] as TaskWithId[],
    categories: [] as Category[],
    statuses: [] as StatusType[]
};

export const genericTaskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<TaskWithId[]>) => {
            state.tasks = action.payload;
        },
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        },
        setStatuses: (state, action: PayloadAction<StatusType[]>) => {
            state.statuses = action.payload;
        },
    },
});

export const { setTasks, setCategories, setStatuses } = genericTaskSlice.actions;

export default genericTaskSlice.reducer;