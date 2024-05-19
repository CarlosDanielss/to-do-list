import { Check, Trash } from "phosphor-react";

import { ToDoListType } from "../Tasks/Tasks";

import styles from "./Item.module.css";

interface ItemProps extends ToDoListType {
  onCompleteTask: (task: number) => void;
  onDeleteTask: (task: number) => void;
}

export function Item({
  id,
  task,
  isConcluded,
  onCompleteTask,
  onDeleteTask,
}: ItemProps) {
  function handleCompletedItem() {
    onCompleteTask(id);
  }

  function handleDeleteItem() {
    onDeleteTask(id);
  }

  return (
    <div className={styles.item}>
      <label
        htmlFor="checkbox"
        className={styles.itemLabel}
        onClick={handleCompletedItem}
      >
        <input type="checkbox" name="task" id="task" />
        <span
          className={`${styles.checkbox} ${
            isConcluded ? styles.checkboxChecked : styles.checkboxUnchecked
          }`}
        >
          {isConcluded && <Check size={12} weight="bold" />}
        </span>
        <p className={`${isConcluded ? styles.paragraphChecked : ""}`}>
          {task}
        </p>
      </label>
      <button type="button" onClick={handleDeleteItem}>
        <Trash size={24} />
      </button>
    </div>
  );
}
