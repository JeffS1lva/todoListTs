import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import styles from "./Post.module.css";
import { PlusCircle } from "phosphor-react";
import { ClipboardText } from "phosphor-react";
import { Task } from "./Task";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function Post() {
  const [task, setPostTask] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  // Recuperando dados do localStorage ao carregar o componente
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const savedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks") || "[]");

    if (savedTasks) {
      setPostTask(savedTasks);
    }
    if (savedCompletedTasks) {
      setCompletedTasks(savedCompletedTasks);
    }
  }, []);

  // Salvando tarefas no localStorage sempre que as listas forem alteradas
  useEffect(() => {
    if (task.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(task));
    }
    if (completedTasks.length >= 0) {
      localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }
  }, [task, completedTasks]);

  // Função para adicionar uma nova tarefa
  function handleTask(event: FormEvent) {
    event.preventDefault();
    if (newTask.trim()) {
      setPostTask((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return updatedTasks;
      });
      setNewTask("");
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
      });
    }
  }

  // Atualiza o valor do input de nova tarefa
  function handleOnChange(event: ChangeEvent <HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  // Função para excluir uma tarefa
  function taskDelete(onDeleteTask: string) {
    const deleteTask = task.filter((tasks) => tasks !== onDeleteTask);
    const deleteCompletedTask = completedTasks.filter((task) => task !== onDeleteTask);

    setPostTask(deleteTask);
    setCompletedTasks(deleteCompletedTask);

    // Atualiza o localStorage após excluir uma tarefa
    localStorage.setItem("tasks", JSON.stringify(deleteTask));
    localStorage.setItem("completedTasks", JSON.stringify(deleteCompletedTask));

    toast.error("Tarefa excluída!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

  // Função para alternar entre concluída e não concluída
  function onTaskUpdate(taskContent: string, isChecked: boolean) {
    let updatedCompletedTasks: string[];

    if (isChecked) {
      // Adiciona a tarefa à lista de concluídas
      updatedCompletedTasks = [...completedTasks, taskContent];
    } else {
      // Remove a tarefa da lista de concluídas
      updatedCompletedTasks = completedTasks.filter(task => task !== taskContent);
    }

    setCompletedTasks(updatedCompletedTasks);

    // Atualiza o localStorage com a lista atualizada de concluídas
    localStorage.setItem("completedTasks", JSON.stringify(updatedCompletedTasks));
  }

  return (
    <div className={styles.container}>
      <ToastContainer />
      <form onSubmit={handleTask} className={styles.form}>
        <input
          type="text"
          required
          value={newTask}
          onChange={handleOnChange}
          placeholder="Adicione uma nova tarefa"
        />
        <button type="submit">
          Criar <PlusCircle size={26} />
        </button>
      </form>

      <div className={styles.taskContainer}>
        <p>
          Tarefas criadas <b>{task.length}</b>
        </p>
        <span>
          Concluídas <b>{completedTasks.length} de {task.length}</b>
        </span>
      </div>

      <div>
        {task.length > 0 ? (
          task.map((taskContent) => (
            <Task
              key={taskContent}
              content={taskContent}
              taskDelete={taskDelete}
              onTaskUpdate={onTaskUpdate} // Passando a função `onTaskUpdate` corretamente
              isChecked={completedTasks.includes(taskContent)} // Passando o estado do checkbox
            />
          ))
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
  );
}
