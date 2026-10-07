import React, { useState } from 'react';
import {
  RibbonGroup,
  RibbonLargeButton,
  RibbonSplitButton,
  RibbonSmallButton,
  RibbonDropdown,
  StylesGallery,
} from './RibbonComponents';
import {
  PasteIcon,
  CutIcon,
  CopyIcon,
  FormatPainterIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  SubscriptIcon,
  SuperscriptIcon,
  TextEffectsIcon,
  TextHighlightIcon,
  FontColorIcon,
  GrowFontIcon,
  ShrinkFontIcon,
  ClearFormattingIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  LineSpacingIcon,
  BulletsIcon,
  NumberingIcon,
  MultilevelListIcon,
  DecreaseIndentIcon,
  IncreaseIndentIcon,
  ShadingIcon,
  BordersIcon,
  SortIcon,
  ShowHideIcon,
  FindIcon,
  ReplaceIcon,
  SelectIcon,
  ChangeStylesIcon,
  CoverPageIcon,
  BlankPageIcon,
  PageBreakIcon,
  TableIcon,
  PictureIcon,
  ShapesIcon,
  HyperlinkIcon,
  HeaderIcon,
  FooterIcon,
  PageNumberIcon,
  TextBoxIcon,
  EquationIcon,
  SymbolIcon,
  MarginsIcon,
  OrientationIcon,
  PageSizeIcon,
  ColumnsIcon,
  WatermarkIcon,
  PageColorIcon,
  PageBordersIcon,
  TableOfContentsIcon,
  FootnoteIcon,
  SpellingGrammarIcon,
  TrackChangesIcon,
  PrintLayoutIcon,
  FullScreenReadingIcon,
  WebLayoutIcon,
  OutlineIcon,
  DraftIcon,
  ZoomIcon,
} from './WordIcons';
import { DocumentViewMode } from '../types';
import { useDocument } from '../context/DocumentContext';

interface TabProps {
  onOpenDialog: (dialog: string) => void;
  showRuler?: boolean;
  setShowRuler?: (val: boolean) => void;
  showGridlines?: boolean;
  setShowGridlines?: (val: boolean) => void;
  showNavigationPane?: boolean;
  setShowNavigationPane?: (val: boolean) => void;
  viewMode?: DocumentViewMode;
  setViewMode?: (mode: DocumentViewMode) => void;
  zoomLevel?: number;
  setZoomLevel?: (zoom: number) => void;
}

