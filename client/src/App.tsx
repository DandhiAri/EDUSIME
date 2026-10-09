import UserForm from "#components/ui/UserForm";
import UserFormEdit from "#components/ui/UserFormEdit";
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import UserListPage from "#components/ui/UserListPage";
import LoginPage from "#components/ui/LoginPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Toaster position="top-center" richColors />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<UserListPage />} />
            {/* <Route path='/' element={<Navigate to={"/users"} replace/>}/> */}
            <Route path="users">
              {/* <Route index element={ <UserListPage/> }/> */}
              <Route path="create" element={<UserForm />} />
              <Route path=":id/edit" element={<UserFormEdit />} />
            </Route>
            <Route path="*" element={<p>Halaman tidak ditemukan</p>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
