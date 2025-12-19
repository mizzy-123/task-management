# Task Management - Frontend

Frontend aplikasi Task Management System yang dibangun menggunakan Next.js 15 dengan App Router, TypeScript, dan modern UI components.

## 🚀 Fitur Utama

- ✅ **Autentikasi** - Login & Register dengan NextAuth.js
- ✅ **Dashboard** - Statistik task dan visualisasi data
- ✅ **Task Management** - CRUD operations dengan real-time updates
- ✅ **Responsive Design** - Mobile-friendly interface
- ✅ **Dark Mode Ready** - UI components mendukung tema gelap
- ✅ **Form Validation** - Client-side validation dengan Zod
- ✅ **State Management** - TanStack Query untuk data fetching & caching
- ✅ **Modern UI** - Shadcn/ui components dengan Tailwind CSS

## 🛠️ Teknologi yang Digunakan

### Core Framework

- **Next.js 15** - React framework dengan App Router
- **React 19** - UI library
- **TypeScript** - Type-safe programming

### Authentication & Authorization

- **NextAuth.js** - Authentication solution
- **JWT** - Token-based authentication

### State Management & Data Fetching

- **TanStack Query (React Query)** - Server state management
- **Axios** - HTTP client
- **React Hook Form** - Form state management

### UI & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Re-usable UI components
- **Radix UI** - Accessible component primitives
- **Tabler Icons** - Icon library
- **Recharts** - Chart library untuk visualisasi data

### Validation

- **Zod** - Schema validation

### Date Management

- **date-fns** - Modern JavaScript date utility

## 📋 Prerequisites

- Node.js 18.x atau lebih baru
- npm, yarn, atau pnpm
- Backend API harus sudah berjalan di http://localhost:3001

## 🏃 Cara Menjalankan

### 1. Install Dependencies

```bash
npm install
# atau
yarn install
```

### 2. Setup Environment Variables

Copy file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Sesuaikan konfigurasi di file `.env`:

```env
# Backend API URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001/api

# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### 3. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000)

### 4. Build untuk Production

```bash
npm run build
npm run start
```

## 📁 Struktur Project

```
frontend/
├── public/                      # Static assets
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/             # Auth route group
│   │   │   ├── login/          # Login page
│   │   │   └── register/       # Register page
│   │   ├── api/                # API routes
│   │   │   └── auth/           # NextAuth API routes
│   │   ├── task/               # Task management pages
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page
│   │   └── providers.tsx       # Global providers
│   │
│   ├── components/             # React components
│   │   ├── commons/            # Common components
│   │   │   ├── alert-dialog/   # Alert dialog components
│   │   │   ├── chart/          # Chart components
│   │   │   ├── data-table/     # Data table components
│   │   │   ├── date-picker/    # Date picker components
│   │   │   ├── dropdown/       # Dropdown components
│   │   │   ├── header/         # Header components
│   │   │   ├── navigation/     # Navigation components
│   │   │   ├── select/         # Select components
│   │   │   └── sidebar/        # Sidebar components
│   │   ├── skeletons/          # Loading skeletons
│   │   ├── ui/                 # Shadcn UI components
│   │   └── views/              # Page-specific views
│   │
│   ├── config/                 # Configuration files
│   │   └── environment.ts      # Environment variables
│   │
│   ├── context/                # React Context
│   │   ├── DialogContext.tsx   # Dialog state management
│   │   └── ToasterContext.tsx  # Toast notifications
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-mobile.ts       # Mobile detection hook
│   │   └── use-session-sync.ts # Session sync hook
│   │
│   ├── lib/                    # Utilities & helpers
│   │   ├── axios.ts            # Axios configuration
│   │   └── utils.ts            # Utility functions
│   │
│   ├── types/                  # TypeScript type definitions
│   │   ├── auth/               # Auth-related types
│   │   ├── task/               # Task-related types
│   │   └── next-auth.d.ts      # NextAuth type extensions
│   │
│   └── middleware.ts           # Next.js middleware
│
├── .env.example                # Environment variables template
├── components.json             # Shadcn UI configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies & scripts
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🔧 Environment Variables

| Variable                  | Deskripsi                 | Default                     |
| ------------------------- | ------------------------- | --------------------------- |
| `NEXT_PUBLIC_BACKEND_URL` | URL backend API           | `http://localhost:3001/api` |
| `NEXTAUTH_SECRET`         | Secret key untuk NextAuth | -                           |
| `NEXTAUTH_URL`            | Base URL aplikasi         | `http://localhost:3000`     |

