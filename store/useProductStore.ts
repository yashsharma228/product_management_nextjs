import { create } from 'zustand';
import api from '@/lib/axios';
import { ProductsState, Product } from '@/types';

interface ProductCache {
  [key: string]: { products: Product[]; total: number };
}

interface ProductStore extends ProductsState {
  cache: ProductCache;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  total: 0,
  loading: false,
  error: null,
  categories: [],
  cache: {},

  fetchProducts: async (limit = 10, skip = 0) => {
    const cacheKey = `products-${limit}-${skip}`;
    const cached = get().cache[cacheKey];

    if (cached) {
      set({ products: cached.products, total: cached.total, loading: false });
      return;
    }

    set({ loading: true, error: null });
    try {
      const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
      const { products, total } = response.data;
      
      set((state) => ({
        products,
        total,
        loading: false,
        cache: { ...state.cache, [cacheKey]: { products, total } },
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  searchProducts: async (query: string) => {
     if (!query) return;
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/products/search?q=${query}`);
      set({ products: response.data.products, total: response.data.total, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchProductsByCategory: async (category: string) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/products/category/${category}`);
      set({ products: response.data.products, total: response.data.total, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  getProduct: async (id: number) => {
    const existingProduct = get().products.find((p) => p.id === id);
    if (existingProduct) {
      return existingProduct;
    }

    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },

  fetchCategories: async () => {
    if (get().categories.length > 0) return;
    try {
        const response = await api.get('/products/categories');
        set({ categories: response.data });
    } catch (error: any) {
        console.error(error);
    }
  }
}));
