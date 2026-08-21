import React from 'react';
import { useIntersection } from '../../hooks/useIntersection';

interface GifCardProps {
  gif: any;
  onClick: (gif: any) => void;
}

export const GifCard: React.FC<GifCardProps> = ({ gif, onClick }) => {
  const { targetRef, isIntersecting } = useIntersection<HTMLDivElement>({ threshold: 0.6 });

  const videoUrl = gif?.urls?.hd || gif?.urls?.sd || '';

  if (!videoUrl) {
    return (
      <div
        ref={targetRef}
        className="h-screen w-full bg-gray-900 flex items-center justify-center text-gray-600 text-xs p-4 snap-start"
      >
        No Media
      </div>
    );
  }

  return (
    <div
      ref={targetRef}
      onClick={() => onClick(gif)}
      className="relative h-screen w-full overflow-hidden snap-start bg-black"
    >
      <video
        src={videoUrl}
        autoPlay={isIntersecting}
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
      />

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
        <div className="flex flex-col gap-2 mb-4">
          <div className="text-white font-bold text-lg">
            @{gif?.userName || 'Unknown'}
          </div>
          <div className="flex flex-wrap gap-2">
            {gif?.tags?.map((tag: string) => (
              <span key={tag} className="text-white/80 text-sm font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
