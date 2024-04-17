import React, { useState } from "react";
import "../styles/draganddrop.css";

type TaskProps = {
  content: string;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void;
};

const Task: React.FC<TaskProps> = ({ content, onDragStart, onDragEnd }) => (
  <div
    className="task"
    draggable="true"
    onDragStart={onDragStart}
    onDragEnd={onDragEnd}
  >
    {content}
  </div>
);

type LaneTasks = {
  TODO: string[];
  Doing: string[];
  Done: string[];
};

const DragAndDrop: React.FC = () => {
  const [lanes, setLanes] = useState<LaneTasks>({
    TODO: [],
    Doing: [],
    Done: [],
  });
  const [input, setInput] = useState("");

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    targetLane: keyof LaneTasks
  ) => {
    event.preventDefault();
    const draggedElement = document.querySelector(
      ".is-dragging"
    ) as HTMLDivElement;
    if (draggedElement) {
      const content = draggedElement.textContent || "";
      updateTasks(content, targetLane);
      draggedElement.classList.remove("is-dragging");
    }
  };

  const updateTasks = (content: string, newLane: keyof LaneTasks) => {
    setLanes((prevLanes) => {
      let updatedLanes = { ...prevLanes };
      Object.keys(prevLanes).forEach((lane) => {
        updatedLanes[lane as keyof LaneTasks] = prevLanes[
          lane as keyof LaneTasks
        ].filter((task) => task !== content);
      });
      updatedLanes[newLane].push(content);
      return updatedLanes;
    });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.classList.add("is-dragging");
  };

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.classList.remove("is-dragging");
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim()) {
      setLanes((prevLanes) => ({
        ...prevLanes,
        TODO: [...prevLanes.TODO, input],
      }));
      setInput("");
    }
  };

  return (
    <div className="board">
      <div className="form-container">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="New TODO..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Add +</button>
        </form>
      </div>

      <div className="lanes">
        {Object.entries(lanes).map(([laneName, tasks]) => (
          <div
            key={laneName}
            className="swim-lane"
            onDrop={(e) => handleDrop(e, laneName as keyof LaneTasks)}
            onDragOver={handleDragOver}
          >
            <h3 className="heading">{laneName}</h3>
            {tasks.map((task, index) => (
              <Task
                key={index}
                content={task}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragAndDrop;
