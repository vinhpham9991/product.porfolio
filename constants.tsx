
import { GameProject, Skill } from './types';

export const PROJECTS: GameProject[] = [
  {
    id: '1',
    title: 'Kiếm Hiệp GO',
    category: 'Turn-Based Strategy',
    description: "Turn Base Strategy with Card Collect mechanic base on Kim Dung's novel Characters. A premium tactical experience where players collect and master legendary martial arts heroes.",
    role: 'Character Design, Functional Design, Map Design, Resource Balancing',
    imageUrl: 'https://img.youtube.com/vi/-bWWXzkFRjo/maxresdefault.jpg',
    coverImageUrl: 'https://img.youtube.com/vi/-bWWXzkFRjo/maxresdefault.jpg',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.shg.sg328',
    appStoreUrl: undefined,
    apkPureUrl: 'https://2game.vn/game/kiem-hiep-go',
    youtubeUrl: 'https://www.youtube.com/watch?v=-bWWXzkFRjo',
    techStack: ['Docx', 'Excel', 'Axure', 'Miro', 'Unity'],
  },
  {
    id: '2',
    title: 'Zen Garden Puzzle',
    category: 'Casual / Puzzle',
    description: 'A relaxing tile-matching game designed for high retention. Features procedurally generated levels and seasonal events.',
    role: 'Game Designer & Core Systems Programmer',
    imageUrl: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&q=80&w=800',
    coverImageUrl: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&q=80&w=1200',
    playStoreUrl: 'https://play.google.com',
    youtubeUrl: 'https://youtube.com',
    techStack: ['Unity', 'C#', 'AdMob'],
  },
  {
    id: '3',
    title: 'Battle Arena: Titans',
    category: 'Strategy / MOBA',
    description: 'A 3v3 mobile MOBA with simplified controls and high-impact visual effects. Optimized for mid-range devices.',
    role: 'Senior Unity Developer / UI Architect',
    imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800',
    coverImageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1200',
    appStoreUrl: 'https://apple.com',
    youtubeUrl: 'https://youtube.com',
    techStack: ['Unity', 'C#', 'Photon Bolt'],
  }
];

export const SKILLS: Skill[] = [
  { name: 'Game Design', level: 95, icon: '📜' },
  { name: 'Resource Balancing', level: 90, icon: '⚖️' },
  { name: 'Functional Design', level: 92, icon: '🛠️' },
  { name: 'Unity Engine', level: 88, icon: '🎮' }
];

export const PERSONAL_INFO = {
  name: "PHAM LE VINH",
  title: "Senior Mobile Game Developer / Game Designer",
  dob: "09/09/1991",
  mobile: "+84 967920073",
  email: "vinhpham9991@gmail.com",
  location: "Ho Chi Minh City, Vietnam",
  summary: "A passionate game professional with over 8 years of experience in creating engaging mobile experiences. Expert in game design, system balancing, and cross-platform development."
};
