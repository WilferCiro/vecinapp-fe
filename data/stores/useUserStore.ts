import { MeResponse } from '@/domain/types/user.type';
import { create } from 'zustand';

type UserState = {
  user: MeResponse | null;
  setUser: (user: MeResponse | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
