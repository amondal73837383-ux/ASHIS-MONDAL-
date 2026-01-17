
import { Chat, Contact } from './types';

export const CURRENT_USER_ID = 'me';

export const MOCK_CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Farmer John',
    avatar: 'https://picsum.photos/seed/farmerjohn/200',
    lastMessage: 'The harvest looks great this year!',
    lastActive: '2m ago',
    online: true,
  },
  {
    id: '2',
    name: 'Greenhouse Tech',
    avatar: 'https://picsum.photos/seed/greenhouse/200',
    lastMessage: 'Temperature alert in Sector 4.',
    lastActive: '1h ago',
    online: false,
  },
  {
    id: '3',
    name: 'Soil Expert Sarah',
    avatar: 'https://picsum.photos/seed/sarah/200',
    lastMessage: 'I sent the nitrogen report.',
    lastActive: 'Just now',
    online: true,
  },
  {
    id: '4',
    name: 'Irrigation Bot',
    avatar: 'https://picsum.photos/seed/bot/200',
    lastMessage: 'Watering schedule updated.',
    lastActive: '3h ago',
    online: true,
  }
];

export const INITIAL_CHATS: Chat[] = MOCK_CONTACTS.map(contact => ({
  id: `chat_${contact.id}`,
  contact,
  messages: [
    {
      id: `m_${contact.id}_1`,
      senderId: contact.id,
      text: `Hello! This is ${contact.name}.`,
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      type: 'text',
      status: 'read'
    },
    {
      id: `m_${contact.id}_2`,
      senderId: contact.id,
      text: contact.lastMessage || '',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      type: 'text',
      status: 'read'
    }
  ],
  unreadCount: contact.id === '3' ? 1 : 0,
}));
