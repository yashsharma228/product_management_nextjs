export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  company: {
    name: string;
    title: string;
    department: string;
  };
  image: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

export interface UsersState {
  users: User[];
  total: number;
  loading: boolean;
  error: string | null;
  fetchUsers: (limit?: number, skip?: number) => Promise<void>;
  searchUsers: (query: string) => Promise<void>;
  getUser: (id: number) => Promise<User | null>;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface ProductsState {
  products: Product[];
  total: number;
  loading: boolean;
  error: string | null;
  categories: Category[];
  fetchProducts: (limit?: number, skip?: number) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  fetchProductsByCategory: (category: string) => Promise<void>;
  getProduct: (id: number) => Promise<Product | null>;
  fetchCategories: () => Promise<void>;
}
