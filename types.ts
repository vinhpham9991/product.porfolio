
export interface GameProject {
  id: string;
  title: string;
  category: string;
  description: string;
  role: string;
  imageUrl: string;
  coverImageUrl?: string; // New field for the modal hero
  playStoreUrl?: string;
  appStoreUrl?: string;
  apkPureUrl?: string;
  youtubeUrl?: string;
  techStack: string[];
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
