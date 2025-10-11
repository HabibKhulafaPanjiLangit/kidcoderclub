import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        {/* Add navigation links here if needed */}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
