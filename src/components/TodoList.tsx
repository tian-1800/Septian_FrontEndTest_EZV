import Link from "next/link";
import { CheckCircle, Circle, User } from "lucide-react";
import { useGetTodosQuery } from "@/lib/redux/services/todos-api";
import { useRouter } from "next/router";
import Pagination from "./Pagination";
import { DEFAULT_LIMIT } from "@/lib/redux/constant/pagination";

export default function TodoList() {
  const router = useRouter();

  const currentPage = Number(router.query.page as string) || 1;
  const currentLimit = Number(router.query.limit as string) || DEFAULT_LIMIT;

  const start = (currentPage - 1) * currentLimit;

  const {
    data: todos = [],
    isLoading,
    isError,
  } = useGetTodosQuery({
    start,
    limit: currentLimit,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg font-medium mb-2">Failed to load todos</div>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    );
  }

  //   need to handle empty todos UI wise

  return (
    <Pagination>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {todo.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
                <span
                  className={`text-sm font-medium px-2 py-1 rounded ${
                    todo.completed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {todo.completed ? "Completed" : "Pending"}
                </span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-slate-800 mb-3 line-clamp-2">{todo.title}</h3>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>User ID: {todo.userId}</span>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link href={`/todos/${todo.id}`} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Pagination>
  );
}
