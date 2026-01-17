
export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  type: 'text' | 'image';
  imageUrl?: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastActive: string;
  online: boolean;
}

export interface Chat {
  id: string;
  contact: Contact;
  messages: Message[];
  unreadCount: number;
}
