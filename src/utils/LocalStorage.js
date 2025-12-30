export const storage = {
    get: (key, defaultValue = null) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch {
        return defaultValue;
      }
    },
    
    set: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    },
    
    remove: (key) => {
      try {
        localStorage.removeItem(key);
        return true;
      } catch {
        return false;
      }
    },
  };
  
  export const STORAGE_KEYS = {
    USERS: 'construction_users',
    CURRENT_USER: 'construction_current_user',
    PROJECTS: 'construction_projects',
    TASKS: 'construction_tasks',
    MATERIALS: 'construction_materials',
    ATTENDANCE: 'construction_attendance',
    CHAT_MESSAGES: 'construction_chat_messages',
    EQUIPMENT: 'construction_equipment',
  };