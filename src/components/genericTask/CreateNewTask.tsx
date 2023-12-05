//CreateNewRask.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchStatuses } from '../hooks/useTaskActions';
import { RootState } from '../hooks/store'
import './CreatenewTask.css'
import {UPDATE_STATUS_ID,API_BASE_URL} from '../../config'

interface TaskFormProps {
  updateTaskList: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ updateTaskList }) => {
  const dispatch = useDispatch();
  const { categories, statuses } = useSelector((state: RootState) => state.tasks);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
  const [selectedStatusId, setSelectedStatusId] = useState<number | undefined>(undefined);

  useEffect(() => {
    fetchCategories(dispatch);
    fetchStatuses(dispatch);
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = {
      name,
      description,
      dueDate,
      categoryId: selectedCategoryId ?? 0,
      statusTypeId: selectedStatusId ?? 0,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${UPDATE_STATUS_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Error adding task');
      }

      // Update the task list by calling the function passed as prop
      updateTaskList();

      // Clear the form after adding the task
      setName("");
      setDescription("");
      if (statuses.length > 0) {
        setSelectedStatusId(statuses[0].id);
      } else {
        setSelectedStatusId(undefined);
      }
      if (categories.length > 0) {
        setSelectedCategoryId(categories[0].id);
      } else {
        setSelectedCategoryId(undefined);
      }
      setDueDate(calculateDueDate());
    } catch (error) {
      console.error("Error adding task:", error);
    }

  };

  const calculateDueDate = (): string => {
    const currentDate = new Date();
    const dueDate = new Date(currentDate);
    dueDate.setDate(currentDate.getDate() + 5);
    return dueDate.toISOString().slice(0, 10);
  };
  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="task-name" className="task-label">Name:</label>
          <input
            type="text"
            id="task-name"
            name="task-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="task-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="task-description" className="task-label">Description:</label>
          <textarea
            id="task-description"
            name="task-description"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="task-input"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="task-category" className="task-label">Category:</label>
          <select
            id="task-category"
            name="task-category"
            value={selectedCategoryId || '0'}
            onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
            className="task-select"
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="task-state" className="task-label">State:</label>
          <select
            id="task-state"
            name="task-state"
            value={selectedStatusId || ''}
            onChange={(e) => setSelectedStatusId(Number(e.target.value))}
            className="task-select"
          >
            <option value="">Select a State</option>
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="task-due-date" className="task-label">Due Date:</label>
          <input
            type="date"
            id="task-due-date"
            name="task-due-date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="task-input"
          />
        </div>
      </div>
      <button type="submit" className="task-button">Create Task</button>
    </form>
  );
};

export { TaskForm };