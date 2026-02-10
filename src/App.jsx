import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewsList from "./pages/NewsList";
import NewsCreate from "./pages/NewsCreate";
import Comments from "./pages/Comments";
import ProtectedRoute from "./components/ProtectedRoute";
import NewsEdit from "./pages/NewsEdit";
import Users from "./pages/Users";
import Categories from "./pages/Categories";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/news"
        element={
          <ProtectedRoute>
            <NewsList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/news/create"
        element={
          <ProtectedRoute>
            <NewsCreate />
          </ProtectedRoute>
        }
      />

      <Route
        path="/comments"
        element={
          <ProtectedRoute>
            <Comments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/news/edit/:id"
        element={
          <ProtectedRoute>
            <NewsEdit />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
