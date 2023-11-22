import React, { useState } from 'react';

import {ListGenericTask} from "../components/genericTask/ListOfTask"
import {TaskForm} from "../components/genericTask/CreateNewTask"

export function Home() {
    const [taskListUpdated, setTaskListUpdated] = useState(false);
  
    // Función para actualizar la lista de tareas
    const updateTaskList = () => {
      setTaskListUpdated(!taskListUpdated);
    };
  
    return (
      <React.Fragment>
        <TaskForm updateTaskList={updateTaskList} />
        <ListGenericTask key={taskListUpdated.toString()} />
      </React.Fragment>
    );
  }