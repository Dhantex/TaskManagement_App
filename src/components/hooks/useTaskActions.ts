//useTaskActions.ts
import { Dispatch } from "redux";
import { setTasks, setCategories, setStatuses } from "../../store/Task/slice";
import { API_BASE_URL, TASK_DETAILS, CATEGORIES, STATUSES } from "../../config";

export const fetchTasks = async (dispatch: Dispatch) => {
    try {
        const response = await fetch(`${API_BASE_URL}${TASK_DETAILS}`);
        if (!response.ok) {
            throw new Error('Error fetching tasks');
        }
        const data = await response.json();
        dispatch(setTasks(data));
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
};

export const fetchCategories = async (dispatch: Dispatch) => {
    try {
        const response = await fetch(`${API_BASE_URL}${CATEGORIES}`);
        if (!response.ok) {
            throw new Error('Error fetching categories');
        }
        const data = await response.json();
        dispatch(setCategories(data));
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};

export const fetchStatuses = async (dispatch: Dispatch) => {
    try {
        const response = await fetch(`${API_BASE_URL}${STATUSES}`);
        if (!response.ok) {
            throw new Error('Error fetching statuses');
        }
        const data = await response.json();
        dispatch(setStatuses(data));
    } catch (error) {
        console.error("Error fetching statuses:", error);
    }
};
