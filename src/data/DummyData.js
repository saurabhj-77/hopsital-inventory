import { storage, STORAGE_KEYS } from '../utils/LocalStorage';

export const initializeDummyData = () => {
  // Check if data already exists
  if (!storage.get(STORAGE_KEYS.USERS)) {
    // Initialize users
    const users = [
      {
        id: '1',
        name: 'John Manager',
        email: 'John@gmail.com',
        password: 'password123',
        role: 'lawyer',
        phone: '+1-555-0101',
        department: 'law',
        avatar: '/static/images/avatar/1.jpg',
      },
      {
        id: '2',
        name: 'Alice Johnson',
        email: 'alice@gmail.com',
        password: 'password123',
        role: 'client',
        phone: '+1-555-0102',
        department: 'customer',
        avatar: '/static/images/avatar/2.jpg',
      },
      {
        id: '3',
        name: 'Bob Smith',
        email: 'bob@construction.com',
        password: 'password123',
        role: 'employee',
        phone: '+1-555-0103',
        department: 'Electrical',
        avatar: '/static/images/avatar/3.jpg',
      },
    ];
    
    storage.set(STORAGE_KEYS.USERS, users);
  }

  if (!storage.get(STORAGE_KEYS.PROJECTS)) {
    const projects = [
      {
        id: '1',
        name: 'Commercial Tower A',
        location: 'Downtown District',
        client: 'ABC Developers',
        budget: 2500000,
        startDate: '2024-01-15',
        endDate: '2024-12-15',
        status: 'in-progress',
        progress: 45,
        managerId: '1',
      },
      {
        id: '2',
        name: 'Residential Complex B',
        location: 'Northside Area',
        client: 'XYZ Builders',
        budget: 1800000,
        startDate: '2024-03-01',
        endDate: '2024-11-30',
        status: 'in-progress',
        progress: 25,
        managerId: '1',
      },
    ];
    
    storage.set(STORAGE_KEYS.PROJECTS, projects);
  }

  if (!storage.get(STORAGE_KEYS.TASKS)) {
    const tasks = [
      {
        id: '1',
        title: 'Foundation Work',
        description: 'Complete foundation pouring and curing',
        projectId: '1',
        assignedTo: '2',
        assignedBy: '1',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2024-02-28',
        estimatedHours: 120,
        actualHours: 95,
        progress: 80,
      },
      {
        id: '2',
        title: 'Electrical Wiring',
        description: 'Install main electrical wiring for floors 1-5',
        projectId: '1',
        assignedTo: '3',
        assignedBy: '1',
        status: 'pending',
        priority: 'medium',
        dueDate: '2024-03-15',
        estimatedHours: 80,
        actualHours: 0,
        progress: 0,
      },
    ];
    
    storage.set(STORAGE_KEYS.TASKS, tasks);
  }

  if (!storage.get(STORAGE_KEYS.MATERIALS)) {
    const materials = [
      {
        id: '1',
        name: 'Cement',
        category: 'Construction',
        quantity: 500,
        unit: 'bags',
        unitPrice: 8.5,
        supplier: 'CementCo',
        projectId: '1',
        status: 'in-stock',
        lastOrdered: '2024-01-20',
      },
      {
        id: '2',
        name: 'Steel Rebar',
        category: 'Structural',
        quantity: 2000,
        unit: 'pieces',
        unitPrice: 12.75,
        supplier: 'SteelWorks Inc',
        projectId: '1',
        status: 'low-stock',
        lastOrdered: '2024-01-18',
      },
    ];
    
    storage.set(STORAGE_KEYS.MATERIALS, materials);
  }
  // Add to the existing initializeDummyData function
if (!storage.get(STORAGE_KEYS.CHAT_MESSAGES)) {
  const chatMessages = [
    {
      id: '1',
      senderId: '2',
      receiverId: '1',
      message: 'Hi John, the foundation work is completed ahead of schedule.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: true,
    },
    {
      id: '2',
      senderId: '1',
      receiverId: '2',
      message: 'Great work Alice! Please proceed with the structural framing.',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      read: true,
    },
    {
      id: '3',
      senderId: '3',
      receiverId: '1',
      message: 'The electrical materials will be delivered tomorrow morning.',
      timestamp: new Date(Date.now() - 900000).toISOString(),
      read: false,
    },
  ];
  storage.set(STORAGE_KEYS.CHAT_MESSAGES, chatMessages);
}

if (!storage.get(STORAGE_KEYS.ATTENDANCE)) {
  const attendance = [
    {
      id: '1',
      employeeId: '2',
      date: new Date().toISOString().split('T')[0],
      status: 'present',
      checkIn: '07:55',
      checkOut: '17:05',
      hoursWorked: 8.2,
      notes: '',
    },
    {
      id: '2',
      employeeId: '3',
      date: new Date().toISOString().split('T')[0],
      status: 'late',
      checkIn: '08:45',
      checkOut: '17:00',
      hoursWorked: 7.3,
      notes: 'Traffic delay',
    },
  ];
  storage.set(STORAGE_KEYS.ATTENDANCE, attendance);
}

if (!storage.get(STORAGE_KEYS.EQUIPMENT)) {
  const equipment = [
    {
      id: '1',
      name: 'Caterpillar Excavator',
      type: 'Excavator',
      model: 'CAT 320',
      serialNumber: 'EXC-2023-001',
      status: 'Operational',
      location: 'Site A',
      assignedTo: '2',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-03-15',
      hoursUsed: 245,
      fuelLevel: 85,
    },
    {
      id: '2',
      name: 'Komatsu Bulldozer',
      type: 'Bulldozer',
      model: 'D65',
      serialNumber: 'BD-2023-002',
      status: 'Maintenance',
      location: 'Maintenance Yard',
      assignedTo: '',
      lastMaintenance: '2024-02-01',
      nextMaintenance: '2024-02-28',
      hoursUsed: 189,
      fuelLevel: 0,
    },
  ];
  storage.set(STORAGE_KEYS.EQUIPMENT, equipment);
}
};

export const getDummyData = (key) => {
  return storage.get(key, []);
};

export const updateDummyData = (key, data) => {
  storage.set(key, data);
};