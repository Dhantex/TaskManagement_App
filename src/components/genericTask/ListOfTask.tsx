import { fetchDataGenericTask } from "../../Request/requestServiceApi"
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import './ListOfTask.css'

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

interface ApiResponse {
    id: number;
    nameGenericTask: string;
    description: string;
    categoryId: number;
    nameCategory: string;
    statusTypeId: number;
    nameStatusType: string;
    createdDate: string;
    dueDate: string | null;
    createdBy: string;
}

interface StatusTypeRequest {
    "genericTaskId": number,
    "statusTypeId": number
}

const ListGenericTask: React.FC = () => {
    const [data, setData] = useState<ApiResponse[]>([]);

    const handleSwitchChange = async (value: boolean, genericTaskId: number) => {

        const updatedTasks: StatusTypeRequest = {
            genericTaskId,
            statusTypeId: value ? 2 : 1
        };

        try {
            const response = await fetch("https://localhost:7227/api/v1/GenericTask/UpdateStatusId", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTasks),
            });

            const result = await response;

            if(result.status != 204){
                console.log("Error:", result);
            }

        } catch (error) {
            console.error("Error:", error);
        } finally {
            fetchData();
        }
    };

    const fetchData = () => {
        fetchDataGenericTask()
            .then((response) => {
                setData(response);
            })
            .catch((error) => {
                console.error('error getting data:', error);
            });
    };

useEffect(() => {
        fetchData();
    }, []);

    return (
        <Card className="cardGenericTask">
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
                    {data.map((item) => (
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