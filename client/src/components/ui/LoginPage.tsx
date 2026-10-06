import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Eye, EyeOff, GraduationCap, BookOpen, ClipboardCheck, BarChart3 } from "lucide-react";
import { loginSchema } from "@shareit/shared";
import { login } from "@/api/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const features = [
  { icon: BookOpen, text: "Data guru, siswa, dan kelas dalam satu tempat" },
  { icon: ClipboardCheck, text: "Absensi dan penilaian yang tercatat rapi" },
  { icon: BarChart3, text: "Laporan akademik yang siap dilihat kapan saja" },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = loginSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(
        Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message]))
      );
      return;
    }

    setLoading(true);
    try {
      const { user, token } = await login(parsed.data);
      localStorage.setItem("token", token); // sementara; nanti dipindah ke auth state
      toast.success(`Selamat datang, ${user.name}`);
      navigate("/");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Kolom kiri: branding */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <GraduationCap className="size-7" />
          EDUSIME
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold leading-tight">
              E-SIM Online
            </h1>
            <p className="text-lg opacity-90">
              Sistem Informasi Manajemen Sekolah berbasis web untuk mengelola
              kegiatan akademik dengan lebih mudah dan terpusat.
            </p>
          </div>

          <ul className="space-y-4">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <span className="rounded-md bg-white/15 p-2">
                  <Icon className="size-5" />
                </span>
                <span className="pt-1 text-sm opacity-90">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm opacity-70">
          © {new Date().getFullYear()} EDUSIME. Semua hak dilindungi.
        </p>

        {/* dekorasi */}
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-white/10" />
      </aside>

      {/* Kolom kanan: form */}
      <main className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-6">
          <div className="flex items-center gap-2 text-lg font-semibold lg:hidden">
            <GraduationCap className="size-6" />
            EDUSIME
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Masuk ke akun Anda</h2>
            <p className="text-sm text-muted-foreground">
              Gunakan email dan password yang terdaftar di sekolah.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nama@sekolah.sch.id"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  autoComplete="current-password"
                  className="pr-10"
                  value={form.password}
                  onChange={handleChange}
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Memproses..." : "Masuk"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Lupa password? Hubungi admin sekolah.
          </p>
        </div>
      </main>
    </div>
  );
}