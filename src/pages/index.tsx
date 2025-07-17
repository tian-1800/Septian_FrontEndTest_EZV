import Layout from "@/components/Layout";
import TodoList from "@/components/TodoList";

export default function HomePage() {
  return (
    <Layout title="All Todos">
      <TodoList />
    </Layout>
  );
}
