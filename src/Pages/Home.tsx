import React, { useState } from 'react';

import {ListGenericTask} from "../components/genericTask/ListOfTask"
import {TaskForm} from "../components/genericTask/CreateNewTask"

export function Home() {
    const [taskListUpdated, setTaskListUpdated] = useState(false);

    // Function to update the task list
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