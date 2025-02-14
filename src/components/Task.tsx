// Task.tsx
import styles from "./Task.module.css";
import { Trash } from "phosphor-react";
import { Checkbox } from "./Checkbox";
import 'react-toastify/dist/ReactToastify.css';

interface TaskProps {
  content: string;
  taskDelete: (task: string) => void;
  onTaskUpdate: (task: string, isChecked: boolean) => void;  // Alterado para aceitar isChecked
  isChecked: boolean;
}

export function Task({ content, taskDelete, onTaskUpdate, isChecked }: TaskProps) {

  function handleDeleteTask() {
    taskDelete(content);
  }

  function handleTaskUpdate(isChecked: boolean) {
    onTaskUpdate(content, isChecked);  // Passando o conteúdo da tarefa e o estado do checkbox
  }

  return (
    <div className={styles.task}>
      <Checkbox 
        label={content} 
        onTaskUpdate={handleTaskUpdate}
        checked={isChecked}  // Passando o estado do checkbox
      />
      
      <button onClick={handleDeleteTask}>
        <Trash size={20} />
      </button>
    </div>
  );
}
