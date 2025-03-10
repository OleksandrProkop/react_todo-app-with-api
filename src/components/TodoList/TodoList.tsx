import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import '../../styles/animation.scss';

type Props = {
  todos: Todo[]
  tempTodo: Todo | null,
  tempTodos: Todo[],
  removeTodo:(id: number) => void,
  handlerStatus:(todo: Todo) => void,
  upgradeTodoFromServer:(todo: Todo) => void,
  deleteTodoFromServer:(id: number) => void,
};

export const TodoList:React.FC<Props> = ({
  todos,
  tempTodo,
  tempTodos,
  removeTodo,
  handlerStatus,
  upgradeTodoFromServer,
  deleteTodoFromServer,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup>
        {/* This is a completed todo */}
        {todos.map(todo => (
          <CSSTransition
            key={todo.id}
            timeout={300}
            classNames="item"
          >
            <TodoItem
              todo={todo}
              isLoading={tempTodos.some(t => t.id === todo.id)}
              key={todo.id}
              removeTodo={removeTodo}
              handlerStatus={handlerStatus}
              upgradeTodoFromServer={upgradeTodoFromServer}
              deleteTodoFromServer={deleteTodoFromServer}
            />
          </CSSTransition>
        ))}
        {tempTodo && (
          <CSSTransition
            key={0}
            timeout={300}
            classNames="temp-item"
          >
            <TodoItem
              todo={tempTodo}
              isLoading
              key={tempTodo.id}
              removeTodo={removeTodo}
              handlerStatus={handlerStatus}
              upgradeTodoFromServer={upgradeTodoFromServer}
              deleteTodoFromServer={deleteTodoFromServer}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </section>
  );
};
