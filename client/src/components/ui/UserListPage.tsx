import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import type { Role, User } from "@shareit/shared";
import { deleteUser, getUsers } from "@/api/users";

import { buttonVariants, Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

const roleVariant: Record<Role, "default" | "secondary" | "outline"> = {
  admin: "default",
  guru: "secondary",
  siswa: "outline",
};

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    getUsers()
      .then((loadedUsers) => {
        if (!cancelled) setUsers(loadedUsers);
      })
      .catch((err) => {
        if (!cancelled) {
          toast.error(err instanceof Error ? err.message : "Gagal memuat data");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = async (user: User) => {
    if (!window.confirm(`Hapus user "${user.name}"?`)) return;
    try {
      await deleteUser(user._id);
      toast.success("User berhasil dihapus");
      setUsers((prev) => prev.filter((u) => u._id !== user._id));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menghapus user");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Daftar User</CardTitle>
          <CardDescription>Total {users.length} user</CardDescription>
        </div>
        <Link to="/users/create" className={buttonVariants()}>
          + Tambah User
        </Link>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">No</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>No HP</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Memuat data...
                </TableCell>
              </TableRow>
            )}

            {!loading && users.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Belum ada data user
                </TableCell>
              </TableRow>
            )}

            {users.map((u, i) => (
              <TableRow key={u._id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.number_phone}</TableCell>
                <TableCell>
                  <Badge variant={roleVariant[u.role]} className="capitalize">
                    {u.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      to={`/users/${u._id}/edit`}
                      className={buttonVariants({ variant: "outline", size: "sm" })}
                    >
                      Edit
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(u)}
                    >
                      Hapus
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant="outline" onClick={() => { logout(); navigate("/login"); }}>Keluar</Button>
      </CardContent>
    </Card>
  );
}