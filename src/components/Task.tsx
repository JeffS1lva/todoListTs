import styles from "./Task.module.css";
import { Trash } from "phosphor-react";
import { Checkbox } from "./Checkbox";

interface TaskProps {
  content: string;
  taskDelete: (task: string) => void;
  onTaskUpdate: (task: string) => void;
  isChecked: boolean;
}

export function Task({ content, taskDelete, onTaskUpdate, isChecked }: TaskProps) {

  function handleDeleteTask() {
    taskDelete(content);
  }

  function handleTaskUpdate() {
    onTaskUpdate(content); // Atualiza a tarefa no estado do componente pai
  }

  return (
    <div className={styles.task}>
      <Checkbox 
        label={content} 
        onTaskUpdate={handleTaskUpdate}
        checked={isChecked}  // Atualiza o estado do checkbox com isChecked
      />
      
      <button onClick={handleDeleteTask}>
        <Trash size={20} />
      </button>
    </div>
  );
}
