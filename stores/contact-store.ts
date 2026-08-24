import { create } from 'zustand';
import type { Contact } from '@/types/contact';

type LoadStatus = 'idle' | 'loading' | 'success' | 'error';

type ContactState = {
  contacts: Contact[];
  status: LoadStatus;
  loadContacts: () => Promise<void>;
  addContact: (contact: Contact) => void;
  removeContact: (id: Contact['id']) => void;
};

export const useContactStore = create<ContactState>((set, get) => ({
  contacts: [],
  status: 'idle',
  loadContacts: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading' });

    try {
      const response = await fetch('/data.json');
      if (!response.ok) throw new Error('No se pudo cargar data.json');
      const contacts = await response.json() as Contact[];
      await new Promise((resolve) => setTimeout(resolve, 700));
      set({ contacts, status: 'success' });
    } catch {
      set({ status: 'error' });
    }
  },
  addContact: (contact) => set((state) => ({ contacts: [contact, ...state.contacts] })),
  removeContact: (id) => set((state) => ({ contacts: state.contacts.filter((contact) => contact.id !== id) })),
}));
