import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import {
  PageMargin,
  PageSize,
  DocumentComment,
  TrackedChange,
  CitationItem,
  FootnoteItem,
  WordCountStats,
  BulletStyle,
  NumberingStyle,
  PasteSpecialOption,
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
  isSmallCaps: boolean;
  isAllCaps: boolean;
  isHidden: boolean;
  foreColor: string;
  backColor: string;
  align: 'left' | 'center' | 'right' | 'justify';
  isBullet: boolean;
  bulletStyle: BulletStyle;
  isNumber: boolean;
  numberingStyle: NumberingStyle;
  lineSpacing: string;
  spaceBefore: number;
  spaceAfter: number;
  currentStyle: string;
}

interface CopiedFormatting {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  color: string;
  backgroundColor: string;
  textAlign: string;
  lineHeight: string;
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
  hasSelection: boolean;
  updateSelectionState: () => void;
  // Page Layout
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
  // Format Painter
  formatPainterActive: boolean;
  toggleFormatPainter: () => void;
  applyFormatPainterToSelection: () => void;
  // Real Undo / Redo
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  recordSnapshot: () => void;
  executeCommand: (cmd: string, val?: string) => void;
  saveSelection: () => void;
  restoreSelection: () => void;
  // Show / Hide formatting marks
  showFormattingMarks: boolean;
  setShowFormattingMarks: (v: boolean) => void;
  toggleFormattingMarks: () => void;
  sortParagraphs: (ascending?: boolean) => void;
  // Clipboard
  cut: () => void;
  copy: () => void;
  paste: () => void;
  pasteWithoutFormatting: () => void;
  pasteSpecial: (option: PasteSpecialOption) => void;
  selectAll: () => void;
  // Font & Formatting commands
  setFontFamily: (family: string) => void;
  setFontSize: (size: string) => void;
  changeFontSizeStep: (delta: number) => void;
  toggleBold: () => void;
  toggleItalic: () => void;
  toggleUnderline: () => void;
  setUnderlineStyle: (style: 'single' | 'double' | 'dotted' | 'dashed' | 'wavy', color?: string) => void;
  toggleDoubleUnderline: () => void;
  toggleStrikethrough: () => void;
  toggleDoubleStrikethrough: () => void;
  toggleSubscript: () => void;
  toggleSuperscript: () => void;
  setTextColor: (color: string) => void;
  setTextHighlight: (color: string) => void;
  setTextEffect: (effect: string) => void;
  changeCase: (type: 'sentence' | 'lower' | 'upper' | 'title' | 'toggle') => void;
  toggleSmallCaps: () => void;
  toggleAllCaps: () => void;
  toggleHiddenText: () => void;
  clearFormatting: () => void;
  // Paragraph commands
  setAlignment: (align: 'left' | 'center' | 'right' | 'justify') => void;
  setLineSpacing: (spacing: string) => void;
  setParagraphSpacing: (before: number, after: number) => void;
  toggleSpaceBefore: () => void;
  toggleSpaceAfter: () => void;
  indent: (direction: 'in' | 'out') => void;
  toggleBullets: (style?: BulletStyle) => void;
  toggleNumbering: (style?: NumberingStyle) => void;
  applyMultilevelList: (type: string) => void;
  applyBorder: (borderType: string) => void;
  applyShading: (color: string) => void;
  applyStyle: (styleName: string) => void;
  // Find & Replace
  findSearchTerm: string;
  setFindSearchTerm: (term: string) => void;
  activeMatchIndex: number;
  totalMatches: number;
  findNextMatch: () => void;
  findPrevMatch: () => void;
  findAndReplace: (find: string, replace: string, replaceAll?: boolean) => number;
  clearFindHighlights: () => void;
  // General insertion
  insertTable: (rows: number, cols: number) => void;
  insertTableRow: (above?: boolean) => void;
  insertTableColumn: (left?: boolean) => void;
  deleteTableRow: () => void;
  deleteTableColumn: () => void;
  deleteTable: () => void;
  mergeTableCells: () => void;
  splitTableCells: () => void;
  selectTable: (part: 'row' | 'column' | 'table') => void;
  distributeTable: (target: 'rows' | 'columns') => void;
  autoFitTable: (mode: 'contents' | 'window' | 'fixed') => void;
  setTableCellAlignment: (align: string) => void;
  setTableCellMargins: (padding: number) => void;
  setTableBorders: (type: string) => void;
  setTableShading: (color: string) => void;
  sortTable: (ascending?: boolean) => void;
  convertTextToTable: () => void;
  convertTableToText: () => void;
  repeatHeaderRow: () => void;
  insertImage: (fileOrUrl: File | string, alt?: string) => void;
  formatSelectedImage: (action: string, val?: any) => void;
  insertShape: (shape: string) => void;
  formatSelectedShape: (action: string, val?: any) => void;
  arrangeObject: (action: string) => void;
  insertHyperlink: (url: string, text?: string) => void;
  removeHyperlink: () => void;
  insertBookmark: (name: string) => void;
  goToBookmark: (name: string) => void;
  insertCrossReference: (refText: string) => void;
  insertTextBox: () => void;
  insertDateTime: () => void;
  insertSymbol: (symbol: string) => void;
  insertEquation: (formula: string) => void;
  insertPageBreak: () => void;
  insertBlankPage: () => void;
  insertTableOfContents: () => void;
  updateTableOfContents: () => void;
  // Header / Footer options
  differentFirstPage: boolean;
  setDifferentFirstPage: (val: boolean) => void;
  differentOddEven: boolean;
  setDifferentOddEven: (val: boolean) => void;
  pageNumberFormat: string;
  setPageNumberFormat: (val: string) => void;
  // Comments
  showComments: boolean;
  setShowComments: (val: boolean) => void;
  navigateToComment: (dir: 'next' | 'prev') => void;
  // Tracking
  showMarkup: boolean;
  setShowMarkup: (val: boolean) => void;
  navigateToChange: (dir: 'next' | 'prev') => void;
  // Proofing
  autoSpellingCheck: boolean;
  setAutoSpellingCheck: (val: boolean) => void;
  autoGrammarCheck: boolean;
  setAutoGrammarCheck: (val: boolean) => void;
  // Document Lifecycle
  newDocument: () => void;
  newFromTemplate: (name: string) => void;
  saveDocument: () => void;
  saveAsDocument: (format: 'docx' | 'html' | 'txt' | 'pdf') => void;
  openDocument: (file: File) => void;
  printDocument: () => void;
}

const defaultMargins: PageMargin = {
  name: 'Normal',
  top: 96,
  bottom: 96,
  left: 96,
  right: 96,
};

const defaultSize: PageSize = {
  name: 'A4',
  width: 794,
  height: 1123,
};

export const initialSampleContent = `
<div class="word-page" data-page="1">
  <div class="word-page-header" contenteditable="false">
    <span>[Header - Double click to edit]</span>
    <span>Page 1</span>
  </div>
  <div class="word-page-content">
    <h1 style="color: #365f91; font-family: Calibri, sans-serif; font-size: 24pt; margin-bottom: 12px; font-weight: bold;">Document1</h1>
    <p style="font-family: Calibri, sans-serif; font-size: 11pt; line-height: 1.15; margin-bottom: 10pt; color: #1e293b;">
      Welcome to Microsoft Word 2010. You can type, format text, insert tables and illustrations, adjust page layouts, add references, track changes, and manage your documents with authentic Office 2010 precision.
    </p>
    <p style="font-family: Calibri, sans-serif; font-size: 11pt; line-height: 1.15; margin-bottom: 10pt; color: #1e293b;">
      Select any text to apply fonts, colors, alignments, or styles from the ribbon above. You can also use standard keyboard shortcuts like <span style="font-weight: bold;">Ctrl+B</span> for bold, <span style="font-style: italic;">Ctrl+I</span> for italic, and <span style="text-decoration: underline;">Ctrl+U</span> for underline.
    </p>
    <p style="font-family: Calibri, sans-serif; font-size: 11pt; line-height: 1.15; margin-bottom: 10pt; color: #1e293b;">
      The document is configured to standard <span style="font-weight: bold; color: #17365d;">ISO 216 A4 size (210 × 297 mm)</span> with separated, independent sheets. Scroll down to view Page 2 separated across the desk workspace gap.
    </p>
    <p style="font-family: Calibri, sans-serif; font-size: 11pt; line-height: 1.15; margin-bottom: 10pt; color: #1e293b;">
      የአማርኛ ጽሑፍ ድጋፍም አለ (Amharic and full Unicode support included).
    </p>
  </div>
  <div class="word-page-footer" contenteditable="false">
    <span>[Footer - Double click to edit]</span>
    <span>Page 1</span>
  </div>
</div>

<div class="word-page" data-page="2">
  <div class="word-page-header" contenteditable="false">
    <span>[Header - Double click to edit]</span>
    <span>Page 2</span>
  </div>
  <div class="word-page-content">
    <h2 style="color: #365f91; font-family: Calibri, sans-serif; font-size: 18pt; margin-bottom: 12px; font-weight: bold;">Page 2 — Document Formatting & Properties</h2>
    <p style="font-family: Calibri, sans-serif; font-size: 11pt; line-height: 1.15; margin-bottom: 10pt; color: #1e293b;">
      This is the second separated A4 sheet. In Word 2010 Print Layout, each page is an individual paper sheet separated by the gray workspace desk background.
    </p>
    <table style="border-collapse: collapse; width: 100%; margin: 14px 0; font-family: Calibri, sans-serif; font-size: 11pt;">
      <thead>
        <tr style="background-color: #4f81bd; color: white;">
          <th style="border: 1px solid #365f91; padding: 6px 12px; text-align: left;">Feature</th>
          <th style="border: 1px solid #365f91; padding: 6px 12px; text-align: left;">Word 2010 Specification</th>
          <th style="border: 1px solid #365f91; padding: 6px 12px; text-align: left;">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background-color: #f2f2f2;">
          <td style="border: 1px solid #d9d9d9; padding: 6px 12px; font-weight: bold;">Page Paper Size</td>
          <td style="border: 1px solid #d9d9d9; padding: 6px 12px;">ISO 216 A4 (210 × 297 mm / 794 × 1123 px)</td>
          <td style="border: 1px solid #d9d9d9; padding: 6px 12px; color: #008000; font-weight: bold;">✓ Active</td>
        </tr>
        <tr>
          <td style="border: 1px solid #d9d9d9; padding: 6px 12px; font-weight: bold;">Page Separation</td>
          <td style="border: 1px solid #d9d9d9; padding: 6px 12px;">Distinct A4 Sheets with 24px Workspace Desk Gaps</td>
          <td style="border: 1px solid #d9d9d9; padding: 6px 12px; color: #008000; font-weight: bold;">✓ Active</td>
        </tr>
        <tr style="background-color: #f2f2f2;">
          <td style="border: 1px solid #d9d9d9; padding: 6px 12px; font-weight: bold;">Ribbon Menus</td>
          <td style="border: 1px solid #d9d9d9; padding: 6px 12px;">Floating Dropdowns above Horizontal Metric Ruler</td>
          <td style="border: 1px solid #d9d9d9; padding: 6px 12px; color: #008000; font-weight: bold;">✓ Active</td>
        </tr>
        <tr>
          <td style="border: 1px solid #d9d9d9; padding: 6px 12px; font-weight: bold;">Home Tab Controls</td>
          <td style="border: 1px solid #d9d9d9; padding: 6px 12px;">Clipboard, Font, Paragraph, Styles, Editing</td>
          <td style="border: 1px solid #d9d9d9; padding: 6px 12px; color: #008000; font-weight: bold;">✓ Functional</td>
        </tr>
      </tbody>
    </table>
    <p style="font-family: Calibri, sans-serif; font-size: 11pt; line-height: 1.15; margin-top: 10pt; color: #1e293b;">
      You can add more pages at any time using <span style="font-weight: bold;">Insert → Page Break</span> or by pressing <span style="font-weight: bold;">Ctrl+Enter</span>.
    </p>
  </div>
  <div class="word-page-footer" contenteditable="false">
    <span>[Footer - Double click to edit]</span>
    <span>Page 2</span>
  </div>
</div>
`;

