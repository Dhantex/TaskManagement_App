//ListOfTask.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../hooks/store";
import { fetchTasks, fetchCategories, fetchStatuses } from "../hooks/useTaskActions";
import { format } from 'date-fns';
import './ListOfTask.css';
import {UPDATE_STATUS_ID,API_BASE_URL} from '../../config'

import {
    Card,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableBody,
    Switch
} from "@tremor/react";

interface StatusTypeRequest {
    "genericTaskId": number,
    "statusTypeId": number
}

const ListGenericTask: React.FC = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const categories = useSelector((state: RootState) => state.tasks.categories);
    const [selectedCategory, setSelectedCategory] = useState<number | 0>(0);

    useEffect(() => {
        fetchTasks(dispatch);
        fetchCategories(dispatch);
        fetchStatuses(dispatch);
    }, [dispatch]);

    const handleSwitchChange = async (value: boolean, genericTaskId: number) => {

        const updatedTasks: StatusTypeRequest = {
            genericTaskId,
            statusTypeId: value ? 2 : 1
        };

        try {
            const response = await fetch(`${API_BASE_URL}${UPDATE_STATUS_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTasks),
            });

            const result = await response;

            if (result.status != 204) {
                console.log("Error:", result);
            }

        } catch (error) {
            console.error("Error:", error);
        } finally {
            fetchTasks(dispatch);
        }
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(parseInt(event.target.value, 10));
    };

    const filterDataByCategory = () => {
        return selectedCategory === 0 ? tasks : tasks.filter((item) => item.categoryId === selectedCategory);
    };


    return (
        <Card className="cardGenericTask">
            <div className="category-selector">
                <label htmlFor="category-select">Select a Category: </label>
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="0">All</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id.toString()}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <Table className="table-responsive striped-table">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell className="text-left">Name</TableHeaderCell>
                        <TableHeaderCell className="text-left">Description</TableHeaderCell>
                        <TableHeaderCell className="text-left">Category</TableHeaderCell>
                        <TableHeaderCell className="text-left">CreatedBy</TableHeaderCell>
                        <TableHeaderCell className="text-left">CreatedDate</TableHeaderCell>
                        <TableHeaderCell className="text-left">DueDate</TableHeaderCell>
                        <TableHeaderCell className="text-left">Status</TableHeaderCell>
                        <TableHeaderCell className="text-left">Is Completed?</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filterDataByCategory().map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell className="text-left">{item.nameGenericTask}</TableCell>
                            <TableCell className="text-left">{item.description}</TableCell>
                            <TableCell className="text-left">{item.nameCategory}</TableCell>
                            <TableCell className="text-left">{item.createdBy}</TableCell>
                            <TableCell>
                                {item.createdDate &&
                                    format(new Date(item.createdDate), 'dd/MM/yyyy HH:mm:ss')}
                            </TableCell>
                            <TableCell>
                                {item.dueDate &&
                                    format(new Date(item.dueDate), 'dd/MM/yyyy HH:mm:ss')}
                            </TableCell>
                            <TableCell className="text-left">{item.nameStatusType}</TableCell>
                            <TableCell className="text-left">
                                <Switch checked={item.nameStatusType === "Completed"} onChange={(e: boolean) => handleSwitchChange(e, item.id)} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};

export { ListGenericTask };