import React from 'react';
import type { RedGif } from '../../types/redgifs';

interface VideoPlayerProps {
  gif: any; // Using any to be safe with the API response
  onClose: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ gif, onClose }) => {
  if (!gif) return null;

  // Corrected paths based on the JSON response
  const videoUrl = gif?.urls?.hd || gif?.urls?.sd || '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-full max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 text-xl"
        >
          Close ✕
        </button>

        <video
          src={videoUrl}
          controls
          autoPlay
          loop
          className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
        />

        <div className="mt-4 text-center text-white">
          <h3 className="text-lg font-bold">@{gif?.userName || 'Unknown'}</h3>
          <div className="flex gap-2 justify-center mt-2">
            {gif?.tags?.map((tag: string) => (
              <span key={tag} className="px-2 py-1 bg-gray-700 rounded text-xs">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