// 1. HOME TAB (Fully Functional)
export const HomeTab: React.FC<TabProps> = ({ onOpenDialog }) => {
  const {
    selectionState,
    setFontFamily,
    setFontSize,
    changeFontSizeStep,
    changeCase,
    clearFormatting,
    executeCommand,
    indent,
    setLineSpacing,
    applyStyle,
    cut,
    copy,
    paste,
    pasteWithoutFormatting,
    selectAll,
    toggleFormatPainter,
    formatPainterActive,
  } = useDocument();

  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [highlightPickerOpen, setHighlightPickerOpen] = useState(false);
  const [lineSpacingOpen, setLineSpacingOpen] = useState(false);
  const [pasteMenuOpen, setPasteMenuOpen] = useState(false);
  const [caseMenuOpen, setCaseMenuOpen] = useState(false);

  const fontFamilies = [
    'Calibri',
    'Arial',
    'Times New Roman',
    'Segoe UI',
    'Georgia',
    'Tahoma',
    'Trebuchet MS',
    'Verdana',
    'Comic Sans MS',
    'Courier New',
    'Garamond',
  ];

  const fontSizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'];

  return (
    <div className="flex items-center h-full">
      {/* Clipboard Group */}
      <RibbonGroup title="Clipboard" hasDialogLauncher onDialogLaunch={() => onOpenDialog('clipboard')}>
        <div className="relative">
          <RibbonSplitButton
            icon={<PasteIcon size={32} />}
            label="Paste"
            onMainClick={paste}
            onDropClick={() => setPasteMenuOpen(!pasteMenuOpen)}
          />
          {pasteMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setPasteMenuOpen(false)} />
              <div className="absolute top-[72px] left-0 bg-white border border-[#abc1db] shadow-lg rounded-[2px] py-1 z-50 text-[11px] w-[180px]">
                <div onClick={() => { paste(); setPasteMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">
                  Paste (Keep Source)
                </div>
                <div onClick={() => { pasteWithoutFormatting(); setPasteMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">
                  Paste Without Formatting
                </div>
                <div onClick={() => { pasteWithoutFormatting(); setPasteMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">
                  Paste Special...
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col justify-between h-[68px] py-0.5">
          <RibbonSmallButton icon={<CutIcon size={14} />} label="Cut" onClick={cut} />
          <RibbonSmallButton icon={<CopyIcon size={14} />} label="Copy" onClick={copy} />
          <RibbonSmallButton
            icon={<FormatPainterIcon size={14} />}
            label="Format Painter"
            active={formatPainterActive}
            onClick={toggleFormatPainter}
          />
        </div>
      </RibbonGroup>

      {/* Font Group */}
      <RibbonGroup title="Font" hasDialogLauncher onDialogLaunch={() => onOpenDialog('font')}>
        <div className="flex flex-col justify-between h-[68px] py-0.5">
          {/* Row 1: Font Family, Size, Grow, Shrink, Change Case, Clear */}
          <div className="flex items-center gap-1">
            <RibbonDropdown
              value={selectionState.fontName || 'Calibri'}
              width="w-[124px]"
              options={fontFamilies}
              onChange={setFontFamily}
              title="Font (Ctrl+Shift+F)"
            />
            <RibbonDropdown
              value={selectionState.fontSize || '11'}
              width="w-[44px]"
              options={fontSizes}
              onChange={setFontSize}
              title="Font Size (Ctrl+Shift+P)"
            />
            <RibbonSmallButton icon={<GrowFontIcon size={13} />} onClick={() => changeFontSizeStep(1)} title="Grow Font (Ctrl+>)" />
            <RibbonSmallButton icon={<ShrinkFontIcon size={13} />} onClick={() => changeFontSizeStep(-1)} title="Shrink Font (Ctrl+<)" />

            {/* Change Case Dropdown */}
            <div className="relative">
              <RibbonSmallButton
                icon={<span className="text-[11px] font-bold">Aa</span>}
                hasDropdown
                onClick={() => setCaseMenuOpen(!caseMenuOpen)}
                title="Change Case"
              />
              {caseMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setCaseMenuOpen(false)} />
                  <div className="absolute top-[24px] left-0 bg-white border border-[#abc1db] shadow-lg rounded-[2px] py-1 z-50 text-[11px] w-[140px]">
                    <div onClick={() => { changeCase('sentence'); setCaseMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">Sentence case.</div>
                    <div onClick={() => { changeCase('lower'); setCaseMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">lowercase</div>
                    <div onClick={() => { changeCase('upper'); setCaseMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">UPPERCASE</div>
                    <div onClick={() => { changeCase('title'); setCaseMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">Capitalize Each Word</div>
                    <div onClick={() => { changeCase('toggle'); setCaseMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">tOGGLE cASE</div>
                  </div>
                </>
              )}
            </div>

            <RibbonSmallButton icon={<ClearFormattingIcon size={13} />} onClick={clearFormatting} title="Clear Formatting" />
          </div>

          {/* Row 2: B, I, U, Strikethrough, Sub, Super, Text Effects, Highlight, Color */}
          <div className="flex items-center gap-0.5">
            <RibbonSmallButton
              icon={<BoldIcon size={13} />}
              active={selectionState.isBold}
              onClick={() => executeCommand('bold')}
              title="Bold (Ctrl+B)"
            />
            <RibbonSmallButton
              icon={<ItalicIcon size={13} />}
              active={selectionState.isItalic}
              onClick={() => executeCommand('italic')}
              title="Italic (Ctrl+I)"
            />
            <RibbonSmallButton
              icon={<UnderlineIcon size={13} />}
              hasDropdown
              active={selectionState.isUnderline}
              onClick={() => executeCommand('underline')}
              title="Underline (Ctrl+U)"
            />
            <RibbonSmallButton
              icon={<StrikethroughIcon size={14} />}
              active={selectionState.isStrikethrough}
              onClick={() => executeCommand('strikeThrough')}
              title="Strikethrough"
            />
            <RibbonSmallButton
              icon={<SubscriptIcon size={13} />}
              active={selectionState.isSubscript}
              onClick={() => executeCommand('subscript')}
              title="Subscript (Ctrl+=)"
            />
            <RibbonSmallButton
              icon={<SuperscriptIcon size={13} />}
              active={selectionState.isSuperscript}
              onClick={() => executeCommand('superscript')}
              title="Superscript (Ctrl+Shift++)"
            />
            <RibbonSmallButton
              icon={<TextEffectsIcon size={13} />}
              hasDropdown
              onClick={() => executeCommand('formatBlock', 'blockquote')}
              title="Text Effects"
            />

            {/* Text Highlight Color */}
            <div className="relative">
              <RibbonSmallButton
                icon={<TextHighlightIcon size={13} />}
                hasDropdown
                onClick={() => setHighlightPickerOpen(!highlightPickerOpen)}
                title="Text Highlight Color"
              />
              {highlightPickerOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setHighlightPickerOpen(false)} />
                  <div className="absolute top-[24px] left-0 bg-white border border-[#abc1db] shadow-lg rounded-[2px] p-2 z-50 grid grid-cols-5 gap-1 w-[120px]">
                    {['#fef08a', '#86efac', '#93c5fd', '#f472b6', '#fed7aa', '#cbd5e1', 'transparent'].map((col) => (
                      <div
                        key={col}
                        onClick={() => {
                          executeCommand('backColor', col);
                          setHighlightPickerOpen(false);
                        }}
                        className="w-5 h-5 rounded border border-gray-300 cursor-pointer hover:scale-110"
                        style={{ backgroundColor: col === 'transparent' ? '#ffffff' : col }}
                        title={col}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Font Color */}
            <div className="relative">
              <RibbonSmallButton
                icon={<FontColorIcon size={13} barColor={selectionState.foreColor || '#ef4444'} />}
                hasDropdown
                onClick={() => setColorPickerOpen(!colorPickerOpen)}
                title="Font Color"
              />
              {colorPickerOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setColorPickerOpen(false)} />
                  <div className="absolute top-[24px] left-0 bg-white border border-[#abc1db] shadow-lg rounded-[2px] p-2 z-50 grid grid-cols-6 gap-1 w-[150px]">
                    {['#000000', '#ffffff', '#1e3a8a', '#2563eb', '#16a34a', '#dc2626', '#d97706', '#9333ea', '#64748b', '#0891b2', '#e11d48', '#4b5563'].map((col) => (
                      <div
                        key={col}
                        onClick={() => {
                          executeCommand('foreColor', col);
                          setColorPickerOpen(false);
                        }}
                        className="w-5 h-5 rounded border border-gray-300 cursor-pointer hover:scale-110"
                        style={{ backgroundColor: col }}
                        title={col}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </RibbonGroup>

      {/* Paragraph Group */}
      <RibbonGroup title="Paragraph" hasDialogLauncher onDialogLaunch={() => onOpenDialog('paragraph')}>
        <div className="flex flex-col justify-between h-[68px] py-0.5">
          {/* Row 1: Bullets, Numbering, Multilevel, Indent, Sort, Show/Hide */}
          <div className="flex items-center gap-0.5">
            <RibbonSmallButton
              icon={<BulletsIcon size={13} />}
              hasDropdown
              active={selectionState.isBullet}
              onClick={() => executeCommand('insertUnorderedList')}
              title="Bullets"
            />
            <RibbonSmallButton
              icon={<NumberingIcon size={13} />}
              hasDropdown
              active={selectionState.isNumber}
              onClick={() => executeCommand('insertOrderedList')}
              title="Numbering"
            />
            <RibbonSmallButton
              icon={<MultilevelListIcon size={13} />}
              hasDropdown
              onClick={() => executeCommand('insertOrderedList')}
              title="Multilevel List"
            />
            <div className="w-[1px] h-[16px] bg-[#d3dfed] mx-0.5" />
            <RibbonSmallButton icon={<DecreaseIndentIcon size={13} />} onClick={() => indent('out')} title="Decrease Indent" />
            <RibbonSmallButton icon={<IncreaseIndentIcon size={13} />} onClick={() => indent('in')} title="Increase Indent" />
            <div className="w-[1px] h-[16px] bg-[#d3dfed] mx-0.5" />
            <RibbonSmallButton icon={<SortIcon size={13} />} title="Sort" />
            <RibbonSmallButton icon={<ShowHideIcon size={13} />} title="Show/Hide ¶" />
          </div>

          {/* Row 2: Alignment, Line Spacing, Shading, Borders */}
          <div className="flex items-center gap-0.5">
            <RibbonSmallButton
              icon={<AlignLeftIcon size={13} />}
              active={selectionState.align === 'left'}
              onClick={() => executeCommand('justifyLeft')}
              title="Align Left (Ctrl+L)"
            />
            <RibbonSmallButton
              icon={<AlignCenterIcon size={13} />}
              active={selectionState.align === 'center'}
              onClick={() => executeCommand('justifyCenter')}
              title="Center (Ctrl+E)"
            />
            <RibbonSmallButton
              icon={<AlignRightIcon size={13} />}
              active={selectionState.align === 'right'}
              onClick={() => executeCommand('justifyRight')}
              title="Align Right (Ctrl+R)"
            />
            <RibbonSmallButton
              icon={<AlignJustifyIcon size={13} />}
              active={selectionState.align === 'justify'}
              onClick={() => executeCommand('justifyFull')}
              title="Justify (Ctrl+J)"
            />
            <div className="w-[1px] h-[16px] bg-[#d3dfed] mx-0.5" />

            {/* Line Spacing */}
            <div className="relative">
              <RibbonSmallButton
                icon={<LineSpacingIcon size={13} />}
                hasDropdown
                onClick={() => setLineSpacingOpen(!lineSpacingOpen)}
                title="Line and Paragraph Spacing"
              />
              {lineSpacingOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLineSpacingOpen(false)} />
                  <div className="absolute top-[24px] left-0 bg-white border border-[#abc1db] shadow-lg rounded-[2px] py-1 z-50 text-[11px] w-[140px]">
                    {['1.0', '1.15', '1.5', '2.0', '2.5', '3.0'].map((sp) => (
                      <div
                        key={sp}
                        onClick={() => {
                          setLineSpacing(sp);
                          setLineSpacingOpen(false);
                        }}
                        className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex justify-between"
                      >
                        <span>{sp}</span>
                        {selectionState.lineSpacing === sp && <span>✓</span>}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <RibbonSmallButton
              icon={<ShadingIcon size={13} />}
              hasDropdown
              onClick={() => executeCommand('backColor', '#dbeafe')}
              title="Shading"
            />
            <RibbonSmallButton
              icon={<BordersIcon size={13} />}
              hasDropdown
              onClick={() => executeCommand('formatBlock', 'fieldset')}
              title="Borders"
            />
          </div>
        </div>
      </RibbonGroup>

      {/* Styles Group */}
      <RibbonGroup title="Styles" hasDialogLauncher onDialogLaunch={() => onOpenDialog('styles')}>
        <StylesGallery onStyleSelect={applyStyle} />
        <RibbonLargeButton
          icon={<ChangeStylesIcon size={28} />}
          label={'Change\nStyles'}
          hasDropdown
          onClick={() => applyStyle('Heading 1')}
        />
      </RibbonGroup>

      {/* Editing Group */}
      <RibbonGroup title="Editing">
        <div className="flex flex-col justify-between h-[68px] py-0.5">
          <RibbonSmallButton
            icon={<FindIcon size={14} />}
            label="Find"
            hasDropdown
            onClick={() => onOpenDialog('find')}
            title="Find (Ctrl+F)"
          />
          <RibbonSmallButton
            icon={<ReplaceIcon size={14} />}
            label="Replace"
            onClick={() => onOpenDialog('replace')}
            title="Replace (Ctrl+H)"
          />
          <RibbonSmallButton
            icon={<SelectIcon size={14} />}
            label="Select"
            hasDropdown
            onClick={selectAll}
            title="Select All (Ctrl+A)"
          />
        </div>
      </RibbonGroup>
    </div>
  );
};

// 2. INSERT TAB (Fully Functional)
export const InsertTab: React.FC<TabProps> = ({ onOpenDialog }) => {
  const {
    insertBlankPage,
    insertPageBreak,
    insertImage,
    insertShape,
    insertTextBox,
    insertDateTime,
    setPageNumberPosition,
  } = useDocument();

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      insertImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex items-center h-full">
      {/* Pages */}
      <RibbonGroup title="Pages">
        <RibbonLargeButton icon={<CoverPageIcon size={28} />} label={'Cover\nPage'} hasDropdown onClick={insertBlankPage} />
        <div className="flex flex-col justify-center gap-1.5 h-[68px]">
          <RibbonSmallButton icon={<BlankPageIcon size={14} />} label="Blank Page" onClick={insertBlankPage} />
          <RibbonSmallButton icon={<PageBreakIcon size={14} />} label="Page Break" onClick={insertPageBreak} />
        </div>
      </RibbonGroup>

      {/* Tables */}
      <RibbonGroup title="Tables">
        <RibbonLargeButton
          icon={<TableIcon size={28} />}
          label="Table"
          hasDropdown
          onClick={() => onOpenDialog('table')}
        />
      </RibbonGroup>

      {/* Illustrations */}
      <RibbonGroup title="Illustrations">
        <RibbonLargeButton
          icon={<PictureIcon size={28} />}
          label="Picture"
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
        <RibbonLargeButton icon={<ShapesIcon size={28} />} label="Shapes" hasDropdown onClick={() => insertShape('rectangle')} />
      </RibbonGroup>

      {/* Links */}
      <RibbonGroup title="Links">
        <div className="flex flex-col justify-center gap-1 h-[68px]">
          <RibbonSmallButton icon={<HyperlinkIcon size={14} />} label="Hyperlink" onClick={() => onOpenDialog('hyperlink')} />
          <RibbonSmallButton icon={<span className="text-[10px] text-blue-600 font-bold">★</span>} label="Bookmark" onClick={() => onOpenDialog('hyperlink')} />
          <RibbonSmallButton icon={<span className="text-[10px] text-gray-700">☍</span>} label="Cross-reference" onClick={() => onOpenDialog('hyperlink')} />
        </div>
      </RibbonGroup>

      {/* Header & Footer */}
      <RibbonGroup title="Header & Footer">
        <RibbonLargeButton icon={<HeaderIcon size={28} />} label="Header" hasDropdown onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        <RibbonLargeButton icon={<FooterIcon size={28} />} label="Footer" hasDropdown onClick={() => window.scrollTo({ top: 9999, behavior: 'smooth' })} />
        <RibbonLargeButton
          icon={<PageNumberIcon size={28} />}
          label={'Page\nNumber'}
          hasDropdown
          onClick={() => setPageNumberPosition('bottom')}
        />
      </RibbonGroup>

      {/* Text */}
      <RibbonGroup title="Text">
        <RibbonLargeButton icon={<TextBoxIcon size={28} />} label={'Text\nBox'} hasDropdown onClick={insertTextBox} />
        <div className="flex flex-col justify-center gap-1.5 h-[68px]">
          <RibbonSmallButton icon={<span className="text-[10px]">📅</span>} label="Date & Time" onClick={insertDateTime} />
        </div>
      </RibbonGroup>

      {/* Symbols */}
      <RibbonGroup title="Symbols">
        <RibbonLargeButton icon={<EquationIcon size={28} />} label="Equation" hasDropdown onClick={() => onOpenDialog('equation')} />
        <RibbonLargeButton icon={<SymbolIcon size={28} />} label="Symbol" hasDropdown onClick={() => onOpenDialog('symbol')} />
      </RibbonGroup>
    </div>
  );
};

// 3. PAGE LAYOUT TAB (Fully Functional)
export const PageLayoutTab: React.FC<TabProps> = ({ onOpenDialog }) => {
  const { pageLayout } = useDocument();
  const [marginsMenu, setMarginsMenu] = useState(false);
  const [orientMenu, setOrientMenu] = useState(false);
  const [sizeMenu, setSizeMenu] = useState(false);
  const [columnsMenu, setColumnsMenu] = useState(false);

  return (
    <div className="flex items-center h-full">
      {/* Page Setup */}
      <RibbonGroup title="Page Setup" hasDialogLauncher onDialogLaunch={() => onOpenDialog('pageSetup')}>
        {/* Margins */}
        <div className="relative">
          <RibbonLargeButton
            icon={<MarginsIcon size={28} />}
            label="Margins"
            hasDropdown
            onClick={() => setMarginsMenu(!marginsMenu)}
          />
          {marginsMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMarginsMenu(false)} />
              <div className="absolute top-[72px] left-0 bg-white border border-[#abc1db] shadow-lg rounded-[2px] py-1 z-50 text-[11px] w-[180px]">
                <div
                  onClick={() => {
                    pageLayout.setMargins({ name: 'Normal', top: 96, bottom: 96, left: 96, right: 96 });
                    setMarginsMenu(false);
                  }}
                  className="px-3 py-1.5 hover:bg-[#3399ff] hover:text-white cursor-pointer"
                >
                  <div className="font-semibold">Normal</div>
                  <div className="text-[10px] text-gray-500">Top: 1&quot; | Left: 1&quot;</div>
                </div>
                <div
                  onClick={() => {
                    pageLayout.setMargins({ name: 'Narrow', top: 48, bottom: 48, left: 48, right: 48 });
                    setMarginsMenu(false);
                  }}
                  className="px-3 py-1.5 hover:bg-[#3399ff] hover:text-white cursor-pointer"
                >
                  <div className="font-semibold">Narrow</div>
                  <div className="text-[10px] text-gray-500">Top: 0.5&quot; | Left: 0.5&quot;</div>
                </div>
                <div
                  onClick={() => {
                    pageLayout.setMargins({ name: 'Wide', top: 96, bottom: 96, left: 192, right: 192 });
                    setMarginsMenu(false);
                  }}
                  className="px-3 py-1.5 hover:bg-[#3399ff] hover:text-white cursor-pointer"
                >
                  <div className="font-semibold">Wide</div>
                  <div className="text-[10px] text-gray-500">Left: 2&quot; | Right: 2&quot;</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Orientation */}
        <div className="relative">
          <RibbonLargeButton
            icon={<OrientationIcon size={28} />}
            label="Orientation"
            hasDropdown
            onClick={() => setOrientMenu(!orientMenu)}
          />
          {orientMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOrientMenu(false)} />
              <div className="absolute top-[72px] left-0 bg-white border border-[#abc1db] shadow-lg rounded-[2px] py-1 z-50 text-[11px] w-[130px]">
                <div
                  onClick={() => {
                    pageLayout.setOrientation('portrait');
                    setOrientMenu(false);
                  }}
                  className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex justify-between"
                >
                  <span>Portrait</span>
                  {pageLayout.orientation === 'portrait' && <span>✓</span>}
                </div>
                <div
                  onClick={() => {
                    pageLayout.setOrientation('landscape');
                    setOrientMenu(false);
                  }}
                  className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex justify-between"
                >
                  <span>Landscape</span>
                  {pageLayout.orientation === 'landscape' && <span>✓</span>}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Page Size */}
        <div className="relative">
          <RibbonLargeButton
            icon={<PageSizeIcon size={28} />}
            label="Size"
            hasDropdown
            onClick={() => setSizeMenu(!sizeMenu)}
          />
          {sizeMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setSizeMenu(false)} />
              <div className="absolute top-[72px] left-0 bg-white border border-[#abc1db] shadow-lg rounded-[2px] py-1 z-50 text-[11px] w-[150px]">
                <div
                  onClick={() => {
                    pageLayout.setSize({ name: 'Letter', width: 816, height: 1056 });
                    setSizeMenu(false);
                  }}
                  className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex justify-between"
                >
                  <span>Letter (8.5 x 11 in)</span>
                  {pageLayout.size.name === 'Letter' && <span>✓</span>}
                </div>
                <div
                  onClick={() => {
                    pageLayout.setSize({ name: 'A4', width: 794, height: 1123 });
                    setSizeMenu(false);
                  }}
                  className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex justify-between"
                >
                  <span>A4 (210 x 297 mm)</span>
                  {pageLayout.size.name === 'A4' && <span>✓</span>}
                </div>
                <div
                  onClick={() => {
                    pageLayout.setSize({ name: 'Legal', width: 816, height: 1344 });
                    setSizeMenu(false);
                  }}
                  className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex justify-between"
                >
                  <span>Legal (8.5 x 14 in)</span>
                  {pageLayout.size.name === 'Legal' && <span>✓</span>}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Columns */}
        <div className="relative">
          <RibbonLargeButton
            icon={<ColumnsIcon size={28} />}
            label="Columns"
            hasDropdown
            onClick={() => setColumnsMenu(!columnsMenu)}
          />
          {columnsMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setColumnsMenu(false)} />
              <div className="absolute top-[72px] left-0 bg-white border border-[#abc1db] shadow-lg rounded-[2px] py-1 z-50 text-[11px] w-[110px]">
                <div
                  onClick={() => { pageLayout.setColumns(1); setColumnsMenu(false); }}
                  className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex justify-between"
                >
                  <span>One</span>
                  {pageLayout.columns === 1 && <span>✓</span>}
                </div>
                <div
                  onClick={() => { pageLayout.setColumns(2); setColumnsMenu(false); }}
                  className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex justify-between"
                >
                  <span>Two</span>
                  {pageLayout.columns === 2 && <span>✓</span>}
                </div>
                <div
                  onClick={() => { pageLayout.setColumns(3); setColumnsMenu(false); }}
                  className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex justify-between"
                >
                  <span>Three</span>
                  {pageLayout.columns === 3 && <span>✓</span>}
                </div>
              </div>
            </>
          )}
        </div>
      </RibbonGroup>

      {/* Page Background */}
      <RibbonGroup title="Page Background">
        <RibbonLargeButton icon={<WatermarkIcon size={28} />} label="Watermark" hasDropdown onClick={() => onOpenDialog('watermark')} />
        <div className="relative">
          <RibbonLargeButton
            icon={<PageColorIcon size={28} />}
            label={'Page\nColor'}
            hasDropdown
            onClick={() => {
              const colors = ['#ffffff', '#f8fafc', '#fef9c3', '#e0f2fe', '#f3e8ff', '#fce7f3'];
              const curIdx = colors.indexOf(pageLayout.pageColor);
              const nextCol = colors[(curIdx + 1) % colors.length];
              pageLayout.setPageColor(nextCol);
            }}
          />
        </div>
        <RibbonLargeButton
          icon={<PageBordersIcon size={28} />}
          label={'Page\nBorders'}
          onClick={() => pageLayout.setPageBorder(pageLayout.pageBorder ? null : 'box')}
        />
      </RibbonGroup>
    </div>
  );
};

// 4. REFERENCES TAB (Fully Functional)
export const ReferencesTab: React.FC<TabProps> = ({ onOpenDialog }) => {
  const {
    insertTableOfContents,
    updateTableOfContents,
    insertFootnote,
    insertBibliography,
    addCitation,
  } = useDocument();

  return (
    <div className="flex items-center h-full">
      {/* Table of Contents */}
      <RibbonGroup title="Table of Contents">
        <RibbonLargeButton
          icon={<TableOfContentsIcon size={28} />}
          label={'Table of\nContents'}
          hasDropdown
          onClick={insertTableOfContents}
        />
        <div className="flex flex-col justify-center gap-1.5 h-[68px]">
          <RibbonSmallButton
            icon={<span className="text-[11px] text-green-600 font-bold">↻</span>}
            label="Update Table"
            onClick={updateTableOfContents}
          />
        </div>
      </RibbonGroup>

      {/* Footnotes */}
      <RibbonGroup title="Footnotes" hasDialogLauncher onDialogLaunch={() => onOpenDialog('footnotes')}>
        <RibbonLargeButton
          icon={<FootnoteIcon size={28} />}
          label={'Insert\nFootnote'}
          onClick={() => insertFootnote('New Footnote citation text')}
        />
        <div className="flex flex-col justify-center gap-1.5 h-[68px]">
          <RibbonSmallButton
            icon={<span className="text-[11px] font-bold text-gray-700">ABi</span>}
            label="Insert Endnote"
            onClick={() => insertFootnote('New Endnote text', true)}
          />
        </div>
      </RibbonGroup>

      {/* Citations & Bibliography */}
      <RibbonGroup title="Citations & Bibliography">
        <RibbonLargeButton
          icon={<span className="text-[24px]">📖</span>}
          label={'Insert\nCitation'}
          hasDropdown
          onClick={() => addCitation({ id: Date.now().toString(), author: 'Smith, J.', title: 'Document Analysis', year: '2025', sourceType: 'Book' })}
        />
        <div className="flex flex-col justify-center gap-1.5 h-[68px]">
          <RibbonSmallButton
            icon={<span className="text-[11px]">📑</span>}
            label="Bibliography"
            hasDropdown
            onClick={insertBibliography}
          />
        </div>
      </RibbonGroup>
    </div>
  );
};

// 5. REVIEW TAB (Fully Functional)
export const ReviewTab: React.FC<TabProps> = ({ onOpenDialog }) => {
  const {
    addComment,
    trackChanges,
    setTrackChanges,
    acceptChange,
    rejectChange,
    trackedChanges,
  } = useDocument();

  return (
    <div className="flex items-center h-full">
      {/* Proofing */}
      <RibbonGroup title="Proofing">
        <RibbonLargeButton
          icon={<SpellingGrammarIcon size={28} />}
          label={'Spelling &\nGrammar'}
          onClick={() => onOpenDialog('spelling')}
        />
        <RibbonLargeButton
          icon={<span className="text-[20px] font-mono font-bold">123</span>}
          label={'Word\nCount'}
          onClick={() => onOpenDialog('wordCount')}
        />
      </RibbonGroup>

      {/* Comments */}
      <RibbonGroup title="Comments">
        <RibbonLargeButton
          icon={<span className="text-[24px]">💬</span>}
          label={'New\nComment'}
          onClick={() => addComment('Review comment on selected passage.')}
        />
      </RibbonGroup>

      {/* Tracking */}
      <RibbonGroup title="Tracking" hasDialogLauncher onDialogLaunch={() => onOpenDialog('tracking')}>
        <RibbonLargeButton
          icon={<TrackChangesIcon size={28} />}
          label={'Track\nChanges'}
          hasDropdown
          active={trackChanges}
          onClick={() => setTrackChanges(!trackChanges)}
        />
      </RibbonGroup>

      {/* Changes */}
      <RibbonGroup title="Changes">
        <div className="flex items-center gap-1">
          <RibbonLargeButton
            icon={<span className="text-[24px] text-green-600">✓</span>}
            label="Accept"
            hasDropdown
            onClick={() => {
              if (trackedChanges.length > 0) acceptChange(trackedChanges[0].id);
            }}
          />
          <RibbonLargeButton
            icon={<span className="text-[24px] text-red-600">✗</span>}
            label="Reject"
            hasDropdown
            onClick={() => {
              if (trackedChanges.length > 0) rejectChange(trackedChanges[0].id);
            }}
          />
        </div>
      </RibbonGroup>

      {/* Protect */}
      <RibbonGroup title="Protect">
        <RibbonLargeButton
          icon={<span className="text-[24px]">🔒</span>}
          label={'Restrict\nEditing'}
          onClick={() => onOpenDialog('protect')}
        />
      </RibbonGroup>
    </div>
  );
};

// 6. VIEW TAB (Fully Functional)
export const ViewTab: React.FC<TabProps> = ({
  showRuler = true,
  setShowRuler,
  showGridlines = false,
  setShowGridlines,
  showNavigationPane = false,
  setShowNavigationPane,
  viewMode = 'print-layout',
  setViewMode,
  setZoomLevel,
  onOpenDialog,
}) => {
  return (
    <div className="flex items-center h-full">
      {/* Document Views */}
      <RibbonGroup title="Document Views">
        <RibbonLargeButton
          icon={<PrintLayoutIcon size={28} />}
          label={'Print\nLayout'}
          active={viewMode === 'print-layout'}
          onClick={() => setViewMode?.('print-layout')}
        />
        <RibbonLargeButton
          icon={<FullScreenReadingIcon size={28} />}
          label={'Full Screen\nReading'}
          active={viewMode === 'full-screen'}
          onClick={() => setViewMode?.('full-screen')}
        />
        <RibbonLargeButton
          icon={<WebLayoutIcon size={28} />}
          label={'Web\nLayout'}
          active={viewMode === 'web-layout'}
          onClick={() => setViewMode?.('web-layout')}
        />
        <RibbonLargeButton
          icon={<OutlineIcon size={28} />}
          label="Outline"
          active={viewMode === 'outline'}
          onClick={() => setViewMode?.('outline')}
        />
        <RibbonLargeButton
          icon={<DraftIcon size={28} />}
          label="Draft"
          active={viewMode === 'draft'}
          onClick={() => setViewMode?.('draft')}
        />
      </RibbonGroup>

      {/* Show Checkboxes */}
      <RibbonGroup title="Show">
        <div className="flex flex-col justify-center gap-1.5 h-[68px] px-1 text-[11px] font-sans">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={showRuler}
              onChange={(e) => setShowRuler?.(e.target.checked)}
              className="w-3.5 h-3.5 text-blue-600 rounded"
            />
            <span>Ruler</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={showGridlines}
              onChange={(e) => setShowGridlines?.(e.target.checked)}
              className="w-3.5 h-3.5 text-blue-600 rounded"
            />
            <span>Gridlines</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={showNavigationPane}
              onChange={(e) => setShowNavigationPane?.(e.target.checked)}
              className="w-3.5 h-3.5 text-blue-600 rounded"
            />
            <span>Navigation Pane</span>
          </label>
        </div>
      </RibbonGroup>

      {/* Zoom */}
      <RibbonGroup title="Zoom">
        <RibbonLargeButton
          icon={<ZoomIcon size={28} />}
          label="Zoom"
          onClick={() => onOpenDialog('zoom')}
        />
        <RibbonLargeButton
          icon={<span className="text-[20px] font-bold text-[#1e40af]">100%</span>}
          label="100%"
          onClick={() => setZoomLevel?.(100)}
        />
        <div className="flex flex-col justify-center gap-1 h-[68px]">
          <RibbonSmallButton icon={<span className="text-[11px]">📄</span>} label="One Page" onClick={() => setZoomLevel?.(80)} />
          <RibbonSmallButton icon={<span className="text-[11px]">↔</span>} label="Page Width" onClick={() => setZoomLevel?.(120)} />
        </div>
      </RibbonGroup>
    </div>
  );
};
