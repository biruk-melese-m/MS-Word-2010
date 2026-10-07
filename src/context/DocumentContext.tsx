import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import {
  PageMargin,
  PageSize,
  DocumentComment,
  TrackedChange,
  CitationItem,
  FootnoteItem,
  WordCountStats,
} from '../types';

interface SelectionState {
  fontName: string;
  fontSize: string;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isDoubleUnderline: boolean;
  isStrikethrough: boolean;
  isDoubleStrikethrough: boolean;
  isSubscript: boolean;
  isSuperscript: boolean;
  foreColor: string;
  backColor: string;
  align: 'left' | 'center' | 'right' | 'justify';
  isBullet: boolean;
  isNumber: boolean;
  lineSpacing: string;
  currentStyle: string;
}

interface DocumentContextType {
  editorRef: React.RefObject<HTMLDivElement | null>;
  docTitle: string;
  setDocTitle: (title: string) => void;
  isReadOnly: boolean;
  setIsReadOnly: (val: boolean) => void;
  isProtected: boolean;
  setProtected: (val: boolean, password?: string) => void;
  protectPassword: string;
  selectionState: SelectionState;
  updateSelectionState: () => void;
  pageLayout: {
    margins: PageMargin;
    setMargins: (m: PageMargin) => void;
    orientation: 'portrait' | 'landscape';
    setOrientation: (o: 'portrait' | 'landscape') => void;
    size: PageSize;
    setSize: (s: PageSize) => void;
    columns: number;
    setColumns: (c: number) => void;
    watermark: string | null;
    setWatermark: (w: string | null) => void;
    pageColor: string;
    setPageColor: (c: string) => void;
    pageBorder: string | null;
    setPageBorder: (b: string | null) => void;
    direction: 'ltr' | 'rtl';
    setDirection: (d: 'ltr' | 'rtl') => void;
    showLineNumbers: boolean;
    setShowLineNumbers: (v: boolean) => void;
  };
  headerText: string;
  setHeaderText: (t: string) => void;
  footerText: string;
  setFooterText: (t: string) => void;
  pageNumberPosition: 'none' | 'top' | 'bottom';
  setPageNumberPosition: (pos: 'none' | 'top' | 'bottom') => void;
  comments: DocumentComment[];
  addComment: (text: string) => void;
  deleteComment: (id: string) => void;
  replyComment: (id: string, text: string) => void;
  activeCommentId: string | null;
  setActiveCommentId: (id: string | null) => void;
  trackChanges: boolean;
  setTrackChanges: (v: boolean) => void;
  trackedChanges: TrackedChange[];
  acceptChange: (id: string) => void;
  rejectChange: (id: string) => void;
  citations: CitationItem[];
  addCitation: (item: CitationItem) => void;
  citationStyle: string;
  setCitationStyle: (s: string) => void;
  insertBibliography: () => void;
  footnotes: FootnoteItem[];
  insertFootnote: (text: string, isEndnote?: boolean) => void;
  wordCountStats: WordCountStats;
  calculateWordCount: () => void;
  savedStatus: 'Saved' | 'Unsaved' | 'Autosaving...';
  lastSaved: Date | null;
  recentDocs: { title: string; date: string; content: string }[];
  formatPainterActive: boolean;
  toggleFormatPainter: () => void;
  // Commands
  executeCommand: (cmd: string, val?: any) => void;
  setFontFamily: (family: string) => void;
  setFontSize: (size: string) => void;
  changeFontSizeStep: (delta: number) => void;
  changeCase: (type: 'sentence' | 'lower' | 'upper' | 'title' | 'toggle') => void;
  clearFormatting: () => void;
  setLineSpacing: (spacing: string) => void;
  setParagraphSpacing: (before: number, after: number) => void;
  indent: (direction: 'in' | 'out') => void;
  applyStyle: (styleName: string) => void;
  insertTable: (rows: number, cols: number) => void;
  insertImage: (fileOrUrl: File | string, alt?: string) => void;
  insertShape: (shape: string) => void;
  insertHyperlink: (url: string, text?: string) => void;
  removeHyperlink: () => void;
  insertBookmark: (name: string) => void;
  insertCrossReference: (refText: string) => void;
  insertTextBox: () => void;
  insertDateTime: () => void;
  insertSymbol: (symbol: string) => void;
  insertEquation: (formula: string) => void;
  insertPageBreak: () => void;
  insertBlankPage: () => void;
  insertTableOfContents: () => void;
  updateTableOfContents: () => void;
  findAndReplace: (find: string, replace: string, replaceAll?: boolean) => number;
  newDocument: () => void;
  newFromTemplate: (name: string) => void;
  saveDocument: () => void;
  saveAsDocument: (format: 'docx' | 'html' | 'txt' | 'pdf') => void;
  openDocument: (file: File) => void;
  printDocument: () => void;
  undo: () => void;
  redo: () => void;
  selectAll: () => void;
  cut: () => void;
  copy: () => void;
  paste: () => void;
  pasteWithoutFormatting: () => void;
  pasteSpecial: () => void;
}

