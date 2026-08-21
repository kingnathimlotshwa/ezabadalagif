import React from 'react';
import type { RedGif } from '../../types/redgifs';
import { GifCard } from './GifCard';

interface GalleryProps {
  gifs: RedGif[];
  onGifClick: (gif: RedGif) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ gifs, onGifClick }) => {
  return (
    <>
      {gifs.map((gif) => (
        <GifCard key={gif.id} gif={gif} onClick={onGifClick} />
      ))}
    </>
  );
};
