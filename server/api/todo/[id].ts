import { db } from "../../db";
import { sendError } from "h3";

interface Todo {
  id: string;
  item: string;
  completed: boolean;
}

export default defineEventHandler((e) => {
  const method = e.req.method;
  const context = e.context;
  const { id } = context.params as { id: string };

  const findTodoById = (todoId: string) => {
    let index: number = -1;
    const todo = db.todos.find((t: Todo, i: number) => {
      if (t.id === todoId) {
        index = i;
        return true;
      }
      return false;
    });

    if (!todo) {
      const TodoNotFoundError = createError({
        statusCode: 404,
        statusMessage: "Todo not found",
        data: {},
      });

      sendError(e, TodoNotFoundError);
    }

    return { todo, index };
  };

  if (method === "PUT") {
    const { todo, index } = findTodoById(id);

    const updateTodo = {
      ...todo!,
      completed: !todo!.completed,
    };

    db.todos[index!] = updateTodo;

    return updateTodo;
  }

  if (method === "DELETE") {
    const { index } = findTodoById(id);

    db.todos.splice(index!, 1);

    return {
      message: "item deleted",
    };
  }
});
