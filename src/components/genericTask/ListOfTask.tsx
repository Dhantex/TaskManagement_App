// import { Select, SelectItem } from "@tremor/react";
import {fetchDataGenericTask} from "../../Request/requestServiceApi"
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
    BadgeDelta
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

  const ListGenericTask: React.FC = () => {
    const [data, setData] = useState<ApiResponse[]>([]);
  
    useEffect(() => {
      fetchDataGenericTask()
        .then((response) => {
          setData(response);
        })
        .catch((error) => {
          console.error('error getting data:', error);
        });
    }, []);

    return (
        <Card style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Table className="table-responsive striped-table">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell className="text-left">name</TableHeaderCell>
                        <TableHeaderCell className="text-left">description</TableHeaderCell>
                        <TableHeaderCell className="text-left">Category</TableHeaderCell>
                        <TableHeaderCell className="text-left">CreatedBy</TableHeaderCell>
                        <TableHeaderCell className="text-left">CreatedDate</TableHeaderCell>
                        <TableHeaderCell className="text-left">DueDate</TableHeaderCell>
                        <TableHeaderCell className="text-left">Status</TableHeaderCell>
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};

export {ListGenericTask};