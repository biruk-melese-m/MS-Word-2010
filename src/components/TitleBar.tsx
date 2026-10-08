import React, { useState } from 'react';
import {
  WordAppIcon,
  SaveIcon,
  UndoIcon,
  RedoIcon,
  QatDropdownIcon,
  WinMinimizeIcon,
  WinMaximizeIcon,
  WinCloseIcon,
  ArrowDownIcon,
} from './WordIcons';
import { useDocument } from '../context/DocumentContext';

interface TitleBarProps {
  isRibbonCollapsed?: boolean;
  onToggleRibbon?: () => void;
  onHelpClick?: () => void;
  onOpenDialog?: (dialog: string) => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({
  isRibbonCollapsed = false,
  onToggleRibbon,
  onHelpClick,
  onOpenDialog,
}) => {
  const {
    docTitle,
    setDocTitle,
    isReadOnly,
    isProtected,
    saveDocument,
    undo,
    redo,
    canUndo,
    canRedo,
    printDocument,
  } = useDocument();

  const [showQatMenu, setShowQatMenu] = useState(false);
  const [showAppMenu, setShowAppMenu] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  return (
    <div className="h-[28px] bg-gradient-to-b from-[#d2e4f7] via-[#c2daf3] to-[#b3cde9] border-b border-[#9eb7d4] flex items-center justify-between px-1 select-none relative shadow-sm shrink-0">
      {/* Left: Quick Access Toolbar */}
      <div className="flex items-center gap-0.5 z-10 shrink-0">
        {/* Word 2010 App Icon with window menu */}
        <div className="relative">
          <button
            onClick={() => setShowAppMenu(!showAppMenu)}
            title="Microsoft Word"
            className="flex items-center justify-center p-0.5 hover:brightness-110 active:brightness-95"
          >
            <WordAppIcon size={19} />
          </button>

          {showAppMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowAppMenu(false)} />
              <div className="absolute top-[24px] left-0 w-[160px] bg-white border border-[#9bb5d1] shadow-lg rounded-[2px] py-1 z-50 text-[11px] font-sans">
                <div onClick={() => setShowAppMenu(false)} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">Restore</div>
                <div onClick={() => setShowAppMenu(false)} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">Minimize</div>
                <div onClick={() => setShowAppMenu(false)} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">Maximize</div>
                <div className="h-[1px] bg-gray-200 my-1" />
                <div onClick={() => setShowAppMenu(false)} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer font-bold">
                  Close <span className="float-right text-gray-400 font-normal">Alt+F4</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Save button */}
        <button
          onClick={saveDocument}
          title="Save (Ctrl+S)"
          className="office-btn w-[22px] h-[22px] flex items-center justify-center"
        >
          <SaveIcon size={15} />
        </button>

        {/* Undo button with active/disabled state */}
        <button
          onClick={undo}
          disabled={!canUndo}
          title={canUndo ? 'Undo (Ctrl+Z)' : 'Can\'t Undo'}
          className={`office-btn w-[22px] h-[22px] flex items-center justify-center ${
            !canUndo ? 'opacity-40 cursor-default' : ''
          }`}
        >
          <UndoIcon size={14} />
        </button>

        {/* Redo button with active/disabled state */}
        <button
          onClick={redo}
          disabled={!canRedo}
          title={canRedo ? 'Redo (Ctrl+Y)' : 'Can\'t Redo'}
          className={`office-btn w-[22px] h-[22px] flex items-center justify-center ${
            !canRedo ? 'opacity-40 cursor-default' : ''
          }`}
        >
          <RedoIcon size={14} />
        </button>

        {/* Customize Quick Access Toolbar */}
        <div className="relative">
          <button
            onClick={() => setShowQatMenu(!showQatMenu)}
            title="Customize Quick Access Toolbar"
            className="office-btn w-[14px] h-[22px] flex items-center justify-center"
          >
            <QatDropdownIcon size={8} />
          </button>

          {showQatMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowQatMenu(false)} />
              <div className="absolute top-[22px] left-0 w-[210px] bg-white border border-[#9bb5d1] shadow-lg rounded-[2px] py-1 z-50 text-[11px] font-sans">
                <div className="px-3 py-1 font-bold text-gray-700 bg-gray-50 border-b border-gray-100">
                  Customize Quick Access Toolbar
                </div>
                <div onClick={() => { saveDocument(); setShowQatMenu(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex items-center gap-2">
                  <span className="w-3 text-blue-600 font-bold">✓</span>
                  <span>Save</span>
                </div>
                <div onClick={() => { if (canUndo) undo(); setShowQatMenu(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex items-center gap-2">
                  <span className="w-3 text-blue-600 font-bold">✓</span>
                  <span>Undo</span>
                </div>
                <div onClick={() => { if (canRedo) redo(); setShowQatMenu(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex items-center gap-2">
                  <span className="w-3 text-blue-600 font-bold">✓</span>
                  <span>Redo</span>
                </div>
                <div onClick={() => { printDocument(); setShowQatMenu(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex items-center gap-2">
                  <span className="w-3"></span>
                  <span>Quick Print</span>
                </div>
                <div onClick={() => { onOpenDialog?.('spelling'); setShowQatMenu(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex items-center gap-2">
                  <span className="w-3"></span>
                  <span>Spelling & Grammar</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Center: Title (Responsive, click-to-rename) */}
      <div className="absolute inset-x-24 inset-y-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        {isEditingTitle ? (
          <input
            type="text"
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
            onBlur={() => setIsEditingTitle(false)}
            onKeyDown={(e) => { if (e.key === 'Enter') setIsEditingTitle(false); }}
            autoFocus
            className="pointer-events-auto h-5 px-1.5 text-[12px] font-sans font-semibold text-[#1c385b] border border-blue-400 bg-white rounded max-w-[280px]"
          />
        ) : (
          <span
            onClick={() => setIsEditingTitle(true)}
            title="Click to rename document"
            className="pointer-events-auto cursor-pointer hover:underline text-[12px] font-sans font-semibold text-[#1c385b] tracking-wide drop-shadow-[0_1px_0_rgba(255,255,255,0.6)] truncate max-w-[320px] sm:max-w-[450px]"
          >
            {docTitle} {isReadOnly || isProtected ? '[Read-Only]' : ''} - Microsoft Word
          </span>
        )}
      </div>

      {/* Right: Window Controls */}
      <div className="flex items-center gap-1 z-10 shrink-0">
        <div className="flex items-center">
          <button title="Minimize" className="win-caption-btn">
            <WinMinimizeIcon size={10} />
          </button>
          <button title="Maximize / Restore" className="win-caption-btn">
            <WinMaximizeIcon size={10} />
          </button>
          <button title="Close" className="win-caption-btn close">
            <WinCloseIcon size={10} />
          </button>
        </div>
      </div>
    </div>
  );
};