const fontStepList = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];

const DocumentContext = createContext<DocumentContextType | null>(null);

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [docTitle, setDocTitle] = useState('Document1');
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isProtected, setIsProtected] = useState(false);
  const [protectPassword, setProtectPassword] = useState('');

  // Real History Stack
  const [historyStack, setHistoryStack] = useState<string[]>([initialSampleContent]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Internal Clipboard store (fallback and rich format retention)
  const [internalClipboard, setInternalClipboard] = useState<{ html: string; text: string }>({ html: '', text: '' });

  // Page layout
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
  const [differentFirstPage, setDifferentFirstPage] = useState(false);
  const [differentOddEven, setDifferentOddEven] = useState(false);
  const [pageNumberFormat, setPageNumberFormat] = useState('1, 2, 3');

  // Collaboration / Review
  const [comments, setComments] = useState<DocumentComment[]>([]);
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(true);
  const [trackChanges, setTrackChanges] = useState(false);
  const [trackedChanges, setTrackedChanges] = useState<TrackedChange[]>([]);
  const [showMarkup, setShowMarkup] = useState(true);
  const [autoSpellingCheck, setAutoSpellingCheck] = useState(true);
  const [autoGrammarCheck, setAutoGrammarCheck] = useState(true);

  // References
  const [citations, setCitations] = useState<CitationItem[]>([]);
  const [citationStyle, setCitationStyle] = useState('APA');
  const [footnotes, setFootnotes] = useState<FootnoteItem[]>([]);

  // Format painter
  const [formatPainterActive, setFormatPainterActive] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<CopiedFormatting | null>(null);

  // Selection info
  const [hasSelection, setHasSelection] = useState(false);

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

  // Selection state
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
    isSmallCaps: false,
    isAllCaps: false,
    isHidden: false,
    foreColor: '#000000',
    backColor: 'transparent',
    align: 'left',
    isBullet: false,
    bulletStyle: 'disc',
    isNumber: false,
    numberingStyle: 'decimal',
    lineSpacing: '1.15',
    spaceBefore: 0,
    spaceAfter: 10,
    currentStyle: 'Normal',
  });

  // Find & Replace Search state
  const [findSearchTerm, setFindSearchTerm] = useState('');
  const [activeMatchIndex, setActiveMatchIndex] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);

  // Take an undo snapshot
  const recordSnapshot = useCallback(() => {
    if (!editorRef.current) return;
    const currentHTML = editorRef.current.innerHTML;
    setHistoryStack((prev) => {
      if (prev[historyIndex] === currentHTML) return prev;
      const nextStack = prev.slice(0, historyIndex + 1);
      nextStack.push(currentHTML);
      if (nextStack.length > 60) nextStack.shift();
      return nextStack;
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 59));
    setSavedStatus('Unsaved');
  }, [historyIndex]);

  // Calculate live word count
  const calculateWordCount = useCallback(() => {
    if (!editorRef.current) return;
    const text = editorRef.current.innerText || '';
    const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const charactersWithSpaces = text.length;
    const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0).length || (text ? 1 : 0);
    const lines = Math.max(1, Math.ceil(charactersWithSpaces / 80));
    const pageElements = editorRef.current.querySelectorAll('.word-page');
    const pages = Math.max(pageElements.length, Math.max(1, Math.ceil(lines / 45)));

    setWordCountStats({
      pages,
      words,
      charactersNoSpaces,
      charactersWithSpaces,
      paragraphs,
      lines,
    });
  }, []);

  // Saved range reference to maintain selection when clicking toolbar controls
  const savedRangeRef = useRef<Range | null>(null);

  const saveSelection = useCallback(() => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && editorRef.current) {
      const range = sel.getRangeAt(0);
      if (editorRef.current.contains(range.commonAncestorContainer)) {
        savedRangeRef.current = range.cloneRange();
      }
    }
  }, []);

  const restoreSelection = useCallback(() => {
    if (!savedRangeRef.current || !editorRef.current) return;
    const sel = window.getSelection();
    if (sel) {
      try {
        sel.removeAllRanges();
        sel.addRange(savedRangeRef.current);
      } catch {}
    }
  }, []);

  // Show / Hide Formatting Marks
  const [showFormattingMarks, setShowFormattingMarks] = useState(false);
  const toggleFormattingMarks = useCallback(() => {
    setShowFormattingMarks((prev) => !prev);
  }, []);

  // Sort paragraphs alphabetically
  const sortParagraphs = useCallback((ascending = true) => {
    if (!editorRef.current || isReadOnly || isProtected) return;
    const blocks = Array.from(editorRef.current.children) as HTMLElement[];
    if (blocks.length <= 1) return;
    blocks.sort((a, b) => {
      const textA = (a.innerText || a.textContent || '').trim();
      const textB = (b.innerText || b.textContent || '').trim();
      return ascending ? textA.localeCompare(textB) : textB.localeCompare(textA);
    });
    blocks.forEach((b) => editorRef.current?.appendChild(b));
    recordSnapshot();
    updateSelectionState();
  }, [isReadOnly, isProtected, recordSnapshot]);

  // Update selection states
  const updateSelectionState = useCallback(() => {
    saveSelection();
    const selection = window.getSelection();
    if (!selection) return;

    const hasSel = !selection.isCollapsed && (selection.toString().length > 0);
    setHasSelection(hasSel);

    if (selection.rangeCount === 0) return;

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
    let isDoubleUnderline = false;
    let isDoubleStrikethrough = false;
    let isSmallCaps = false;
    let isAllCaps = false;
    let isHidden = false;
    let lineSpacing = '1.15';
    let spaceBefore = 0;
    let spaceAfter = 10;
    let currentStyle = 'Normal';

    const anchorNode = selection.anchorNode;
    if (anchorNode) {
      const el = anchorNode.nodeType === 1 ? (anchorNode as HTMLElement) : anchorNode.parentElement;
      if (el) {
        const computed = window.getComputedStyle(el);
        fontName = computed.fontFamily.replace(/['"]/g, '').split(',')[0].trim() || 'Calibri';
        const pxSize = parseFloat(computed.fontSize);
        if (pxSize) {
          fontSize = Math.round((pxSize * 72) / 96).toString();
        }
        foreColor = computed.color;
        backColor = computed.backgroundColor;

        // Check double underline or double strikethrough in computed textDecoration
        if (computed.textDecoration.includes('double')) {
          if (computed.textDecoration.includes('underline')) isDoubleUnderline = true;
          if (computed.textDecoration.includes('line-through')) isDoubleStrikethrough = true;
        }

        if (computed.fontVariant === 'small-caps') isSmallCaps = true;
        if (computed.textTransform === 'uppercase') isAllCaps = true;
        if (computed.visibility === 'hidden' || computed.display === 'none') isHidden = true;

        const block = el.closest('p, h1, h2, h3, li, div') as HTMLElement;
        if (block) {
          const blockStyle = window.getComputedStyle(block);
          if (block.tagName === 'H1') currentStyle = 'Heading 1';
          else if (block.tagName === 'H2') currentStyle = 'Heading 2';
          else if (block.tagName === 'H3') currentStyle = 'Heading 3';
          else currentStyle = 'Normal';

          if (blockStyle.lineHeight && blockStyle.lineHeight !== 'normal') {
            const num = parseFloat(blockStyle.lineHeight) / parseFloat(blockStyle.fontSize);
            if (!isNaN(num)) lineSpacing = num.toFixed(2);
          }
          spaceBefore = parseFloat(blockStyle.marginTop) || 0;
          spaceAfter = parseFloat(blockStyle.marginBottom) || 0;
        }
      }
    }

    setSelectionState((prev) => ({
      ...prev,
      fontName,
      fontSize: fontSize || '11',
      isBold,
      isItalic,
      isUnderline,
      isDoubleUnderline,
      isStrikethrough,
      isDoubleStrikethrough,
      isSubscript,
      isSuperscript,
      isSmallCaps,
      isAllCaps,
      isHidden,
      align,
      isBullet,
      isNumber,
      foreColor,
      backColor,
      lineSpacing,
      spaceBefore,
      spaceAfter,
      currentStyle,
    }));

    calculateWordCount();
  }, [calculateWordCount]);

  // Real Undo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const targetIndex = historyIndex - 1;
      const targetHTML = historyStack[targetIndex];
      if (editorRef.current) {
        editorRef.current.innerHTML = targetHTML;
      }
      setHistoryIndex(targetIndex);
      updateSelectionState();
      calculateWordCount();
      setSavedStatus('Unsaved');
    }
  }, [historyIndex, historyStack, updateSelectionState, calculateWordCount]);

  // Real Redo
  const redo = useCallback(() => {
    if (historyIndex < historyStack.length - 1) {
      const targetIndex = historyIndex + 1;
      const targetHTML = historyStack[targetIndex];
      if (editorRef.current) {
        editorRef.current.innerHTML = targetHTML;
      }
      setHistoryIndex(targetIndex);
      updateSelectionState();
      calculateWordCount();
      setSavedStatus('Unsaved');
    }
  }, [historyIndex, historyStack, updateSelectionState, calculateWordCount]);

  // Generic command executor
  const executeCommand = useCallback((cmd: string, val: string = '') => {
    if (isReadOnly || isProtected) return;
    restoreSelection();
    document.execCommand(cmd, false, val);
    recordSnapshot();
    updateSelectionState();
  }, [isReadOnly, isProtected, restoreSelection, recordSnapshot, updateSelectionState]);

  // Clipboard operations
  const cut = useCallback(() => {
    if (isReadOnly || isProtected) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const text = selection.toString();
    const container = document.createElement('div');
    if (selection.rangeCount > 0) {
      container.appendChild(selection.getRangeAt(0).cloneContents());
    }
    const html = container.innerHTML;

    setInternalClipboard({ html, text });
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }

    document.execCommand('delete');
    recordSnapshot();
    updateSelectionState();
  }, [isReadOnly, isProtected, recordSnapshot, updateSelectionState]);

  const copy = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const text = selection.toString();
    const container = document.createElement('div');
    if (selection.rangeCount > 0) {
      container.appendChild(selection.getRangeAt(0).cloneContents());
    }
    const html = container.innerHTML;

    setInternalClipboard({ html, text });
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  }, []);

  const paste = useCallback(async () => {
    if (isReadOnly || isProtected) return;
    try {
      if (internalClipboard.html) {
        document.execCommand('insertHTML', false, internalClipboard.html);
      } else {
        const text = await navigator.clipboard.readText();
        document.execCommand('insertText', false, text);
      }
    } catch {
      if (internalClipboard.text) {
        document.execCommand('insertText', false, internalClipboard.text);
      }
    }
    recordSnapshot();
    updateSelectionState();
  }, [isReadOnly, isProtected, internalClipboard, recordSnapshot, updateSelectionState]);

  const pasteWithoutFormatting = useCallback(async () => {
    if (isReadOnly || isProtected) return;
    let text = internalClipboard.text;
    try {
      text = await navigator.clipboard.readText();
    } catch {}
    if (text) {
      document.execCommand('insertText', false, text);
      recordSnapshot();
      updateSelectionState();
    }
  }, [isReadOnly, isProtected, internalClipboard.text, recordSnapshot, updateSelectionState]);

  const pasteSpecial = useCallback((option: PasteSpecialOption) => {
    if (isReadOnly || isProtected) return;
    if (option === 'html') {
      const htmlToPaste = internalClipboard.html || internalClipboard.text;
      document.execCommand('insertHTML', false, htmlToPaste);
    } else if (option === 'text') {
      const textToPaste = internalClipboard.text;
      document.execCommand('insertText', false, textToPaste);
    } else if (option === 'match-dest') {
      const textToPaste = internalClipboard.text;
      document.execCommand('insertHTML', false, `<span>${textToPaste}</span>`);
    }
    recordSnapshot();
    updateSelectionState();
  }, [isReadOnly, isProtected, internalClipboard, recordSnapshot, updateSelectionState]);

  const selectAll = useCallback(() => {
    if (editorRef.current) {
      const range = document.createRange();
      range.selectNodeContents(editorRef.current);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      updateSelectionState();
    }
  }, [updateSelectionState]);

  // Font Family
  const setFontFamily = useCallback((family: string) => {
    if (isReadOnly || isProtected) return;
    document.execCommand('fontName', false, family);
    recordSnapshot();
    updateSelectionState();
  }, [isReadOnly, isProtected, recordSnapshot, updateSelectionState]);

  // Font Size
  const setFontSize = useCallback((size: string) => {
    if (isReadOnly || isProtected || !editorRef.current) return;
    document.execCommand('fontSize', false, '7');
    const fonts = editorRef.current.querySelectorAll('font[size="7"]');
    fonts.forEach((f) => {
      f.removeAttribute('size');
      (f as HTMLElement).style.fontSize = `${size}pt`;
    });
    recordSnapshot();
    updateSelectionState();
  }, [isReadOnly, isProtected, recordSnapshot, updateSelectionState]);

  // Increase/Decrease Font Size Step
  const changeFontSizeStep = useCallback((delta: number) => {
    const cur = parseInt(selectionState.fontSize, 10) || 11;
    let nextSize = cur;
    if (delta > 0) {
      const found = fontStepList.find((s) => s > cur);
      nextSize = found || cur + 2;
    } else {
      const reversed = [...fontStepList].reverse();
      const found = reversed.find((s) => s < cur);
      nextSize = found || Math.max(1, cur - 2);
    }
    setFontSize(nextSize.toString());
  }, [selectionState.fontSize, setFontSize]);

  // Formatting toggles
  const toggleBold = useCallback(() => {
    document.execCommand('bold', false);
    recordSnapshot();
    updateSelectionState();
  }, [recordSnapshot, updateSelectionState]);

  const toggleItalic = useCallback(() => {
    document.execCommand('italic', false);
    recordSnapshot();
    updateSelectionState();
  }, [recordSnapshot, updateSelectionState]);

  const toggleUnderline = useCallback(() => {
    restoreSelection();
    document.execCommand('underline', false);
    recordSnapshot();
    updateSelectionState();
  }, [restoreSelection, recordSnapshot, updateSelectionState]);

  const setUnderlineStyle = useCallback((style: 'single' | 'double' | 'dotted' | 'dashed' | 'wavy', color?: string) => {
    if (isReadOnly || isProtected) return;
    restoreSelection();
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    const span = document.createElement('span');
    span.style.textDecorationLine = 'underline';
    span.style.textDecorationStyle = style === 'single' ? 'solid' : style;
    if (color) span.style.textDecorationColor = color;
    span.appendChild(range.extractContents());
    range.insertNode(span);
    recordSnapshot();
    updateSelectionState();
  }, [isReadOnly, isProtected, restoreSelection, recordSnapshot, updateSelectionState]);

  const toggleDoubleUnderline = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    const span = document.createElement('span');
    span.style.textDecoration = selectionState.isDoubleUnderline ? 'none' : 'underline double';
    span.appendChild(range.extractContents());
    range.insertNode(span);
    recordSnapshot();
    updateSelectionState();
  }, [selectionState.isDoubleUnderline, recordSnapshot, updateSelectionState]);

  const toggleStrikethrough = useCallback(() => {
    document.execCommand('strikeThrough', false);
    recordSnapshot();
    updateSelectionState();
  }, [recordSnapshot, updateSelectionState]);

  const toggleDoubleStrikethrough = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    const span = document.createElement('span');
    span.style.textDecoration = selectionState.isDoubleStrikethrough ? 'none' : 'line-through double';
    span.appendChild(range.extractContents());
    range.insertNode(span);
    recordSnapshot();
    updateSelectionState();
  }, [selectionState.isDoubleStrikethrough, recordSnapshot, updateSelectionState]);

  const toggleSubscript = useCallback(() => {
    document.execCommand('subscript', false);
    recordSnapshot();
    updateSelectionState();
  }, [recordSnapshot, updateSelectionState]);

  const toggleSuperscript = useCallback(() => {
    document.execCommand('superscript', false);
    recordSnapshot();
    updateSelectionState();
  }, [recordSnapshot, updateSelectionState]);

  const setTextColor = useCallback((color: string) => {
    document.execCommand('foreColor', false, color);
    recordSnapshot();
    updateSelectionState();
  }, [recordSnapshot, updateSelectionState]);

  const setTextHighlight = useCallback((color: string) => {
    document.execCommand('backColor', false, color);
    recordSnapshot();
    updateSelectionState();
  }, [recordSnapshot, updateSelectionState]);

  const setTextEffect = useCallback((effect: string) => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    const span = document.createElement('span');

    if (effect === 'shadow') {
      span.style.textShadow = '2px 2px 4px rgba(0,0,0,0.4)';
    } else if (effect === 'outline') {
      span.style.webkitTextStroke = '1px #1d4ed8';
      span.style.color = '#ffffff';
    } else if (effect === 'glow') {
      span.style.textShadow = '0 0 8px #3b82f6, 0 0 12px #93c5fd';
    } else if (effect === 'reflection') {
      span.style.display = 'inline-block';
      (span.style as unknown as Record<string, string>)['webkitBoxReflect'] = 'below 0px linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))';
    }
    span.appendChild(range.extractContents());
    range.insertNode(span);
    recordSnapshot();
    updateSelectionState();
  }, [recordSnapshot, updateSelectionState]);

  const changeCase = useCallback((type: 'sentence' | 'lower' | 'upper' | 'title' | 'toggle') => {
    const sel = window.getSelection();
    if (!sel || !sel.toString()) return;
    const text = sel.toString();
    let transformed = text;

    if (type === 'lower') transformed = text.toLowerCase();
    else if (type === 'upper') transformed = text.toUpperCase();
    else if (type === 'sentence') {
      transformed = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    } else if (type === 'title') {
      transformed = text.replace(/\b\w/g, (c) => c.toUpperCase());
    } else if (type === 'toggle') {
      transformed = text.split('').map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())).join('');
    }

    document.execCommand('insertText', false, transformed);
    recordSnapshot();
    updateSelectionState();
  }, [recordSnapshot, updateSelectionState]);

  const toggleSmallCaps = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    const span = document.createElement('span');
    span.style.fontVariant = selectionState.isSmallCaps ? 'normal' : 'small-caps';
    span.appendChild(range.extractContents());
    range.insertNode(span);
    recordSnapshot();
    updateSelectionState();
  }, [selectionState.isSmallCaps, recordSnapshot, updateSelectionState]);

  const toggleAllCaps = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    const span = document.createElement('span');
    span.style.textTransform = selectionState.isAllCaps ? 'none' : 'uppercase';
    span.appendChild(range.extractContents());
    range.insertNode(span);
    recordSnapshot();
    updateSelectionState();
  }, [selectionState.isAllCaps, recordSnapshot, updateSelectionState]);

  const toggleHiddenText = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    const span = document.createElement('span');
    span.style.borderBottom = selectionState.isHidden ? 'none' : '1px dotted #94a3b8';
    span.style.opacity = selectionState.isHidden ? '1' : '0.4';
    span.title = 'Hidden Text';
    span.appendChild(range.extractContents());
    range.insertNode(span);
    recordSnapshot();
    updateSelectionState();
  }, [selectionState.isHidden, recordSnapshot, updateSelectionState]);

  const clearFormatting = useCallback(() => {
    document.execCommand('removeFormat', false);
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed && editorRef.current) {
      const anchor = sel.anchorNode?.parentElement;
      if (anchor && anchor !== editorRef.current) {
        anchor.style.fontFamily = 'Calibri, sans-serif';
        anchor.style.fontSize = '11pt';
        anchor.style.color = '#1e293b';
        anchor.style.backgroundColor = 'transparent';
        anchor.style.textDecoration = 'none';
        anchor.style.fontWeight = 'normal';
        anchor.style.fontStyle = 'normal';
      }
    }
    recordSnapshot();
    updateSelectionState();
  }, [recordSnapshot, updateSelectionState]);

  // Format Painter
  const toggleFormatPainter = useCallback(() => {
    if (!formatPainterActive) {
      const sel = window.getSelection();
      let format: CopiedFormatting = {
        fontFamily: 'Calibri',
        fontSize: '11pt',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
        color: '#000000',
        backgroundColor: 'transparent',
        textAlign: 'left',
        lineHeight: '1.15',
      };
      if (sel && sel.anchorNode) {
        const el = sel.anchorNode.nodeType === 1 ? (sel.anchorNode as HTMLElement) : sel.anchorNode.parentElement;
        if (el) {
          const comp = window.getComputedStyle(el);
          format = {
            fontFamily: comp.fontFamily,
            fontSize: comp.fontSize,
            fontWeight: comp.fontWeight,
            fontStyle: comp.fontStyle,
            textDecoration: comp.textDecoration,
            color: comp.color,
            backgroundColor: comp.backgroundColor,
            textAlign: comp.textAlign,
            lineHeight: comp.lineHeight,
          };
        }
      }
      setCopiedFormat(format);
      setFormatPainterActive(true);
    } else {
      setFormatPainterActive(false);
      setCopiedFormat(null);
    }
  }, [formatPainterActive]);

  const applyFormatPainterToSelection = useCallback(() => {
    if (!copiedFormat || !formatPainterActive) return;
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;

    const range = sel.getRangeAt(0);
    const span = document.createElement('span');
    span.style.fontFamily = copiedFormat.fontFamily;
    span.style.fontSize = copiedFormat.fontSize;
    span.style.fontWeight = copiedFormat.fontWeight;
    span.style.fontStyle = copiedFormat.fontStyle;
    span.style.textDecoration = copiedFormat.textDecoration;
    span.style.color = copiedFormat.color;
    if (copiedFormat.backgroundColor && copiedFormat.backgroundColor !== 'rgba(0, 0, 0, 0)') {
      span.style.backgroundColor = copiedFormat.backgroundColor;
    }

    span.appendChild(range.extractContents());
    range.insertNode(span);
    setFormatPainterActive(false);
    setCopiedFormat(null);
    recordSnapshot();
    updateSelectionState();
  }, [copiedFormat, formatPainterActive, recordSnapshot, updateSelectionState]);

  // Paragraph Alignment
  const setAlignment = useCallback((align: 'left' | 'center' | 'right' | 'justify') => {
    if (align === 'left') document.execCommand('justifyLeft', false);
    else if (align === 'center') document.execCommand('justifyCenter', false);
    else if (align === 'right') document.execCommand('justifyRight', false);
    else if (align === 'justify') document.execCommand('justifyFull', false);

    recordSnapshot();
    updateSelectionState();
  }, [recordSnapshot, updateSelectionState]);

  // Line & Paragraph Spacing
  const setLineSpacing = useCallback((spacing: string) => {
    const sel = window.getSelection();
    if (!sel) return;
    const block = (sel.anchorNode?.nodeType === 1 ? sel.anchorNode as HTMLElement : sel.anchorNode?.parentElement)?.closest('p, h1, h2, h3, li, div') as HTMLElement;
    if (block) {
      block.style.lineHeight = spacing;
      recordSnapshot();
      updateSelectionState();
    }
  }, [recordSnapshot, updateSelectionState]);

  const setParagraphSpacing = useCallback((before: number, after: number) => {
    const sel = window.getSelection();
    if (!sel) return;
    const block = (sel.anchorNode?.nodeType === 1 ? sel.anchorNode as HTMLElement : sel.anchorNode?.parentElement)?.closest('p, h1, h2, h3, li, div') as HTMLElement;
    if (block) {
      block.style.marginTop = `${before}pt`;
      block.style.marginBottom = `${after}pt`;
      recordSnapshot();
      updateSelectionState();
    }
  }, [recordSnapshot, updateSelectionState]);

  const toggleSpaceBefore = useCallback(() => {
    const current = selectionState.spaceBefore;
    setParagraphSpacing(current > 0 ? 0 : 12, selectionState.spaceAfter);
  }, [selectionState.spaceBefore, selectionState.spaceAfter, setParagraphSpacing]);

  const toggleSpaceAfter = useCallback(() => {
    const current = selectionState.spaceAfter;
    setParagraphSpacing(selectionState.spaceBefore, current > 0 ? 0 : 10);
  }, [selectionState.spaceBefore, selectionState.spaceAfter, setParagraphSpacing]);

  const indent = useCallback((dir: 'in' | 'out') => {
    document.execCommand(dir === 'in' ? 'indent' : 'outdent', false);
    recordSnapshot();
    updateSelectionState();
  }, [recordSnapshot, updateSelectionState]);

  // Lists
  const toggleBullets = useCallback((style: BulletStyle = 'disc') => {
    document.execCommand('insertUnorderedList', false);
    const sel = window.getSelection();
    if (sel && editorRef.current) {
      const ul = (sel.anchorNode?.nodeType === 1 ? sel.anchorNode as HTMLElement : sel.anchorNode?.parentElement)?.closest('ul') as HTMLUListElement;
      if (ul) {
        if (style === 'circle') ul.style.listStyleType = 'circle';
        else if (style === 'square') ul.style.listStyleType = 'square';
        else if (style === 'diamond') ul.style.listStyleType = 'disc';
        else ul.style.listStyleType = 'disc';
      }
    }
    recordSnapshot();
    updateSelectionState();
  }, [recordSnapshot, updateSelectionState]);

  const toggleNumbering = useCallback((style: NumberingStyle = 'decimal') => {
    document.execCommand('insertOrderedList', false);
    const sel = window.getSelection();
    if (sel && editorRef.current) {
      const ol = (sel.anchorNode?.nodeType === 1 ? sel.anchorNode as HTMLElement : sel.anchorNode?.parentElement)?.closest('ol') as HTMLOListElement;
      if (ol) {
        if (style === 'upper-alpha') ol.style.listStyleType = 'upper-alpha';
        else if (style === 'lower-alpha') ol.style.listStyleType = 'lower-alpha';
        else if (style === 'lower-roman') ol.style.listStyleType = 'lower-roman';
        else if (style === 'upper-roman') ol.style.listStyleType = 'upper-roman';
        else ol.style.listStyleType = 'decimal';
      }
    }
    recordSnapshot();
    updateSelectionState();
  }, [recordSnapshot, updateSelectionState]);

  const applyMultilevelList = useCallback((type: string) => {
    document.execCommand('insertOrderedList', false);
    recordSnapshot();
    updateSelectionState();
  }, [recordSnapshot, updateSelectionState]);

  // Borders & Shading
  const applyBorder = useCallback((borderType: string) => {
    const sel = window.getSelection();
    if (!sel) return;
    const block = (sel.anchorNode?.nodeType === 1 ? sel.anchorNode as HTMLElement : sel.anchorNode?.parentElement)?.closest('p, h1, h2, h3, div') as HTMLElement;
    if (block) {
      if (borderType === 'bottom') block.style.borderBottom = '1px solid #1e293b';
      else if (borderType === 'top') block.style.borderTop = '1px solid #1e293b';
      else if (borderType === 'left') block.style.borderLeft = '2px solid #1e293b';
      else if (borderType === 'right') block.style.borderRight = '1px solid #1e293b';
      else if (borderType === 'none') block.style.border = 'none';
      else if (borderType === 'all' || borderType === 'outside') {
        block.style.border = '1px solid #1e293b';
        block.style.padding = '6px';
      }
      recordSnapshot();
      updateSelectionState();
    }
  }, [recordSnapshot, updateSelectionState]);

  const applyShading = useCallback((color: string) => {
    const sel = window.getSelection();
    if (!sel) return;
    const block = (sel.anchorNode?.nodeType === 1 ? sel.anchorNode as HTMLElement : sel.anchorNode?.parentElement)?.closest('p, h1, h2, h3, div') as HTMLElement;
    if (block) {
      block.style.backgroundColor = color;
      block.style.padding = '4px 8px';
      recordSnapshot();
      updateSelectionState();
    }
  }, [recordSnapshot, updateSelectionState]);

  // Styles gallery
  const applyStyle = useCallback((styleName: string) => {
    if (!editorRef.current) return;
    if (styleName === 'Heading 1') {
      document.execCommand('formatBlock', false, '<h1>');
      setFontFamily('Calibri');
      setFontSize('24');
      setTextColor('#365f91');
    } else if (styleName === 'Heading 2') {
      document.execCommand('formatBlock', false, '<h2>');
      setFontFamily('Calibri');
      setFontSize('18');
      setTextColor('#4f81bd');
    } else if (styleName === 'Heading 3') {
      document.execCommand('formatBlock', false, '<h3>');
      setFontFamily('Calibri');
      setFontSize('14');
      setTextColor('#4f81bd');
    } else if (styleName === 'Title') {
      document.execCommand('formatBlock', false, '<h1>');
      setFontFamily('Calibri');
      setFontSize('26');
      setTextColor('#17365d');
    } else if (styleName === 'Subtitle') {
      document.execCommand('formatBlock', false, '<p>');
      setFontFamily('Calibri');
      setFontSize('12');
      setTextColor('#4f81bd');
    } else if (styleName === 'Quote') {
      document.execCommand('formatBlock', false, '<blockquote>');
      setFontFamily('Calibri');
      setFontSize('11');
      setTextColor('#595959');
    } else {
      document.execCommand('formatBlock', false, '<p>');
      setFontFamily('Calibri');
      setFontSize('11');
      setTextColor('#1e293b');
    }

    recordSnapshot();
    updateSelectionState();
  }, [setFontFamily, setFontSize, setTextColor, recordSnapshot, updateSelectionState]);

  // Find & Replace Search implementation
  const clearFindHighlights = useCallback(() => {
    if (!editorRef.current) return;
    const marks = editorRef.current.querySelectorAll('mark.word-find-highlight');
    marks.forEach((m) => {
      const parent = m.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(m.textContent || ''), m);
        parent.normalize();
      }
    });
    setTotalMatches(0);
    setActiveMatchIndex(0);
  }, []);

  const findNextMatch = useCallback(() => {
    if (!editorRef.current || totalMatches === 0) return;
    const marks = editorRef.current.querySelectorAll('mark.word-find-highlight');
    if (marks.length === 0) return;

    marks.forEach((m) => ((m as HTMLElement).style.backgroundColor = '#fef08a'));
    const nextIdx = (activeMatchIndex + 1) % marks.length;
    setActiveMatchIndex(nextIdx);
    const target = marks[nextIdx] as HTMLElement;
    target.style.backgroundColor = '#fb923c';
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [activeMatchIndex, totalMatches]);

  const findPrevMatch = useCallback(() => {
    if (!editorRef.current || totalMatches === 0) return;
    const marks = editorRef.current.querySelectorAll('mark.word-find-highlight');
    if (marks.length === 0) return;

    marks.forEach((m) => ((m as HTMLElement).style.backgroundColor = '#fef08a'));
    const prevIdx = (activeMatchIndex - 1 + marks.length) % marks.length;
    setActiveMatchIndex(prevIdx);
    const target = marks[prevIdx] as HTMLElement;
    target.style.backgroundColor = '#fb923c';
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [activeMatchIndex, totalMatches]);

  const findAndReplace = useCallback((findText: string, replaceText: string, replaceAll = false): number => {
    if (!editorRef.current || !findText) return 0;
    clearFindHighlights();
    const html = editorRef.current.innerHTML;
    let count = 0;

    const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), replaceAll ? 'g' : '');
    const matches = html.match(regex);
    if (matches) {
      count = matches.length;
      editorRef.current.innerHTML = html.replace(regex, replaceText);
      calculateWordCount();
      recordSnapshot();
    }
    return count;
  }, [clearFindHighlights, calculateWordCount, recordSnapshot]);

  // Insert Operations
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
    document.execCommand('insertHTML', false, tableHtml);
    recordSnapshot();
  }, [recordSnapshot]);

  const getActiveTableContext = () => {
    const sel = window.getSelection();
    if (!sel || !sel.anchorNode || !editorRef.current) return null;
    const node = sel.anchorNode instanceof HTMLElement ? sel.anchorNode : sel.anchorNode.parentElement;
    const cell = (node?.closest('td, th') || editorRef.current.querySelector('td')) as HTMLTableCellElement | null;
    const table = (cell?.closest('table') || editorRef.current.querySelector('table')) as HTMLTableElement | null;
    const row = (cell?.closest('tr') || table?.querySelector('tr')) as HTMLTableRowElement | null;
    return { cell, table, row };
  };

  const insertTableRow = useCallback((above = false) => {
    const ctx = getActiveTableContext();
    if (!ctx?.table || !ctx?.row) {
      insertTable(2, 3);
      return;
    }
    const colsCount = ctx.row.children.length;
    const newRow = document.createElement('tr');
    for (let i = 0; i < colsCount; i++) {
      const td = document.createElement('td');
      td.style.border = '1px solid #a9c1d9';
      td.style.padding = '6px 10px';
      td.style.minWidth = '60px';
      td.style.fontFamily = 'Calibri';
      td.style.fontSize = '11pt';
      td.innerHTML = '&nbsp;';
      newRow.appendChild(td);
    }
    if (above) {
      ctx.row.before(newRow);
    } else {
      ctx.row.after(newRow);
    }
    recordSnapshot();
  }, [insertTable, recordSnapshot]);

  const insertTableColumn = useCallback((left = false) => {
    const ctx = getActiveTableContext();
    if (!ctx?.table || !ctx?.row) {
      insertTable(2, 3);
      return;
    }
    const colIndex = ctx.cell ? Array.from(ctx.row.children).indexOf(ctx.cell) : ctx.row.children.length - 1;
    const rows = Array.from(ctx.table.querySelectorAll('tr'));
    rows.forEach((r) => {
      const td = document.createElement(r.querySelector('th') ? 'th' : 'td');
      td.style.border = '1px solid #a9c1d9';
      td.style.padding = '6px 10px';
      td.style.minWidth = '60px';
      td.style.fontFamily = 'Calibri';
      td.style.fontSize = '11pt';
      td.innerHTML = '&nbsp;';
      const targetCell = r.children[colIndex];
      if (targetCell) {
        if (left) {
          r.insertBefore(td, targetCell);
        } else {
          targetCell.after(td);
        }
      } else {
        r.appendChild(td);
      }
    });
    recordSnapshot();
  }, [insertTable, recordSnapshot]);

  const deleteTableRow = useCallback(() => {
    const ctx = getActiveTableContext();
    if (!ctx?.row) return;
    const table = ctx.table;
    ctx.row.remove();
    if (table && table.querySelectorAll('tr').length === 0) {
      table.remove();
    }
    recordSnapshot();
  }, [recordSnapshot]);

  const deleteTableColumn = useCallback(() => {
    const ctx = getActiveTableContext();
    if (!ctx?.table || !ctx?.cell || !ctx?.row) return;
    const colIndex = Array.from(ctx.row.children).indexOf(ctx.cell);
    const rows = Array.from(ctx.table.querySelectorAll('tr'));
    rows.forEach((r) => {
      if (r.children[colIndex]) {
        r.children[colIndex].remove();
      }
    });
    if (ctx.table.querySelectorAll('td, th').length === 0) {
      ctx.table.remove();
    }
    recordSnapshot();
  }, [recordSnapshot]);

  const deleteTable = useCallback(() => {
    const ctx = getActiveTableContext();
    if (ctx?.table) {
      ctx.table.remove();
      recordSnapshot();
    }
  }, [recordSnapshot]);

  const mergeTableCells = useCallback(() => {
    const ctx = getActiveTableContext();
    if (!ctx?.cell) return;
    const nextCell = ctx.cell.nextElementSibling as HTMLTableCellElement | null;
    if (nextCell) {
      ctx.cell.innerHTML += ' ' + nextCell.innerHTML;
      const currentSpan = parseInt(ctx.cell.getAttribute('colspan') || '1', 10);
      const nextSpan = parseInt(nextCell.getAttribute('colspan') || '1', 10);
      ctx.cell.setAttribute('colspan', (currentSpan + nextSpan).toString());
      nextCell.remove();
      recordSnapshot();
    }
  }, [recordSnapshot]);

  const splitTableCells = useCallback(() => {
    const ctx = getActiveTableContext();
    if (!ctx?.cell) return;
    const currentSpan = parseInt(ctx.cell.getAttribute('colspan') || '1', 10);
    if (currentSpan > 1) {
      ctx.cell.setAttribute('colspan', (currentSpan - 1).toString());
    }
    const newCell = document.createElement('td');
    newCell.style.border = ctx.cell.style.border || '1px solid #a9c1d9';
    newCell.style.padding = ctx.cell.style.padding || '6px 10px';
    newCell.style.fontFamily = 'Calibri';
    newCell.innerHTML = '&nbsp;';
    ctx.cell.after(newCell);
    recordSnapshot();
  }, [recordSnapshot]);

  const selectTable = useCallback((part: 'row' | 'column' | 'table') => {
    const ctx = getActiveTableContext();
    if (!ctx?.table) return;
    const sel = window.getSelection();
    if (!sel) return;
    sel.removeAllRanges();
    const range = document.createRange();
    if (part === 'row' && ctx.row) {
      range.selectNodeContents(ctx.row);
    } else if (part === 'table') {
      range.selectNodeContents(ctx.table);
    } else if (part === 'column' && ctx.cell && ctx.row) {
      const colIndex = Array.from(ctx.row.children).indexOf(ctx.cell);
      const cells = Array.from(ctx.table.querySelectorAll('tr')).map(r => r.children[colIndex]).filter(Boolean);
      if (cells.length > 0) range.selectNode(cells[0]);
    }
    sel.addRange(range);
    updateSelectionState();
  }, [updateSelectionState]);

  const distributeTable = useCallback((target: 'rows' | 'columns') => {
    const ctx = getActiveTableContext();
    if (!ctx?.table) return;
    if (target === 'rows') {
      const rows = ctx.table.querySelectorAll('tr');
      rows.forEach((r) => ((r as HTMLElement).style.height = '32px'));
    } else {
      const cols = ctx.table.querySelectorAll('td, th');
      cols.forEach((c) => ((c as HTMLElement).style.width = 'auto'));
    }
    recordSnapshot();
  }, [recordSnapshot]);

  const autoFitTable = useCallback((mode: 'contents' | 'window' | 'fixed') => {
    const ctx = getActiveTableContext();
    if (!ctx?.table) return;
    if (mode === 'contents') {
      ctx.table.style.width = 'auto';
      ctx.table.querySelectorAll('td, th').forEach((c) => ((c as HTMLElement).style.width = 'auto'));
    } else if (mode === 'window') {
      ctx.table.style.width = '100%';
    } else {
      ctx.table.style.width = '500px';
    }
    recordSnapshot();
  }, [recordSnapshot]);

  const setTableCellAlignment = useCallback((align: string) => {
    const ctx = getActiveTableContext();
    if (!ctx?.cell) return;
    const parts = align.split('-');
    ctx.cell.style.verticalAlign = parts[0] || 'middle';
    ctx.cell.style.textAlign = parts[1] || 'left';
    recordSnapshot();
  }, [recordSnapshot]);

  const setTableCellMargins = useCallback((padding: number) => {
    const ctx = getActiveTableContext();
    if (!ctx?.table) return;
    ctx.table.querySelectorAll('td, th').forEach((c) => {
      (c as HTMLElement).style.padding = `${padding}px`;
    });
    recordSnapshot();
  }, [recordSnapshot]);

  const setTableBorders = useCallback((type: string) => {
    const ctx = getActiveTableContext();
    if (!ctx?.table) return;
    if (type === 'none') {
      ctx.table.style.border = 'none';
      ctx.table.querySelectorAll('td, th').forEach((c) => ((c as HTMLElement).style.border = 'none'));
    } else if (type === 'all') {
      ctx.table.style.border = '1px solid #7f9db9';
      ctx.table.querySelectorAll('td, th').forEach((c) => ((c as HTMLElement).style.border = '1px solid #a9c1d9'));
    } else if (type === 'outside') {
      ctx.table.style.border = '2px solid #365f91';
    } else if (type === 'inside') {
      ctx.table.querySelectorAll('td, th').forEach((c) => ((c as HTMLElement).style.border = '1px solid #a9c1d9'));
    } else if (type === 'top') {
      ctx.table.style.borderTop = '2px solid #365f91';
    } else if (type === 'bottom') {
      ctx.table.style.borderBottom = '2px solid #365f91';
    } else if (type === 'left') {
      ctx.table.style.borderLeft = '2px solid #365f91';
    } else if (type === 'right') {
      ctx.table.style.borderRight = '2px solid #365f91';
    } else if (type === 'inside-h') {
      ctx.table.querySelectorAll('td, th').forEach((c) => {
        (c as HTMLElement).style.borderTop = '1px solid #a9c1d9';
        (c as HTMLElement).style.borderBottom = '1px solid #a9c1d9';
      });
    } else if (type === 'inside-v') {
      ctx.table.querySelectorAll('td, th').forEach((c) => {
        (c as HTMLElement).style.borderLeft = '1px solid #a9c1d9';
        (c as HTMLElement).style.borderRight = '1px solid #a9c1d9';
      });
    }
    recordSnapshot();
  }, [recordSnapshot]);

  const repeatHeaderRow = useCallback(() => {
    const ctx = getActiveTableContext();
    if (!ctx?.table) return;
    const firstRow = ctx.table.querySelector('tr');
    if (!firstRow) return;
    firstRow.querySelectorAll('td').forEach((td) => {
      const th = document.createElement('th');
      th.innerHTML = td.innerHTML;
      th.style.border = '1px solid #365f91';
      th.style.backgroundColor = '#4f81bd';
      th.style.color = '#ffffff';
      th.style.padding = td.style.padding || '6px 10px';
      th.style.fontWeight = 'bold';
      td.replaceWith(th);
    });
    recordSnapshot();
  }, [recordSnapshot]);

  const setTableShading = useCallback((color: string) => {
    const ctx = getActiveTableContext();
    if (ctx?.cell) {
      ctx.cell.style.backgroundColor = color;
      recordSnapshot();
    }
  }, [recordSnapshot]);

  const sortTable = useCallback((ascending = true) => {
    const ctx = getActiveTableContext();
    if (!ctx?.table) return;
    const tbody = ctx.table.querySelector('tbody') || ctx.table;
    const rows = Array.from(tbody.querySelectorAll('tr'));
    if (rows.length <= 1) return;
    const headerRow = rows[0].querySelector('th') ? rows.shift() : null;
    rows.sort((a, b) => {
      const textA = a.children[0]?.textContent || '';
      const textB = b.children[0]?.textContent || '';
      return ascending ? textA.localeCompare(textB) : textB.localeCompare(textA);
    });
    if (headerRow) tbody.appendChild(headerRow);
    rows.forEach((r) => tbody.appendChild(r));
    recordSnapshot();
  }, [recordSnapshot]);

  const convertTextToTable = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    const text = sel.toString();
    if (!text.trim()) return;
    const lines = text.trim().split(/\r?\n/).filter(Boolean);
    let tableHtml = '<table style="width: 100%; border-collapse: collapse; margin: 12px 0; border: 1px solid #7f9db9;"><tbody>';
    lines.forEach((line) => {
      tableHtml += '<tr>';
      const parts = line.split(/[,\t]/);
      parts.forEach((p) => {
        tableHtml += `<td style="border: 1px solid #a9c1d9; padding: 6px 10px; font-family: Calibri;">${p.trim()}</td>`;
      });
      tableHtml += '</tr>';
    });
    tableHtml += '</tbody></table><p><br/></p>';
    document.execCommand('insertHTML', false, tableHtml);
    recordSnapshot();
  }, [recordSnapshot]);

  const convertTableToText = useCallback(() => {
    const ctx = getActiveTableContext();
    if (!ctx?.table) return;
    const rows = Array.from(ctx.table.querySelectorAll('tr'));
    let text = '';
    rows.forEach((r) => {
      const cells = Array.from(r.children).map((c) => c.textContent?.trim() || '');
      text += cells.join('\t') + '\n';
    });
    const p = document.createElement('p');
    p.textContent = text;
    ctx.table.replaceWith(p);
    recordSnapshot();
  }, [recordSnapshot]);

  const formatSelectedImage = useCallback((action: string, val?: any) => {
    if (!editorRef.current) return;
    const sel = window.getSelection();
    let img: HTMLImageElement | null = null;
    if (sel && sel.anchorNode) {
      const node = sel.anchorNode instanceof HTMLElement ? sel.anchorNode : sel.anchorNode.parentElement;
      img = (node?.querySelector('img') || node?.closest('img')) as HTMLImageElement | null;
    }
    if (!img) {
      img = editorRef.current.querySelector('img');
    }
    if (!img) return;
    if (action === 'rotate') {
      const curRot = parseInt(img.getAttribute('data-rotate') || '0', 10);
      const newRot = (curRot + (val || 90)) % 360;
      img.setAttribute('data-rotate', newRot.toString());
      img.style.transform = `rotate(${newRot}deg)`;
    } else if (action === 'flipH') {
      img.style.transform = img.style.transform.includes('scaleX(-1)') ? '' : 'scaleX(-1)';
    } else if (action === 'flipV') {
      img.style.transform = img.style.transform.includes('scaleY(-1)') ? '' : 'scaleY(-1)';
    } else if (action === 'wrap') {
      if (val === 'square' || val === 'tight') {
        img.style.float = 'left';
        img.style.margin = '8px 14px 8px 0';
        img.style.display = 'inline-block';
        img.style.position = 'static';
      } else if (val === 'top-bottom') {
        img.style.display = 'block';
        img.style.margin = '14px auto';
        img.style.float = 'none';
        img.style.position = 'static';
      } else if (val === 'behind') {
        img.style.position = 'relative';
        img.style.zIndex = '0';
        img.style.opacity = '0.7';
      } else if (val === 'infront') {
        img.style.position = 'relative';
        img.style.zIndex = '25';
      } else {
        img.style.display = 'inline-block';
        img.style.float = 'none';
        img.style.position = 'static';
      }
    } else if (action === 'border') {
      img.style.border = val || '2px solid #365f91';
    } else if (action === 'opacity') {
      img.style.opacity = val.toString();
    } else if (action === 'resize') {
      img.style.maxWidth = val || '60%';
      img.style.width = val || 'auto';
    } else if (action === 'crop') {
      img.style.clipPath = val ? 'none' : 'inset(10% 10% 10% 10%)';
    } else if (action === 'effect') {
      if (val === 'grayscale') img.style.filter = 'grayscale(100%)';
      else if (val === 'sepia') img.style.filter = 'sepia(90%)';
      else if (val === 'invert') img.style.filter = 'invert(100%)';
      else if (val === 'shadow') img.style.boxShadow = '0 8px 16px rgba(0,0,0,0.35)';
      else {
        img.style.filter = 'none';
        img.style.boxShadow = 'none';
      }
    } else if (action === 'alt') {
      img.setAttribute('alt', val || '');
      img.setAttribute('title', val || '');
    } else if (action === 'compress') {
      img.style.maxWidth = '400px';
      img.style.imageRendering = 'pixelated';
    } else if (action === 'layer') {
      if (val === 'front') img.style.zIndex = '30';
      else if (val === 'back') img.style.zIndex = '0';
      else img.style.zIndex = '10';
    } else if (action === 'reset') {
      img.style.transform = '';
      img.style.border = 'none';
      img.style.opacity = '1';
      img.style.float = 'none';
      img.style.display = 'inline-block';
      img.style.position = 'static';
      img.style.maxWidth = '100%';
      img.style.width = 'auto';
      img.style.clipPath = 'none';
      img.style.filter = 'none';
      img.style.boxShadow = 'none';
    }
    recordSnapshot();
  }, [recordSnapshot]);

  const formatSelectedShape = useCallback((action: string, val?: any) => {
    if (!editorRef.current) return;
    const sel = window.getSelection();
    let shape: HTMLElement | null = null;
    if (sel && sel.anchorNode) {
      const node = sel.anchorNode instanceof HTMLElement ? sel.anchorNode : sel.anchorNode.parentElement;
      shape = (node?.closest('[data-word-shape]') || node?.querySelector('[data-word-shape]')) as HTMLElement | null;
    }
    if (!shape) {
      shape = editorRef.current.querySelector('[data-word-shape]') as HTMLElement | null;
    }
    if (!shape) return;
    if (action === 'fill') shape.style.backgroundColor = val;
    else if (action === 'outline') shape.style.borderColor = val;
    else if (action === 'rotate') shape.style.transform = `rotate(${val || 45}deg)`;
    else if (action === 'addText') {
      shape.contentEditable = 'true';
      shape.focus();
    }
    recordSnapshot();
  }, [recordSnapshot]);

  const arrangeObject = useCallback((action: string) => {
    if (!editorRef.current) return;
    const sel = window.getSelection();
    let el: HTMLElement | null = null;
    if (sel && sel.anchorNode) {
      const node = sel.anchorNode instanceof HTMLElement ? sel.anchorNode : sel.anchorNode.parentElement;
      el = (node?.closest('img, [data-word-shape], table') || node) as HTMLElement | null;
    }
    if (!el || el === editorRef.current) return;
    if (action === 'bringToFront') el.style.zIndex = '30';
    else if (action === 'sendToBack') el.style.zIndex = '0';
    else if (action === 'alignLeft') { el.style.float = 'left'; el.style.margin = '8px'; }
    else if (action === 'alignCenter') { el.style.display = 'block'; el.style.margin = '12px auto'; }
    else if (action === 'alignRight') { el.style.float = 'right'; el.style.margin = '8px'; }
    recordSnapshot();
  }, [recordSnapshot]);

  const goToBookmark = useCallback((name: string) => {
    if (!editorRef.current) return;
    const bm = editorRef.current.querySelector(`[name="${name}"], #${name}`);
    if (bm) {
      bm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const navigateToComment = useCallback((dir: 'next' | 'prev') => {
    if (comments.length === 0) return;
    const curIdx = comments.findIndex((c) => c.id === activeCommentId);
    let nextIdx = dir === 'next' ? curIdx + 1 : curIdx - 1;
    if (nextIdx >= comments.length) nextIdx = 0;
    if (nextIdx < 0) nextIdx = comments.length - 1;
    setActiveCommentId(comments[nextIdx].id);
  }, [comments, activeCommentId]);

  const navigateToChange = useCallback((dir: 'next' | 'prev') => {
    if (trackedChanges.length === 0) return;
  }, [trackedChanges]);

  const insertImage = useCallback((fileOrUrl: File | string, alt: string = 'Image') => {
    if (typeof fileOrUrl === 'string') {
      document.execCommand('insertHTML', false, `<img src="${fileOrUrl}" alt="${alt}" style="max-width: 100%; height: auto; margin: 8px 0; border: 1px solid #cbd5e1; display: inline-block;" />`);
      recordSnapshot();
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        document.execCommand('insertHTML', false, `<img src="${src}" alt="${fileOrUrl.name}" style="max-width: 100%; height: auto; margin: 8px 0; border: 1px solid #cbd5e1; display: inline-block;" />`);
        recordSnapshot();
      };
      reader.readAsDataURL(fileOrUrl);
    }
  }, [recordSnapshot]);

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
    document.execCommand('insertHTML', false, `${shapeHtml}<p><br/></p>`);
    recordSnapshot();
  }, [recordSnapshot]);

  const insertHyperlink = useCallback((url: string, text?: string) => {
    const sel = window.getSelection();
    const linkText = text || sel?.toString() || url;
    document.execCommand('insertHTML', false, `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">${linkText}</a>`);
    recordSnapshot();
  }, [recordSnapshot]);

  const removeHyperlink = useCallback(() => {
    document.execCommand('unlink', false);
    recordSnapshot();
  }, [recordSnapshot]);

  const insertBookmark = useCallback((name: string) => {
    document.execCommand('insertHTML', false, `<a name="${name}" id="${name}" style="background-color: #fef08a;" title="Bookmark: ${name}">[🔖 ${name}]</a>`);
    recordSnapshot();
  }, [recordSnapshot]);

  const insertCrossReference = useCallback((refText: string) => {
    document.execCommand('insertHTML', false, `<a href="#${refText}" style="color: #0284c7; text-decoration: underline;">[See ${refText}]</a>`);
    recordSnapshot();
  }, [recordSnapshot]);

  const insertTextBox = useCallback(() => {
    document.execCommand('insertHTML', false, `<div contenteditable="true" style="width: 220px; min-height: 90px; border: 1.5px dashed #4f81bd; padding: 10px; margin: 10px 0; background-color: #f8fafc; display: block; font-family: Calibri; font-size: 11pt;">Text Box. Click here to type text.</div><p><br/></p>`);
    recordSnapshot();
  }, [recordSnapshot]);

  const insertDateTime = useCallback(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ' ' + now.toLocaleTimeString();
    document.execCommand('insertText', false, formatted);
    recordSnapshot();
  }, [recordSnapshot]);

  const insertSymbol = useCallback((symbol: string) => {
    document.execCommand('insertText', false, symbol);
    recordSnapshot();
  }, [recordSnapshot]);

  const insertEquation = useCallback((formula: string) => {
    document.execCommand('insertHTML', false, `<span style="font-family: 'Cambria Math', 'Times New Roman', serif; font-style: italic; background-color: #f1f5f9; padding: 2px 6px; border-radius: 3px; border: 1px solid #cbd5e1; display: inline-block;">${formula}</span>`);
    recordSnapshot();
  }, [recordSnapshot]);

  const renumberPages = useCallback(() => {
    if (!editorRef.current) return;
    const sheets = editorRef.current.querySelectorAll('.word-page');
    sheets.forEach((sheet, idx) => {
      const pageNum = idx + 1;
      sheet.setAttribute('data-page', pageNum.toString());
      const headerPageSpan = sheet.querySelector('.word-page-header > span:last-child');
      if (headerPageSpan) headerPageSpan.textContent = `Page ${pageNum}`;
      const footerPageSpan = sheet.querySelector('.word-page-footer > span:last-child');
      if (footerPageSpan) footerPageSpan.textContent = `Page ${pageNum}`;
    });
  }, []);

  const insertPageBreak = useCallback(() => {
    if (!editorRef.current) return;
    const sel = window.getSelection();
    let currentPage: HTMLElement | null = null;
    let trailingFragment: DocumentFragment | null = null;

    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const container = range.startContainer instanceof HTMLElement 
        ? range.startContainer 
        : range.startContainer.parentElement;
      currentPage = (container?.closest('.word-page') as HTMLElement) || null;
      const contentEl = currentPage?.querySelector('.word-page-content');

      if (currentPage && contentEl && contentEl.contains(range.startContainer)) {
        try {
          const splitRange = range.cloneRange();
          splitRange.setEndAfter(contentEl.lastChild || contentEl);
          trailingFragment = splitRange.extractContents();
        } catch {
          trailingFragment = null;
        }
      }
    }

    const newPage = document.createElement('div');
    newPage.className = 'word-page';
    newPage.innerHTML = `
      <div class="word-page-header" contenteditable="false">
        <span>${headerText || '[Header - Double click to edit]'}</span>
        <span>Page</span>
      </div>
      <div class="word-page-content">
      </div>
      <div class="word-page-footer" contenteditable="false">
        <span>${footerText || '[Footer - Double click to edit]'}</span>
        <span>Page</span>
      </div>
    `;

    const newContent = newPage.querySelector('.word-page-content')!;
    if (trailingFragment && trailingFragment.childNodes.length > 0 && trailingFragment.textContent?.trim() !== '') {
      newContent.appendChild(trailingFragment);
    } else {
      newContent.innerHTML = '<p><br/></p>';
    }

    if (currentPage && currentPage.parentNode === editorRef.current) {
      currentPage.after(newPage);
    } else {
      editorRef.current.appendChild(newPage);
    }

    renumberPages();
    recordSnapshot();
    calculateWordCount();
    updateSelectionState();

    const firstP = newContent.querySelector('p') || newContent.firstElementChild;
    if (firstP && sel) {
      const newRange = document.createRange();
      newRange.selectNodeContents(firstP);
      newRange.collapse(true);
      sel.removeAllRanges();
      sel.addRange(newRange);
    }
  }, [headerText, footerText, renumberPages, recordSnapshot, calculateWordCount, updateSelectionState]);

  const insertBlankPage = useCallback(() => {
    if (!editorRef.current) return;
    const sel = window.getSelection();
    let currentPage: HTMLElement | null = null;

    if (sel && sel.rangeCount > 0) {
      const container = sel.anchorNode instanceof HTMLElement 
        ? sel.anchorNode 
        : sel.anchorNode?.parentElement;
      currentPage = (container?.closest('.word-page') as HTMLElement) || null;
    }

    const newPage = document.createElement('div');
    newPage.className = 'word-page';
    newPage.innerHTML = `
      <div class="word-page-header" contenteditable="false">
        <span>${headerText || '[Header - Double click to edit]'}</span>
        <span>Page</span>
      </div>
      <div class="word-page-content">
        <p><br/></p>
      </div>
      <div class="word-page-footer" contenteditable="false">
        <span>${footerText || '[Footer - Double click to edit]'}</span>
        <span>Page</span>
      </div>
    `;

    if (currentPage && currentPage.parentNode === editorRef.current) {
      currentPage.after(newPage);
    } else {
      editorRef.current.appendChild(newPage);
    }

    renumberPages();
    recordSnapshot();
    calculateWordCount();
    updateSelectionState();

    const p = newPage.querySelector('.word-page-content p');
    if (p && sel) {
      const newRange = document.createRange();
      newRange.selectNodeContents(p);
      newRange.collapse(true);
      sel.removeAllRanges();
      sel.addRange(newRange);
    }
  }, [headerText, footerText, renumberPages, recordSnapshot, calculateWordCount, updateSelectionState]);

  const insertTableOfContents = useCallback(() => {
    if (!editorRef.current) return;
    const headings = editorRef.current.querySelectorAll('h1, h2, h3');
    let tocHtml = `<div style="border: 1px solid #cbd5e1; background-color: #f8fafc; padding: 16px; margin: 16px 0; font-family: Calibri, sans-serif;" contenteditable="false"><div style="font-size: 16pt; font-weight: bold; color: #365f91; margin-bottom: 12px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">Table of Contents</div>`;

    if (headings.length === 0) {
      tocHtml += `<div style="font-style: italic; color: #64748b; font-size: 11pt;">No headings found in document. Use Heading 1 or Heading 2 styles to build your Table of Contents.</div>`;
    } else {
      headings.forEach((h, idx) => {
        const text = h.textContent || `Section ${idx + 1}`;
        const level = h.tagName.toLowerCase();
        const ind = level === 'h1' ? '0px' : level === 'h2' ? '20px' : '40px';
        const weight = level === 'h1' ? 'bold' : 'normal';
        tocHtml += `<div style="margin-left: ${ind}; font-weight: ${weight}; font-size: 11pt; padding: 3px 0; display: flex; justify-content: space-between;"><span>${text}</span><span style="color: #64748b; border-bottom: 1px dotted #94a3b8; flex: 1; margin: 0 8px 4px 8px;"></span><span style="color: #365f91;">${idx + 1}</span></div>`;
      });
    }
    tocHtml += `</div><p><br/></p>`;
    document.execCommand('insertHTML', false, tocHtml);
    recordSnapshot();
  }, [recordSnapshot]);

  const updateTableOfContents = useCallback(() => {
    insertTableOfContents();
  }, [insertTableOfContents]);

  const insertFootnote = useCallback((text: string, isEndnote = false) => {
    const num = footnotes.length + 1;
    const newFn: FootnoteItem = { id: Date.now().toString(), number: num, text, type: isEndnote ? 'endnote' : 'footnote' };
    setFootnotes((prev) => [...prev, newFn]);
    document.execCommand('insertHTML', false, `<sup style="color: #2563eb; font-weight: bold; cursor: pointer;" title="${text}">[${num}]</sup>`);
    recordSnapshot();
  }, [footnotes.length, recordSnapshot]);

  const addCitation = useCallback((item: CitationItem) => {
    setCitations((prev) => [...prev, item]);
    document.execCommand('insertHTML', false, `<span style="color: #1e3a8a; font-weight: 500;">(${item.author}, ${item.year})</span>`);
    recordSnapshot();
  }, [recordSnapshot]);

  const insertBibliography = useCallback(() => {
    let bibHtml = `<div style="margin-top: 24px; padding-top: 16px; border-top: 2px solid #365f91; font-family: Calibri, sans-serif;"><h2 style="font-size: 16pt; color: #365f91; font-weight: bold; margin-bottom: 12px;">Bibliography</h2>`;
    if (citations.length === 0) {
      bibHtml += `<p style="font-style: italic; color: #64748b; font-size: 11pt;">There are no sources in the current document.</p>`;
    } else {
      citations.forEach((c) => {
        bibHtml += `<p style="margin-bottom: 6px; font-size: 11pt; text-indent: -24px; padding-left: 24px;">${c.author} (${c.year}). <em>${c.title}</em>. ${c.publisher || ''}</p>`;
      });
    }
    bibHtml += `</div><p><br/></p>`;
    document.execCommand('insertHTML', false, bibHtml);
    recordSnapshot();
  }, [citations, recordSnapshot]);

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
    document.execCommand('insertHTML', false, `<span style="background-color: #fef08a; border-bottom: 2px solid #ca8a04;" title="Comment by User: ${text}">[💬]</span>`);
    recordSnapshot();
  }, [recordSnapshot]);

  const deleteComment = useCallback((id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const replyComment = useCallback((id: string, text: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, replies: [...(c.replies || []), { author: 'User', text, date: new Date().toLocaleTimeString() }] }
          : c
      )
    );
  }, []);

  const acceptChange = useCallback((id: string) => {
    setTrackedChanges((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const rejectChange = useCallback((id: string) => {
    setTrackedChanges((prev) => prev.filter((c) => c.id !== id));
  }, []);

  // Document management
  const newDocument = useCallback(() => {
    const cleanDoc = `
      <div class="word-page" data-page="1">
        <div class="word-page-header" contenteditable="false">
          <span>${headerText || '[Header - Double click to edit]'}</span>
          <span>Page 1</span>
        </div>
        <div class="word-page-content">
          <p><br/></p>
        </div>
        <div class="word-page-footer" contenteditable="false">
          <span>${footerText || '[Footer - Double click to edit]'}</span>
          <span>Page 1</span>
        </div>
      </div>
    `;
    if (editorRef.current) {
      editorRef.current.innerHTML = cleanDoc;
    }
    setDocTitle('Document1');
    setComments([]);
    setFootnotes([]);
    setCitations([]);
    setTrackedChanges([]);
    setWatermark(null);
    setPageColor('#ffffff');
    setPageBorder(null);
    setHistoryStack([cleanDoc]);
    setHistoryIndex(0);
    setSavedStatus('Saved');
  }, [headerText, footerText]);

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
    setHistoryStack([content]);
    setHistoryIndex(0);
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
      setHistoryStack([result]);
      setHistoryIndex(0);
      setSavedStatus('Saved');
      calculateWordCount();
    };
    reader.readAsText(file);
  }, [calculateWordCount]);

  const printDocument = useCallback(() => {
    window.print();
  }, []);

  const setProtected = useCallback((enabled: boolean, pwd = '') => {
    setIsProtected(enabled);
    setProtectPassword(pwd);
  }, []);

  // Autosave
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
        hasSelection,
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
        applyFormatPainterToSelection,
        canUndo: historyIndex > 0,
        canRedo: historyIndex < historyStack.length - 1,
        undo,
        redo,
        recordSnapshot,
        executeCommand,
        saveSelection,
        restoreSelection,
        showFormattingMarks,
        setShowFormattingMarks,
        toggleFormattingMarks,
        sortParagraphs,
        cut,
        copy,
        paste,
        pasteWithoutFormatting,
        pasteSpecial,
        selectAll,
        setFontFamily,
        setFontSize,
        changeFontSizeStep,
        toggleBold,
        toggleItalic,
        toggleUnderline,
        setUnderlineStyle,
        toggleDoubleUnderline,
        toggleStrikethrough,
        toggleDoubleStrikethrough,
        toggleSubscript,
        toggleSuperscript,
        setTextColor,
        setTextHighlight,
        setTextEffect,
        changeCase,
        toggleSmallCaps,
        toggleAllCaps,
        toggleHiddenText,
        clearFormatting,
        setAlignment,
        setLineSpacing,
        setParagraphSpacing,
        toggleSpaceBefore,
        toggleSpaceAfter,
        indent,
        toggleBullets,
        toggleNumbering,
        applyMultilevelList,
        applyBorder,
        applyShading,
        applyStyle,
        findSearchTerm,
        setFindSearchTerm,
        activeMatchIndex,
        totalMatches,
        findNextMatch,
        findPrevMatch,
        findAndReplace,
        clearFindHighlights,
        insertTable,
        insertTableRow,
        insertTableColumn,
        deleteTableRow,
        deleteTableColumn,
        deleteTable,
        mergeTableCells,
        splitTableCells,
        selectTable,
        distributeTable,
        autoFitTable,
        setTableCellAlignment,
        setTableCellMargins,
        setTableBorders,
        setTableShading,
        sortTable,
        convertTextToTable,
        convertTableToText,
        repeatHeaderRow,
        insertImage,
        formatSelectedImage,
        insertShape,
        formatSelectedShape,
        arrangeObject,
        insertHyperlink,
        removeHyperlink,
        insertBookmark,
        goToBookmark,
        insertCrossReference,
        insertTextBox,
        insertDateTime,
        insertSymbol,
        insertEquation,
        insertPageBreak,
        insertBlankPage,
        insertTableOfContents,
        updateTableOfContents,
        differentFirstPage,
        setDifferentFirstPage,
        differentOddEven,
        setDifferentOddEven,
        pageNumberFormat,
        setPageNumberFormat,
        showComments,
        setShowComments,
        navigateToComment,
        showMarkup,
        setShowMarkup,
        navigateToChange,
        autoSpellingCheck,
        setAutoSpellingCheck,
        autoGrammarCheck,
        setAutoGrammarCheck,
        newDocument,
        newFromTemplate,
        saveDocument,
        saveAsDocument,
        openDocument,
        printDocument,
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
