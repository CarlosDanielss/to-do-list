import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { PlusCircle } from "phosphor-react";

import { ListHeader } from "../ListHeader/ListHeader";
import { Empty } from "../Empty/Empty";
import { Item } from "../Item/Item";

import styles from "./Tasks.module.css";

export interface ToDoListType {
  id: number;
  task: string;
  isConcluded: boolean;
}

export function Tasks() {
  const [toDoList, setToDoList] = useState<ToDoListType[]>([]);

  const [newTaskText, setNewTaskText] = useState("");

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      id: toDoList.length + 1,
      task: newTaskText,
      isConcluded: false,
    };

    setToDoList([...toDoList, newTask]);
    setNewTaskText("");
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTaskText(event.target.value);
  }

  function completeTask(taskToComplete: number) {
    const updatingTaskValue = toDoList.map((item) => {
      if (item.id === taskToComplete) {
        const currentCompletionValue = item.isConcluded;
        item.isConcluded = !currentCompletionValue;
      }

      return item;
    });

    setToDoList(updatingTaskValue);
  }

  function deleteTask(taskToDelete: number) {
    const taskWithoutDeleteOne = toDoList.filter(({ id }) => {
      return id !== taskToDelete;
    });

    setToDoList(taskWithoutDeleteOne);
  }

  const isToDoListEmpty = toDoList.length === 0;

  const isNewTaskEmpty = newTaskText.length === 0;

  return (
    <main className={styles.tasks}>
      <form className={styles.tasksForm} onSubmit={handleCreateNewTask}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={newTaskText}
          onChange={handleNewTaskChange}
          onInvalid={handleNewTaskInvalid}
        />
        <button type="submit" disabled={isNewTaskEmpty}>
          Criar
          <PlusCircle size={16} weight="bold" />
        </button>
      </form>
      <section>
        <ListHeader tasks={toDoList} />
        {isToDoListEmpty ? (
          <Empty />
        ) : (
          toDoList.map(({ id, task, isConcluded }: ToDoListType) => (
            <Item
              key={id}
              id={id}
              task={task}
              isConcluded={isConcluded}
              onCompleteTask={completeTask}
              onDeleteTask={deleteTask}
            />
          ))
        )}
      </section>
    </main>
  );
}
