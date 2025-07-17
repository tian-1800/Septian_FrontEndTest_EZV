import { ReactNode } from "react";
import Link from "next/link";
import { Plus, List } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-slate-800 hover:text-indigo-600 transition-colors">
                TodoManager
              </Link>
            </div>
            <nav className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
              >
                <List className="w-4 h-4" />
                <span>All Todos</span>
              </Link>
              <Link
                href="/todos/create"
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create Todo</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
