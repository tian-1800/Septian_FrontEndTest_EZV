import { GetServerSideProps } from "next";
import Link from "next/link";
import Layout from "@/components/Layout";
import { CheckCircle, Circle, ArrowLeft, User, Calendar } from "lucide-react";
import { JSONPLACEHOLDER_URL } from "@/config/env-config";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface TodoDetailPageProps {
  todo: Todo | null;
  error?: string;
}

export default function TodoDetailPage({ todo, error }: TodoDetailPageProps) {
  if (error || !todo) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto text-center py-12">
          <div className="text-red-500 text-lg font-medium mb-2">{error || "Todo not found"}</div>
          <p className="text-gray-600 mb-6">Not Found</p>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Todos</span>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                {todo.completed ? (
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400 flex-shrink-0" />
                )}
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    todo.completed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {todo.completed ? "Completed" : "Pending"}
                </span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-slate-800 mb-6">{todo.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">User ID</p>
                  <p className="font-medium text-gray-900">{todo.userId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Todo ID</p>
                  <p className="font-medium text-gray-900">#{todo.id}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Todos</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<TodoDetailPageProps> = async (context) => {
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
