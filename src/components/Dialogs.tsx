import React, { useState } from 'react';
import { useDocument } from '../context/DocumentContext';

interface DialogModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  width?: string;
  children: React.ReactNode;
  footerButtons?: React.ReactNode;
}

export const DialogModal: React.FC<DialogModalProps> = ({
  title,
  isOpen,
  onClose,
  width = 'w-[450px]',
  children,
  footerButtons,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className={`${width} bg-[#edf3fa] border border-[#7f9db9] shadow-2xl rounded-[3px] flex flex-col font-sans select-none overflow-hidden animate-in fade-in zoom-in-95 duration-100`}>
        {/* Windows 7 / Office 2010 Title Bar */}
        <div className="h-[26px] bg-gradient-to-b from-[#e8f1fb] via-[#d4e4f7] to-[#bed8f3] border-b border-[#a0bad6] px-2 flex items-center justify-between">
          <span className="text-[11.5px] font-semibold text-[#1e395b]">{title}</span>
          <button
            onClick={onClose}
            className="w-[18px] h-[16px] flex items-center justify-center hover:bg-[#e81123] hover:text-white rounded-[1px] text-[10px] text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Dialog Body */}
        <div className="p-3 text-[11px] text-[#1e293b]">
          {children}
        </div>

        {/* Dialog Footer */}
        <div className="h-[38px] bg-[#dbe8f7] border-t border-[#b9cfeb] px-3 flex items-center justify-end gap-2">
          {footerButtons ? (
            footerButtons
          ) : (
            <>
              <button
                onClick={onClose}
                className="w-[72px] h-[22px] bg-gradient-to-b from-[#ffffff] to-[#d6e3f2] border border-[#7f9db9] rounded-[2px] hover:border-[#3c7fb1] text-[11px] font-medium text-[#1e293b]"
              >
                OK
              </button>
              <button
                onClick={onClose}
                className="w-[72px] h-[22px] bg-gradient-to-b from-[#ffffff] to-[#d6e3f2] border border-[#7f9db9] rounded-[2px] hover:border-[#3c7fb1] text-[11px] font-medium text-[#1e293b]"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// 1. Font Dialog with Real Application
export const FontDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { setFontFamily, setFontSize, executeCommand, selectionState } = useDocument();
  const [selectedFont, setSelectedFont] = useState(selectionState.fontName || 'Calibri');
  const [selectedStyle, setSelectedStyle] = useState('Regular');
  const [selectedSize, setSelectedSize] = useState(selectionState.fontSize || '11');
  const [strike, setStrike] = useState(false);
  const [doubleStrike, setDoubleStrike] = useState(false);
  const [superscript, setSuperscript] = useState(false);
  const [subscript, setSubscript] = useState(false);
  const [fontColor, setFontColor] = useState('#000000');

  const handleApply = () => {
    setFontFamily(selectedFont);
    setFontSize(selectedSize);
    if (selectedStyle.includes('Bold')) executeCommand('bold');
    if (selectedStyle.includes('Italic')) executeCommand('italic');
    if (strike) executeCommand('strikeThrough');
    if (subscript) executeCommand('subscript');
    if (superscript) executeCommand('superscript');
    if (fontColor !== '#000000') executeCommand('foreColor', fontColor);
    onClose();
  };

  return (
    <DialogModal
      title="Font"
      isOpen={isOpen}
      onClose={onClose}
      width="w-[450px]"
      footerButtons={
        <>
          <button
            onClick={handleApply}
            className="w-[72px] h-[22px] bg-gradient-to-b from-[#ffffff] to-[#d6e3f2] border border-[#7f9db9] rounded-[2px] hover:border-[#3c7fb1] text-[11px] font-medium"
          >
            OK
          </button>
          <button
            onClick={onClose}
            className="w-[72px] h-[22px] bg-gradient-to-b from-[#ffffff] to-[#d6e3f2] border border-[#7f9db9] rounded-[2px] hover:border-[#3c7fb1] text-[11px] font-medium"
          >
            Cancel
          </button>
        </>
      }
    >
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div>
          <label className="block mb-1 text-[#41556e]">Font:</label>
          <input type="text" value={selectedFont} readOnly className="w-full h-5 border border-[#abc1db] px-1 bg-white mb-1" />
          <div className="h-[90px] border border-[#abc1db] bg-white overflow-y-auto">
            {['Calibri', 'Arial', 'Times New Roman', 'Segoe UI', 'Georgia', 'Tahoma', 'Trebuchet MS', 'Verdana', 'Courier New'].map((f) => (
              <div
                key={f}
                onClick={() => setSelectedFont(f)}
                className={`px-1.5 py-0.5 cursor-pointer ${selectedFont === f ? 'bg-[#3399ff] text-white' : 'hover:bg-blue-50'}`}
              >
                {f}
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-1 text-[#41556e]">Font style:</label>
          <input type="text" value={selectedStyle} readOnly className="w-full h-5 border border-[#abc1db] px-1 bg-white mb-1" />
          <div className="h-[90px] border border-[#abc1db] bg-white overflow-y-auto">
            {['Regular', 'Italic', 'Bold', 'Bold Italic'].map((s) => (
              <div
                key={s}
                onClick={() => setSelectedStyle(s)}
                className={`px-1.5 py-0.5 cursor-pointer ${selectedStyle === s ? 'bg-[#3399ff] text-white' : 'hover:bg-blue-50'}`}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-1 text-[#41556e]">Size:</label>
          <input type="text" value={selectedSize} readOnly className="w-full h-5 border border-[#abc1db] px-1 bg-white mb-1" />
          <div className="h-[90px] border border-[#abc1db] bg-white overflow-y-auto">
            {['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'].map((sz) => (
              <div
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={`px-1.5 py-0.5 cursor-pointer ${selectedSize === sz ? 'bg-[#3399ff] text-white' : 'hover:bg-blue-50'}`}
              >
                {sz}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <span>Font color:</span>
          <input type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)} className="w-6 h-5 cursor-pointer" />
        </div>
      </div>

      <fieldset className="border border-[#abc1db] p-2 mb-3">
        <legend className="px-1 text-[#41556e] font-medium">Effects</legend>
        <div className="grid grid-cols-2 gap-1 text-[11px]">
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={strike} onChange={(e) => setStrike(e.target.checked)} /> Strikethrough
          </label>
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={doubleStrike} onChange={(e) => setDoubleStrike(e.target.checked)} /> Double strikethrough
          </label>
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={superscript} onChange={(e) => setSuperscript(e.target.checked)} /> Superscript
          </label>
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={subscript} onChange={(e) => setSubscript(e.target.checked)} /> Subscript
          </label>
        </div>
      </fieldset>

      <fieldset className="border border-[#abc1db] p-2 bg-white">
        <legend className="px-1 text-[#41556e] font-medium bg-[#edf3fa]">Preview</legend>
        <div
          className="h-[46px] flex items-center justify-center text-[16px]"
          style={{
            fontFamily: selectedFont,
            fontWeight: selectedStyle.includes('Bold') ? 'bold' : 'normal',
            fontStyle: selectedStyle.includes('Italic') ? 'italic' : 'normal',
            color: fontColor,
            textDecoration: strike ? 'line-through' : 'none',
          }}
        >
          {selectedFont} ({selectedSize} pt)
        </div>
      </fieldset>
    </DialogModal>
  );
};

// 2. Paragraph Dialog
export const ParagraphDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { executeCommand, setLineSpacing, setParagraphSpacing } = useDocument();
  const [alignment, setAlignment] = useState('left');
  const [lineSpacing, setLocalLineSpacing] = useState('1.15');
  const [before, setBefore] = useState(0);
  const [after, setAfter] = useState(10);

  const handleApply = () => {
    if (alignment === 'left') executeCommand('justifyLeft');
    if (alignment === 'center') executeCommand('justifyCenter');
    if (alignment === 'right') executeCommand('justifyRight');
    if (alignment === 'justify') executeCommand('justifyFull');
    setLineSpacing(lineSpacing);
    setParagraphSpacing(before, after);
    onClose();
  };

  return (
    <DialogModal
      title="Paragraph"
      isOpen={isOpen}
      onClose={onClose}
      width="w-[430px]"
      footerButtons={
        <>
          <button onClick={handleApply} className="w-[72px] h-[22px] bg-gradient-to-b from-[#ffffff] to-[#d6e3f2] border border-[#7f9db9] rounded-[2px] text-[11px] font-medium">OK</button>
          <button onClick={onClose} className="w-[72px] h-[22px] bg-gradient-to-b from-[#ffffff] to-[#d6e3f2] border border-[#7f9db9] rounded-[2px] text-[11px] font-medium">Cancel</button>
        </>
      }
    >
      <div className="space-y-3">
        <fieldset className="border border-[#abc1db] p-2.5">
          <legend className="px-1 text-[#41556e] font-medium">General</legend>
          <div className="flex items-center justify-between mb-2">
            <span>Alignment:</span>
            <select value={alignment} onChange={(e) => setAlignment(e.target.value)} className="border border-[#abc1db] bg-white px-1.5 py-0.5 w-[140px]">
              <option value="left">Left</option>
              <option value="center">Centered</option>
              <option value="right">Right</option>
              <option value="justify">Justified</option>
            </select>
          </div>
        </fieldset>

        <fieldset className="border border-[#abc1db] p-2.5">
          <legend className="px-1 text-[#41556e] font-medium">Spacing</legend>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="flex items-center justify-between">
              <span>Before:</span>
              <input type="number" value={before} onChange={(e) => setBefore(parseInt(e.target.value, 10) || 0)} className="w-16 border border-[#abc1db] bg-white px-1" />
            </div>
            <div className="flex items-center justify-between">
              <span>After:</span>
              <input type="number" value={after} onChange={(e) => setAfter(parseInt(e.target.value, 10) || 0)} className="w-16 border border-[#abc1db] bg-white px-1" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Line spacing:</span>
            <select value={lineSpacing} onChange={(e) => setLocalLineSpacing(e.target.value)} className="border border-[#abc1db] bg-white px-1.5 py-0.5 w-[140px]">
              <option value="1.0">Single (1.0)</option>
              <option value="1.15">1.15 lines</option>
              <option value="1.5">1.5 lines</option>
              <option value="2.0">Double (2.0)</option>
            </select>
          </div>
        </fieldset>
      </div>
    </DialogModal>
  );
};

// 3. Find & Replace Dialog
export const FindReplaceDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { findAndReplace } = useDocument();
  const [tab, setTab] = useState<'find' | 'replace'>('find');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [resultMsg, setResultMsg] = useState('');

  const handleFindNext = () => {
    if (!findText) return;
    const count = findAndReplace(findText, findText);
    setResultMsg(count > 0 ? `Found "${findText}"` : 'Text not found');
  };

  const handleReplace = () => {
    const count = findAndReplace(findText, replaceText, false);
    setResultMsg(count > 0 ? '1 occurrence replaced.' : 'Match not found.');
  };

  const handleReplaceAll = () => {
    const count = findAndReplace(findText, replaceText, true);
    setResultMsg(`${count} occurrence(s) replaced.`);
  };

  return (
    <DialogModal title="Find and Replace" isOpen={isOpen} onClose={onClose} width="w-[440px]">
      <div className="flex border-b border-[#a9c1d9] mb-3">
        <button
          onClick={() => setTab('find')}
          className={`px-3 py-1 border-t border-x rounded-t-[2px] ${tab === 'find' ? 'bg-[#edf3fa] border-[#a9c1d9] font-semibold -mb-[1px]' : 'bg-[#d8e7f8] border-transparent text-gray-600'}`}
        >
          Find
        </button>
        <button
          onClick={() => setTab('replace')}
          className={`px-3 py-1 border-t border-x rounded-t-[2px] ${tab === 'replace' ? 'bg-[#edf3fa] border-[#a9c1d9] font-semibold -mb-[1px]' : 'bg-[#d8e7f8] border-transparent text-gray-600'}`}
        >
          Replace
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-20 text-[#41556e]">Find what:</span>
          <input
            type="text"
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            className="flex-1 border border-[#abc1db] bg-white h-6 px-1.5 text-[11px]"
          />
        </div>

        {tab === 'replace' && (
          <div className="flex items-center gap-2">
            <span className="w-20 text-[#41556e]">Replace with:</span>
            <input
              type="text"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              className="flex-1 border border-[#abc1db] bg-white h-6 px-1.5 text-[11px]"
            />
          </div>
        )}

        {resultMsg && <div className="text-[11px] text-blue-700 italic">{resultMsg}</div>}

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={handleFindNext} className="office-btn px-2.5 py-1 border border-[#abc1db] bg-white">Find Next</button>
          {tab === 'replace' && (
            <>
              <button onClick={handleReplace} className="office-btn px-2.5 py-1 border border-[#abc1db] bg-white">Replace</button>
              <button onClick={handleReplaceAll} className="office-btn px-2.5 py-1 border border-[#abc1db] bg-white">Replace All</button>
            </>
          )}
        </div>
      </div>
    </DialogModal>
  );
};

// 4. Word Count Statistics Dialog
export const WordCountDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { wordCountStats } = useDocument();

  return (
    <DialogModal title="Word Count" isOpen={isOpen} onClose={onClose} width="w-[320px]">
      <div className="space-y-2">
        <h3 className="font-semibold text-[#1e395b] border-b border-[#abc1db] pb-1">Statistics:</h3>
        <div className="space-y-1.5 text-[11px]">
          <div className="flex justify-between"><span>Pages</span><span className="font-mono">{wordCountStats.pages}</span></div>
          <div className="flex justify-between"><span>Words</span><span className="font-mono">{wordCountStats.words}</span></div>
          <div className="flex justify-between"><span>Characters (no spaces)</span><span className="font-mono">{wordCountStats.charactersNoSpaces}</span></div>
          <div className="flex justify-between"><span>Characters (with spaces)</span><span className="font-mono">{wordCountStats.charactersWithSpaces}</span></div>
          <div className="flex justify-between"><span>Paragraphs</span><span className="font-mono">{wordCountStats.paragraphs}</span></div>
          <div className="flex justify-between"><span>Lines</span><span className="font-mono">{wordCountStats.lines}</span></div>
        </div>
      </div>
    </DialogModal>
  );
};

// 5. Insert Table Dialog
export const InsertTableDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { insertTable } = useDocument();
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);

  const handleInsert = () => {
    insertTable(rows, cols);
    onClose();
  };

  return (
    <DialogModal
      title="Insert Table"
      isOpen={isOpen}
      onClose={onClose}
      width="w-[340px]"
      footerButtons={
        <>
          <button onClick={handleInsert} className="w-[72px] h-[22px] bg-gradient-to-b from-[#ffffff] to-[#d6e3f2] border border-[#7f9db9] rounded-[2px] text-[11px] font-medium">OK</button>
          <button onClick={onClose} className="w-[72px] h-[22px] bg-gradient-to-b from-[#ffffff] to-[#d6e3f2] border border-[#7f9db9] rounded-[2px] text-[11px] font-medium">Cancel</button>
        </>
      }
    >
      <fieldset className="border border-[#abc1db] p-3 space-y-2">
        <legend className="px-1 text-[#41556e] font-medium">Table size</legend>
        <div className="flex justify-between items-center">
          <span>Number of columns:</span>
          <input type="number" min="1" max="20" value={cols} onChange={(e) => setCols(parseInt(e.target.value, 10) || 1)} className="w-16 border border-[#abc1db] bg-white px-1" />
        </div>
        <div className="flex justify-between items-center">
          <span>Number of rows:</span>
          <input type="number" min="1" max="50" value={rows} onChange={(e) => setRows(parseInt(e.target.value, 10) || 1)} className="w-16 border border-[#abc1db] bg-white px-1" />
        </div>
      </fieldset>
    </DialogModal>
  );
};

// 6. Hyperlink Dialog
export const HyperlinkDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { insertHyperlink } = useDocument();
  const [url, setUrl] = useState('https://');
  const [text, setText] = useState('');

  const handleInsert = () => {
    if (url) {
      insertHyperlink(url, text);
      onClose();
    }
  };

  return (
    <DialogModal
      title="Insert Hyperlink"
      isOpen={isOpen}
      onClose={onClose}
      width="w-[420px]"
      footerButtons={
        <>
          <button onClick={handleInsert} className="w-[72px] h-[22px] bg-gradient-to-b from-[#ffffff] to-[#d6e3f2] border border-[#7f9db9] rounded-[2px] text-[11px] font-medium">OK</button>
          <button onClick={onClose} className="w-[72px] h-[22px] bg-gradient-to-b from-[#ffffff] to-[#d6e3f2] border border-[#7f9db9] rounded-[2px] text-[11px] font-medium">Cancel</button>
        </>
      }
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-24 text-[#41556e]">Text to display:</span>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Link text" className="flex-1 border border-[#abc1db] bg-white px-1.5 h-6 text-[11px]" />
        </div>
        <div className="flex items-center gap-2">
          <span className="w-24 text-[#41556e]">Address:</span>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="flex-1 border border-[#abc1db] bg-white px-1.5 h-6 text-[11px]" />
        </div>
      </div>
    </DialogModal>
  );
};

// 7. Symbol Dialog
export const SymbolDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { insertSymbol } = useDocument();

  const symbols = [
    '©', '®', '™', '€', '£', '¥', '§', '¶', '±', '≠', '≤', '≥', '÷', '×', '∞', '√',
    'α', 'β', 'γ', 'δ', 'π', 'Ω', 'Σ', 'λ', 'μ', 'θ', '←', '→', '↑', '↓', '↔', '✓',
    '★', '♥', '♦', '♣', '♠', '℃', '℉', '°', '‰', '¼', '½', '¾', '•', '·', '…', '‰'
  ];

  return (
    <DialogModal title="Symbol" isOpen={isOpen} onClose={onClose} width="w-[380px]">
      <div className="grid grid-cols-8 gap-1.5 p-2 bg-white border border-[#abc1db] max-h-[220px] overflow-y-auto">
        {symbols.map((s) => (
          <button
            key={s}
            onClick={() => {
              insertSymbol(s);
              onClose();
            }}
            className="w-8 h-8 flex items-center justify-center border border-transparent hover:border-[#3399ff] hover:bg-blue-50 text-[16px]"
          >
            {s}
          </button>
        ))}
      </div>
    </DialogModal>
  );
};

// 8. Equation Dialog
export const EquationDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { insertEquation } = useDocument();

  const equations = [
    { name: 'Area of Circle', formula: 'A = πr²' },
    { name: 'Binomial Theorem', formula: '(x + a)ⁿ = ∑ (n choose k) xᵏ aⁿ⁻ᵏ' },
    { name: 'Expansion of a Sum', formula: '(1 + x)ⁿ = 1 + nx + [n(n-1)/2!]x² + ...' },
    { name: 'Fourier Series', formula: 'f(x) = a₀ + ∑ (aₙ cos(nx) + bₙ sin(nx))' },
    { name: 'Pythagorean Theorem', formula: 'a² + b² = c²' },
    { name: 'Quadratic Formula', formula: 'x = [-b ± √(b² - 4ac)] / 2a' },
  ];

  return (
    <DialogModal title="Built-In Equations" isOpen={isOpen} onClose={onClose} width="w-[440px]">
      <div className="space-y-2 max-h-[260px] overflow-y-auto">
        {equations.map((eq) => (
          <div
            key={eq.name}
            onClick={() => {
              insertEquation(eq.formula);
              onClose();
            }}
            className="p-2 border border-[#abc1db] bg-white hover:bg-blue-50 hover:border-blue-400 cursor-pointer rounded-[2px]"
          >
            <div className="font-semibold text-[#1e395b] mb-1">{eq.name}</div>
            <div className="font-serif italic text-[14px] text-gray-800">{eq.formula}</div>
          </div>
        ))}
      </div>
    </DialogModal>
  );
};

// 9. Watermark Dialog
export const WatermarkDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { pageLayout } = useDocument();
  const [customText, setCustomText] = useState('');

  return (
    <DialogModal title="Printed Watermark" isOpen={isOpen} onClose={onClose} width="w-[380px]">
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {['DRAFT', 'CONFIDENTIAL', 'DO NOT COPY', 'SAMPLE'].map((wm) => (
            <button
              key={wm}
              onClick={() => {
                pageLayout.setWatermark(wm);
                onClose();
              }}
              className="p-3 border border-[#abc1db] bg-white hover:bg-yellow-50 hover:border-yellow-400 text-center font-bold text-gray-400"
            >
              {wm}
            </button>
          ))}
        </div>
        <div className="pt-2 border-t border-[#abc1db] flex items-center gap-2">
          <span>Custom:</span>
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Type watermark"
            className="flex-1 border border-[#abc1db] px-1.5 h-6"
          />
          <button
            onClick={() => {
              if (customText) pageLayout.setWatermark(customText);
              onClose();
            }}
            className="office-btn px-2 py-1 border border-[#abc1db] bg-white"
          >
            Apply
          </button>
        </div>
        <div className="text-right">
          <button
            onClick={() => {
              pageLayout.setWatermark(null);
              onClose();
            }}
            className="text-[11px] text-red-600 hover:underline"
          >
            Remove Watermark
          </button>
        </div>
      </div>
    </DialogModal>
  );
};

// 10. Document Protection Dialog
export const ProtectDocumentDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { isProtected, setProtected } = useDocument();
  const [password, setPassword] = useState('');
  const [readOnlyOnly, setReadOnlyOnly] = useState(true);

  const handleApply = () => {
    setProtected(!isProtected, password);
    onClose();
  };

  return (
    <DialogModal
      title="Restrict Editing & Protection"
      isOpen={isOpen}
      onClose={onClose}
      width="w-[380px]"
      footerButtons={
        <>
          <button onClick={handleApply} className="w-[72px] h-[22px] bg-gradient-to-b from-[#ffffff] to-[#d6e3f2] border border-[#7f9db9] rounded-[2px] text-[11px] font-medium">OK</button>
          <button onClick={onClose} className="w-[72px] h-[22px] bg-gradient-to-b from-[#ffffff] to-[#d6e3f2] border border-[#7f9db9] rounded-[2px] text-[11px] font-medium">Cancel</button>
        </>
      }
    >
      <div className="space-y-3">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={readOnlyOnly} onChange={(e) => setReadOnlyOnly(e.target.checked)} />
          <span>Allow only read-only viewing of this document</span>
        </label>
        <div className="space-y-1">
          <span className="text-[#41556e]">Optional Password:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full border border-[#abc1db] bg-white px-1.5 h-6"
          />
        </div>
        <p className="text-[10px] text-gray-500 italic">
          {isProtected ? 'Document is currently protected. Click OK to unprotect.' : 'Protection restricts edits on the document page.'}
        </p>
      </div>
    </DialogModal>
  );
};

// 11. Spelling & Grammar Dialog
export const SpellingDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { editorRef, calculateWordCount } = useDocument();
  const [currentWord, setCurrentWord] = useState('accomodation');
  const [suggestions, setSuggestions] = useState(['accommodation', 'accommodations']);
  const [done, setDone] = useState(false);

  const handleReplace = (newWord: string) => {
    if (editorRef.current) {
      editorRef.current.innerHTML = editorRef.current.innerHTML.replace(new RegExp(currentWord, 'g'), newWord);
      calculateWordCount();
    }
    setDone(true);
  };

  return (
    <DialogModal title="Spelling and Grammar" isOpen={isOpen} onClose={onClose} width="w-[420px]">
      {!done ? (
        <div className="space-y-3">
          <div className="p-2 border border-red-200 bg-red-50 text-[11px]">
            <span className="font-semibold text-red-700">Not in Dictionary:</span>
            <div className="mt-1 font-mono text-red-900">{currentWord}</div>
          </div>
          <div>
            <span className="text-[#41556e] font-semibold">Suggestions:</span>
            <div className="border border-[#abc1db] bg-white p-1 max-h-24 overflow-y-auto mt-1">
              {suggestions.map((s) => (
                <div
                  key={s}
                  onClick={() => handleReplace(s)}
                  className="px-2 py-1 hover:bg-blue-100 cursor-pointer"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setDone(true)} className="office-btn px-2 py-1 border border-[#abc1db] bg-white">Ignore Once</button>
            <button onClick={() => setDone(true)} className="office-btn px-2 py-1 border border-[#abc1db] bg-white">Ignore All</button>
            <button onClick={() => setDone(true)} className="office-btn px-2 py-1 border border-[#abc1db] bg-white">Add to Dictionary</button>
          </div>
        </div>
      ) : (
        <div className="text-center py-4 space-y-2">
          <div className="text-[24px]">✓</div>
          <div className="font-semibold text-[#1e395b]">The spelling and grammar check is complete.</div>
        </div>
      )}
    </DialogModal>
  );
};

// 12. Zoom Dialog
export const ZoomDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  currentZoom: number;
  setZoom: (val: number) => void;
}> = ({ isOpen, onClose, currentZoom, setZoom }) => {
  const [selectedZoom, setSelectedZoom] = useState(currentZoom);

  const handleApply = () => {
    setZoom(selectedZoom);
    onClose();
  };

  return (
    <DialogModal
      title="Zoom"
      isOpen={isOpen}
      onClose={onClose}
      width="w-[340px]"
      footerButtons={
        <>
          <button onClick={handleApply} className="w-[72px] h-[22px] bg-gradient-to-b from-[#ffffff] to-[#d6e3f2] border border-[#7f9db9] rounded-[2px] text-[11px] font-medium">OK</button>
          <button onClick={onClose} className="w-[72px] h-[22px] bg-gradient-to-b from-[#ffffff] to-[#d6e3f2] border border-[#7f9db9] rounded-[2px] text-[11px] font-medium">Cancel</button>
        </>
      }
    >
      <fieldset className="border border-[#abc1db] p-2.5">
        <legend className="px-1 text-[#41556e] font-medium">Zoom to</legend>
        <div className="space-y-1.5">
          {[200, 100, 75].map((z) => (
            <label key={z} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="zoom" checked={selectedZoom === z} onChange={() => setSelectedZoom(z)} />
              <span>{z}%</span>
            </label>
          ))}
          <div className="flex items-center gap-2 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="zoom" checked={![200, 100, 75].includes(selectedZoom)} onChange={() => {}} />
              <span>Percent:</span>
            </label>
            <input
              type="number"
              min="50"
              max="200"
              value={selectedZoom}
              onChange={(e) => setSelectedZoom(parseInt(e.target.value, 10) || 100)}
              className="w-16 border border-[#abc1db] bg-white px-1.5 py-0.5 text-right"
            />
            <span>%</span>
          </div>
        </div>
      </fieldset>
    </DialogModal>
  );
};

// 13. Word Options Dialog
export const WordOptionsDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [selectedCat, setSelectedCat] = useState('General');

  const categories = [
    'General', 'Display', 'Proofing', 'Save', 'Language', 'Advanced', 'Customize Ribbon', 'Quick Access Toolbar'
  ];

  return (
    <DialogModal title="Word Options" isOpen={isOpen} onClose={onClose} width="w-[620px]">
      <div className="flex h-[320px] gap-3">
        <div className="w-[170px] border border-[#abc1db] bg-white overflow-y-auto py-1">
          {categories.map((cat) => (
            <div
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1 cursor-pointer text-[11px] ${
                selectedCat === cat ? 'bg-[#3399ff] text-white font-medium' : 'hover:bg-blue-50 text-gray-700'
              }`}
            >
              {cat}
            </div>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-[11px]">
          <h3 className="font-semibold text-[#1e395b] text-[13px] border-b border-[#abc1db] pb-1">User Interface options</h3>
          <div className="space-y-1.5">
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /><span>Show Mini Toolbar on selection</span></label>
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /><span>Enable Live Preview</span></label>
          </div>
          <h3 className="font-semibold text-[#1e395b] text-[13px] border-b border-[#abc1db] pb-1 pt-2">Personalize your copy of Microsoft Office</h3>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span>User name:</span>
              <input type="text" defaultValue="User" className="w-[200px] border border-[#abc1db] bg-white px-1" />
            </div>
            <div className="flex items-center justify-between">
              <span>Default Font:</span>
              <span className="font-semibold">Calibri (Body), 11 pt</span>
            </div>
          </div>
        </div>
      </div>
    </DialogModal>
  );
};
