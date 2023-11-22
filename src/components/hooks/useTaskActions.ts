import { Dispatch } from "redux";
import { setTasks, setCategories, setStatuses } from "../../store/Task/slice";

export const fetchTasks = (dispatch: Dispatch<any>) => {
    const API_URL = "https://localhost:7227/api/v1/GenericTask/details/all";

    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            dispatch(setTasks(data));
        })
        .catch((error) => console.error("Error fetching tasks:", error));
};

export const fetchCategories = (dispatch: Dispatch<any>) => {
    fetch("https://localhost:7227/api/v1/Category")
        .then((response) => response.json())
        .then((data) => {
            dispatch(setCategories(data));
        })
        .catch((error) => console.error("Error fetching categories:", error));
};

export const fetchStatuses = (dispatch: Dispatch<any>) => {
    fetch("https://localhost:7227/api/v1/StatusType")
        .then((response) => response.json())
        .then((data) => {
            dispatch(setStatuses(data));
        })
        .catch((error) => console.error("Error fetching statuses:", error));
};