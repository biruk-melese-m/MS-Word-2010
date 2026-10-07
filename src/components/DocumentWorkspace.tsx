import React, { useState } from 'react';
import { RulerToggleIcon } from './WordIcons';
import { DocumentViewMode } from '../types';
import { useDocument } from '../context/DocumentContext';
import { NavigationPane } from './NavigationPane';
import { ContextMenu } from './ContextMenu';

interface DocumentWorkspaceProps {
  showRuler: boolean;
  setShowRuler: (show: boolean) => void;
  showGridlines: boolean;
  showNavigationPane: boolean;
  setShowNavigationPane: (show: boolean) => void;
  zoomLevel: number;
  viewMode: DocumentViewMode;
  onOpenDialog: (name: string) => void;
}

export const DocumentWorkspace: React.FC<DocumentWorkspaceProps> = ({
  showRuler,
  setShowRuler,
  showGridlines,
  showNavigationPane,
  setShowNavigationPane,
  zoomLevel,
  viewMode,
  onOpenDialog,
}) => {
  const {
    editorRef,
    isReadOnly,
    isProtected,
    updateSelectionState,
    pageLayout,
    headerText,
    setHeaderText,
    footerText,
    setFooterText,
    pageNumberPosition,
    comments,
    deleteComment,
    replyComment,
    activeCommentId,
    setActiveCommentId,
    footnotes,
    formatPainterActive,
    toggleFormatPainter,
    executeCommand,
    setFontFamily,
    setFontSize,
    undo,
    redo,
    selectAll,
    saveDocument,
    printDocument,
  } = useDocument();

  // Context Menu state
  const [contextMenuPos, setContextMenuPos] = useState<{ x: number; y: number } | null>(null);
  const [newReplyText, setNewReplyText] = useState<{ [id: string]: string }>({});

  const scale = zoomLevel / 100;
  const isLandscape = pageLayout.orientation === 'landscape';
  const pageWidth = isLandscape ? pageLayout.size.height : pageLayout.size.width;
  const pageHeight = isLandscape ? pageLayout.size.width : pageLayout.size.height;

  // Handle Right Click on Document
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPos({ x: e.clientX, y: e.clientY });
  };

  // Handle Keyboard Shortcuts inside Document Editor
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      const key = e.key.toLowerCase();
      if (key === 'b') { e.preventDefault(); executeCommand('bold'); }
      else if (key === 'i') { e.preventDefault(); executeCommand('italic'); }
      else if (key === 'u') { e.preventDefault(); executeCommand('underline'); }
      else if (key === 'z') { e.preventDefault(); undo(); }
      else if (key === 'y') { e.preventDefault(); redo(); }
      else if (key === 'a') { e.preventDefault(); selectAll(); }
      else if (key === 's') { e.preventDefault(); saveDocument(); }
      else if (key === 'p') { e.preventDefault(); printDocument(); }
      else if (key === 'f') { e.preventDefault(); onOpenDialog('find'); }
      else if (key === 'h') { e.preventDefault(); onOpenDialog('find'); }
      else if (key === 'k') { e.preventDefault(); onOpenDialog('hyperlink'); }
    }
  };

  // Handle Click for Format Painter
  const handleEditorClick = () => {
    updateSelectionState();
    if (formatPainterActive) {
      // Toggle off after applying
      toggleFormatPainter();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#8297b0] relative overflow-hidden select-none">
      {/* 1. Horizontal Ruler Bar */}
      {showRuler && viewMode !== 'web-layout' && (
        <div className="h-[21px] bg-[#dbe6f3] border-b border-[#a9c1d9] flex items-center z-20 shadow-xs">
          {/* Corner Tab-Stop Selector */}
          <div className="w-[21px] h-[21px] border-r border-[#a9c1d9] bg-[#e6eff9] flex items-center justify-center cursor-pointer hover:bg-[#fff9d7]" title="Left Tab Stop">
            <span className="font-mono text-[11px] font-bold text-[#334e68] -mt-0.5">∟</span>
          </div>

          {/* Horizontal Ruler Bar */}
          <div className="flex-1 h-full overflow-hidden flex items-center justify-center relative bg-[#cbd9eb]">
            <div
              className="h-full relative flex items-center"
              style={{ width: `${pageWidth * scale}px` }}
            >
              {/* Left Margin Indicator */}
              <div
                className="h-full bg-[#b8cce2] border-r border-[#8faecf] relative"
                style={{ width: `${pageLayout.margins.left * scale}px` }}
              >
                <div className="absolute right-[-4px] top-0 flex flex-col items-center z-10 cursor-ew-resize">
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-[#3b597c]" />
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[5px] border-b-[#3b597c] mt-[3px]" />
                  <div className="w-[8px] h-[3px] bg-[#3b597c] mt-[1px]" />
                </div>
              </div>

              {/* White Printable Width Area */}
              <div className="flex-1 h-full bg-white relative flex items-center justify-between overflow-hidden">
                {[1, 2, 3, 4, 5, 6, 7].map((inch) => (
                  <div
                    key={inch}
                    className="absolute top-0 bottom-0 flex flex-col items-center pointer-events-none"
                    style={{ left: `${(inch / 7.5) * 100}%` }}
                  >
                    <span className="text-[9px] font-sans text-[#486581] font-medium leading-none pt-0.5">{inch}</span>
                    <div className="w-[1px] h-[6px] bg-[#718da9] mt-auto" />
                  </div>
                ))}
              </div>

              {/* Right Margin Indicator */}
              <div
                className="h-full bg-[#b8cce2] border-l border-[#8faecf] relative"
                style={{ width: `${pageLayout.margins.right * scale}px` }}
              >
                <div className="absolute left-[-4px] bottom-0 flex flex-col items-center z-10 cursor-ew-resize">
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[5px] border-b-[#3b597c]" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Ruler Toggle Icon */}
          <div className="w-[17px] h-[21px] bg-[#dbe6f3] border-l border-[#a9c1d9] flex items-center justify-center">
            <button
              onClick={() => setShowRuler(!showRuler)}
              title="View Ruler"
              className="office-btn p-0.5"
            >
              <RulerToggleIcon size={12} />
            </button>
          </div>
        </div>
      )}

      {/* 2. Middle Area (Navigation Pane + Canvas + Comments) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Navigation Pane */}
        <NavigationPane
          isOpen={showNavigationPane}
          onClose={() => setShowNavigationPane(false)}
        />

        {/* Vertical Ruler (if enabled) */}
        {showRuler && viewMode !== 'web-layout' && (
          <div className="w-[21px] h-full bg-[#dbe6f3] border-r border-[#a9c1d9] flex flex-col items-center relative z-10">
            <div className="flex-1 w-full flex flex-col items-center justify-center overflow-hidden">
              <div
                className="w-full relative flex flex-col items-center"
                style={{ height: `${pageHeight * scale}px` }}
              >
                <div
                  className="w-full bg-[#b8cce2] border-b border-[#8faecf]"
                  style={{ height: `${pageLayout.margins.top * scale}px` }}
                />
                <div className="w-full flex-1 bg-white relative flex flex-col justify-between">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((inch) => (
                    <div
                      key={inch}
                      className="absolute right-0 flex items-center gap-0.5"
                      style={{ top: `${(inch / 10.5) * 100}%` }}
                    >
                      <span className="text-[8px] font-sans text-[#486581] font-medium leading-none">{inch}</span>
                      <div className="w-[5px] h-[1px] bg-[#718da9]" />
                    </div>
                  ))}
                </div>
                <div
                  className="w-full bg-[#b8cce2] border-t border-[#8faecf]"
                  style={{ height: `${pageLayout.margins.bottom * scale}px` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Document Canvas Workspace */}
        <div
          className={`flex-1 overflow-auto flex justify-center py-6 px-4 bg-[#8297b0] relative ${
            formatPainterActive ? 'cursor-crosshair' : ''
          }`}
        >
          {/* Main Document Paper Sheet */}
          <div
            className={`document-sheet relative transition-all duration-75 flex flex-col cursor-text select-text ${
              pageLayout.pageBorder ? 'border-4 border-[#334155]' : ''
            }`}
            style={{
              width: `${pageWidth * scale}px`,
              minHeight: `${pageHeight * scale}px`,
              backgroundColor: pageLayout.pageColor,
              paddingTop: `${pageLayout.margins.top * scale}px`,
              paddingBottom: `${pageLayout.margins.bottom * scale}px`,
              paddingLeft: `${pageLayout.margins.left * scale}px`,
              paddingRight: `${pageLayout.margins.right * scale}px`,
              direction: pageLayout.direction,
            }}
            onContextMenu={handleContextMenu}
          >
            {/* Optional Watermark */}
            {pageLayout.watermark && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
                <span
                  className="text-gray-300 font-bold opacity-30 tracking-widest uppercase transform -rotate-45"
                  style={{ fontSize: `${80 * scale}px` }}
                >
                  {pageLayout.watermark}
                </span>
              </div>
            )}

            {/* Optional Gridlines Overlay */}
            {showGridlines && (
              <div
                className="absolute inset-0 pointer-events-none opacity-30 z-0"
                style={{
                  backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
                  backgroundSize: '16px 16px',
                }}
              />
            )}

            {/* Header Area */}
            <div
              className="w-full mb-3 pb-1 border-b border-dashed border-gray-300 text-[11px] text-gray-400 flex items-center justify-between"
              style={{ fontSize: `${11 * scale}px` }}
            >
              <input
                type="text"
                value={headerText}
                onChange={(e) => setHeaderText(e.target.value)}
                placeholder="[Header - Double click to edit]"
                className="bg-transparent border-none outline-none text-gray-500 w-full"
              />
              {pageNumberPosition === 'top' && <span>Page 1</span>}
            </div>

            {/* Editable Document Body */}
            <div
              ref={editorRef}
              contentEditable={!isReadOnly && !isProtected}
              suppressContentEditableWarning
              onKeyUp={updateSelectionState}
              onMouseUp={updateSelectionState}
              onKeyDown={handleKeyDown}
              onClick={handleEditorClick}
              className="flex-1 outline-none relative z-10 font-sans"
              style={{
                fontFamily: 'Calibri, Arial, sans-serif',
                fontSize: `${14.6 * scale}px`,
                lineHeight: 1.15,
                color: '#000000',
                columnCount: pageLayout.columns,
                columnGap: '28px',
              }}
              dangerouslySetInnerHTML={{
                __html: `
                  <h1 style="color: #365f91; font-family: Calibri, sans-serif; font-size: 24px; margin-bottom: 12px; font-weight: bold;">Document1</h1>
                  <p style="font-family: Calibri, sans-serif; font-size: 14px; line-height: 1.25; margin-bottom: 10px; color: #1e293b;">
                    Welcome to Microsoft Word 2010. You can type, format text, insert tables and illustrations, adjust page layouts, add references, track changes, and manage your documents with authentic Office 2010 precision.
                  </p>
                  <p style="font-family: Calibri, sans-serif; font-size: 14px; line-height: 1.25; margin-bottom: 10px; color: #1e293b;">
                    Select any text to apply fonts, colors, alignments, or styles from the ribbon above. You can also use standard keyboard shortcuts like <span style="font-weight: bold;">Ctrl+B</span> for bold, <span style="font-style: italic;">Ctrl+I</span> for italic, and <span style="text-decoration: underline;">Ctrl+U</span> for underline.
                  </p>
                  <p style="font-family: Calibri, sans-serif; font-size: 14px; line-height: 1.25; margin-bottom: 10px; color: #1e293b;">
                    የአማርኛ ጽሑፍ ድጋፍም አለ (Amharic and full Unicode support included).
                  </p>
                `,
              }}
            />

            {/* Footnotes Area */}
            {footnotes.length > 0 && (
              <div className="mt-8 pt-2 border-t border-gray-400 text-[10px] text-gray-700">
                {footnotes.map((fn) => (
                  <div key={fn.id} className="mb-1">
                    <span className="font-bold mr-1">[{fn.number}]</span>
                    <span>{fn.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Footer Area */}
            <div
              className="w-full mt-auto pt-2 border-t border-dashed border-gray-300 text-[11px] text-gray-400 flex items-center justify-between"
              style={{ fontSize: `${11 * scale}px` }}
            >
              <input
                type="text"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                placeholder="[Footer - Double click to edit]"
                className="bg-transparent border-none outline-none text-gray-500 w-full"
              />
              {pageNumberPosition === 'bottom' && <span>Page 1</span>}
            </div>
          </div>

          {/* Comments Sidebar Bubbles */}
          {comments.length > 0 && (
            <div className="ml-4 w-[220px] flex flex-col gap-3">
              <div className="text-[11px] font-bold text-gray-800 bg-white/80 p-1 rounded border border-gray-300">
                Comments ({comments.length})
              </div>
              {comments.map((cm) => (
                <div
                  key={cm.id}
                  className="bg-[#fffbe8] border border-[#f59e0b] shadow-md rounded-[3px] p-2 text-[11px] font-sans"
                >
                  <div className="flex justify-between items-center mb-1 text-gray-600 font-semibold">
                    <span>{cm.author}</span>
                    <button
                      onClick={() => deleteComment(cm.id)}
                      className="text-red-500 hover:text-red-700 text-[10px]"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="text-gray-800 mb-2">{cm.text}</div>
                  {/* Replies */}
                  {cm.replies && cm.replies.map((rp, i) => (
                    <div key={i} className="pl-2 border-l border-amber-300 text-[10px] text-gray-600 mb-1">
                      <strong>{rp.author}:</strong> {rp.text}
                    </div>
                  ))}
                  {/* Reply Input */}
                  <div className="flex gap-1 mt-1">
                    <input
                      type="text"
                      placeholder="Reply..."
                      value={newReplyText[cm.id] || ''}
                      onChange={(e) => setNewReplyText({ ...newReplyText, [cm.id]: e.target.value })}
                      className="w-full text-[10px] border border-gray-300 px-1 rounded bg-white"
                    />
                    <button
                      onClick={() => {
                        if (newReplyText[cm.id]) {
                          replyComment(cm.id, newReplyText[cm.id]);
                          setNewReplyText({ ...newReplyText, [cm.id]: '' });
                        }
                      }}
                      className="text-[10px] px-1 bg-amber-500 text-white rounded font-bold"
                    >
                      ↵
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Windows 7 / Office 2010 Vertical Scrollbar */}
        <div className="w-[17px] h-full bg-[#eef3f9] border-l border-[#c2d3e4] flex flex-col justify-between select-none">
          <button className="w-[17px] h-[17px] flex items-center justify-center office-btn border-b border-[#a9c1d9] bg-gradient-to-b from-[#e8f0fa] to-[#d1e2f3]">
            <svg width="6" height="4" viewBox="0 0 6 4"><path d="M1 3L3 1L5 3" stroke="#41556e" strokeWidth="1.2" fill="none" /></svg>
          </button>
          <div className="flex-1 w-full relative px-[1px] py-2">
            <div className="w-full h-[120px] rounded-[2px] bg-gradient-to-r from-[#cfdef1] to-[#b8cde4] border border-[#9bb5d1] shadow-xs flex items-center justify-center cursor-pointer hover:from-[#b8d2ed] hover:to-[#9fc0e0]">
              <div className="flex flex-col gap-[2px]">
                <div className="w-[8px] h-[1px] bg-[#7b98b7]" />
                <div className="w-[8px] h-[1px] bg-[#7b98b7]" />
                <div className="w-[8px] h-[1px] bg-[#7b98b7]" />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <button className="w-[17px] h-[17px] flex items-center justify-center office-btn border-t border-[#a9c1d9] bg-gradient-to-b from-[#e8f0fa] to-[#d1e2f3]">
              <svg width="6" height="4" viewBox="0 0 6 4"><path d="M1 1L3 3L5 1" stroke="#41556e" strokeWidth="1.2" fill="none" /></svg>
            </button>
            <div className="flex flex-col border-t border-[#b8cce2] bg-[#e1edf9]">
              <button title="Previous Page" className="w-[17px] h-[16px] flex items-center justify-center office-btn text-[#41556e]">
                <svg width="7" height="6" viewBox="0 0 7 6"><path d="M1 3L3.5 1L6 3M1 5L3.5 3L6 5" stroke="#41556e" strokeWidth="1.1" fill="none" /></svg>
              </button>
              <button title="Select Browse Object" className="w-[17px] h-[16px] flex items-center justify-center office-btn text-[#2563eb]">
                <circle cx="3.5" cy="3.5" r="2.5" fill="#2563eb" />
              </button>
              <button title="Next Page" className="w-[17px] h-[16px] flex items-center justify-center office-btn text-[#41556e]">
                <svg width="7" height="6" viewBox="0 0 7 6"><path d="M1 1L3.5 3L6 1M1 3L3.5 5L6 3" stroke="#41556e" strokeWidth="1.1" fill="none" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right-Click Context Menu */}
      {contextMenuPos && (
        <ContextMenu
          x={contextMenuPos.x}
          y={contextMenuPos.y}
          isOpen={true}
          onClose={() => setContextMenuPos(null)}
          onOpenDialog={onOpenDialog}
        />
      )}
    </div>
  );
};
