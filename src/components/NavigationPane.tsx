import React, { useState } from 'react';
import { useDocument } from '../context/DocumentContext';

interface NavigationPaneProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavigationPane: React.FC<NavigationPaneProps> = ({ isOpen, onClose }) => {
  const { editorRef, findAndReplace } = useDocument();
  const [tab, setTab] = useState<'headings' | 'pages' | 'results'>('headings');
  const [searchTerm, setSearchTerm] = useState('');
  const [matchCount, setMatchCount] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (val.trim()) {
      const count = findAndReplace(val, val);
      setMatchCount(count);
    } else {
      setMatchCount(null);
    }
  };

  // Extract headings from editor
  const headings = editorRef.current
    ? Array.from(editorRef.current.querySelectorAll('h1, h2, h3')).map((el, i) => ({
        id: i,
        text: el.textContent || `Heading ${i + 1}`,
        level: el.tagName.toLowerCase(),
        element: el as HTMLElement,
      }))
    : [];

  const scrollToElement = (el: HTMLElement) => {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="w-[220px] h-full bg-[#edf3fa] border-r border-[#abbfd5] flex flex-col z-20 select-none font-sans">
      {/* Header */}
      <div className="h-[24px] bg-gradient-to-b from-[#d9e7f7] to-[#c4dbf2] border-b border-[#a9c1d9] px-2 flex items-center justify-between">
        <span className="text-[11px] font-sans font-semibold text-[#1c395c]">Navigation</span>
        <button onClick={onClose} className="text-[10px] text-gray-500 hover:text-black">✕</button>
      </div>

      {/* Search Bar */}
      <div className="p-2 border-b border-[#c8d8ea] bg-white">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search document"
            className="w-full h-[22px] px-2 pr-6 text-[11px] border border-[#abc1db] rounded-[2px]"
          />
          <span className="absolute right-2 text-gray-400 text-[11px]">🔍</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#c8d8ea] text-[10px] bg-[#e1edf9]">
        <button
          onClick={() => setTab('headings')}
          className={`flex-1 py-1 text-center font-medium ${
            tab === 'headings' ? 'bg-white border-b-2 border-blue-600 text-blue-900 font-semibold' : 'text-gray-600'
          }`}
        >
          Headings
        </button>
        <button
          onClick={() => setTab('pages')}
          className={`flex-1 py-1 text-center font-medium ${
            tab === 'pages' ? 'bg-white border-b-2 border-blue-600 text-blue-900 font-semibold' : 'text-gray-600'
          }`}
        >
          Pages
        </button>
        <button
          onClick={() => setTab('results')}
          className={`flex-1 py-1 text-center font-medium ${
            tab === 'results' ? 'bg-white border-b-2 border-blue-600 text-blue-900 font-semibold' : 'text-gray-600'
          }`}
        >
          Results
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-2 text-[11px]">
        {tab === 'headings' && (
          <div>
            {headings.length > 0 ? (
              <div className="space-y-1">
                {headings.map((h) => (
                  <div
                    key={h.id}
                    onClick={() => scrollToElement(h.element)}
                    className="p-1 hover:bg-blue-100 rounded cursor-pointer truncate text-[#1e395b]"
                    style={{
                      paddingLeft: h.level === 'h1' ? '4px' : h.level === 'h2' ? '14px' : '24px',
                      fontWeight: h.level === 'h1' ? 'bold' : 'normal',
                    }}
                  >
                    • {h.text}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 italic p-2 text-center">
                This document does not contain headings. Apply Heading styles to jump between sections.
              </div>
            )}
          </div>
        )}

        {tab === 'pages' && (
          <div className="flex flex-col items-center p-2">
            <div className="w-[100px] h-[130px] bg-white border border-[#9bb5d1] shadow-xs flex items-center justify-center text-[11px] text-gray-500 mb-1">
              Page 1
            </div>
            <span className="text-[10px] text-gray-600">Page 1 of 1</span>
          </div>
        )}

        {tab === 'results' && (
          <div>
            {searchTerm ? (
              <div className="p-1 text-gray-700">
                {matchCount !== null && matchCount > 0 ? (
                  <div>Found <strong>{matchCount}</strong> match(es) for &quot;{searchTerm}&quot;.</div>
                ) : (
                  <div>No matches found.</div>
                )}
              </div>
            ) : (
              <div className="text-gray-500 italic p-2">Type in the search box to find text in this document.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
