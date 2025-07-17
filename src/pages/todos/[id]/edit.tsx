import { GetServerSideProps } from "next";
import TodoForm from "@/components/TodoForm";
import { JSONPLACEHOLDER_URL } from "@/config/env-config";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface EditTodoPageProps {
  todo: Todo | null;
  error?: string;
}

export default function EditTodoPage({ todo, error }: EditTodoPageProps) {
  if (error || !todo) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <div className="text-red-500 text-lg font-medium mb-2">{error || "Todo not found"}</div>
        <p className="text-gray-600">Not Found.</p>
      </div>
    );
  }

  return <TodoForm initialData={todo} isEdit={true} />;
}

export const getServerSideProps: GetServerSideProps<EditTodoPageProps> = async (context) => {
  const { id } = context.params!;
  const todoId = parseInt(id as string);

  if (isNaN(todoId)) {
    return {
      props: {
        todo: null,
        error: "Invalid todo ID",
      },
    };
  }

  try {
    const response = await fetch(`${JSONPLACEHOLDER_URL}/todos/${todoId}`);

    if (!response.ok) {
      if (response.status === 404) {
        return {
          props: {
            todo: null,
            error: "Todo not found",
          },
        };
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const todo: Todo = await response.json();

    return {
      props: {
        todo,
      },
    };
  } catch (error) {
    console.error("Error fetching todo:", error);
    return {
      props: {
        todo: null,
        error: "Failed to load todo",
      },
    };
  }
};
