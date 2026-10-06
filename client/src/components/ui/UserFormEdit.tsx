import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { updateUserSchema } from "@shareit/shared";
import type { Role } from "@shareit/shared";
import { getUser, updateUser } from "@/api/users";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

type FormState = { name: string; email: string; number_phone: string; role: Role };

const emptyForm: FormState = { name: "", email: "", number_phone: "", role: "siswa" };

const fields = [
  { name: "name", label: "Nama", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "number_phone", label: "No HP", type: "tel" },
] as const;

export default function UserEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    getUser(id)
      .then((u) =>
        setForm({ name: u.name, email: u.email, number_phone: u.number_phone, role: u.role })
      )
      .catch((err) => toast.error(err.message))
      .finally(() => setFetching(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = updateUserSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(
        Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message]))
      );
      return toast.error("Periksa kembali isian form");
    }

    setSaving(true);
    try {
      await updateUser(id!, parsed.data);
      toast.success("User berhasil diperbarui");
      navigate("/");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Edit User</CardTitle>
          <CardDescription>Ubah data user lalu simpan perubahan.</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          {fields.map(({ name, label, type }) => (
            <div key={name} className="grid gap-2">
              <Label htmlFor={name}>{label}</Label>
              <Input
                id={name}
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                disabled={fetching}
                aria-invalid={!!errors[name]}
              />
              {errors[name] && <p className="text-sm text-destructive">{errors[name]}</p>}
            </div>
          ))}

          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={form.role}
              onValueChange={(v) => setForm({ ...form, role: v as Role })}
              disabled={fetching}
            >
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Pilih role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="guru">Guru</SelectItem>
                <SelectItem value="siswa">Siswa</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && <p className="text-sm text-destructive">{errors.role}</p>}
          </div>
        </CardContent>

        <CardFooter className="mt-6 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate("/users")}>
            Batal
          </Button>
          <Button type="submit" disabled={fetching || saving}>
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}