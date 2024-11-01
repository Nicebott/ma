import React from 'react';
import { X } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-6xl">
        <button 
          onClick={onClose}
          className="absolute -top-4 -right-4 p-4 bg-red-600 rounded-full text-white hover:bg-red-700 transition-all shadow-lg z-[60]"
          aria-label="Cerrar reproductor"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="relative pt-[56.25%]">
          <iframe
            className="absolute inset-0 w-full h-full rounded-lg"
            src={videoUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;