## 📝 Available Scripts

| Script           | Deskripsi                                     |
| ---------------- | --------------------------------------------- |
| `npm run dev`    | Jalankan development server dengan hot-reload |
| `npm run build`  | Build aplikasi untuk production               |
| `npm run start`  | Jalankan production server                    |
| `npm run lint`   | Jalankan ESLint untuk code quality check      |
| `npm run format` | Format code dengan Prettier                   |

## 🎨 UI Components

Proyek ini menggunakan [Shadcn/ui](https://ui.shadcn.com/) - koleksi komponen yang dapat digunakan kembali dan dikustomisasi.

### Komponen yang Tersedia

- **Form Components**: Input, Textarea, Select, Checkbox, Date Picker
- **Data Display**: Table, Card, Badge, Avatar
- **Feedback**: Alert Dialog, Toast (Sonner), Skeleton
- **Navigation**: Sidebar, Breadcrumb, Dropdown Menu, Tabs
- **Layout**: Sheet, Drawer, Separator
- **Charts**: Bar Chart, Line Chart, Area Chart (Recharts)

### Menambah Komponen Baru

```bash
npx shadcn@latest add [component-name]
```

Contoh:

```bash
npx shadcn@latest add dialog
npx shadcn@latest add form
```

## 🔐 Authentication Flow

1. **Login/Register** - User mengisi form di halaman `/login` atau `/register`
2. **API Request** - Credentials dikirim ke backend API
3. **NextAuth Session** - Token JWT disimpan dalam session
4. **Protected Routes** - Middleware memeriksa session untuk akses halaman
5. **Auto Refresh** - Token di-refresh otomatis saat mendekati expired

### Middleware Protection

File `middleware.ts` melindungi route yang memerlukan authentication:

```typescript
// Route yang dilindungi
matcher: ["/task/:path*"];

// Route publik
"/login", "/register", "/api/auth/:path*";
```

## 📡 API Integration

### Axios Instance

Axios instance dikonfigurasi dengan:

- Base URL dari environment variable
- Request interceptor untuk menambahkan JWT token
- Response interceptor untuk error handling

### TanStack Query (React Query)

Digunakan untuk:

- **Data Fetching** - Fetch data dari API
- **Caching** - Cache data di client-side
- **Automatic Refetching** - Refetch saat data stale
- **Optimistic Updates** - Update UI sebelum API response
- **Mutation** - Handle POST, PUT, DELETE requests

Contoh penggunaan:

```typescript
// Fetch tasks
const { data, isLoading } = useQuery({
  queryKey: ["tasks"],
  queryFn: fetchTasks,
});

// Create task
const mutation = useMutation({
  mutationFn: createTask,
  onSuccess: () => {
    queryClient.invalidateQueries(["tasks"]);
  },
});
```

## 🎯 Fitur Utama

### 1. Dashboard

- Statistik task (Total, Completed, In Progress, To Do)
- Chart visualisasi task berdasarkan status
- Quick actions untuk membuat task baru

### 2. Task Management

- **Create Task** - Form untuk membuat task baru dengan validasi
- **Edit Task** - Update task existing
- **Delete Task** - Hapus task dengan confirmation dialog
- **Filter & Sort** - Filter by status, sort by date/title
- **Search** - Pencarian task berdasarkan title/description

### 3. Responsive Design

- Mobile-first approach
- Sidebar yang collapsible
- Adaptive table untuk mobile devices
- Touch-friendly interface

## 🔍 Code Quality

### ESLint

Configured dengan Next.js recommended rules:

```bash
npm run lint
```

### Prettier

Format code otomatis:

```bash
npm run format
```

### TypeScript

- Strict mode enabled
- Type checking saat build
- Path aliases untuk cleaner imports

```typescript
// Instead of
import { Button } from "../../../components/ui/button";

// Use
import { Button } from "@/components/ui/button";
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code ke GitHub repository
2. Import project di [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy!

### Docker

Build Docker image:

```bash
docker build -t task-management-frontend .
docker run -p 3000:3000 task-management-frontend
```

### Manual Deployment

```bash
npm run build
npm run start
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)

## 🐛 Troubleshooting

### Port sudah digunakan

```bash
# Kill process di port 3000
npx kill-port 3000

# Atau gunakan port lain
PORT=3002 npm run dev
```

### Module not found

```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build error

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📄 License

MIT License

---

**Note**: Pastikan backend API sudah berjalan sebelum menjalankan frontend aplikasi.
