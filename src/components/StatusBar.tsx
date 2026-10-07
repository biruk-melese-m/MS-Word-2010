import React from 'react';
import {
  ProofingIcon,
  PrintLayoutIcon,
  FullScreenReadingIcon,
  WebLayoutIcon,
  OutlineIcon,
  DraftIcon,
} from './WordIcons';
import { DocumentViewMode } from '../types';
import { useDocument } from '../context/DocumentContext';

interface StatusBarProps {
  zoomLevel: number;
  setZoomLevel: (zoom: number) => void;
  viewMode: DocumentViewMode;
  setViewMode: (mode: DocumentViewMode) => void;
  onOpenZoomDialog?: () => void;
  onOpenWordCountDialog?: () => void;
  onOpenSpellingDialog?: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  zoomLevel,
  setZoomLevel,
  viewMode,
  setViewMode,
  onOpenZoomDialog,
  onOpenWordCountDialog,
  onOpenSpellingDialog,
}) => {
  const { wordCountStats, savedStatus } = useDocument();

  const handleZoomChange = (delta: number) => {
    const newZoom = Math.min(200, Math.max(50, zoomLevel + delta));
    setZoomLevel(newZoom);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZoomLevel(parseInt(e.target.value, 10));
  };

  return (
    <div className="h-[22px] bg-gradient-to-b from-[#c4d7ec] via-[#b4cce7] to-[#a3bedf] border-t border-[#93b0cf] flex items-center justify-between px-2 text-[11px] font-sans text-[#1c385b] select-none shadow-xs">
      {/* Left: Document Status Items */}
      <div className="flex items-center gap-2">
        <button
          title="The page number in the document."
          className="office-btn px-1.5 py-0.5 text-[#1e395b] hover:bg-[#d8e6f7]"
        >
          Page: 1 of {wordCountStats.pages}
        </button>

        <button
          onClick={onOpenWordCountDialog}
          title="The number of words in the document. Click to view word count statistics."
          className="office-btn px-1.5 py-0.5 text-[#1e395b] hover:bg-[#d8e6f7] font-medium"
        >
          Words: {wordCountStats.words}
        </button>

        <button
          onClick={onOpenSpellingDialog}
          title="Proofing status. Click to run spelling & grammar check."
          className="office-btn px-1 py-0.5 flex items-center justify-center hover:bg-[#d8e6f7]"
        >
          <ProofingIcon size={13} />
        </button>

        <button
          title="The language used in the document."
          className="office-btn px-1.5 py-0.5 text-[#1e395b] hover:bg-[#d8e6f7]"
        >
          English (U.S.)
        </button>

        {/* Autosave status indicator */}
        <span className="text-[10px] text-gray-600 italic px-1">
          {savedStatus}
        </span>
      </div>

      {/* Right: Document Views & Zoom Slider */}
      <div className="flex items-center gap-3">
        {/* View Mode Shortcuts */}
        <div className="flex items-center gap-0.5 border-r border-[#9cb6d3] pr-2">
          <button
            title="Print Layout"
            onClick={() => setViewMode('print-layout')}
            className={`office-btn p-0.5 ${viewMode === 'print-layout' ? 'active' : ''}`}
          >
            <PrintLayoutIcon size={14} />
          </button>
          <button
            title="Full Screen Reading"
            onClick={() => setViewMode('full-screen')}
            className={`office-btn p-0.5 ${viewMode === 'full-screen' ? 'active' : ''}`}
          >
            <FullScreenReadingIcon size={14} />
          </button>
          <button
            title="Web Layout"
            onClick={() => setViewMode('web-layout')}
            className={`office-btn p-0.5 ${viewMode === 'web-layout' ? 'active' : ''}`}
          >
            <WebLayoutIcon size={14} />
          </button>
          <button
            title="Outline"
            onClick={() => setViewMode('outline')}
            className={`office-btn p-0.5 ${viewMode === 'outline' ? 'active' : ''}`}
          >
            <OutlineIcon size={14} />
          </button>
          <button
            title="Draft"
            onClick={() => setViewMode('draft')}
            className={`office-btn p-0.5 ${viewMode === 'draft' ? 'active' : ''}`}
          >
            <DraftIcon size={14} />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleZoomChange(-10)}
            title="Zoom Out"
            className="office-btn w-[15px] h-[15px] flex items-center justify-center font-bold text-[#234267] text-[12px] leading-none"
          >
            −
          </button>

          <div className="relative flex items-center w-[100px]">
            <div className="absolute left-[50%] top-[-2px] bottom-[-2px] w-[1px] bg-[#6182a4] pointer-events-none" />
            <input
              type="range"
              min="50"
              max="200"
              value={zoomLevel}
              onChange={handleSliderChange}
              title={`Zoom: ${zoomLevel}%`}
              className="w-full h-[4px] bg-[#cbdbee] border border-[#7b9ab9] rounded-lg appearance-none cursor-pointer accent-[#2563eb]"
            />
          </div>

          <button
            onClick={() => handleZoomChange(10)}
            title="Zoom In"
            className="office-btn w-[15px] h-[15px] flex items-center justify-center font-bold text-[#234267] text-[12px] leading-none"
          >
            +
          </button>

          <button
            onClick={onOpenZoomDialog}
            title="Zoom level. Click to open the Zoom dialog."
            className="office-btn px-1 py-0.5 min-w-[38px] text-right text-[#1c385b] font-medium"
          >
            {zoomLevel}%
          </button>
        </div>
      </div>
    </div>
  );
};
