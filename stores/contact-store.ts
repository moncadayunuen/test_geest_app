import { create } from 'zustand';
import type { Contact } from '@/types/contact';

type LoadStatus = 'idle' | 'loading' | 'success' | 'error';
const SIMULATED_LOAD_DELAY_MS = 1200;
const delay = (milliseconds: number) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

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
      const [response] = await Promise.all([
        fetch('/data.json'),
        delay(SIMULATED_LOAD_DELAY_MS),
      ]);
      if (!response.ok) throw new Error('No se pudo cargar data.json');
      const contacts = await response.json() as Contact[];
      set({ contacts, status: 'success' });
    } catch {
      set({ status: 'error' });
    }
  },
  addContact: (contact) => set((state) => ({ contacts: [contact, ...state.contacts] })),
  removeContact: (id) => set((state) => ({ contacts: state.contacts.filter((contact) => contact.id !== id) })),
}));
