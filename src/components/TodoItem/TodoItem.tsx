import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  isLoading: boolean,
  removeTodo: (id: number) => void,
  handlerStatus:(todo: Todo) => void,
  upgradeTodoFromServer:(todo: Todo) => void,
  deleteTodoFromServer:(id: number) => void,
};

export const TodoItem:React.FC<Props> = ({
  todo,
  isLoading,
  removeTodo,
  handlerStatus,
  upgradeTodoFromServer,
  deleteTodoFromServer,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedText, setEditedText] = useState(todo.title);
  const save = () => {
    if (!editedText) {
      deleteTodoFromServer(todo.id);
    }

    if (editedText) {
      const newTodo = {
        ...todo,
        title: editedText,
      };

      setIsEdit(false);

      return upgradeTodoFromServer(newTodo);
    }

    return setIsEdit(false);
  };

  const handlerRename = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    save();
  };

  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    ref.current?.focus();
  }, [isEdit]);

  return (
    <div
      className={classNames(
        'todo',
        { completed: todo.completed },
      )}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          onChange={() => handlerStatus(todo)}
          checked={todo.completed}
        />
      </label>

      {isEdit ? (
        <form onSubmit={handlerRename}>
          <input
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            defaultValue={todo.title}
            onChange={(event) => setEditedText(event.target.value)}
            onBlur={save}
            ref={ref}
            onKeyUp={(event) => {
              if (event.key === 'Escape') {
                setIsEdit(true);
              }
            }}
          />
        </form>

      )
        : (
          <>
            <span
              className="todo__title"
              onDoubleClickCapture={() => setIsEdit(!isEdit)}
            >
              {todo.title}
            </span>

            {/* Remove button appears only on hover */}
            <button
              type="button"
              className="todo__remove"
              onClick={() => removeTodo(todo.id)}
            >
              ×
            </button>
          </>
        )}

      {/* overlay will cover the todo while it is being updated */}
      <div className={classNames(
        'modal overlay',
        { 'is-active': isLoading },
      )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
