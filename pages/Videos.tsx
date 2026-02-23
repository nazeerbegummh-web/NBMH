
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Youtube, 
  PlayCircle, 
  ShieldCheck, 
  Heart, 
  ArrowRight, 
  Play, 
  Pause,
  Volume2, 
  VolumeX,
  Maximize,
  Clock, 
  Sparkles,
  Loader2,
  ChevronRight,
  MonitorPlay
} from 'lucide-react';
import { Meta } from '../App';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface VideoItem {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  embedId: string;
}

const CustomVideoPlayer: React.FC<{ video: VideoItem }> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [isReady, setIsReady] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<any>(null);

  useEffect(() => {
    // Simplified Initialization to ensure playback works every time
    const initPlayer = () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }

      playerRef.current = new window.YT.Player(`main-player`, {
        videoId: video.embedId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          mute: 0
        },
        events: {
          onReady: (event: any) => {
            setIsReady(true);
            setDuration(formatTime(event.target.getDuration()));
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            setIsPlaying(event.data === 1);
          }
        }
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    const interval = setInterval(() => {
      if (playerRef.current && isPlaying && typeof playerRef.current.getCurrentTime === 'function') {
        const current = playerRef.current.getCurrentTime();
        const total = playerRef.current.getDuration();
        if (total > 0) {
          setProgress((current / total) * 100);
          setCurrentTime(formatTime(current));
        }
      }
    }, 500);

    return () => {
      clearInterval(interval);
      if (playerRef.current) playerRef.current.destroy();
    };
  }, [video.embedId]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (!playerRef.current || !isReady) return;
    if (isPlaying) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!playerRef.current || !isReady) return;
    const seekTo = (parseFloat(e.target.value) / 100) * playerRef.current.getDuration();
    playerRef.current.seekTo(seekTo, true);
    setProgress(parseFloat(e.target.value));
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value);
    setVolume(v);
    if (playerRef.current && isReady) {
      playerRef.current.setVolume(v);
      setIsMuted(v === 0);
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current?.requestFullscreen) containerRef.current.requestFullscreen();
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => { if (isPlaying) setShowControls(false); }, 3000);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative aspect-video w-full rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl bg-black ring-8 ring-white group"
    >
      <div id={`main-player`} className="w-full h-full" />
      
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-secondary z-50">
          <Loader2 className="text-brand-tertiary animate-spin" size={64} />
        </div>
      )}

      <div onClick={togglePlay} className="absolute inset-0 cursor-pointer z-10" />

      {(!isPlaying || !isReady) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="w-24 h-24 bg-brand-tertiary text-white rounded-full flex items-center justify-center shadow-2xl animate-pulse">
            <Play size={40} fill="currentColor" className="ml-2" />
          </div>
        </div>
      )}

      <div className={`absolute bottom-0 left-0 w-full p-6 md:p-10 bg-gradient-to-t from-black/90 to-transparent transition-all duration-500 z-30 ${showControls || !isPlaying ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="relative w-full mb-6 group/progress h-1.5 bg-white/20 rounded-full cursor-pointer">
          <input 
            type="range" min="0" max="100" step="0.1" value={progress} onChange={handleSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="h-full bg-brand-tertiary rounded-full shadow-[0_0_15px_#1fb036]" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={togglePlay} className="text-white hover:text-brand-tertiary transition-transform active:scale-90">
              {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
            </button>
            <div className="flex items-center gap-4 group/volume">
              <Volume2 size={24} className="text-white" />
              <input type="range" min="0" max="100" value={volume} onChange={handleVolume} className="w-24 h-1 accent-brand-tertiary" />
            </div>
            <span className="text-white/80 font-mono text-xs hidden sm:block">{currentTime} / {duration}</span>
          </div>
          <button onClick={toggleFullscreen} className="text-white hover:text-brand-tertiary"><Maximize size={24} /></button>
        </div>
      </div>
    </div>
  );
};

const Videos: React.FC = () => {
  const videoGallery: VideoItem[] = [
    {
      id: 'v1',
      title: "Quality Care Virtual Tour",
      description: "Step inside Nazeer Begum Memorial Hospital (NBMH). A comprehensive look at our PH 8 Bahria Town infrastructure and critical care units.",
      category: "Hospital Tour",
      duration: "04:15",
      embedId: "ky-HM1547Ok" // These should be real IDs from your channel
    },
    {
      id: 'v2',
      title: "Expert Maternity Insights",
      description: "Dr. Madiha Batool explains our approach to compassionate maternity care and neonatal support for families in Rawalpindi.",
      category: "Specialist Message",
      duration: "03:45",
      embedId: "ky-HM1547Ok"
    },
    {
      id: 'v3',
      title: "24/7 Emergency Response",
      description: "Inside our specialized emergency department. See how we manage rapid trauma response around the clock.",
      category: "Facility Insight",
      duration: "02:30",
      embedId: "ky-HM1547Ok"
    }
  ];

  const [activeVideo, setActiveVideo] = useState<VideoItem>(videoGallery[0]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSelect = (v: VideoItem) => {
    setActiveVideo(v);
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="bg-[#fcfaf7] min-h-screen pb-24">
      <Meta title="Media Library | Virtual Hospital Experience" description="Watch educational videos and virtual tours from Nazeer Begum Memorial Hospital." />

      <section className="bg-brand-secondary py-28 md:py-40 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(31,176,54,0.1),transparent_70%)]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-8">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-brand-tertiary border border-white/10">
            <MonitorPlay size={14} /> Clinical Media Hub
          </div>
          <h1 className="text-5xl md:text-8xl font-bold font-serif italic leading-none animate-in fade-in slide-in-from-bottom duration-700">
            Insights & <br/><span className="text-brand-tertiary">Virtual Care</span>
          </h1>
          <p className="text-white/50 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Experience our clinical facilities and expert guidance through our verified media portal.
          </p>
        </div>
      </section>

      <div ref={scrollRef} className="max-w-7xl mx-auto px-6 -mt-24 relative z-20">
        <div className="bg-white rounded-[3.5rem] shadow-2xl p-6 md:p-12 border border-slate-100">
          <CustomVideoPlayer video={activeVideo} />
          <div className="mt-12 flex flex-col lg:flex-row justify-between items-start gap-12 border-t border-slate-50 pt-12">
            <div className="max-w-3xl space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-tertiary bg-brand-tertiary/5 px-4 py-1.5 rounded-full">{activeVideo.category}</span>
              <h2 className="text-4xl md:text-6xl font-bold text-brand-secondary font-serif italic">{activeVideo.title}</h2>
              <p className="text-slate-500 text-lg md:text-xl font-medium">{activeVideo.description}</p>
            </div>
            <a 
              href="https://www.youtube.com/@nazeerbegummemorialhospita3202?sub_confirmation=1" 
              target="_blank" rel="noreferrer"
              className="bg-brand-primary text-white px-12 py-6 rounded-3xl font-bold uppercase tracking-widest text-xs flex items-center gap-4 hover:bg-black transition-all shadow-xl active:scale-95 shrink-0 w-full lg:w-auto justify-center"
            >
              <Youtube size={24} /> Subscribe to Channel
            </a>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center gap-4 mb-12">
           <h3 className="text-3xl font-bold text-brand-secondary font-serif italic">Video <span className="text-brand-tertiary">Registry</span></h3>
           <div className="flex-grow h-px bg-slate-100"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {videoGallery.map((v) => (
            <div 
              key={v.id} onClick={() => handleSelect(v)}
              className={`group bg-white rounded-[2.5rem] overflow-hidden border transition-all cursor-pointer ${activeVideo.id === v.id ? 'border-brand-tertiary ring-4 ring-brand-tertiary/10' : 'border-slate-100 hover:shadow-2xl'}`}
            >
              <div className="relative aspect-video">
                <img src={`https://img.youtube.com/vi/${v.embedId}/mqdefault.jpg`} className="w-full h-full object-cover" alt={v.title} />
                <div className="absolute inset-0 bg-brand-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <PlayCircle size={48} className="text-white" />
                </div>
              </div>
              <div className="p-8 space-y-4">
                <p className="text-[9px] font-black uppercase text-brand-tertiary tracking-widest">{v.category}</p>
                <h4 className="text-xl font-bold text-brand-secondary font-serif line-clamp-1">{v.title}</h4>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase">
                  Watch Now <ChevronRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 text-center">
         <div className="bg-brand-primary rounded-[3.5rem] p-12 md:p-20 text-white space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5"><ShieldCheck size={200} /></div>
            <h2 className="text-4xl md:text-6xl font-bold font-serif italic">Clinical Transparency</h2>
            <p className="text-white/60 text-lg font-medium max-w-2xl mx-auto">"Our media library bridge the gap between patient and provider through digital insight."</p>
            <div className="pt-6">
               <Link to="/appointment" className="bg-white text-brand-primary px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-tertiary hover:text-white transition-all shadow-2xl inline-block">Book Your Visit</Link>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Videos;
