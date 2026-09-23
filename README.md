# SIM Sekolah

**SIM Sekolah (Sistem Informasi Manajemen Sekolah)** adalah aplikasi berbasis web yang digunakan untuk membantu mengelola berbagai data dan aktivitas administrasi sekolah secara terintegrasi.

Aplikasi ini menyediakan sistem pengelolaan data akademik dan administrasi sekolah dalam satu platform, sehingga data seperti siswa, guru, kelas, mata pelajaran, nilai, absensi, dan jadwal dapat dikelola secara terstruktur.

---

## Fungsi Utama

SIM Sekolah memiliki beberapa fungsi utama untuk mendukung pengelolaan informasi sekolah, antara lain:

* Mengelola data siswa
* Mengelola data guru
* Mengelola data kelas
* Mengelola data mata pelajaran
* Mengelola nilai siswa
* Mengelola absensi siswa
* Mengelola jadwal pelajaran
* Menyediakan informasi akademik
* Menyediakan dashboard dan ringkasan data sekolah
* Mengatur pengguna berdasarkan hak akses

---

## Fitur

### Dashboard

Dashboard memberikan ringkasan informasi sekolah dalam satu halaman.

Informasi yang dapat ditampilkan antara lain:

* Jumlah siswa
* Jumlah guru
* Jumlah kelas
* Jumlah mata pelajaran
* Ringkasan absensi
* Ringkasan nilai
* Informasi atau pengumuman terbaru

---

### Manajemen Siswa

Digunakan untuk mengelola data siswa.

Fitur:

* Melihat daftar siswa
* Menambahkan siswa
* Melihat detail siswa
* Mengubah data siswa
* Menghapus siswa
* Mencari siswa
* Memfilter data siswa

Data siswa dapat mencakup:

* Nama
* NIS
* NISN
* Jenis kelamin
* Tempat dan tanggal lahir
* Alamat
* Email
* Nomor telepon
* Kelas

---

### Manajemen Guru

Digunakan untuk mengelola data guru.

Fitur:

* Melihat daftar guru
* Menambahkan guru
* Melihat detail guru
* Mengubah data guru
* Menghapus guru
* Mencari guru

Data guru dapat mencakup:

* Nama
* NIP
* NIK
* Jenis kelamin
* Mata pelajaran
* Email
* Nomor telepon
* Alamat

---

### Manajemen Kelas

Digunakan untuk mengatur data kelas dan pembagian siswa.

Fitur:

* Melihat daftar kelas
* Menambahkan kelas
* Mengubah kelas
* Menghapus kelas
* Melihat daftar siswa dalam kelas
* Menentukan wali kelas

Contoh:

```text
X RPL 1
X RPL 2
XI RPL 1
XI RPL 2
XII RPL 1
```

---

### Manajemen Mata Pelajaran

Digunakan untuk mengelola mata pelajaran yang tersedia di sekolah.

Fitur:

* Melihat mata pelajaran
* Menambahkan mata pelajaran
* Mengubah mata pelajaran
* Menghapus mata pelajaran
* Menentukan guru pengampu

---

### Manajemen Nilai

Digunakan untuk mencatat dan mengelola nilai siswa.

Fitur:

* Input nilai
* Mengubah nilai
* Melihat nilai siswa
* Melihat nilai berdasarkan kelas
* Melihat nilai berdasarkan mata pelajaran
* Rekap nilai

Jenis nilai dapat dikembangkan sesuai kebutuhan sekolah, seperti:

* Tugas
* Ulangan
* UTS
* UAS
* Nilai akhir

---

### Manajemen Absensi

Digunakan untuk mencatat kehadiran siswa.

Status kehadiran:

* Hadir
* Izin
* Sakit
* Alpa

Fitur:

* Input absensi
* Mengubah absensi
* Melihat riwayat absensi
* Rekap absensi
* Melihat absensi berdasarkan siswa
* Melihat absensi berdasarkan kelas
* Melihat absensi berdasarkan tanggal

---

### Manajemen Jadwal

Digunakan untuk mengatur jadwal kegiatan pembelajaran.

Informasi jadwal dapat mencakup:

* Hari
* Jam
* Kelas
* Mata pelajaran
* Guru
* Ruangan

Contoh:

| Hari  | Jam           | Kelas   | Mata Pelajaran | Guru   |
| ----- | ------------- | ------- | -------------- | ------ |
| Senin | 07:00 - 08:30 | X RPL 1 | Pemrograman    | Guru A |
| Senin | 08:30 - 10:00 | X RPL 1 | Basis Data     | Guru B |

---

### Manajemen Pengguna

Digunakan untuk mengatur pengguna yang dapat mengakses sistem.

Role yang direncanakan:

* **Admin** — mengelola data dan konfigurasi sistem
* **Guru** — mengelola data pembelajaran seperti nilai dan absensi
* **Siswa** — melihat informasi akademik miliknya

Setiap role memiliki hak akses yang berbeda.

---

### Pengumuman

Digunakan untuk menyampaikan informasi kepada pengguna sistem.

Contoh:

* Pengumuman sekolah
* Informasi ujian
* Informasi kegiatan
* Informasi jadwal
* Informasi akademik

