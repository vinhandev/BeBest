import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSignUpStore = create((set, get) => ({
  username: '',
  password: '',
  name: '',
  dateOfBirth: 0,
  weight: 0,
  height: 0,
}));
