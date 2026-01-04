import { create } from 'zustand';
import api from '@/lib/axios';
import { UsersState, User } from '@/types';

interface UserCache {
  [key: string]: { users: User[]; total: number };
}

interface UserStore extends UsersState {
  cache: UserCache;
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  total: 0,
  loading: false,
  error: null,
  cache: {},

  fetchUsers: async (limit = 10, skip = 0) => {
    const cacheKey = `users-${limit}-${skip}`;
    const cached = get().cache[cacheKey];

    if (cached) {
      set({ users: cached.users, total: cached.total, loading: false });
      return;
    }

    set({ loading: true, error: null });
    try {
      const response = await api.get(`/users?limit=${limit}&skip=${skip}`);
      const { users, total } = response.data;
      
      set((state) => ({
        users,
        total,
        loading: false,
        cache: { ...state.cache, [cacheKey]: { users, total } },
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  searchUsers: async (query: string) => {
    if (!query) {
        // If query is empty, maybe fetch default list? 
        // For now, let's just return or handle it in UI.
        // Or re-fetch default.
        return; 
    }
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/users/search?q=${query}`);
      set({ users: response.data.users, total: response.data.total, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  getUser: async (id: number) => {
    // Check if user exists in current list
    const existingUser = get().users.find((u) => u.id === id);
    if (existingUser) {
      return existingUser;
    }

    // Else fetch
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      // set({ error: error.message }); // Don't set global list error for single user fetch
      console.error(error);
      return null;
    }
  },
}));
