 # Blogly — Full Stack Blog Application

A modern blog platform built with React, TypeScript, and Tailwind CSS. Users can browse blogs without logging in, and create/like/comment when authenticated.

## Tech Stack

| Category | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS 4 |
| **State Management** | Redux Toolkit, Redux Persist |
| **Routing** | React Router DOM 7 |
| **Form & Validation** | React Hook Form, Zod |
| **API** | Axios |
| **UI** | React Icons, React Toastify |

## Features

- **Public Browsing** — Anyone can see blogs, latest blog, and most-read blogs without logging in
- **Authentication** — Sign In / Sign Up with form validation (Zod + RHF)
- **Blog Detail** — Article-style layout with like, comment, and view count
- **Like & Comment** — Authenticated users can like and comment on blogs (optimistic UI update for likes)
- **Write Page** — Protected page to create new blog posts with title, category, image URL, content, and publish toggle
- **Category Filtering** — Filter blogs by category
- **Pagination** — Paginated blog listing

## Pages & Routes

| Route | Page | Access |
|---|---|---|
| `/` | Home (Blog listing) | Public |
| `/about` | About | Public |
| `/blogs/:id` | Blog Detail | Public |
| `/sign-in` | Sign In | Public only (redirects if logged in) |
| `/sign-up` | Sign Up | Public only |
| `/write` | Write Blog | Protected (redirects to home if not logged in) |

## Project Structure

```
src/
├── components/       # Reusable UI components (BlogCard, Navbar, Sidebar, etc.)
├── features/         # Redux slices (authSlice, blogSlice)
├── hooks/            # Custom hooks (useAuthCall, useBlogCall, useAxios)
├── layouts/          # MainLayout (Navbar + Footer wrapper)
├── lib/              # Zod schemas & types
├── pages/            # Page components (Home, SignIn, SignUp, Write, BlogDetail)
└── state/            # Redux store configuration
```

## Write Page — Implementation Details

The Write page allows authenticated users to create blog posts.

**Architecture:**
- **Form Management:** React Hook Form (`useForm`) with Zod validation (`zodResolver`)
- **Schema:** `writeSchema` in `lib/schemas.ts` — validates title, categoryId, image (URL), content, and isPublish
- **Type Safety:** `WriteFormData` type inferred from Zod schema (`z.infer`) — single source of truth
- **API Call:** `createPost(data)` in `useBlogCall` hook — POST to `/blogs` with auth token
- **Error Handling:** Hook catches error, dispatches to Redux, then re-throws → Component catches and shows toast
- **Success Flow:** Toast notification + redirect to home page

## API

Base URL: `https://31121.fullstack.clarusway.com/`

- GET requests work **without** authentication (public browsing)
- POST requests (like, comment, create) require `Authorization: Token <token>` header

## Getting Started

```bash
pnpm install
pnpm dev
```
