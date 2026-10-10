import { useState } from "react";
import { createUserSchema } from "@shareit/shared";
import { createUser } from "../../api/users";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const initialForm = {
  name: "",
  email: "",
  password: "",
  number_phone: "",
  role: "siswa",
};

export default function UserForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validasi dengan schema yang sama dengan server
    const parsed = createUserSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        fieldErrors[String(i.path[0])] = i.message;
      });
      setErrors(fieldErrors);
      console.log("Validasi gagal:", fieldErrors);
      return;
    }

    try {
      setLoading(true);
      console.log("Data dikirim:", parsed.data);
      await createUser(parsed.data);
      toast.success("User berhasil ditambahkan")
      setForm(initialForm);
      navigate("/")
    } catch (err) {
      console.error("Gagal:", err instanceof Error ? err.message : err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Tambah User</h2>

      <div>
        <input name="name" placeholder="Nama" value={form.name} onChange={handleChange} />
        {errors.name && <small style={{ color: "red" }}> {errors.name}</small>}
      </div>

      <div>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        {errors.email && <small style={{ color: "red" }}> {errors.email}</small>}
      </div>

      <div>
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        {errors.password && <small style={{ color: "red" }}> {errors.password}</small>}
      </div>

      <div>
        <input name="number_phone" placeholder="No HP" value={form.number_phone} onChange={handleChange} />
        {errors.number_phone && <small style={{ color: "red" }}> {errors.number_phone}</small>}
      </div>

      <div>
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="admin">Admin</option>
          <option value="guru">Guru</option>
          <option value="siswa">Siswa</option>
        </select>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Menyimpan..." : "Simpan"}
      </button>
    </form>
  );
}