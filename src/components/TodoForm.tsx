import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { CheckCircle, Circle, User, FileText } from "lucide-react";
import { useCreateTodoMutation } from "@/lib/redux/services/todos-api";

const leftSideContent = ["Create and organize tasks efficiently", "Placeholder Text 1", "Placeholder Text 2"];

export default function TodoForm() {
  const router = useRouter();
  const [createTodo, { isLoading: isCreating }] = useCreateTodoMutation();

  const [formData, setFormData] = useState({
    title: "",
    completed: false,
    userId: 1,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: unknown) => {
    setFormData({ ...formData, [field]: value });

    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await createTodo(formData).unwrap();

      router.push("/");
    } catch (error) {
      console.error("Failed to save todo:", error);
    }
  };

  const isLoading = isCreating;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="lg:flex">
          {/* Left Column - Information */}
          <div className="lg:w-2/5 bg-gray-50 p-8">
            <div className="max-w-md">
              <h2 className="text-4xl font-bold text-slate-800 mb-6">Manage your todos</h2>
              <p className="text-slate-600 mb-8">Our todo management system can help you:</p>
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Features</h3>
              <div className="space-y-4">
                {leftSideContent.map((content, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p className="text-slate-600">{content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:w-3/5 bg-white p-8">
            <form onSubmit={handleSubmit} className="space-y-6 text-gray-700">
              <div>
                <label htmlFor="title" className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4" />
                  <span>Task Title</span>
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter task title"
                  className={`w-full px-4 py-3 border rounded-md text-base bg-white transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-indigo-100 focus:border-indigo-600 ${
                    errors.title ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
              </div>

              <div>
                <label
                  htmlFor="completed"
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2"
                >
                  <Circle className="w-4 h-4" />
                  <span>Status</span>
                </label>
                <select
                  id="completed"
                  value={formData.completed.toString()}
                  onChange={(e) => handleInputChange("completed", e.target.value === "true")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-base bg-white transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-indigo-100 focus:border-indigo-600"
                >
                  <option value="false">Pending</option>
                  <option value="true">Completed</option>
                </select>
              </div>

              <div>
                <label htmlFor="userId" className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4" />
                  <span>User ID</span>
                </label>
                <input
                  type="number"
                  id="userId"
                  value={formData.userId}
                  onChange={(e) => handleInputChange("userId", parseInt(e.target.value) || 0)}
                  placeholder="Enter user ID"
                  min="1"
                  className={`w-full px-4 py-3 border rounded-md text-base bg-white transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-indigo-100 focus:border-indigo-600 ${
                    errors.userId ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.userId && <p className="mt-2 text-sm text-red-600">{errors.userId}</p>}
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-indigo-600 text-white text-base font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-3 focus:ring-indigo-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                >
                  {isLoading ? "Saving..." : "Create Todo"}
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="px-6 py-3 bg-gray-100 text-gray-700 text-base font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-3 focus:ring-gray-100 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