const defaultMargins: PageMargin = {
  name: 'Normal',
  top: 96, // 1 inch = 96px
  bottom: 96,
  left: 96,
  right: 96,
};

const defaultSize: PageSize = {
  name: 'Letter',
  width: 816,
  height: 1056,
};

const initialSampleContent = `
<h1 style="color: #365f91; font-family: Calibri, sans-serif; font-size: 26px; margin-bottom: 12px; font-weight: bold;">Document1</h1>
<p style="font-family: Calibri, sans-serif; font-size: 15px; line-height: 1.25; margin-bottom: 10px; color: #1e293b;">
Welcome to Microsoft Word 2010. You can type, format text, insert tables and illustrations, adjust page layouts, add references, track changes, and manage your documents with authentic Office 2010 precision.
</p>
<p style="font-family: Calibri, sans-serif; font-size: 15px; line-height: 1.25; margin-bottom: 10px; color: #1e293b;">
Select any text to apply fonts, colors, alignments, or styles from the ribbon above. You can also use standard keyboard shortcuts like <span style="font-weight: bold;">Ctrl+B</span> for bold, <span style="font-style: italic;">Ctrl+I</span> for italic, and <span style="text-decoration: underline;">Ctrl+U</span> for underline.
</p>
<p style="font-family: Calibri, sans-serif; font-size: 15px; line-height: 1.25; margin-bottom: 10px; color: #1e293b;">
የአማርኛ ጽሑፍ ድጋፍም አለ (Amharic and full Unicode support included).
</p>
`;

