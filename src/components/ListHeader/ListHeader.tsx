import { ToDoListType } from "../Tasks/Tasks";

import styles from "./ListHeader.module.css";

interface ListHeaderProps {
  tasks: ToDoListType[]
}

export function ListHeader({ tasks }: ListHeaderProps) {
  const numberTasksCreated = tasks.length;
  
  const searchTasksConcluded = tasks.filter(({ isConcluded }) => {
    return isConcluded === true;
  })

  const numberTasksConcluded = searchTasksConcluded.length;

  const formatTaskCount = numberTasksCreated !== 0 ? "de " + numberTasksCreated : "";

  return (
    <header className={styles.listHeader}>
      <div className={styles.created}>
        <h3>Tarefas criadas</h3>
        <span>{numberTasksCreated}</span>
      </div>
      <div className={styles.completed}>
        <h3>Concluídas</h3>
        <span>{`${numberTasksConcluded} ${formatTaskCount}`}</span>
      </div>
    </header>
  );
}
