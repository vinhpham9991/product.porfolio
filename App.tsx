
import React, { useState, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  Calendar, 
  User, 
  X, 
  Play, 
  Youtube, 
  Apple, 
  Download,
  ExternalLink,
  ChevronRight,
  Plus,
  Upload,
  Save,
  Gamepad2,
  Edit3,
  Link as LinkIcon
} from 'lucide-react';
import AIAssistant from './components/AIAssistant';
import { PROJECTS as INITIAL_PROJECTS, PERSONAL_INFO } from './constants';
import { GameProject } from './types';

const App: React.FC = () => {
  const [projects, setProjects] = useState<GameProject[]>(INITIAL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<GameProject | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<Partial<GameProject>>({
    title: '',
    category: '',
    description: '',
    role: '',
    techStack: [],
    playStoreUrl: '',
    appStoreUrl: '',
    apkPureUrl: '',
    youtubeUrl: '',
  });
  const [thumbPreview, setThumbPreview] = useState<string>('');
  const [coverPreview, setCoverPreview] = useState<string>('');
  
  const thumbInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const closeModal = () => setSelectedProject(null);

  const openAddModal = () => {
    setIsEditing(false);
    setFormData({
      title: '',
      category: '',
      description: '',
      role: '',
      techStack: [],
      playStoreUrl: '',
      appStoreUrl: '',
      apkPureUrl: '',
      youtubeUrl: '',
    });
    setThumbPreview('');
    setCoverPreview('');
    setIsFormModalOpen(true);
  };

  const openEditModal = (project: GameProject) => {
    setIsEditing(true);
    setFormData(project);
    setThumbPreview(project.imageUrl);
    setCoverPreview(project.coverImageUrl || project.imageUrl);
    setIsFormModalOpen(true);
    setSelectedProject(null); // Close viewer if open
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'thumb' | 'cover') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'thumb') setThumbPreview(url);
      else setCoverPreview(url);
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !thumbPreview) return;

    if (isEditing && formData.id) {
      const updatedProjects = projects.map(p => 
        p.id === formData.id ? { ...p, ...formData, imageUrl: thumbPreview, coverImageUrl: coverPreview } as GameProject : p
      );
      setProjects(updatedProjects);
    } else {
      const projectToAdd: GameProject = {
        id: Date.now().toString(),
        ...formData,
        imageUrl: thumbPreview,
        coverImageUrl: coverPreview || thumbPreview,
      } as GameProject;
      setProjects([projectToAdd, ...projects]);
    }

    setIsFormModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500/30">
      {/* Header / Hero */}
      <header className="pt-16 pb-12 px-6 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto text-center">
          <h1 className="font-orbitron text-4xl md:text-6xl font-black mb-4 tracking-tighter">
            PORTFOLIO <span className="text-blue-500">PRODUCTS</span>
          </h1>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full shadow-[0_0_15px_rgba(37,99,235,0.6)]"></div>
        </div>
      </header>

      {/* Contact Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] -z-10"></div>
            
            <h2 className="font-orbitron text-sm font-bold mb-10 text-blue-500 uppercase tracking-[0.3em] flex items-center gap-4">
              <span className="w-12 h-[2px] bg-blue-600/50"></span>
              Identity Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="flex items-center gap-5 group">
                <div className="p-4 bg-slate-800/50 rounded-2xl text-blue-400 border border-slate-700/50 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <User size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Full Name</p>
                  <p className="text-xl font-bold text-white uppercase tracking-tight">{PERSONAL_INFO.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-5 group">
                <div className="p-4 bg-slate-800/50 rounded-2xl text-blue-400 border border-slate-700/50 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Date of Birth</p>
                  <p className="text-xl font-bold text-white uppercase tracking-tight">{PERSONAL_INFO.dob}</p>
                </div>
              </div>
              <div className="flex items-center gap-5 group">
                <div className="p-4 bg-slate-800/50 rounded-2xl text-blue-400 border border-slate-700/50 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Mobile Contact</p>
                  <a href={`tel:${PERSONAL_INFO.mobile}`} className="text-xl font-bold text-white hover:text-blue-400 transition-colors tracking-tight">{PERSONAL_INFO.mobile}</a>
                </div>
              </div>
              <div className="flex items-center gap-5 group">
                <div className="p-4 bg-slate-800/50 rounded-2xl text-blue-400 border border-slate-700/50 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">E-mail Address</p>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xl font-bold text-white hover:text-blue-400 transition-colors break-all tracking-tight">{PERSONAL_INFO.email}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Add New Project Card */}
            <div 
              onClick={openAddModal}
              className="group cursor-pointer bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-3xl p-12 flex flex-col items-center justify-center text-center gap-6 hover:border-blue-500/50 transition-all duration-500 hover:bg-slate-900/50 min-h-[400px]"
            >
              <div className="w-20 h-20 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:scale-125 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-2xl">
                <Plus size={40} />
              </div>
              <div>
                <h3 className="text-xl font-black font-orbitron text-white mb-2">ADD PRODUCT</h3>
                <p className="text-slate-500 text-sm">Upload new game thumbnail & specs</p>
              </div>
            </div>

            {projects.map((project) => (
              <div 
                key={project.id} 
                className="group relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-blue-500/40 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] flex flex-col"
              >
                {/* Quick Edit Overlay */}
                <button 
                  onClick={(e) => { e.stopPropagation(); openEditModal(project); }}
                  className="absolute top-4 right-4 z-10 p-3 bg-slate-950/80 backdrop-blur-md rounded-xl text-blue-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-600 hover:text-white"
                >
                  <Edit3 size={18} />
                </button>

                <div className="aspect-[16/10] overflow-hidden relative cursor-pointer" onClick={() => setSelectedProject(project)}>
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="bg-white text-slate-950 px-6 py-3 rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      View Project <ExternalLink size={14} />
                    </div>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col cursor-pointer" onClick={() => setSelectedProject(project)}>
                  <span className="inline-block text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3 bg-blue-500/10 px-3 py-1 rounded-full w-fit">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-4">{project.title}</h3>
                  <div className="mt-auto flex items-center gap-2 text-slate-500 font-bold text-xs group-hover:text-slate-300 transition-colors">
                    EXPLORE SPECS <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Form Modal (Add/Edit) */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl max-h-[92vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-500">
            <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <h3 className="font-orbitron text-xl font-black text-white flex items-center gap-3">
                <Gamepad2 className="text-blue-500" /> {isEditing ? 'EDIT GAME ENTRY' : 'NEW GAME ENTRY'}
              </h3>
              <button onClick={() => setIsFormModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto space-y-8 flex-1 custom-scrollbar bg-slate-950/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Game Title</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    placeholder="e.g. Cyber Rush"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all"
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Category</label>
                  <input 
                    type="text" 
                    value={formData.category}
                    placeholder="e.g. Action RPG"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all"
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Visual Assets</label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Thumbnail Upload */}
                  <div 
                    onClick={() => thumbInputRef.current?.click()}
                    className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative group
                      ${thumbPreview ? 'border-blue-500/50' : 'border-slate-800 hover:border-blue-500/30'}`}
                  >
                    {thumbPreview ? (
                      <>
                        <img src={thumbPreview} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Upload className="text-white" />
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload size={32} className="text-slate-600 mb-2" />
                        <span className="text-[10px] font-bold text-slate-500">THUMBNAIL (1:1)</span>
                      </>
                    )}
                    <input ref={thumbInputRef} type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, 'thumb')} />
                  </div>

                  {/* Cover Upload */}
                  <div 
                    onClick={() => coverInputRef.current?.click()}
                    className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative group
                      ${coverPreview ? 'border-blue-500/50' : 'border-slate-800 hover:border-blue-500/30'}`}
                  >
                    {coverPreview ? (
                      <>
                        <img src={coverPreview} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Upload className="text-white" />
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload size={32} className="text-slate-600 mb-2" />
                        <span className="text-[10px] font-bold text-slate-500">COVER (HERO)</span>
                      </>
                    )}
                    <input ref={coverInputRef} type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, 'cover')} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Role & Responsibilities</label>
                <input 
                  type="text" 
                  value={formData.role}
                  placeholder="e.g. Lead Designer, System Balancing"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all"
                  onChange={e => setFormData({...formData, role: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Description</label>
                <textarea 
                  rows={3}
                  value={formData.description}
                  placeholder="Detailed project summary..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all resize-none"
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              {/* Deployment Hub Links */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <LinkIcon size={12} /> Deployment Hub Links
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"><Play size={16} /></div>
                    <input 
                      type="text" 
                      value={formData.playStoreUrl}
                      placeholder="Google Play URL"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:border-green-500 outline-none transition-all"
                      onChange={e => setFormData({...formData, playStoreUrl: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"><Apple size={16} /></div>
                    <input 
                      type="text" 
                      value={formData.appStoreUrl}
                      placeholder="App Store URL"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:border-white outline-none transition-all"
                      onChange={e => setFormData({...formData, appStoreUrl: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"><Download size={16} /></div>
                    <input 
                      type="text" 
                      value={formData.apkPureUrl}
                      placeholder="APKPure URL"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                      onChange={e => setFormData({...formData, apkPureUrl: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"><Youtube size={16} /></div>
                    <input 
                      type="text" 
                      value={formData.youtubeUrl}
                      placeholder="YouTube URL"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:border-red-500 outline-none transition-all"
                      onChange={e => setFormData({...formData, youtubeUrl: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-800 bg-slate-900/50">
              <button 
                onClick={handleSubmit}
                disabled={!formData.title || !thumbPreview}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl"
              >
                <Save size={20} /> {isEditing ? 'COMMIT UPDATES' : 'INITIALIZE PROJECT DATA'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Modal (Viewer) */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={closeModal}
        >
          <div 
            className="bg-slate-900 border border-slate-800 w-full max-w-5xl max-h-[92vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Hero */}
            <div className="relative h-72 md:h-96 shrink-0">
              <img 
                src={selectedProject.coverImageUrl || selectedProject.imageUrl} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
              
              <div className="absolute top-8 right-8 flex items-center gap-3 z-10">
                <button 
                  onClick={() => openEditModal(selectedProject)}
                  className="p-3 bg-blue-600/90 hover:bg-blue-500 rounded-full text-white transition-all hover:scale-110 shadow-lg"
                >
                  <Edit3 size={24} />
                </button>
                <button 
                  onClick={closeModal}
                  className="p-3 bg-slate-950/80 backdrop-blur-md rounded-full text-white hover:bg-red-600 transition-all hover:scale-110 shadow-lg"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="absolute bottom-8 left-10 right-10">
                <p className="text-blue-500 text-xs font-black uppercase tracking-[0.4em] mb-3">{selectedProject.category}</p>
                <h2 className="text-4xl md:text-6xl font-black font-orbitron text-white uppercase tracking-tighter">{selectedProject.title}</h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-10 md:p-14 overflow-y-auto custom-scrollbar flex-1 bg-gradient-to-b from-slate-900 to-slate-950">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-7 space-y-12">
                  <div>
                    <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                      <span className="w-8 h-[2px] bg-blue-600"></span> Mission Description
                    </h4>
                    <p className="text-slate-300 text-xl leading-relaxed font-light whitespace-pre-line">{selectedProject.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                      <span className="w-8 h-[2px] bg-blue-600"></span> Key Responsibilities
                    </h4>
                    <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-[2rem] text-slate-200 leading-relaxed shadow-inner">
                      <p className="text-lg font-medium italic text-slate-300">
                        {selectedProject.role}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                      <span className="w-8 h-[2px] bg-blue-600"></span> Development Arsenal
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.techStack.length > 0 ? selectedProject.techStack.map(tech => (
                        <span key={tech} className="px-5 py-2 bg-blue-600/5 text-blue-400 border border-blue-500/20 text-xs font-black rounded-xl uppercase tracking-widest">{tech}</span>
                      )) : <span className="text-slate-600 italic text-xs uppercase tracking-widest">Internal Tech Only</span>}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="bg-slate-800/20 border border-slate-700/50 p-10 rounded-[2.5rem] sticky top-0">
                    <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-8 text-center">Deployment Hub</h4>
                    <div className="flex flex-col gap-4">
                      {selectedProject.playStoreUrl ? (
                        <a href={selectedProject.playStoreUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 bg-slate-900 border border-slate-700 rounded-2xl hover:bg-green-600/10 hover:border-green-600/50 transition-all group">
                          <div className="flex items-center gap-4">
                            <Play size={24} className="text-green-500" />
                            <span className="font-bold text-sm tracking-tight">GOOGLE PLAY</span>
                          </div>
                          <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : null}
                      {selectedProject.appStoreUrl ? (
                        <a href={selectedProject.appStoreUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 bg-slate-900 border border-slate-700 rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all group">
                          <div className="flex items-center gap-4">
                            <Apple size={24} className="text-white" />
                            <span className="font-bold text-sm tracking-tight">APP STORE</span>
                          </div>
                          <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : null}
                      {selectedProject.apkPureUrl ? (
                        <a href={selectedProject.apkPureUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 bg-slate-900 border border-slate-700 rounded-2xl hover:bg-emerald-600/10 hover:border-emerald-600/50 transition-all group">
                          <div className="flex items-center gap-4">
                            <Download size={24} className="text-emerald-500" />
                            <span className="font-bold text-sm tracking-tight">APK PURE</span>
                          </div>
                          <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : null}
                      {selectedProject.youtubeUrl ? (
                        <a href={selectedProject.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 bg-slate-900 border border-slate-700 rounded-2xl hover:bg-red-600/10 hover:border-red-600/50 transition-all group">
                          <div className="flex items-center gap-4">
                            <Youtube size={24} className="text-red-500" />
                            <span className="font-bold text-sm tracking-tight">GAMEPLAY VIDEO</span>
                          </div>
                          <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : null}
                      {!selectedProject.playStoreUrl && !selectedProject.appStoreUrl && !selectedProject.apkPureUrl && !selectedProject.youtubeUrl && (
                        <div className="p-8 text-center text-slate-500 text-sm italic border border-dashed border-slate-800 rounded-2xl">
                          No public links available for this entry.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-slate-900 bg-slate-950/50 mt-12">
        <div className="container mx-auto text-center">
          <div className="font-orbitron text-2xl font-black tracking-tighter mb-6">
            VINH<span className="text-blue-500">GAMES</span>
          </div>
          <p className="text-slate-500 text-sm mb-4">© 2024 {PERSONAL_INFO.name}</p>
          <div className="w-12 h-[1px] bg-slate-800 mx-auto mb-4"></div>
          <p className="text-slate-600 text-[10px] font-black tracking-[0.5em] uppercase">Built for Excellence</p>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
};

export default App;
