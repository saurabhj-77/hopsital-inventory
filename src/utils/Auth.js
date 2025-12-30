import { storage, STORAGE_KEYS } from './LocalStorage';

export const auth = {
  login: (email, password) => {
    const users = storage.get(STORAGE_KEYS.USERS, []);
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      storage.set(STORAGE_KEYS.CURRENT_USER, user);
      return { success: true, user };
    }
    
    return { success: false, error: 'Invalid credentials' };
  },
  
  logout: () => {
    storage.remove(STORAGE_KEYS.CURRENT_USER);
  },
  
  getCurrentUser: () => {
    return storage.get(STORAGE_KEYS.CURRENT_USER);
  },
  
  register: (userData) => {
    const users = storage.get(STORAGE_KEYS.USERS, []);
    
    if (users.find(u => u.email === userData.email)) {
      return { success: false, error: 'User already exists' };
    }
    
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    storage.set(STORAGE_KEYS.USERS, users);
    storage.set(STORAGE_KEYS.CURRENT_USER, newUser);
    
    return { success: true, user: newUser };
  },
};