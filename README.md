# Assessment App

A modern web application built with Next.js for managing products and users with secure authentication.

## Features

- **User Authentication**: Secure login using NextAuth.js with credentials provider
- **Product Management**: View and manage product listings with pagination, search, and category filtering
- **User Management**: Admin interface for user management with pagination and search
- **Responsive Design**: Built with Material-UI for a clean, responsive UI
- **State Management**: Uses Zustand for efficient state management with caching
- **API Integration**: Integrates with dummyjson.com for mock data

## Technologies Used

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Material-UI (MUI) v6
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Build Tool**: Turbopack

## Why Zustand?

Zustand was chosen for state management because:
1. **Simplicity**: Minimal boilerplate compared to Redux.
2. **Small Footprint**: Very lightweight (<1kB).
3. **Built-in Async Actions**: No need for middleware like Thunk or Saga; async logic sits directly in the store.
4. **Performance**: Selectors allow components to subscribe only to changes they care about, reducing re-renders.
5. **Easy Persistence**: Built-in middleware for persisting state to localStorage (used for Auth).

## Caching Strategy

Client-side caching is implemented in Zustand stores (`useUserStore`, `useProductStore`) to improve performance and reduce API calls.
- **Strategy**: We store fetched lists in a `cache` object keyed by `limit` and `skip` (e.g., `products-10-0`).
- **Why**: When a user navigates back to a previously visited page, the data is served instantly from memory without hitting the network.
- **Implementation**: Before making an API request, the store checks if the key exists in `cache`. If yes, it sets the state from cache; otherwise, it fetches and updates the cache.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd assessment-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Navigate to the login page at `/login`
2. Use the test credentials:
   - Username: `emilys`
   - Password: `emilyspass`
   (Or use the "Fill Test Credentials" button on the login page)
3. After logging in, you can access the dashboard, products, and users sections.

## Project Structure

```
assessment-app/
├── app/
│   ├── api/
│   │   └── auth/[...nextauth]/
│   ├── login/
│   ├── products/
│   ├── users/
│   └── globals.css
├── components/
│   ├── AuthSync.tsx
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── Providers.tsx
│   ├── UserRow.tsx
├── lib/
│   └── axios.ts
├── store/
│   ├── useAuthStore.ts
│   ├── useProductStore.ts
│   └── useUserStore.ts
├── types/
│   └── index.ts
├── middleware.ts
├── next.config.ts
├── package.json
└── README.md
```

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