const DocumentContext = createContext<DocumentContextType | null>(null);

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [docTitle, setDocTitle] = useState('Document1');
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isProtected, setIsProtected] = useState(false);
  const [protectPassword, setProtectPassword] = useState('');

  // Page layout state
  const [margins, setMargins] = useState<PageMargin>(defaultMargins);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [size, setSize] = useState<PageSize>(defaultSize);
  const [columns, setColumns] = useState<number>(1);
  const [watermark, setWatermark] = useState<string | null>(null);
  const [pageColor, setPageColor] = useState<string>('#ffffff');
  const [pageBorder, setPageBorder] = useState<string | null>(null);
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  const [showLineNumbers, setShowLineNumbers] = useState<boolean>(false);

  // Headers and Footers
  const [headerText, setHeaderText] = useState('');
  const [footerText, setFooterText] = useState('');
  const [pageNumberPosition, setPageNumberPosition] = useState<'none' | 'top' | 'bottom'>('none');

  // Collaboration / Review
  const [comments, setComments] = useState<DocumentComment[]>([]);
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [trackChanges, setTrackChanges] = useState(false);
  const [trackedChanges, setTrackedChanges] = useState<TrackedChange[]>([]);

  // References
  const [citations, setCitations] = useState<CitationItem[]>([]);
  const [citationStyle, setCitationStyle] = useState('APA');
  const [footnotes, setFootnotes] = useState<FootnoteItem[]>([]);

  // Format painter & clipboard memory
  const [formatPainterActive, setFormatPainterActive] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<Record<string, string> | null>(null);

  // Status & Storage
  const [savedStatus, setSavedStatus] = useState<'Saved' | 'Unsaved' | 'Autosaving...'>('Saved');
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date());
  const [recentDocs, setRecentDocs] = useState<{ title: string; date: string; content: string }[]>([
    { title: 'Document1', date: new Date().toLocaleDateString(), content: initialSampleContent },
  ]);

  // Statistics
  const [wordCountStats, setWordCountStats] = useState<WordCountStats>({
    pages: 1,
    words: 0,
    charactersNoSpaces: 0,
    charactersWithSpaces: 0,
    paragraphs: 0,
    lines: 0,
  });

  // Current selection state
  const [selectionState, setSelectionState] = useState<SelectionState>({
    fontName: 'Calibri',
    fontSize: '11',
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isDoubleUnderline: false,
    isStrikethrough: false,
    isDoubleStrikethrough: false,
    isSubscript: false,
    isSuperscript: false,
    foreColor: '#000000',
    backColor: 'transparent',
    align: 'left',
    isBullet: false,
    isNumber: false,
    lineSpacing: '1.15',
    currentStyle: 'Normal',
  });

  // Calculate live word count stats from editor content
  const calculateWordCount = useCallback(() => {
    if (!editorRef.current) return;
    const text = editorRef.current.innerText || '';
    const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const charactersWithSpaces = text.length;
    const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0).length || (text ? 1 : 0);
    const lines = Math.max(1, Math.ceil(charactersWithSpaces / 80));
    const pages = Math.max(1, Math.ceil(lines / 45));

    setWordCountStats({
      pages,
      words,
      charactersNoSpaces,
      charactersWithSpaces,
      paragraphs,
      lines,
    });
  }, []);

  // Sync selection state on selectionchange or mouseup/keyup
  const updateSelectionState = useCallback(() => {
    if (!document) return;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const isBold = document.queryCommandState('bold');
    const isItalic = document.queryCommandState('italic');
    const isUnderline = document.queryCommandState('underline');
    const isStrikethrough = document.queryCommandState('strikeThrough');
    const isSubscript = document.queryCommandState('subscript');
    const isSuperscript = document.queryCommandState('superscript');
    const isBullet = document.queryCommandState('insertUnorderedList');
    const isNumber = document.queryCommandState('insertOrderedList');

    let align: 'left' | 'center' | 'right' | 'justify' = 'left';
    if (document.queryCommandState('justifyCenter')) align = 'center';
    else if (document.queryCommandState('justifyRight')) align = 'right';
    else if (document.queryCommandState('justifyFull')) align = 'justify';

    let fontName = 'Calibri';
    let fontSize = '11';
    let foreColor = '#000000';
    let backColor = 'transparent';

    const anchorNode = selection.anchorNode;
    if (anchorNode) {
      const el = anchorNode.nodeType === 1 ? (anchorNode as HTMLElement) : anchorNode.parentElement;
      if (el) {
        const computed = window.getComputedStyle(el);
        fontName = computed.fontFamily.replace(/['"]/g, '').split(',')[0].trim() || 'Calibri';
        const pxSize = parseFloat(computed.fontSize);
        if (pxSize) {
          fontSize = Math.round((pxSize * 72) / 96).toString(); // convert px to pt approx
        }
        foreColor = computed.color;
        backColor = computed.backgroundColor;
      }
    }

    setSelectionState((prev) => ({
      ...prev,
      fontName,
      fontSize: fontSize || '11',
      isBold,
      isItalic,
      isUnderline,
      isStrikethrough,
      isSubscript,
      isSuperscript,
      align,
      isBullet,
      isNumber,
      foreColor,
      backColor,
    }));

    calculateWordCount();
  }, [calculateWordCount]);

  // Execute standard formatting command
  const executeCommand = useCallback((cmd: string, val: any = null) => {
    if (isReadOnly || isProtected) return;
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(cmd, false, val);
    updateSelectionState();
    setSavedStatus('Unsaved');
  }, [isReadOnly, isProtected, updateSelectionState]);

  // Set font family
  const setFontFamily = useCallback((family: string) => {
    executeCommand('fontName', family);
    setSelectionState((prev) => ({ ...prev, fontName: family }));
  }, [executeCommand]);

  // Set font size
  const setFontSize = useCallback((size: string) => {
    if (!editorRef.current) return;
    executeCommand('fontSize', '7'); // placeholder to wrap font in <font size="7">
    // then replace with exact inline pt size
    const fonts = editorRef.current.querySelectorAll('font[size="7"]');
    fonts.forEach((f) => {
      f.removeAttribute('size');
      (f as HTMLElement).style.fontSize = `${size}pt`;
    });
    setSelectionState((prev) => ({ ...prev, fontSize: size }));
  }, [executeCommand]);

  // Increase/decrease font size by step
  const changeFontSizeStep = useCallback((delta: number) => {
    const cur = parseInt(selectionState.fontSize, 10) || 11;
    const next = Math.max(1, Math.min(72, cur + delta)).toString();
    setFontSize(next);
  }, [selectionState.fontSize, setFontSize]);

  // Change Case (Sentence, lower, UPPER, Capitalize Each, tOGGLE)
  const changeCase = useCallback((type: 'sentence' | 'lower' | 'upper' | 'title' | 'toggle') => {
    const selection = window.getSelection();
    if (!selection || !selection.toString()) return;
    const text = selection.toString();
    let transformed = text;

    if (type === 'lower') {
      transformed = text.toLowerCase();
    } else if (type === 'upper') {
      transformed = text.toUpperCase();
    } else if (type === 'sentence') {
      transformed = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    } else if (type === 'title') {
      transformed = text.replace(/\b\w/g, (c) => c.toUpperCase());
    } else if (type === 'toggle') {
      transformed = text
        .split('')
        .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
        .join('');
    }

    document.execCommand('insertText', false, transformed);
    updateSelectionState();
  }, [updateSelectionState]);

  // Clear formatting
  const clearFormatting = useCallback(() => {
    executeCommand('removeFormat');
    setSelectionState((prev) => ({
      ...prev,
      isBold: false,
      isItalic: false,
      isUnderline: false,
      isStrikethrough: false,
      fontName: 'Calibri',
      fontSize: '11',
      foreColor: '#000000',
    }));
  }, [executeCommand]);

  // Line spacing
  const setLineSpacing = useCallback((spacing: string) => {
    const selection = window.getSelection();
    if (!selection) return;
    const anchorNode = selection.anchorNode;
    const p = anchorNode?.nodeType === 1 ? (anchorNode as HTMLElement) : anchorNode?.parentElement;
    if (p) {
      const block = p.closest('p, div, h1, h2, h3, li') as HTMLElement;
      if (block) {
        block.style.lineHeight = spacing;
      }
    }
    setSelectionState((prev) => ({ ...prev, lineSpacing: spacing }));
  }, []);

  // Paragraph spacing
  const setParagraphSpacing = useCallback((before: number, after: number) => {
    const selection = window.getSelection();
    if (!selection) return;
    const anchorNode = selection.anchorNode;
    const p = anchorNode?.nodeType === 1 ? (anchorNode as HTMLElement) : anchorNode?.parentElement;
    if (p) {
      const block = p.closest('p, div, h1, h2, h3, li') as HTMLElement;
      if (block) {
        block.style.marginTop = `${before}pt`;
        block.style.marginBottom = `${after}pt`;
      }
    }
  }, []);

  // Indentation
  const indent = useCallback((dir: 'in' | 'out') => {
    executeCommand(dir === 'in' ? 'indent' : 'outdent');
  }, [executeCommand]);

  // Apply predefined style
  const applyStyle = useCallback((styleName: string) => {
    if (!editorRef.current) return;
    const stylesMap: Record<string, { tag: string; color: string; size: string; bold?: boolean; italic?: boolean }> = {
      Normal: { tag: 'p', color: '#1e293b', size: '11pt' },
      'No Spacing': { tag: 'p', color: '#1e293b', size: '11pt' },
      'Heading 1': { tag: 'h1', color: '#365f91', size: '18pt', bold: true },
      'Heading 2': { tag: 'h2', color: '#4f81bd', size: '14pt', bold: true },
      'Heading 3': { tag: 'h3', color: '#4f81bd', size: '12pt', bold: true },
      Title: { tag: 'h1', color: '#17365d', size: '26pt', bold: true },
      Subtitle: { tag: 'p', color: '#4f81bd', size: '12pt', italic: true },
      'Subtle Emphasis': { tag: 'span', color: '#595959', size: '11pt', italic: true },
      Quote: { tag: 'blockquote', color: '#595959', size: '11pt', italic: true },
    };

    const target = stylesMap[styleName];
    if (target) {
      if (['Heading 1', 'Heading 2', 'Heading 3', 'Title'].includes(styleName)) {
        executeCommand('formatBlock', target.tag);
      }
      if (target.bold) executeCommand('bold');
      if (target.italic) executeCommand('italic');
      setFontSize(target.size.replace('pt', ''));
      executeCommand('foreColor', target.color);
    }

    setSelectionState((prev) => ({ ...prev, currentStyle: styleName }));
  }, [executeCommand, setFontSize]);

  // Insert Table
  const insertTable = useCallback((rows: number, cols: number) => {
    let tableHtml = `<table style="width: 100%; border-collapse: collapse; margin: 12px 0; border: 1px solid #7f9db9;"><tbody>`;
    for (let r = 0; r < rows; r++) {
      tableHtml += `<tr>`;
      for (let c = 0; c < cols; c++) {
        tableHtml += `<td style="border: 1px solid #a9c1d9; padding: 6px 10px; min-width: 60px; font-family: Calibri; font-size: 11pt;">&nbsp;</td>`;
      }
      tableHtml += `</tr>`;
    }
    tableHtml += `</tbody></table><p><br/></p>`;
    executeCommand('insertHTML', tableHtml);
  }, [executeCommand]);

  // Insert Image
  const insertImage = useCallback((fileOrUrl: File | string, alt: string = 'Image') => {
    if (typeof fileOrUrl === 'string') {
      executeCommand('insertHTML', `<img src="${fileOrUrl}" alt="${alt}" style="max-width: 100%; height: auto; margin: 8px 0; border: 1px solid #cbd5e1; display: inline-block;" />`);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        executeCommand('insertHTML', `<img src="${src}" alt="${fileOrUrl.name}" style="max-width: 100%; height: auto; margin: 8px 0; border: 1px solid #cbd5e1; display: inline-block;" />`);
      };
      reader.readAsDataURL(fileOrUrl);
    }
  }, [executeCommand]);

  // Insert Shape
  const insertShape = useCallback((shape: string) => {
    let shapeHtml = '';
    if (shape === 'rectangle') {
      shapeHtml = `<div style="width: 160px; height: 90px; background-color: #4f81bd; border: 2px solid #385d8a; margin: 8px 0; display: inline-block; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);"></div>`;
    } else if (shape === 'oval') {
      shapeHtml = `<div style="width: 140px; height: 90px; background-color: #c0504d; border: 2px solid #943634; border-radius: 50%; margin: 8px 0; display: inline-block; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);"></div>`;
    } else if (shape === 'arrow') {
      shapeHtml = `<div style="width: 140px; height: 40px; background-color: #9bbb59; border: 2px solid #71893f; margin: 8px 0; display: inline-block; clip-path: polygon(0% 25%, 70% 25%, 70% 0%, 100% 50%, 70% 100%, 70% 75%, 0% 75%);"></div>`;
    } else {
      shapeHtml = `<div style="width: 120px; height: 80px; background-color: #8064a2; border: 2px solid #5c4777; margin: 8px 0; display: inline-block;"></div>`;
    }
    executeCommand('insertHTML', `${shapeHtml}<p><br/></p>`);
  }, [executeCommand]);

  // Insert Hyperlink
  const insertHyperlink = useCallback((url: string, text?: string) => {
    const selection = window.getSelection();
    const linkText = text || selection?.toString() || url;
    const html = `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">${linkText}</a>`;
    executeCommand('insertHTML', html);
  }, [executeCommand]);

  // Remove Hyperlink
  const removeHyperlink = useCallback(() => {
    executeCommand('unlink');
  }, [executeCommand]);

  // Bookmark & Cross-reference
  const insertBookmark = useCallback((name: string) => {
    executeCommand('insertHTML', `<a name="${name}" id="${name}" style="background-color: #fef08a;" title="Bookmark: ${name}">[🔖 ${name}]</a>`);
  }, [executeCommand]);

  const insertCrossReference = useCallback((refText: string) => {
    executeCommand('insertHTML', `<a href="#${refText}" style="color: #0284c7; text-decoration: underline;">[See ${refText}]</a>`);
  }, [executeCommand]);

  // Insert Text Box
  const insertTextBox = useCallback(() => {
    executeCommand(
      'insertHTML',
      `<div contenteditable="true" style="width: 220px; min-height: 90px; border: 1.5px dashed #4f81bd; padding: 10px; margin: 10px 0; background-color: #f8fafc; display: block; font-family: Calibri; font-size: 11pt;">Text Box. Click here to type text.</div><p><br/></p>`
    );
  }, [executeCommand]);

  // Insert Date & Time
  const insertDateTime = useCallback(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) + ' ' + now.toLocaleTimeString();
    executeCommand('insertText', formatted);
  }, [executeCommand]);

  // Insert Symbol & Equation
  const insertSymbol = useCallback((symbol: string) => {
    executeCommand('insertText', symbol);
  }, [executeCommand]);

  const insertEquation = useCallback((formula: string) => {
    executeCommand(
      'insertHTML',
      `<span style="font-family: 'Cambria Math', 'Times New Roman', serif; font-style: italic; background-color: #f1f5f9; padding: 2px 6px; border-radius: 3px; border: 1px solid #cbd5e1; display: inline-block;">${formula}</span>`
    );
  }, [executeCommand]);

  // Page break / Blank page
  const insertPageBreak = useCallback(() => {
    executeCommand(
      'insertHTML',
      `<div style="page-break-after: always; border-bottom: 2px dashed #94a3b8; margin: 24px 0; text-align: center; color: #64748b; font-size: 10px; font-family: Segoe UI, sans-serif;" contenteditable="false">--- Page Break ---</div><p><br/></p>`
    );
  }, [executeCommand]);

  const insertBlankPage = useCallback(() => {
    executeCommand(
      'insertHTML',
      `<div style="page-break-before: always; min-height: 800px; padding: 20px 0;">&nbsp;</div>`
    );
  }, [executeCommand]);

  // Table of Contents
  const insertTableOfContents = useCallback(() => {
    if (!editorRef.current) return;
    const headings = editorRef.current.querySelectorAll('h1, h2, h3');
    let tocHtml = `
      <div style="border: 1px solid #cbd5e1; background-color: #f8fafc; padding: 16px; margin: 16px 0; font-family: Calibri, sans-serif;" contenteditable="false">
        <div style="font-size: 16pt; font-weight: bold; color: #365f91; margin-bottom: 12px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">Table of Contents</div>
    `;

    if (headings.length === 0) {
      tocHtml += `<div style="font-style: italic; color: #64748b; font-size: 11pt;">No headings found in document. Use Heading 1 or Heading 2 styles to build your Table of Contents.</div>`;
    } else {
      headings.forEach((h, idx) => {
        const text = h.textContent || `Section ${idx + 1}`;
        const level = h.tagName.toLowerCase();
        const indent = level === 'h1' ? '0px' : level === 'h2' ? '20px' : '40px';
        const weight = level === 'h1' ? 'bold' : 'normal';
        tocHtml += `
          <div style="margin-left: ${indent}; font-weight: ${weight}; font-size: 11pt; padding: 3px 0; display: flex; justify-content: space-between;">
            <span>${text}</span>
            <span style="color: #64748b; border-bottom: 1px dotted #94a3b8; flex: 1; margin: 0 8px 4px 8px;"></span>
            <span style="color: #365f91;">${idx + 1}</span>
          </div>
        `;
      });
    }

    tocHtml += `</div><p><br/></p>`;
    executeCommand('insertHTML', tocHtml);
  }, [executeCommand]);

  const updateTableOfContents = useCallback(() => {
    insertTableOfContents();
  }, [insertTableOfContents]);

  // Footnotes & Citations
  const insertFootnote = useCallback((text: string, isEndnote = false) => {
    const num = footnotes.length + 1;
    const newFn: FootnoteItem = {
      id: Date.now().toString(),
      number: num,
      text,
      type: isEndnote ? 'endnote' : 'footnote',
    };
    setFootnotes((prev) => [...prev, newFn]);
    executeCommand('insertHTML', `<sup style="color: #2563eb; font-weight: bold; cursor: pointer;" title="${text}">[${num}]</sup>`);
  }, [footnotes.length, executeCommand]);

  const addCitation = useCallback((item: CitationItem) => {
    setCitations((prev) => [...prev, item]);
    executeCommand('insertHTML', `<span style="color: #1e3a8a; font-weight: 500;">(${item.author}, ${item.year})</span>`);
  }, [executeCommand]);

  const insertBibliography = useCallback(() => {
    let bibHtml = `
      <div style="margin-top: 24px; padding-top: 16px; border-top: 2px solid #365f91; font-family: Calibri, sans-serif;">
        <h2 style="font-size: 16pt; color: #365f91; font-weight: bold; margin-bottom: 12px;">Bibliography</h2>
    `;
    if (citations.length === 0) {
      bibHtml += `<p style="font-style: italic; color: #64748b; font-size: 11pt;">There are no sources in the current document.</p>`;
    } else {
      citations.forEach((c) => {
        bibHtml += `<p style="margin-bottom: 6px; font-size: 11pt; text-indent: -24px; padding-left: 24px;">${c.author} (${c.year}). <em>${c.title}</em>. ${c.publisher || ''}</p>`;
      });
    }
    bibHtml += `</div><p><br/></p>`;
    executeCommand('insertHTML', bibHtml);
  }, [citations, executeCommand]);

  // Comments
  const addComment = useCallback((text: string) => {
    const newComment: DocumentComment = {
      id: Date.now().toString(),
      author: 'User',
      text,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      resolved: false,
      replies: [],
    };
    setComments((prev) => [...prev, newComment]);
    setActiveCommentId(newComment.id);
    executeCommand('insertHTML', `<span style="background-color: #fef08a; border-bottom: 2px solid #ca8a04;" title="Comment by User: ${text}">[💬]</span>`);
  }, [executeCommand]);

  const deleteComment = useCallback((id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const replyComment = useCallback((id: string, text: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              replies: [...(c.replies || []), { author: 'User', text, date: new Date().toLocaleTimeString() }],
            }
          : c
      )
    );
  }, []);

  // Track changes accept/reject
  const acceptChange = useCallback((id: string) => {
    setTrackedChanges((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const rejectChange = useCallback((id: string) => {
    setTrackedChanges((prev) => prev.filter((c) => c.id !== id));
  }, []);

  // Find & Replace
  const findAndReplace = useCallback((findText: string, replaceText: string, replaceAll = false): number => {
    if (!editorRef.current || !findText) return 0;
    const html = editorRef.current.innerHTML;
    let count = 0;

    const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), replaceAll ? 'g' : '');
    const matches = html.match(regex);
    if (matches) {
      count = matches.length;
      editorRef.current.innerHTML = html.replace(regex, replaceText);
      calculateWordCount();
      setSavedStatus('Unsaved');
    }
    return count;
  }, [calculateWordCount]);

  // Format Painter
  const toggleFormatPainter = useCallback(() => {
    if (!formatPainterActive) {
      // capture current style
      setCopiedFormat({ ...selectionState } as any);
      setFormatPainterActive(true);
    } else {
      setFormatPainterActive(false);
      setCopiedFormat(null);
    }
  }, [formatPainterActive, selectionState]);

  // File Operations
  const newDocument = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = '<p><br/></p>';
    }
    setDocTitle('Document1');
    setComments([]);
    setFootnotes([]);
    setCitations([]);
    setTrackedChanges([]);
    setWatermark(null);
    setPageColor('#ffffff');
    setPageBorder(null);
    setSavedStatus('Saved');
  }, []);

  const newFromTemplate = useCallback((templateName: string) => {
    let content = '';
    if (templateName === 'Resume') {
      content = `
        <h1 style="color: #17365d; font-size: 24pt; margin-bottom: 2px;">John Doe</h1>
        <p style="color: #595959; font-size: 11pt; margin-bottom: 16px;">email@example.com • (555) 123-4567 • City, State</p>
        <h2 style="color: #365f91; font-size: 14pt; border-bottom: 1px solid #b8cce2; padding-bottom: 2px;">Experience</h2>
        <p><strong>Senior Software Engineer</strong> — Company Name (2020 – Present)</p>
        <ul><li>Led architecture and cross-functional engineering teams.</li><li>Delivered reliable, scalable enterprise applications.</li></ul>
        <h2 style="color: #365f91; font-size: 14pt; border-bottom: 1px solid #b8cce2; padding-bottom: 2px; margin-top: 14px;">Education</h2>
        <p><strong>B.S. in Computer Science</strong> — University Name</p>
      `;
    } else if (templateName === 'Letter') {
      content = `
        <p style="text-align: right; margin-bottom: 20px;">${new Date().toLocaleDateString()}</p>
        <p style="margin-bottom: 14px;">Recipient Name<br/>Company Name<br/>123 Street Address<br/>City, State Zip</p>
        <p style="margin-bottom: 14px;">Dear Recipient,</p>
        <p style="margin-bottom: 14px;">I am writing to express my appreciation and outline our upcoming project roadmap...</p>
        <p style="margin-top: 30px;">Sincerely,<br/><br/><strong>Sender Name</strong></p>
      `;
    } else {
      content = `
        <h1 style="text-align: center; color: #17365d; font-size: 26pt; margin-top: 60px;">Executive Business Report</h1>
        <p style="text-align: center; color: #4f81bd; font-size: 14pt; margin-bottom: 80px;">Annual Operational Review</p>
        <h2 style="color: #365f91; font-size: 16pt;">1. Executive Summary</h2>
        <p>This report highlights progress made during the previous fiscal year...</p>
      `;
    }

    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
    setDocTitle(`${templateName} Document`);
    setSavedStatus('Saved');
  }, []);

  const saveDocument = useCallback(() => {
    if (!editorRef.current) return;
    const content = editorRef.current.innerHTML;
    localStorage.setItem(`word2010_doc_${docTitle}`, content);
    localStorage.setItem('word2010_last_doc', JSON.stringify({ title: docTitle, content, date: new Date().toISOString() }));
    setSavedStatus('Saved');
    setLastSaved(new Date());

    setRecentDocs((prev) => {
      const filtered = prev.filter((d) => d.title !== docTitle);
      return [{ title: docTitle, date: new Date().toLocaleDateString(), content }, ...filtered].slice(0, 8);
    });
  }, [docTitle]);

  const saveAsDocument = useCallback((format: 'docx' | 'html' | 'txt' | 'pdf') => {
    if (!editorRef.current) return;
    const content = editorRef.current.innerHTML;
    const plainText = editorRef.current.innerText;

    if (format === 'html' || format === 'docx') {
      const header = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${docTitle}</title><style>body{font-family:Calibri,sans-serif;margin:40px;}</style></head><body>`;
      const footer = `</body></html>`;
      const fullDoc = header + content + footer;
      const mime = format === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'text/html';
      const blob = new Blob([fullDoc], { type: mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${docTitle}.${format === 'docx' ? 'doc' : 'html'}`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'txt') {
      const blob = new Blob([plainText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${docTitle}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      window.print();
    }
  }, [docTitle]);

  const openDocument = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (editorRef.current) {
        editorRef.current.innerHTML = result;
      }
      setDocTitle(file.name.replace(/\.[^/.]+$/, ''));
      setSavedStatus('Saved');
      calculateWordCount();
    };
    if (file.name.endsWith('.txt')) {
      reader.readAsText(file);
    } else {
      reader.readAsText(file);
    }
  }, [calculateWordCount]);

  const printDocument = useCallback(() => {
    window.print();
  }, []);

  const undo = useCallback(() => executeCommand('undo'), [executeCommand]);
  const redo = useCallback(() => executeCommand('redo'), [executeCommand]);
  const selectAll = useCallback(() => executeCommand('selectAll'), [executeCommand]);
  const cut = useCallback(() => executeCommand('cut'), [executeCommand]);
  const copy = useCallback(() => executeCommand('copy'), [executeCommand]);
  const paste = useCallback(() => executeCommand('paste'), [executeCommand]);
  const pasteWithoutFormatting = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      executeCommand('insertText', text);
    } catch {
      executeCommand('paste');
    }
  }, [executeCommand]);
  const pasteSpecial = useCallback(() => pasteWithoutFormatting(), [pasteWithoutFormatting]);

  // Set document protection
  const setProtected = useCallback((enabled: boolean, pwd = '') => {
    setIsProtected(enabled);
    setProtectPassword(pwd);
  }, []);

  // Autosave interval every 15 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (savedStatus === 'Unsaved') {
        saveDocument();
      }
    }, 15000);
    return () => clearInterval(timer);
  }, [savedStatus, saveDocument]);

  return (
    <DocumentContext.Provider
      value={{
        editorRef,
        docTitle,
        setDocTitle,
        isReadOnly,
        setIsReadOnly,
        isProtected,
        setProtected,
        protectPassword,
        selectionState,
        updateSelectionState,
        pageLayout: {
          margins,
          setMargins,
          orientation,
          setOrientation,
          size,
          setSize,
          columns,
          setColumns,
          watermark,
          setWatermark,
          pageColor,
          setPageColor,
          pageBorder,
          setPageBorder,
          direction,
          setDirection,
          showLineNumbers,
          setShowLineNumbers,
        },
        headerText,
        setHeaderText,
        footerText,
        setFooterText,
        pageNumberPosition,
        setPageNumberPosition,
        comments,
        addComment,
        deleteComment,
        replyComment,
        activeCommentId,
        setActiveCommentId,
        trackChanges,
        setTrackChanges,
        trackedChanges,
        acceptChange,
        rejectChange,
        citations,
        addCitation,
        citationStyle,
        setCitationStyle,
        insertBibliography,
        footnotes,
        insertFootnote,
        wordCountStats,
        calculateWordCount,
        savedStatus,
        lastSaved,
        recentDocs,
        formatPainterActive,
        toggleFormatPainter,
        executeCommand,
        setFontFamily,
        setFontSize,
        changeFontSizeStep,
        changeCase,
        clearFormatting,
        setLineSpacing,
        setParagraphSpacing,
        indent,
        applyStyle,
        insertTable,
        insertImage,
        insertShape,
        insertHyperlink,
        removeHyperlink,
        insertBookmark,
        insertCrossReference,
        insertTextBox,
        insertDateTime,
        insertSymbol,
        insertEquation,
        insertPageBreak,
        insertBlankPage,
        insertTableOfContents,
        updateTableOfContents,
        findAndReplace,
        newDocument,
        newFromTemplate,
        saveDocument,
        saveAsDocument,
        openDocument,
        printDocument,
        undo,
        redo,
        selectAll,
        cut,
        copy,
        paste,
        pasteWithoutFormatting,
        pasteSpecial,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
};
