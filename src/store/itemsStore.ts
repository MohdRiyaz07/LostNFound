import { create } from 'zustand';
import { LostItem, RewardHistory } from '../types';

interface ItemsState {
  items: LostItem[];
  rewardHistory: RewardHistory[];
  addItem: (item: LostItem) => void;
  updateItemStatus: (itemId: string, status: 'collected') => void;
  addRewardHistory: (history: RewardHistory) => void;
}

export const useItemsStore = create<ItemsState>((set) => ({
  items: [],
  rewardHistory: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  updateItemStatus: (itemId, status) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, status } : item
      ),
    })),
  addRewardHistory: (history) =>
    set((state) => ({
      rewardHistory: [...state.rewardHistory, history],
    })),
}));