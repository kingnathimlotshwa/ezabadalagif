import React from 'react';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tags or creators..."
        className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            // The useGifs hook handles the query change
          }
        }}
      />
    </div>
  );
};
