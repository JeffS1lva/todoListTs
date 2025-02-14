import styles from "./Post.module.css";
import { PlusCircle } from "phosphor-react";
import { ClipboardText } from "phosphor-react";
import { Task } from "./Task";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function Post() {
  const [task, setPostTask] = useState<string[]>([]);
  const [taskCount, setTaskCount] = useState<number>(0);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  function handleTask(event: FormEvent) {
    event.preventDefault();
    setPostTask([...task, newTask]);
    setNewTask("");
    setTaskCount(taskCount + 1);
    toast.success("Tarefa criada com sucesso!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    })
  }

  function handleOnChange(event: ChangeEvent <HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function taskDelete(onDeleteTask: string) {
    const deleteTask = task.filter((tasks) => {
      return tasks !== onDeleteTask;
    });

    const deleteCompletedTask = completedTasks.filter((task) => task !== onDeleteTask)

    setPostTask(deleteTask);
    setCompletedTasks(deleteCompletedTask)
    setTaskCount(taskCount - 1);
    toast.error("Tarefa excluida!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick:false,
      pauseOnHover: true,
      draggable:true,
      progress:undefined,
      theme:"dark",
      transition:Bounce,
    })
  }

  function onTaskUpdate(taskContent: string) {
    if (completedTasks.includes(taskContent)) {
      // Se já estiver concluída, remove da lista de concluídas
      setCompletedTasks(completedTasks.filter(task => task !== taskContent));
    } else {
      // Caso contrário, adiciona à lista de concluídas
      setCompletedTasks([...completedTasks, taskContent]);
    }
  }


  return (
    <div className={styles.container}>
      <ToastContainer/>
      <form onSubmit={handleTask} className={styles.form} action="">
        <input
          type="text"
          required
          value={newTask}
          onChange={handleOnChange}
          placeholder="Adicione uma nova tarefa"
        />
        <div>
          <button type="submit">
            Criar <PlusCircle size={26} />
          </button>
          
        </div>
      </form>
      <div className={styles.taskContainer}>
        <p>
          Tarefas criadas <b>{taskCount}</b>{" "}
        </p>
        <span>
          Concluidas <b>{completedTasks.length} de {taskCount} </b>{" "}
        </span>
      </div>

      <div>
        <div>
          {task.length > 0 ? (
            task.map((taskContent) => {
              return (
                <Task
                  content={taskContent}
                  taskDelete={taskDelete}
                  onTaskUpdate={onTaskUpdate}
                  isChecked={completedTasks.includes(taskContent)}
                />
                
              );
            })
          ) : (
            <div className={styles.emptyArea}>
              <div className={styles.voidTask}>
                <ClipboardText size={75} color="#808080" weight="thin" />
                <span>Você ainda não tem tarefas cadastradas</span>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