---

# Teknologi

## Frontend

* React
* Vite
* TypeScript
* Tailwind CSS
* shadcn/ui

## Backend

* Node.js
* Express.js
* TypeScript
* tsx

## Database

* MongoDB
* MongoDB Node.js Driver

---

# Struktur Project

```text
EDUSIME/
│
├── client/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Students.tsx
│   │   │   ├── Teachers.tsx
│   │   │   ├── Classes.tsx
│   │   │   ├── Subjects.tsx
│   │   │   ├── Grades.tsx
│   │   │   ├── Attendance.tsx
│   │   │   └── Schedules.tsx
│   │   │
│   │   ├── layouts/
│   │   │   └── DashboardLayout.tsx
│   │   │
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   ├── components.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   │
│   │   ├── controllers/
│   │   │   ├── studentController.ts
│   │   │   ├── teacherController.ts
│   │   │   ├── classController.ts
│   │   │   └── subjectController.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── studentRoutes.ts
│   │   │   ├── teacherRoutes.ts
│   │   │   ├── classRoutes.ts
│   │   │   └── subjectRoutes.ts
│   │   │
│   │   ├── services/
│   │   │
│   │   └── server.ts
│   │
│   ├── .env
│   ├── tsconfig.json
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# Development Setup

## Requirements

Pastikan perangkat sudah memiliki:

* Node.js
* npm
* MongoDB
* Git

Cek Node.js:

```bash
node --version
```

Cek npm:

```bash
npm --version
```

Cek Git:

```bash
git --version
```

---

# Installation

## 1. Clone Repository

Clone repository:

```bash
git clone <REPOSITORY_URL>
```

Masuk ke folder project:

```bash
cd EDUSIME
```

---

## 2. Install Frontend Dependencies

Masuk ke folder `client`:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

---

## 3. Install Backend Dependencies

Buka terminal baru dan masuk ke folder `server`:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

---

# Environment Configuration

Backend menggunakan environment variables untuk konfigurasi server dan database.

Buat file:

```text
server/.env
```

Isi:

```env
PORT=5000

MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=sim_edukasi
```

Jika menggunakan MongoDB Atlas, gunakan connection string MongoDB Atlas:

```env
PORT=5000

MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/
MONGODB_DB=sim_edukasi
```

> Jangan memasukkan file `.env` ke repository GitHub.

---

# Running the Application

Frontend dan backend berjalan sebagai dua development server yang berbeda.

## 1. Jalankan MongoDB

Pastikan MongoDB sedang berjalan.

Pada Linux dengan systemd:

```bash
sudo systemctl start mongod
```

Cek status:

```bash
sudo systemctl status mongod
```

---

## 2. Jalankan Backend

Buka terminal:

```bash
cd server
```

Jalankan:

```bash
npm run dev
```

Backend berjalan pada:

```text
http://localhost:5000
```

---

## 3. Jalankan Frontend

Buka terminal baru:

```bash
cd client
```

Jalankan:

```bash
npm run dev
```

Frontend biasanya berjalan pada:

```text
http://localhost:5173
```

Buka alamat tersebut melalui browser.

---

# Development Flow

Komunikasi antara frontend, backend, dan database:

```text
React
  │
  │ HTTP Request
  ▼
Express.js
  │
  ▼
Routes
  │
  ▼
Controller
  │
  ▼
MongoDB Driver
  │
  ▼
MongoDB
```

Contoh ketika mengambil data siswa:

```text
Students.tsx
     │
     │ GET /api/students
     ▼
studentRoutes.ts
     │
     ▼
studentController.ts
     │
     ▼
MongoDB
     │
     ▼
JSON Response
     │
     ▼
Students.tsx
```

---

# API

Base API:

```text
http://localhost:5000/api
```

## Students

| Method | Endpoint            | Fungsi                   |
| ------ | ------------------- | ------------------------ |
| GET    | `/api/students`     | Mendapatkan semua siswa  |
| POST   | `/api/students`     | Menambahkan siswa        |
| GET    | `/api/students/:id` | Mendapatkan detail siswa |
| PUT    | `/api/students/:id` | Mengubah data siswa      |
| DELETE | `/api/students/:id` | Menghapus siswa          |

Endpoint untuk modul lainnya akan ditambahkan sesuai pengembangan aplikasi.

---

# Database

Database utama:

```text
sim_edukasi
```

Collection yang digunakan:

```text
sim_edukasi
│
├── students
├── teachers
├── classes
├── subjects
├── grades
├── attendance
├── schedules
├── announcements
└── users
```

---

# NPM Scripts

## Client

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Preview production:

```bash
npm run preview
```

## Server

Development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Start production:

```bash
npm start
```

---

# Git

Setelah melakukan perubahan:

```bash
git status
```

Tambahkan perubahan:

```bash
git add .
```

Commit:

```bash
git commit -m "feat: add student management"
```

Push:

```bash
git push
```

Contoh commit message:

```text
feat: add student management
feat: add teacher management
feat: add attendance module
fix: validate student form
fix: handle database connection error
refactor: organize student controller
style: improve student table
```

---

# License

This project is developed for educational and school management purposes.
