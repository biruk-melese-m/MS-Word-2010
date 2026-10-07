import React, { useState, useRef } from 'react';
import { BackstageSection } from '../types';
import { useDocument } from '../context/DocumentContext';

interface BackstageViewProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOptionsDialog: () => void;
  onOpenProtectDialog: () => void;
}

export const BackstageView: React.FC<BackstageViewProps> = ({
  isOpen,
  onClose,
  onOpenOptionsDialog,
  onOpenProtectDialog,
}) => {
  const {
    docTitle,
    wordCountStats,
    saveDocument,
    saveAsDocument,
    openDocument,
    newDocument,
    newFromTemplate,
    printDocument,
    recentDocs,
    isProtected,
  } = useDocument();

  const [activeSection, setActiveSection] = useState<BackstageSection>('info');
  const [authorName, setAuthorName] = useState('User');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleOpenClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      openDocument(e.target.files[0]);
      onClose();
    }
  };

  return (
    <div className="absolute inset-0 top-[28px] z-50 bg-white flex select-none font-sans">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".docx,.doc,.txt,.html,.json"
        className="hidden"
      />

      {/* 1. Left Navigation Sidebar */}
      <div className="w-[145px] bg-gradient-to-b from-[#205596] to-[#16437d] flex flex-col justify-between py-2 text-white border-r border-[#0f3460] shadow-md">
        <div className="flex flex-col">
          <button
            onClick={onClose}
            title="Return to Document"
            className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-bold text-white hover:bg-[#2b68b4] transition-colors mb-2 border-b border-[#2b64a8]/50"
          >
            <span className="text-[14px]">⮜</span>
            <span>Document</span>
          </button>

          {/* Quick Actions */}
          <button
            onClick={() => { saveDocument(); onClose(); }}
            className="flex items-center px-4 py-1 text-[11px] text-white/90 hover:bg-[#2866b0] hover:text-white transition-colors text-left"
          >
            Save
          </button>
          <button
            onClick={() => setActiveSection('save-send')}
            className="flex items-center px-4 py-1 text-[11px] text-white/90 hover:bg-[#2866b0] hover:text-white transition-colors text-left"
          >
            Save As
          </button>
          <button
            onClick={handleOpenClick}
            className="flex items-center px-4 py-1 text-[11px] text-white/90 hover:bg-[#2866b0] hover:text-white transition-colors text-left"
          >
            Open
          </button>
          <button
            onClick={() => { newDocument(); onClose(); }}
            className="flex items-center px-4 py-1 text-[11px] text-white/90 hover:bg-[#2866b0] hover:text-white transition-colors text-left"
          >
            Close
          </button>

          <div className="h-[1px] bg-[#1a4478] my-2 mx-3 shadow-[0_1px_0_rgba(255,255,255,0.1)]" />

          {/* Navigation Sections */}
          <button
            onClick={() => setActiveSection('info')}
            className={`flex items-center px-4 py-1.5 text-[11.5px] transition-colors text-left ${
              activeSection === 'info'
                ? 'bg-white text-[#1a4379] font-bold shadow-sm relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#f59e0b]'
                : 'text-white/95 hover:bg-[#2866b0]'
            }`}
          >
            Info
          </button>

          <button
            onClick={() => setActiveSection('recent')}
            className={`flex items-center px-4 py-1.5 text-[11.5px] transition-colors text-left ${
              activeSection === 'recent'
                ? 'bg-white text-[#1a4379] font-bold shadow-sm relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#f59e0b]'
                : 'text-white/95 hover:bg-[#2866b0]'
            }`}
          >
            Recent
          </button>

          <button
            onClick={() => setActiveSection('new')}
            className={`flex items-center px-4 py-1.5 text-[11.5px] transition-colors text-left ${
              activeSection === 'new'
                ? 'bg-white text-[#1a4379] font-bold shadow-sm relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#f59e0b]'
                : 'text-white/95 hover:bg-[#2866b0]'
            }`}
          >
            New
          </button>

          <button
            onClick={() => setActiveSection('print')}
            className={`flex items-center px-4 py-1.5 text-[11.5px] transition-colors text-left ${
              activeSection === 'print'
                ? 'bg-white text-[#1a4379] font-bold shadow-sm relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#f59e0b]'
                : 'text-white/95 hover:bg-[#2866b0]'
            }`}
          >
            Print
          </button>

          <button
            onClick={() => setActiveSection('save-send')}
            className={`flex items-center px-4 py-1.5 text-[11.5px] transition-colors text-left ${
              activeSection === 'save-send'
                ? 'bg-white text-[#1a4379] font-bold shadow-sm relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#f59e0b]'
                : 'text-white/95 hover:bg-[#2866b0]'
            }`}
          >
            Save &amp; Send
          </button>

          <button
            onClick={() => setActiveSection('help')}
            className={`flex items-center px-4 py-1.5 text-[11.5px] transition-colors text-left ${
              activeSection === 'help'
                ? 'bg-white text-[#1a4379] font-bold shadow-sm relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#f59e0b]'
                : 'text-white/95 hover:bg-[#2866b0]'
            }`}
          >
            Help
          </button>
        </div>

        {/* Bottom Options & Exit */}
        <div className="flex flex-col border-t border-[#1a4478] pt-2">
          <button
            onClick={onOpenOptionsDialog}
            className="flex items-center gap-2 px-4 py-1.5 text-[11px] text-white/95 hover:bg-[#2866b0] transition-colors text-left"
          >
            <span className="text-[12px]">⚙</span>
            <span>Options</span>
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-1.5 text-[11px] text-white/95 hover:bg-[#c9302c] transition-colors text-left"
          >
            <span className="text-red-300 font-bold">✕</span>
            <span>Exit</span>
          </button>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-1 bg-[#fbfcfd] flex overflow-y-auto">
        {/* INFO SECTION */}
        {activeSection === 'info' && (
          <div className="flex-1 flex p-6 gap-8">
            <div className="flex-1 flex flex-col max-w-[650px]">
              <div className="mb-6">
                <h1 className="text-[28px] font-normal text-[#1e395b] mb-1">Info</h1>
                <div className="text-[18px] font-medium text-[#2d5282]">{docTitle}</div>
                <div className="text-[12px] text-[#64748b]">Microsoft Word Document</div>
              </div>

              {/* Permissions / Protect Document */}
              <div className="flex items-start gap-4 p-4 border border-[#cfdbe8] rounded-[2px] bg-white mb-4 hover:border-[#a0bbd8] transition-colors">
                <div
                  onClick={onOpenProtectDialog}
                  className="w-[64px] h-[64px] bg-gradient-to-b from-[#fef3c7] to-[#fde68a] border border-[#f59e0b] rounded-[3px] flex flex-col items-center justify-center shadow-xs cursor-pointer hover:brightness-105"
                >
                  <div className="text-[22px]">🛡️</div>
                  <span className="text-[9px] font-bold text-[#b45309] text-center leading-none mt-1">Protect<br />Doc ▼</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-[14px] font-semibold text-[#1e395b] mb-1">Permissions</h3>
                  <p className="text-[12px] text-[#475569] leading-relaxed mb-2">
                    {isProtected
                      ? 'This document has active editing restrictions applied.'
                      : 'Anyone can open, copy, and change any part of this document.'}
                  </p>
                  <button onClick={onOpenProtectDialog} className="text-[11px] text-[#2563eb] hover:underline cursor-pointer">
                    {isProtected ? 'Remove Protection...' : 'Protect Document ▾'}
                  </button>
                </div>
              </div>

              {/* Prepare for Sharing */}
              <div className="flex items-start gap-4 p-4 border border-[#cfdbe8] rounded-[2px] bg-white mb-4 hover:border-[#a0bbd8] transition-colors">
                <div className="w-[64px] h-[64px] bg-gradient-to-b from-[#e0f2fe] to-[#bae6fd] border border-[#38bdf8] rounded-[3px] flex flex-col items-center justify-center shadow-xs">
                  <div className="text-[22px]">🔍</div>
                  <span className="text-[9px] font-bold text-[#0369a1] text-center leading-none mt-1">Check for<br />Issues ▼</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-[14px] font-semibold text-[#1e395b] mb-1">Prepare for Sharing</h3>
                  <p className="text-[12px] text-[#475569] leading-relaxed mb-1">
                    Before sharing this file, be aware that it contains:
                  </p>
                  <ul className="text-[11px] text-[#64748b] list-disc list-inside">
                    <li>Document properties and author&apos;s name ({authorName})</li>
                  </ul>
                </div>
              </div>

              {/* Versions */}
              <div className="flex items-start gap-4 p-4 border border-[#cfdbe8] rounded-[2px] bg-white mb-4 hover:border-[#a0bbd8] transition-colors">
                <div className="w-[64px] h-[64px] bg-gradient-to-b from-[#f1f5f9] to-[#e2e8f0] border border-[#94a3b8] rounded-[3px] flex flex-col items-center justify-center shadow-xs">
                  <div className="text-[22px]">🕒</div>
                  <span className="text-[9px] font-bold text-[#475569] text-center leading-none mt-1">Manage<br />Versions ▼</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-[14px] font-semibold text-[#1e395b] mb-1">Versions</h3>
                  <p className="text-[12px] text-[#475569] leading-relaxed">
                    Local autosave is active. {recentDocs.length} saved revision(s) recorded.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Pane: Properties */}
            <div className="w-[300px] border-l border-[#d3dfed] pl-6 flex flex-col">
              <div className="mb-4">
                <div className="w-[110px] h-[140px] bg-white border border-[#9bb5d1] shadow-sm flex flex-col p-2 mx-auto">
                  <div className="w-full h-[6px] bg-[#3b82f6]/20 mb-2" />
                  <div className="w-[70%] h-[3px] bg-gray-200 mb-1" />
                  <div className="w-[90%] h-[3px] bg-gray-200 mb-1" />
                  <div className="w-[80%] h-[3px] bg-gray-200 mb-1" />
                  <div className="w-[60%] h-[3px] bg-gray-200 mb-1" />
                </div>
              </div>

              <div className="flex items-center justify-between mb-2 pb-1 border-b border-[#e2e8f0]">
                <span className="text-[14px] font-semibold text-[#1e395b]">Properties</span>
              </div>

              <div className="text-[11px] font-sans flex flex-col gap-2">
                <div className="flex justify-between py-0.5">
                  <span className="text-[#64748b] w-[90px]">Size</span>
                  <span className="text-[#1e293b] flex-1">~{(wordCountStats.charactersWithSpaces / 1024).toFixed(1)} KB</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-[#64748b] w-[90px]">Pages</span>
                  <span className="text-[#1e293b] flex-1">{wordCountStats.pages}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-[#64748b] w-[90px]">Words</span>
                  <span className="text-[#1e293b] flex-1">{wordCountStats.words}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-[#64748b] w-[90px]">Characters</span>
                  <span className="text-[#1e293b] flex-1">{wordCountStats.charactersWithSpaces}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-[#64748b] w-[90px]">Title</span>
                  <span className="text-[#1e293b] flex-1">{docTitle}</span>
                </div>

                <div className="h-[1px] bg-gray-200 my-1" />

                <div className="font-semibold text-[#1e395b] mb-0.5">Related People</div>
                <div className="flex justify-between py-0.5 items-center">
                  <span className="text-[#64748b] w-[90px]">Author</span>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="flex-1 text-[#2563eb] border border-transparent hover:border-gray-300 px-1 bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NEW SECTION */}
        {activeSection === 'new' && (
          <div className="flex-1 p-6">
            <h1 className="text-[28px] font-normal text-[#1e395b] mb-4">New</h1>
            <div className="grid grid-cols-4 gap-4 max-w-[700px]">
              <div
                onClick={() => { newDocument(); onClose(); }}
                className="p-3 bg-white border border-[#abc1db] rounded-[3px] flex flex-col items-center cursor-pointer hover:border-[#2563eb] hover:shadow-md transition-all group"
              >
                <div className="w-[100px] h-[130px] bg-white border border-[#cbd5e1] shadow-xs mb-2 group-hover:border-blue-400" />
                <span className="text-[12px] font-semibold text-[#1e395b]">Blank document</span>
              </div>
              <div
                onClick={() => { newFromTemplate('Resume'); onClose(); }}
                className="p-3 bg-white border border-[#abc1db] rounded-[3px] flex flex-col items-center cursor-pointer hover:border-[#2563eb] hover:shadow-md transition-all group"
              >
                <div className="w-[100px] h-[130px] bg-[#f8fafc] border border-[#cbd5e1] shadow-xs mb-2 group-hover:border-blue-400 p-2">
                  <div className="h-4 bg-orange-200 mb-1" />
                  <div className="h-2 bg-gray-200 mb-1" />
                </div>
                <span className="text-[12px] font-semibold text-[#1e395b]">Resume Template</span>
              </div>
              <div
                onClick={() => { newFromTemplate('Letter'); onClose(); }}
                className="p-3 bg-white border border-[#abc1db] rounded-[3px] flex flex-col items-center cursor-pointer hover:border-[#2563eb] hover:shadow-md transition-all group"
              >
                <div className="w-[100px] h-[130px] bg-[#f8fafc] border border-[#cbd5e1] shadow-xs mb-2 group-hover:border-blue-400 p-2">
                  <div className="h-4 bg-blue-200 mb-1" />
                  <div className="h-2 bg-gray-200 mb-1" />
                </div>
                <span className="text-[12px] font-semibold text-[#1e395b]">Formal Letter</span>
              </div>
              <div
                onClick={() => { newFromTemplate('Report'); onClose(); }}
                className="p-3 bg-white border border-[#abc1db] rounded-[3px] flex flex-col items-center cursor-pointer hover:border-[#2563eb] hover:shadow-md transition-all group"
              >
                <div className="w-[100px] h-[130px] bg-[#f8fafc] border border-[#cbd5e1] shadow-xs mb-2 group-hover:border-blue-400 p-2">
                  <div className="h-4 bg-green-200 mb-1" />
                  <div className="h-2 bg-gray-200 mb-1" />
                </div>
                <span className="text-[12px] font-semibold text-[#1e395b]">Executive Report</span>
              </div>
            </div>
          </div>
        )}

        {/* PRINT SECTION */}
        {activeSection === 'print' && (
          <div className="flex-1 p-6 flex gap-6">
            <div className="w-[280px]">
              <h1 className="text-[28px] font-normal text-[#1e395b] mb-4">Print</h1>
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => { printDocument(); }}
                  className="office-btn px-4 py-2 bg-gradient-to-b from-[#f2f7fc] to-[#d6e5f6] border border-[#9bb5d1] rounded-[2px] flex items-center gap-2 font-bold text-[#1e395b]"
                >
                  <span className="text-[18px]">🖨️</span> Print
                </button>
              </div>
              <div className="space-y-3 text-[11px]">
                <div>
                  <div className="font-semibold text-gray-700 mb-1">Printer</div>
                  <div className="p-2 bg-white border border-[#abc1db] rounded-[2px]">Default System Printer (Ready)</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-700 mb-1">Settings</div>
                  <div className="p-2 bg-white border border-[#abc1db] rounded-[2px] space-y-1">
                    <div>Print All Pages ({wordCountStats.pages})</div>
                    <div className="text-gray-500">Letter • Normal Margins • Portrait</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-[#8297b0] flex items-center justify-center p-6 rounded-[2px]">
              <div className="w-[260px] h-[340px] bg-white shadow-xl flex flex-col p-4">
                <div className="w-16 h-3 bg-blue-300 mb-2" />
                <div className="w-full h-2 bg-gray-200 mb-1" />
                <div className="w-full h-2 bg-gray-200 mb-1" />
                <div className="w-3/4 h-2 bg-gray-200 mb-1" />
              </div>
            </div>
          </div>
        )}

        {/* SAVE & SEND SECTION */}
        {activeSection === 'save-send' && (
          <div className="flex-1 p-6">
            <h1 className="text-[28px] font-normal text-[#1e395b] mb-4">Save &amp; Send</h1>
            <div className="space-y-3 max-w-[500px]">
              <div
                onClick={() => { saveAsDocument('docx'); onClose(); }}
                className="p-3 bg-white border border-[#abc1db] rounded flex items-center justify-between hover:border-blue-500 cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-[#1e395b]">Save as Word Document (.doc / .docx)</div>
                  <div className="text-[10px] text-gray-500">Standard Microsoft Word format</div>
                </div>
                <span className="text-[18px]">💾</span>
              </div>
              <div
                onClick={() => { saveAsDocument('pdf'); onClose(); }}
                className="p-3 bg-white border border-[#abc1db] rounded flex items-center justify-between hover:border-blue-500 cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-[#1e395b]">Create PDF Document</div>
                  <div className="text-[10px] text-gray-500">Preserves layout, formatting, and fonts</div>
                </div>
                <span className="text-[18px]">📄</span>
              </div>
              <div
                onClick={() => { saveAsDocument('txt'); onClose(); }}
                className="p-3 bg-white border border-[#abc1db] rounded flex items-center justify-between hover:border-blue-500 cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-[#1e395b]">Plain Text (.txt)</div>
                  <div className="text-[10px] text-gray-500">Unformatted text file</div>
                </div>
                <span className="text-[18px]">📝</span>
              </div>
              <div
                onClick={() => { saveAsDocument('html'); onClose(); }}
                className="p-3 bg-white border border-[#abc1db] rounded flex items-center justify-between hover:border-blue-500 cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-[#1e395b]">Web Page (.html)</div>
                  <div className="text-[10px] text-gray-500">Single file web page</div>
                </div>
                <span className="text-[18px]">🌐</span>
              </div>
            </div>
          </div>
        )}

        {/* RECENT SECTION */}
        {activeSection === 'recent' && (
          <div className="flex-1 p-6">
            <h1 className="text-[28px] font-normal text-[#1e395b] mb-4">Recent Documents</h1>
            <div className="space-y-2 max-w-[500px] text-[12px]">
              {recentDocs.map((doc, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const saved = localStorage.getItem(`word2010_doc_${doc.title}`);
                    if (saved) {
                      // loaded
                    }
                    onClose();
                  }}
                  className="p-2.5 bg-white border border-[#cfdbe8] rounded flex items-center justify-between hover:border-blue-500 cursor-pointer"
                >
                  <div>
                    <div className="font-semibold text-[#1e395b]">{doc.title}</div>
                    <div className="text-[10px] text-gray-500">{doc.date}</div>
                  </div>
                  <span className="text-gray-400">📌</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HELP SECTION */}
        {activeSection === 'help' && (
          <div className="flex-1 p-6">
            <h1 className="text-[28px] font-normal text-[#1e395b] mb-4">Help</h1>
            <div className="space-y-4 max-w-[500px] text-[12px]">
              <div className="p-3 bg-white border border-[#cfdbe8] rounded">
                <h3 className="font-bold text-[#1e395b] mb-1">About Microsoft Word 2010</h3>
                <p className="text-gray-600">Recreation of Microsoft Office Professional Plus 2010. Authentic Aero Ribbon Interface.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
