import React from 'react';
import { useDocument } from '../context/DocumentContext';

interface ContextMenuProps {
  x: number;
  y: number;
  isOpen: boolean;
  onClose: () => void;
  onOpenDialog: (name: string) => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  isOpen,
  onClose,
  onOpenDialog,
}) => {
  const { cut, copy, paste, selectAll, clearFormatting, executeCommand } = useDocument();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50" onClick={onClose} onContextMenu={(e) => { e.preventDefault(); onClose(); }} />
      <div
        className="fixed z-50 bg-white border border-[#97b4d3] shadow-lg rounded-[2px] py-1 text-[11px] font-sans min-w-[170px] select-none text-[#1e293b]"
        style={{ left: Math.min(x, window.innerWidth - 180), top: Math.min(y, window.innerHeight - 240) }}
      >
        <button
          onClick={() => { cut(); onClose(); }}
          className="w-full text-left px-3 py-1 hover:bg-[#3399ff] hover:text-white flex items-center justify-between"
        >
          <span>Cut</span>
          <span className="text-[10px] text-gray-400">Ctrl+X</span>
        </button>
        <button
          onClick={() => { copy(); onClose(); }}
          className="w-full text-left px-3 py-1 hover:bg-[#3399ff] hover:text-white flex items-center justify-between"
        >
          <span>Copy</span>
          <span className="text-[10px] text-gray-400">Ctrl+C</span>
        </button>
        <button
          onClick={() => { paste(); onClose(); }}
          className="w-full text-left px-3 py-1 hover:bg-[#3399ff] hover:text-white flex items-center justify-between"
        >
          <span>Paste</span>
          <span className="text-[10px] text-gray-400">Ctrl+V</span>
        </button>

        <div className="h-[1px] bg-gray-200 my-1" />

        <button
          onClick={() => { onOpenDialog('font'); onClose(); }}
          className="w-full text-left px-3 py-1 hover:bg-[#3399ff] hover:text-white"
        >
          Font...
        </button>
        <button
          onClick={() => { onOpenDialog('paragraph'); onClose(); }}
          className="w-full text-left px-3 py-1 hover:bg-[#3399ff] hover:text-white"
        >
          Paragraph...
        </button>
        <button
          onClick={() => { executeCommand('insertUnorderedList'); onClose(); }}
          className="w-full text-left px-3 py-1 hover:bg-[#3399ff] hover:text-white"
        >
          Bullets
        </button>
        <button
          onClick={() => { executeCommand('insertOrderedList'); onClose(); }}
          className="w-full text-left px-3 py-1 hover:bg-[#3399ff] hover:text-white"
        >
          Numbering
        </button>

        <div className="h-[1px] bg-gray-200 my-1" />

        <button
          onClick={() => { onOpenDialog('hyperlink'); onClose(); }}
          className="w-full text-left px-3 py-1 hover:bg-[#3399ff] hover:text-white"
        >
          Hyperlink...
        </button>
        <button
          onClick={() => { clearFormatting(); onClose(); }}
          className="w-full text-left px-3 py-1 hover:bg-[#3399ff] hover:text-white"
        >
          Clear Formatting
        </button>
        <button
          onClick={() => { selectAll(); onClose(); }}
          className="w-full text-left px-3 py-1 hover:bg-[#3399ff] hover:text-white flex items-center justify-between"
        >
          <span>Select All</span>
          <span className="text-[10px] text-gray-400">Ctrl+A</span>
        </button>
      </div>
    </>
  );
};
