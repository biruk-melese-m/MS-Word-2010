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
  ArrowDownIcon,
} from './WordIcons';
import { DocumentViewMode, BulletStyle } from '../types';
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
    hasSelection,
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
    clearFormatting,
    setAlignment,
    setLineSpacing,
    toggleSpaceBefore,
    toggleSpaceAfter,
    indent,
    toggleBullets,
    toggleNumbering,
    applyBorder,
    applyShading,
    applyStyle,
    showFormattingMarks,
    toggleFormattingMarks,
    sortParagraphs,
    cut,
    copy,
    paste,
    pasteWithoutFormatting,
    pasteSpecial,
    selectAll,
    toggleFormatPainter,
    formatPainterActive,
  } = useDocument();

  // Dropdown states
  const [pasteMenuOpen, setPasteMenuOpen] = useState(false);
  const [underlineMenuOpen, setUnderlineMenuOpen] = useState(false);
  const [effectsMenuOpen, setEffectsMenuOpen] = useState(false);
  const [highlightPickerOpen, setHighlightPickerOpen] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [caseMenuOpen, setCaseMenuOpen] = useState(false);
  const [bulletsMenuOpen, setBulletsMenuOpen] = useState(false);
  const [numberingMenuOpen, setNumberingMenuOpen] = useState(false);
  const [multilevelMenuOpen, setMultilevelMenuOpen] = useState(false);
  const [lineSpacingOpen, setLineSpacingOpen] = useState(false);
  const [bordersMenuOpen, setBordersMenuOpen] = useState(false);
  const [shadingMenuOpen, setShadingMenuOpen] = useState(false);
  const [changeStylesMenuOpen, setChangeStylesMenuOpen] = useState(false);
  const [selectMenuOpen, setSelectMenuOpen] = useState(false);

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
    'Palatino Linotype',
  ];

  const fontSizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'];

  // Word 2010 theme color matrix (10 base columns, 5 shades each)
  const themeColors = [
    ['#ffffff', '#f2f2f2', '#d9d9d9', '#bfbfbf', '#a6a6a6'],
    ['#000000', '#7f7f7f', '#595959', '#3f3f3f', '#262626'],
    ['#eeece1', '#ddd9c3', '#c4bd97', '#948a54', '#494429'],
    ['#1f497d', '#c6d9f1', '#8db3e2', '#548dd4', '#17365d'],
    ['#4f81bd', '#dbe5f1', '#b8cce4', '#95b3d7', '#366092'],
    ['#c0504d', '#f2dcdb', '#e5b9b7', '#d99694', '#953734'],
    ['#9bbb59', '#ebf1dd', '#d7e3bc', '#c3d69b', '#76933c'],
    ['#8064a2', '#e5e0ec', '#ccc1da', '#b2a2c7', '#604a7b'],
    ['#4bacc6', '#dbeef3', '#b7dde8', '#92cddc', '#31859b'],
    ['#f79646', '#fdeada', '#fbd5b5', '#fac08f', '#e36c09'],
  ];

  const standardColors = [
    '#c00000', '#ff0000', '#ffc000', '#ffff00', '#92d050',
    '#00b050', '#00b0f0', '#0070c0', '#002060', '#7030a0',
  ];

  const highlightColors = [
    { name: 'Yellow', color: '#ffff00' },
    { name: 'Bright Green', color: '#00ff00' },
    { name: 'Turquoise', color: '#00ffff' },
    { name: 'Pink', color: '#ff00ff' },
    { name: 'Blue', color: '#0000ff' },
    { name: 'Red', color: '#ff0000' },
    { name: 'Dark Blue', color: '#000080' },
    { name: 'Teal', color: '#008080' },
    { name: 'Green', color: '#008000' },
    { name: 'Violet', color: '#800080' },
    { name: 'Dark Red', color: '#800000' },
    { name: 'Dark Yellow', color: '#808000' },
    { name: '50% Gray', color: '#808080' },
    { name: '25% Gray', color: '#c0c0c0' },
    { name: 'Black', color: '#000000' },
  ];

  return (
    <div className="flex items-center h-full">
      {/* 1. Clipboard Group */}
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
              <div className="absolute top-[72px] left-0 bg-white border border-[#abc1db] shadow-lg rounded-[2px] py-1 z-50 text-[11px] w-[210px]">
                <div
                  onClick={() => { pasteSpecial('html'); setPasteMenuOpen(false); }}
                  className="px-3 py-1.5 hover:bg-[#3399ff] hover:text-white cursor-pointer flex items-center gap-2"
                >
                  <span className="font-bold">📋</span>
                  <div>
                    <div className="font-medium">Keep Source Formatting</div>
                    <div className="text-[10px] text-gray-500">Paste with original styles</div>
                  </div>
                </div>
                <div
                  onClick={() => { pasteSpecial('match-dest'); setPasteMenuOpen(false); }}
                  className="px-3 py-1.5 hover:bg-[#3399ff] hover:text-white cursor-pointer flex items-center gap-2"
                >
                  <span className="font-bold">📄</span>
                  <div>
                    <div className="font-medium">Match Destination Formatting</div>
                    <div className="text-[10px] text-gray-500">Adopt surrounding font</div>
                  </div>
                </div>
                <div
                  onClick={() => { pasteWithoutFormatting(); setPasteMenuOpen(false); }}
                  className="px-3 py-1.5 hover:bg-[#3399ff] hover:text-white cursor-pointer flex items-center gap-2"
                >
                  <span className="font-bold">Aa</span>
                  <div>
                    <div className="font-medium">Keep Text Only</div>
                    <div className="text-[10px] text-gray-500">Paste unformatted plain text</div>
                  </div>
                </div>
                <div className="h-[1px] bg-gray-200 my-1" />
                <div
                  onClick={() => { onOpenDialog('pasteSpecial'); setPasteMenuOpen(false); }}
                  className="px-3 py-1.5 hover:bg-[#3399ff] hover:text-white cursor-pointer"
                >
                  Paste Special...
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col justify-between h-[68px] py-0.5">
          <RibbonSmallButton
            icon={<CutIcon size={14} />}
            label="Cut"
            onClick={hasSelection ? cut : undefined}
            className={!hasSelection ? 'opacity-40 cursor-default' : ''}
            title={hasSelection ? 'Cut (Ctrl+X)' : 'Cut (select text first)'}
          />
          <RibbonSmallButton
            icon={<CopyIcon size={14} />}
            label="Copy"
            onClick={hasSelection ? copy : undefined}
            className={!hasSelection ? 'opacity-40 cursor-default' : ''}
            title={hasSelection ? 'Copy (Ctrl+C)' : 'Copy (select text first)'}
          />
          <RibbonSmallButton
            icon={<FormatPainterIcon size={14} />}
            label="Format Painter"
            active={formatPainterActive}
            onClick={toggleFormatPainter}
            title="Format Painter (Copy formatting from one place and apply to another)"
          />
        </div>
      </RibbonGroup>

      {/* 2. Font Group */}
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
                  <div className="absolute top-[24px] left-0 bg-white border border-[#abc1db] shadow-lg rounded-[2px] py-1 z-50 text-[11px] w-[150px]">
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

          {/* Row 2: Bold, Italic, Underline, Strikethrough, Subscript, Superscript, Effects, Highlight, Color */}
          <div className="flex items-center gap-0.5">
            <RibbonSmallButton
              icon={<BoldIcon size={13} />}
              active={selectionState.isBold}
              onClick={toggleBold}
              title="Bold (Ctrl+B)"
            />
            <RibbonSmallButton
              icon={<ItalicIcon size={13} />}
              active={selectionState.isItalic}
              onClick={toggleItalic}
              title="Italic (Ctrl+I)"
            />

            {/* Underline with Dropdown */}
            <div className="relative flex items-center">
              <RibbonSmallButton
                icon={<UnderlineIcon size={13} />}
                active={selectionState.isUnderline || selectionState.isDoubleUnderline}
                onClick={toggleUnderline}
                title="Underline (Ctrl+U)"
              />
              <button
                onClick={() => setUnderlineMenuOpen(!underlineMenuOpen)}
                className="w-[9px] h-[22px] flex items-center justify-center office-btn text-[#41556e]"
                title="Underline styles"
              >
                <ArrowDownIcon size={5} />
              </button>
              {underlineMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUnderlineMenuOpen(false)} />
                  <div className="absolute top-[24px] left-0 bg-white border border-[#abc1db] shadow-lg rounded-[2px] py-1 z-50 text-[11px] w-[160px]">
                    <div onClick={() => { toggleUnderline(); setUnderlineMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer border-b border-gray-100">
                      <span className="underline">Single Underline</span>
                    </div>
                    <div onClick={() => { toggleDoubleUnderline(); setUnderlineMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer border-b border-gray-100">
                      <span className="underline decoration-double">Double Underline</span>
                    </div>
                    <div onClick={() => { setUnderlineStyle('dotted'); setUnderlineMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer border-b border-gray-100">
                      <span className="underline decoration-dotted">Dotted Underline</span>
                    </div>
                    <div onClick={() => { setUnderlineStyle('dashed'); setUnderlineMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer border-b border-gray-100">
                      <span className="underline decoration-dashed">Dashed Underline</span>
                    </div>
                    <div onClick={() => { setUnderlineStyle('wavy'); setUnderlineMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer border-b border-gray-100">
                      <span className="underline decoration-wavy">Wavy Underline</span>
                    </div>
                    <div className="h-[1px] bg-gray-200 my-1" />
                    <div onClick={() => { onOpenDialog('font'); setUnderlineMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">
                      More Underlines...
                    </div>
                  </div>
                </>
              )}
            </div>

            <RibbonSmallButton
              icon={<StrikethroughIcon size={14} />}
              active={selectionState.isStrikethrough}
              onClick={toggleStrikethrough}
              title="Strikethrough"
            />
            <RibbonSmallButton
              icon={<SubscriptIcon size={13} />}
              active={selectionState.isSubscript}
              onClick={toggleSubscript}
              title="Subscript (Ctrl+=)"
            />
            <RibbonSmallButton
              icon={<SuperscriptIcon size={13} />}
              active={selectionState.isSuperscript}
              onClick={toggleSuperscript}
              title="Superscript (Ctrl+Shift++)"
            />

            {/* Text Effects Dropdown */}
            <div className="relative">
              <RibbonSmallButton
                icon={<TextEffectsIcon size={13} />}
                hasDropdown
                onClick={() => setEffectsMenuOpen(!effectsMenuOpen)}
                title="Text Effects"
              />
              {effectsMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setEffectsMenuOpen(false)} />
                  <div className="absolute top-[24px] left-0 bg-white border border-[#abc1db] shadow-lg rounded-[2px] py-1 z-50 text-[11px] w-[140px]">
                    <div onClick={() => { setTextEffect('shadow'); setEffectsMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">Shadow</div>
                    <div onClick={() => { setTextEffect('outline'); setEffectsMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">Outline</div>
                    <div onClick={() => { setTextEffect('glow'); setEffectsMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">Glow</div>
                    <div onClick={() => { setTextEffect('reflection'); setEffectsMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">Reflection</div>
                  </div>
                </>
              )}
            </div>

            {/* Text Highlight Color Palette */}
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
                  <div className="absolute top-[24px] left-0 bg-white border border-[#abc1db] shadow-xl rounded-[2px] p-2 z-50 w-[150px]">
                    <div className="text-[10px] font-semibold text-gray-700 mb-1">Highlight Colors</div>
                    <div className="grid grid-cols-5 gap-1 mb-2">
                      {highlightColors.map((hc) => (
                        <div
                          key={hc.name}
                          onClick={() => {
                            setTextHighlight(hc.color);
                            setHighlightPickerOpen(false);
                          }}
                          className="w-5 h-5 rounded-[1px] border border-gray-300 cursor-pointer hover:scale-110"
                          style={{ backgroundColor: hc.color }}
                          title={hc.name}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        setTextHighlight('transparent');
                        setHighlightPickerOpen(false);
                      }}
                      className="w-full text-center py-1 border border-gray-300 text-[11px] hover:bg-gray-100"
                    >
                      No Color
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Font Color Palette (Theme Colors + Standard Colors) */}
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
                  <div className="absolute top-[24px] left-0 bg-white border border-[#abc1db] shadow-xl rounded-[2px] p-2 z-50 w-[170px]">
                    <button
                      onClick={() => {
                        setTextColor('#000000');
                        setColorPickerOpen(false);
                      }}
                      className="w-full text-left px-2 py-1 mb-1 border border-transparent hover:border-blue-400 hover:bg-blue-50 text-[11px] flex items-center gap-2"
                    >
                      <span className="w-3.5 h-3.5 bg-black inline-block border border-gray-400" />
                      <span>Automatic</span>
                    </button>

                    <div className="text-[10px] font-semibold text-gray-600 mb-1">Theme Colors</div>
                    <div className="grid grid-cols-10 gap-0.5 mb-2">
                      {themeColors.map((colGroup, colIdx) => (
                        <div key={colIdx} className="flex flex-col gap-0.5">
                          {colGroup.map((c, rowIdx) => (
                            <div
                              key={rowIdx}
                              onClick={() => {
                                setTextColor(c);
                                setColorPickerOpen(false);
                              }}
                              className="w-3.5 h-3.5 cursor-pointer hover:scale-125 border border-gray-200"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      ))}
                    </div>

                    <div className="text-[10px] font-semibold text-gray-600 mb-1">Standard Colors</div>
                    <div className="grid grid-cols-10 gap-0.5 mb-2">
                      {standardColors.map((sc) => (
                        <div
                          key={sc}
                          onClick={() => {
                            setTextColor(sc);
                            setColorPickerOpen(false);
                          }}
                          className="w-3.5 h-3.5 cursor-pointer hover:scale-125 border border-gray-200"
                          style={{ backgroundColor: sc }}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </RibbonGroup>

      {/* 3. Paragraph Group */}
      <RibbonGroup title="Paragraph" hasDialogLauncher onDialogLaunch={() => onOpenDialog('paragraph')}>
        <div className="flex flex-col justify-between h-[68px] py-0.5">
          {/* Row 1: Bullets, Numbering, Multilevel, Indent, Sort, Show/Hide */}
          <div className="flex items-center gap-0.5">
            {/* Bullets with Dropdown */}
            <div className="relative flex items-center">
              <RibbonSmallButton
                icon={<BulletsIcon size={13} />}
                active={selectionState.isBullet}
                onClick={() => toggleBullets('disc')}
                title="Bullets"
              />
              <button
                onClick={() => setBulletsMenuOpen(!bulletsMenuOpen)}
                className="w-[9px] h-[22px] flex items-center justify-center office-btn text-[#41556e]"
                title="Bullet styles"
              >
                <ArrowDownIcon size={5} />
              </button>
              {bulletsMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setBulletsMenuOpen(false)} />
                  <div className="absolute top-[24px] left-0 bg-white border border-[#abc1db] shadow-lg rounded-[2px] p-2 z-50 w-[140px]">
                    <div className="text-[10px] font-semibold text-gray-600 mb-1">Bullet Library</div>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { label: '• Disc', style: 'disc' },
                        { label: '○ Circle', style: 'circle' },
                        { label: '■ Square', style: 'square' },
                        { label: '◆ Diamond', style: 'diamond' },
                        { label: '➢ Arrow', style: 'arrow' },
                        { label: '✓ Check', style: 'check' },
                      ].map((b) => (
                        <button
                          key={b.style}
                          onClick={() => {
                            toggleBullets(b.style as BulletStyle);
                            setBulletsMenuOpen(false);
                          }}
                          className="p-1 border border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-[11px] text-center"
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Numbering with Dropdown */}
            <div className="relative flex items-center">
              <RibbonSmallButton
                icon={<NumberingIcon size={13} />}
                active={selectionState.isNumber}
                onClick={() => toggleNumbering('decimal')}
                title="Numbering"
              />
              <button
                onClick={() => setNumberingMenuOpen(!numberingMenuOpen)}
                className="w-[9px] h-[22px] flex items-center justify-center office-btn text-[#41556e]"
                title="Numbering styles"
              >
                <ArrowDownIcon size={5} />
              </button>
              {numberingMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNumberingMenuOpen(false)} />
                  <div className="absolute top-[24px] left-0 bg-white border border-[#abc1db] shadow-lg rounded-[2px] p-2 z-50 w-[140px]">
                    <div className="text-[10px] font-semibold text-gray-600 mb-1">Numbering Library</div>
                    <div className="grid grid-cols-2 gap-1 text-[11px]">
                      <button onClick={() => { toggleNumbering('decimal'); setNumberingMenuOpen(false); }} className="p-1 border border-gray-200 hover:bg-blue-50">1. 2. 3.</button>
                      <button onClick={() => { toggleNumbering('decimal-paren'); setNumberingMenuOpen(false); }} className="p-1 border border-gray-200 hover:bg-blue-50">1) 2) 3)</button>
                      <button onClick={() => { toggleNumbering('upper-alpha'); setNumberingMenuOpen(false); }} className="p-1 border border-gray-200 hover:bg-blue-50">A. B. C.</button>
                      <button onClick={() => { toggleNumbering('lower-alpha'); setNumberingMenuOpen(false); }} className="p-1 border border-gray-200 hover:bg-blue-50">a. b. c.</button>
                      <button onClick={() => { toggleNumbering('lower-roman'); setNumberingMenuOpen(false); }} className="p-1 border border-gray-200 hover:bg-blue-50">i. ii. iii.</button>
                      <button onClick={() => { toggleNumbering('upper-roman'); setNumberingMenuOpen(false); }} className="p-1 border border-gray-200 hover:bg-blue-50">I. II. III.</button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Multilevel List Dropdown */}
            <div className="relative">
              <RibbonSmallButton
                icon={<MultilevelListIcon size={13} />}
                hasDropdown
                onClick={() => setMultilevelMenuOpen(!multilevelMenuOpen)}
                title="Multilevel List"
              />
              {multilevelMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMultilevelMenuOpen(false)} />
                  <div className="absolute top-[24px] left-0 bg-white border border-[#abc1db] shadow-lg rounded-[2px] p-2 z-50 w-[150px]">
                    <div className="text-[10px] font-semibold text-gray-600 mb-1">List Library</div>
                    <div className="space-y-1 text-[11px]">
                      <div onClick={() => { toggleNumbering('decimal'); setMultilevelMenuOpen(false); }} className="p-1 border border-gray-200 hover:bg-blue-50 cursor-pointer">
                        1. <br /><span className="pl-2">a. </span><br /><span className="pl-4">i. </span>
                      </div>
                      <div onClick={() => { toggleNumbering('decimal'); setMultilevelMenuOpen(false); }} className="p-1 border border-gray-200 hover:bg-blue-50 cursor-pointer">
                        1. <br /><span className="pl-2">1.1 </span><br /><span className="pl-4">1.1.1 </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="w-[1px] h-[16px] bg-[#d3dfed] mx-0.5" />
            <RibbonSmallButton icon={<DecreaseIndentIcon size={13} />} onClick={() => indent('out')} title="Decrease Indent" />
            <RibbonSmallButton icon={<IncreaseIndentIcon size={13} />} onClick={() => indent('in')} title="Increase Indent" />
            <div className="w-[1px] h-[16px] bg-[#d3dfed] mx-0.5" />
            <RibbonSmallButton
              icon={<SortIcon size={13} />}
              onClick={() => sortParagraphs(true)}
              title="Sort Paragraphs (A to Z)"
            />
            <RibbonSmallButton
              icon={<ShowHideIcon size={13} />}
              active={showFormattingMarks}
              onClick={toggleFormattingMarks}
              title="Show/Hide ¶ (Ctrl+*)"
            />
          </div>

          {/* Row 2: Alignment, Line Spacing, Shading, Borders */}
          <div className="flex items-center gap-0.5">
            <RibbonSmallButton
              icon={<AlignLeftIcon size={13} />}
              active={selectionState.align === 'left'}
              onClick={() => setAlignment('left')}
              title="Align Left (Ctrl+L)"
            />
            <RibbonSmallButton
              icon={<AlignCenterIcon size={13} />}
              active={selectionState.align === 'center'}
              onClick={() => setAlignment('center')}
              title="Center (Ctrl+E)"
            />
            <RibbonSmallButton
              icon={<AlignRightIcon size={13} />}
              active={selectionState.align === 'right'}
              onClick={() => setAlignment('right')}
              title="Align Right (Ctrl+R)"
            />
            <RibbonSmallButton
              icon={<AlignJustifyIcon size={13} />}
              active={selectionState.align === 'justify'}
              onClick={() => setAlignment('justify')}
              title="Justify (Ctrl+J)"
            />
            <div className="w-[1px] h-[16px] bg-[#d3dfed] mx-0.5" />

            {/* Line and Paragraph Spacing */}
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
                  <div className="absolute top-[24px] left-0 bg-white border border-[#abc1db] shadow-lg rounded-[2px] py-1 z-50 text-[11px] w-[180px]">
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
                    <div className="h-[1px] bg-gray-200 my-1" />
                    <div
                      onClick={() => { toggleSpaceBefore(); setLineSpacingOpen(false); }}
                      className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer"
                    >
                      {selectionState.spaceBefore > 0 ? 'Remove Space Before Paragraph' : 'Add Space Before Paragraph'}
                    </div>
                    <div
                      onClick={() => { toggleSpaceAfter(); setLineSpacingOpen(false); }}
                      className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer"
                    >
                      {selectionState.spaceAfter > 0 ? 'Remove Space After Paragraph' : 'Add Space After Paragraph'}
                    </div>
                    <div className="h-[1px] bg-gray-200 my-1" />
                    <div
                      onClick={() => { onOpenDialog('paragraph'); setLineSpacingOpen(false); }}
                      className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer"
                    >
                      Line Spacing Options...
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Shading Dropdown */}
            <div className="relative">
              <RibbonSmallButton
                icon={<ShadingIcon size={13} />}
                hasDropdown
                onClick={() => setShadingMenuOpen(!shadingMenuOpen)}
                title="Shading"
              />
              {shadingMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShadingMenuOpen(false)} />
                  <div className="absolute top-[24px] left-0 bg-white border border-[#abc1db] shadow-lg rounded-[2px] p-2 z-50 w-[150px]">
                    <div className="text-[10px] font-semibold text-gray-600 mb-1">Theme Colors</div>
                    <div className="grid grid-cols-5 gap-1 mb-2">
                      {['#ffffff', '#f1f5f9', '#dbeafe', '#fef3c7', '#dcfce7', '#fce7f3', '#f3e8ff', '#fed7aa', '#e2e8f0', '#fee2e2'].map((c) => (
                        <div
                          key={c}
                          onClick={() => {
                            applyShading(c);
                            setShadingMenuOpen(false);
                          }}
                          className="w-5 h-5 rounded-[1px] border border-gray-300 cursor-pointer hover:scale-110"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        applyShading('transparent');
                        setShadingMenuOpen(false);
                      }}
                      className="w-full text-center py-1 border border-gray-300 text-[11px] hover:bg-gray-100"
                    >
                      No Color
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Borders Dropdown */}
            <div className="relative">
              <RibbonSmallButton
                icon={<BordersIcon size={13} />}
                hasDropdown
                onClick={() => setBordersMenuOpen(!bordersMenuOpen)}
                title="Borders"
              />
              {bordersMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setBordersMenuOpen(false)} />
                  <div className="absolute top-[24px] left-0 bg-white border border-[#abc1db] shadow-lg rounded-[2px] py-1 z-50 text-[11px] w-[160px]">
                    <div onClick={() => { applyBorder('bottom'); setBordersMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">Bottom Border</div>
                    <div onClick={() => { applyBorder('top'); setBordersMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">Top Border</div>
                    <div onClick={() => { applyBorder('left'); setBordersMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">Left Border</div>
                    <div onClick={() => { applyBorder('right'); setBordersMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">Right Border</div>
                    <div className="h-[1px] bg-gray-200 my-1" />
                    <div onClick={() => { applyBorder('none'); setBordersMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">No Border</div>
                    <div onClick={() => { applyBorder('all'); setBordersMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">All Borders</div>
                    <div onClick={() => { applyBorder('outside'); setBordersMenuOpen(false); }} className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">Outside Borders</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </RibbonGroup>

      {/* 4. Styles Group */}
      <RibbonGroup title="Styles" hasDialogLauncher onDialogLaunch={() => onOpenDialog('styles')}>
        <StylesGallery onStyleSelect={applyStyle} />
        <div className="relative">
          <RibbonLargeButton
            icon={<ChangeStylesIcon size={28} />}
            label={'Change\nStyles'}
            hasDropdown
            onClick={() => setChangeStylesMenuOpen(!changeStylesMenuOpen)}
          />
          {changeStylesMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setChangeStylesMenuOpen(false)} />
              <div className="absolute top-[72px] right-0 bg-white border border-[#abc1db] shadow-xl rounded-[2px] py-1 z-50 text-[11px] w-[180px]">
                <div className="px-3 py-1 text-gray-500 font-semibold border-b text-[10px]">Style Set</div>
                <div onClick={() => { applyStyle('Normal'); setChangeStylesMenuOpen(false); }} className="px-3 py-1.5 hover:bg-[#3399ff] hover:text-white cursor-pointer">Word 2010 (Default)</div>
                <div onClick={() => { applyStyle('Heading 1'); setChangeStylesMenuOpen(false); }} className="px-3 py-1.5 hover:bg-[#3399ff] hover:text-white cursor-pointer">Distinctive</div>
                <div onClick={() => { applyStyle('Title'); setChangeStylesMenuOpen(false); }} className="px-3 py-1.5 hover:bg-[#3399ff] hover:text-white cursor-pointer">Formal</div>
                <div onClick={() => { applyStyle('Heading 2'); setChangeStylesMenuOpen(false); }} className="px-3 py-1.5 hover:bg-[#3399ff] hover:text-white cursor-pointer">Modern</div>
                <div className="h-[1px] bg-gray-200 my-1" />
                <div onClick={() => { setFontFamily('Calibri'); setChangeStylesMenuOpen(false); }} className="px-3 py-1.5 hover:bg-[#3399ff] hover:text-white cursor-pointer">Fonts: Calibri</div>
                <div onClick={() => { setFontFamily('Arial'); setChangeStylesMenuOpen(false); }} className="px-3 py-1.5 hover:bg-[#3399ff] hover:text-white cursor-pointer">Fonts: Arial</div>
                <div onClick={() => { setFontFamily('Times New Roman'); setChangeStylesMenuOpen(false); }} className="px-3 py-1.5 hover:bg-[#3399ff] hover:text-white cursor-pointer">Fonts: Times New Roman</div>
              </div>
            </>
          )}
        </div>
      </RibbonGroup>

      {/* 5. Editing Group */}
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
          <div className="relative">
            <RibbonSmallButton
              icon={<SelectIcon size={14} />}
              label="Select"
              hasDropdown
              onClick={() => setSelectMenuOpen(!selectMenuOpen)}
              title="Select"
            />
            {selectMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setSelectMenuOpen(false)} />
                <div className="absolute top-[24px] right-0 bg-white border border-[#abc1db] shadow-lg rounded-[2px] py-1 z-50 text-[11px] w-[160px]">
                  <div
                    onClick={() => { selectAll(); setSelectMenuOpen(false); }}
                    className="px-3 py-1.5 hover:bg-[#3399ff] hover:text-white cursor-pointer flex justify-between"
                  >
                    <span>Select All</span>
                    <span className="text-gray-400 text-[10px]">Ctrl+A</span>
                  </div>
                  <div
                    onClick={() => { selectAll(); setSelectMenuOpen(false); }}
                    className="px-3 py-1.5 hover:bg-[#3399ff] hover:text-white cursor-pointer"
                  >
                    Select Objects
                  </div>
                  <div
                    onClick={() => { selectAll(); setSelectMenuOpen(false); }}
                    className="px-3 py-1.5 hover:bg-[#3399ff] hover:text-white cursor-pointer"
                  >
                    Select Text with Similar Formatting
                  </div>
                </div>
              </>
            )}
          </div>
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
    insertTable,
    insertTableRow,
    insertTableColumn,
    deleteTableRow,
    deleteTableColumn,
    deleteTable,
    mergeTableCells,
    splitTableCells,
    distributeTable,
    autoFitTable,
    setTableCellAlignment,
    setTableBorders,
    setTableShading,
    sortTable,
    convertTextToTable,
    convertTableToText,
    insertImage,
    formatSelectedImage,
    insertShape,
    formatSelectedShape,
    insertHyperlink,
    insertBookmark,
    goToBookmark,
    insertCrossReference,
    headerText,
    setHeaderText,
    footerText,
    setFooterText,
    differentFirstPage,
    setDifferentFirstPage,
    differentOddEven,
    setDifferentOddEven,
    pageNumberPosition,
    setPageNumberPosition,
    setPageNumberFormat,
    insertTextBox,
    insertDateTime,
    insertTableOfContents,
    updateTableOfContents,
    insertFootnote,
    addCitation,
    citationStyle,
    insertBibliography,
    comments,
    addComment,
    deleteComment,
    activeCommentId,
    navigateToComment,
    trackChanges,
    setTrackChanges,
    trackedChanges,
    acceptChange,
    rejectChange,
  } = useDocument();

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Dropdown states
  const [tableMenuOpen, setTableMenuOpen] = useState(false);
  const [tableGridHover, setTableGridHover] = useState({ r: 0, c: 0 });
  const [tableToolsOpen, setTableToolsOpen] = useState(false);
  const [pictureMenuOpen, setPictureMenuOpen] = useState(false);
  const [shapesMenuOpen, setShapesMenuOpen] = useState(false);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [pageNumberMenuOpen, setPageNumberMenuOpen] = useState(false);
  const [tocMenuOpen, setTocMenuOpen] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      insertImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex items-center h-full">
      {/* 1. Pages Group */}
      <RibbonGroup title="Pages">
        <RibbonLargeButton icon={<CoverPageIcon size={28} />} label={'Cover\nPage'} hasDropdown onClick={insertBlankPage} />
        <div className="flex flex-col justify-center gap-1.5 h-[68px]">
          <RibbonSmallButton icon={<BlankPageIcon size={14} />} label="Blank Page" onClick={insertBlankPage} />
          <RibbonSmallButton icon={<PageBreakIcon size={14} />} label="Page Break" onClick={insertPageBreak} />
        </div>
      </RibbonGroup>

      {/* 2. Tables Group */}
      <RibbonGroup title="Tables">
        <div className="relative">
          <RibbonLargeButton
            icon={<TableIcon size={28} />}
            label="Table"
            hasDropdown
            onClick={() => setTableMenuOpen(!tableMenuOpen)}
          />
          {tableMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setTableMenuOpen(false)} />
              <div className="absolute top-[72px] left-0 bg-white border border-[#abc1db] shadow-xl rounded-[2px] p-2 z-50 text-[11px] w-[210px]">
                <div className="text-[10px] font-semibold text-gray-500 mb-1 border-b pb-1">Insert Table</div>
                <div className="grid grid-cols-10 gap-1 p-1 bg-gray-50 border border-gray-200 rounded mb-1">
                  {Array.from({ length: 8 }).map((_, rIdx) =>
                    Array.from({ length: 10 }).map((_, cIdx) => {
                      const r = rIdx + 1;
                      const c = cIdx + 1;
                      const isHighlighted = r <= tableGridHover.r && c <= tableGridHover.c;
                      return (
                        <div
                          key={`${r}-${c}`}
                          onMouseEnter={() => setTableGridHover({ r, c })}
                          onClick={() => {
                            insertTable(r, c);
                            setTableMenuOpen(false);
                          }}
                          className={`w-[12px] h-[12px] border cursor-pointer ${
                            isHighlighted ? 'bg-[#ffc66a] border-[#e28b00]' : 'bg-white border-gray-300 hover:bg-orange-100'
                          }`}
                        />
                      );
                    })
                  )}
                </div>
                <div className="text-center text-[10px] text-gray-600 font-medium py-0.5 mb-1 bg-[#eef4fb] rounded">
                  {tableGridHover.r > 0 ? `${tableGridHover.c} x ${tableGridHover.r} Table` : 'Highlight grid to insert'}
                </div>
                <div
                  onClick={() => { onOpenDialog('table'); setTableMenuOpen(false); }}
                  className="px-2 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex items-center gap-2 rounded"
                >
                  <span>▦</span> Insert Table...
                </div>
                <div
                  onClick={() => { insertTable(1, 1); setTableMenuOpen(false); }}
                  className="px-2 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex items-center gap-2 rounded"
                >
                  <span>✏️</span> Draw Table
                </div>
                <div
                  onClick={() => { convertTextToTable(); setTableMenuOpen(false); }}
                  className="px-2 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex items-center gap-2 rounded border-t mt-1"
                >
                  <span>⇄</span> Convert Text to Table
                </div>
                <div
                  onClick={() => { convertTableToText(); setTableMenuOpen(false); }}
                  className="px-2 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex items-center gap-2 rounded"
                >
                  <span>⇄</span> Convert Table to Text
                </div>
              </div>
            </>
          )}
        </div>

        {/* Table Layout & Design Tools Dropdown */}
        <div className="relative">
          <RibbonLargeButton
            icon={<span className="text-[22px]">⚙️</span>}
            label={'Table\nTools'}
            hasDropdown
            onClick={() => setTableToolsOpen(!tableToolsOpen)}
          />
          {tableToolsOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setTableToolsOpen(false)} />
              <div className="absolute top-[72px] left-0 bg-white border border-[#abc1db] shadow-xl rounded-[2px] p-2 z-50 text-[11px] w-[260px] max-h-[360px] overflow-y-auto">
                <div className="font-semibold text-gray-600 mb-1 border-b pb-1 text-[10px]">Rows & Columns</div>
                <div className="grid grid-cols-2 gap-1 mb-2">
                  <button onClick={() => insertTableRow(true)} className="px-2 py-1 text-left bg-gray-50 hover:bg-blue-100 rounded">Insert Above</button>
                  <button onClick={() => insertTableRow(false)} className="px-2 py-1 text-left bg-gray-50 hover:bg-blue-100 rounded">Insert Below</button>
                  <button onClick={() => insertTableColumn(true)} className="px-2 py-1 text-left bg-gray-50 hover:bg-blue-100 rounded">Insert Left</button>
                  <button onClick={() => insertTableColumn(false)} className="px-2 py-1 text-left bg-gray-50 hover:bg-blue-100 rounded">Insert Right</button>
                  <button onClick={deleteTableRow} className="px-2 py-1 text-left bg-red-50 text-red-700 hover:bg-red-100 rounded">Delete Row</button>
                  <button onClick={deleteTableColumn} className="px-2 py-1 text-left bg-red-50 text-red-700 hover:bg-red-100 rounded">Delete Column</button>
                  <button onClick={deleteTable} className="px-2 py-1 text-left col-span-2 bg-red-100 text-red-800 hover:bg-red-200 rounded font-semibold">Delete Table</button>
                </div>
                <div className="font-semibold text-gray-600 mb-1 border-b pb-1 text-[10px]">Merge & Cell Layout</div>
                <div className="grid grid-cols-2 gap-1 mb-2">
                  <button onClick={mergeTableCells} className="px-2 py-1 text-left bg-gray-50 hover:bg-blue-100 rounded">Merge Cells</button>
                  <button onClick={splitTableCells} className="px-2 py-1 text-left bg-gray-50 hover:bg-blue-100 rounded">Split Cells</button>
                  <button onClick={() => distributeTable('rows')} className="px-2 py-1 text-left bg-gray-50 hover:bg-blue-100 rounded">Distribute Rows</button>
                  <button onClick={() => distributeTable('columns')} className="px-2 py-1 text-left bg-gray-50 hover:bg-blue-100 rounded">Distribute Columns</button>
                  <button onClick={() => autoFitTable('contents')} className="px-2 py-1 text-left bg-gray-50 hover:bg-blue-100 rounded">AutoFit Contents</button>
                  <button onClick={() => autoFitTable('window')} className="px-2 py-1 text-left bg-gray-50 hover:bg-blue-100 rounded">AutoFit Window</button>
                </div>
                <div className="font-semibold text-gray-600 mb-1 border-b pb-1 text-[10px]">Cell Alignment (9 directions)</div>
                <div className="grid grid-cols-3 gap-1 mb-2 text-center">
                  <button onClick={() => setTableCellAlignment('top-left')} className="p-1 bg-gray-100 hover:bg-blue-200 text-[10px]">↖ Top L</button>
                  <button onClick={() => setTableCellAlignment('top-center')} className="p-1 bg-gray-100 hover:bg-blue-200 text-[10px]">↑ Top C</button>
                  <button onClick={() => setTableCellAlignment('top-right')} className="p-1 bg-gray-100 hover:bg-blue-200 text-[10px]">↗ Top R</button>
                  <button onClick={() => setTableCellAlignment('middle-left')} className="p-1 bg-gray-100 hover:bg-blue-200 text-[10px]">← Mid L</button>
                  <button onClick={() => setTableCellAlignment('middle-center')} className="p-1 bg-gray-100 hover:bg-blue-200 text-[10px] font-bold">● Center</button>
                  <button onClick={() => setTableCellAlignment('middle-right')} className="p-1 bg-gray-100 hover:bg-blue-200 text-[10px]">→ Mid R</button>
                  <button onClick={() => setTableCellAlignment('bottom-left')} className="p-1 bg-gray-100 hover:bg-blue-200 text-[10px]">↙ Bot L</button>
                  <button onClick={() => setTableCellAlignment('bottom-center')} className="p-1 bg-gray-100 hover:bg-blue-200 text-[10px]">↓ Bot C</button>
                  <button onClick={() => setTableCellAlignment('bottom-right')} className="p-1 bg-gray-100 hover:bg-blue-200 text-[10px]">↘ Bot R</button>
                </div>
                <div className="font-semibold text-gray-600 mb-1 border-b pb-1 text-[10px]">Borders & Shading</div>
                <div className="flex gap-1 mb-1">
                  <button onClick={() => setTableBorders('all')} className="flex-1 py-1 bg-gray-100 hover:bg-blue-200 text-[10px]">All Borders</button>
                  <button onClick={() => setTableBorders('outside')} className="flex-1 py-1 bg-gray-100 hover:bg-blue-200 text-[10px]">Outside</button>
                  <button onClick={() => setTableBorders('none')} className="flex-1 py-1 bg-gray-100 hover:bg-blue-200 text-[10px]">No Border</button>
                </div>
                <div className="flex gap-1 mb-1">
                  <button onClick={() => setTableShading('#fff2cc')} className="w-6 h-5 bg-[#fff2cc] border" title="Yellow" />
                  <button onClick={() => setTableShading('#d9ead3')} className="w-6 h-5 bg-[#d9ead3] border" title="Green" />
                  <button onClick={() => setTableShading('#c9daf8')} className="w-6 h-5 bg-[#c9daf8] border" title="Blue" />
                  <button onClick={() => setTableShading('#f4cccc')} className="w-6 h-5 bg-[#f4cccc] border" title="Red" />
                  <button onClick={() => setTableShading('#efefef')} className="w-6 h-5 bg-[#efefef] border" title="Gray" />
                  <button onClick={() => setTableShading('transparent')} className="flex-1 py-0.5 bg-gray-100 text-[10px]">Clear</button>
                </div>
                <button onClick={() => sortTable(true)} className="w-full py-1 bg-gray-100 hover:bg-blue-100 text-[10px] font-semibold rounded mt-1">Sort Table A-Z</button>
              </div>
            </>
          )}
        </div>
      </RibbonGroup>

      {/* 3. Illustrations Group */}
      <RibbonGroup title="Illustrations">
        <div className="relative">
          <RibbonLargeButton
            icon={<PictureIcon size={28} />}
            label="Picture"
            hasDropdown
            onClick={() => setPictureMenuOpen(!pictureMenuOpen)}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          {pictureMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setPictureMenuOpen(false)} />
              <div className="absolute top-[72px] left-0 bg-white border border-[#abc1db] shadow-xl rounded-[2px] p-2 z-50 text-[11px] w-[200px]">
                <div
                  onClick={() => { fileInputRef.current?.click(); setPictureMenuOpen(false); }}
                  className="px-2 py-1.5 hover:bg-[#3399ff] hover:text-white cursor-pointer font-bold rounded flex items-center gap-2"
                >
                  <span>📁</span> Insert Picture from File...
                </div>
                <div className="border-t my-1" />
                <div className="text-[10px] text-gray-500 font-semibold mb-1">Picture Formatting</div>
                <div onClick={() => formatSelectedImage('rotate')} className="px-2 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">Rotate 90°</div>
                <div onClick={() => formatSelectedImage('flipH')} className="px-2 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">Flip Horizontal</div>
                <div onClick={() => formatSelectedImage('flipV')} className="px-2 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">Flip Vertical</div>
                <div onClick={() => formatSelectedImage('wrap', 'square')} className="px-2 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">Text Wrap: Square</div>
                <div onClick={() => formatSelectedImage('wrap', 'top-bottom')} className="px-2 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">Text Wrap: Top & Bottom</div>
                <div onClick={() => formatSelectedImage('border', '3px solid #365f91')} className="px-2 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">Picture Border (Blue)</div>
                <div onClick={() => formatSelectedImage('resize', '50%')} className="px-2 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer">Resize 50%</div>
                <div onClick={() => formatSelectedImage('reset')} className="px-2 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer text-gray-700 font-semibold border-t mt-1">Reset Picture</div>
              </div>
            </>
          )}
        </div>

        {/* Shapes */}
        <div className="relative">
          <RibbonLargeButton
            icon={<ShapesIcon size={28} />}
            label="Shapes"
            hasDropdown
            onClick={() => setShapesMenuOpen(!shapesMenuOpen)}
          />
          {shapesMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShapesMenuOpen(false)} />
              <div className="absolute top-[72px] left-0 bg-white border border-[#abc1db] shadow-xl rounded-[2px] p-2 z-50 text-[11px] w-[240px] max-h-[340px] overflow-y-auto">
                <div className="text-[10px] font-semibold text-gray-500 mb-1">Rectangles</div>
                <div className="grid grid-cols-4 gap-1 mb-2">
                  <button onClick={() => { insertShape('rectangle'); setShapesMenuOpen(false); }} className="h-7 bg-blue-500 border border-blue-700 hover:opacity-80 rounded-[1px]" title="Rectangle" />
                  <button onClick={() => { insertShape('rounded-rect'); setShapesMenuOpen(false); }} className="h-7 bg-blue-500 border border-blue-700 rounded-md hover:opacity-80" title="Rounded Rectangle" />
                  <button onClick={() => { insertShape('snip-corner'); setShapesMenuOpen(false); }} className="h-7 bg-blue-500 border border-blue-700 rounded-tr-xl hover:opacity-80" title="Snip Single Corner" />
                </div>
                <div className="text-[10px] font-semibold text-gray-500 mb-1">Basic Shapes</div>
                <div className="grid grid-cols-4 gap-1 mb-2">
                  <button onClick={() => { insertShape('oval'); setShapesMenuOpen(false); }} className="h-7 bg-red-500 border border-red-700 rounded-full hover:opacity-80" title="Oval" />
                  <button onClick={() => { insertShape('triangle'); setShapesMenuOpen(false); }} className="h-7 flex items-center justify-center font-bold text-gray-800 border hover:bg-gray-100" title="Triangle">▲</button>
                  <button onClick={() => { insertShape('diamond'); setShapesMenuOpen(false); }} className="h-7 flex items-center justify-center font-bold text-gray-800 border hover:bg-gray-100" title="Diamond">◆</button>
                  <button onClick={() => { insertShape('star'); setShapesMenuOpen(false); }} className="h-7 flex items-center justify-center text-amber-500 border hover:bg-gray-100" title="5-Point Star">★</button>
                </div>
                <div className="text-[10px] font-semibold text-gray-500 mb-1">Block Arrows</div>
                <div className="grid grid-cols-4 gap-1 mb-2">
                  <button onClick={() => { insertShape('arrow-right'); setShapesMenuOpen(false); }} className="h-7 flex items-center justify-center font-bold text-green-700 border hover:bg-gray-100" title="Right Arrow">➔</button>
                  <button onClick={() => { insertShape('arrow-left'); setShapesMenuOpen(false); }} className="h-7 flex items-center justify-center font-bold text-green-700 border hover:bg-gray-100" title="Left Arrow">←</button>
                  <button onClick={() => { insertShape('arrow-up'); setShapesMenuOpen(false); }} className="h-7 flex items-center justify-center font-bold text-green-700 border hover:bg-gray-100" title="Up Arrow">↑</button>
                  <button onClick={() => { insertShape('arrow-down'); setShapesMenuOpen(false); }} className="h-7 flex items-center justify-center font-bold text-green-700 border hover:bg-gray-100" title="Down Arrow">↓</button>
                </div>
                <div className="text-[10px] font-semibold text-gray-500 mb-1 border-t pt-1">Shape Tools</div>
                <div className="flex flex-col gap-1">
                  <button onClick={() => formatSelectedShape('addText')} className="px-2 py-1 text-left bg-gray-100 hover:bg-blue-100 rounded">Add Text to Shape</button>
                  <button onClick={() => formatSelectedShape('fill', '#9bbb59')} className="px-2 py-1 text-left bg-gray-100 hover:bg-blue-100 rounded">Fill: Green</button>
                  <button onClick={() => formatSelectedShape('fill', '#c0504d')} className="px-2 py-1 text-left bg-gray-100 hover:bg-blue-100 rounded">Fill: Red</button>
                  <button onClick={() => formatSelectedShape('rotate', 45)} className="px-2 py-1 text-left bg-gray-100 hover:bg-blue-100 rounded">Rotate Shape 45°</button>
                </div>
              </div>
            </>
          )}
        </div>
      </RibbonGroup>

      {/* 4. Links Group */}
      <RibbonGroup title="Links">
        <div className="flex flex-col justify-center gap-1 h-[68px]">
          <RibbonSmallButton icon={<HyperlinkIcon size={14} />} label="Hyperlink" onClick={() => onOpenDialog('hyperlink')} />
          <RibbonSmallButton
            icon={<span className="text-[10px] text-blue-600 font-bold">★</span>}
            label="Bookmark"
            onClick={() => {
              const name = window.prompt('Enter Bookmark name:');
              if (name) insertBookmark(name);
            }}
          />
          <RibbonSmallButton
            icon={<span className="text-[10px] text-gray-700">☍</span>}
            label="Cross-reference"
            onClick={() => {
              const ref = window.prompt('Enter Heading or Bookmark to reference:');
              if (ref) insertCrossReference(ref);
            }}
          />
        </div>
      </RibbonGroup>

      {/* 5. Header & Footer Group */}
      <RibbonGroup title="Header & Footer">
        <div className="relative">
          <RibbonLargeButton
            icon={<HeaderIcon size={28} />}
            label="Header"
            hasDropdown
            onClick={() => setHeaderMenuOpen(!headerMenuOpen)}
          />
          {headerMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setHeaderMenuOpen(false)} />
              <div className="absolute top-[72px] left-0 bg-white border border-[#abc1db] shadow-xl rounded-[2px] p-2 z-50 text-[11px] w-[200px]">
                <div
                  onClick={() => {
                    const text = window.prompt('Edit Header text:', headerText);
                    if (text !== null) setHeaderText(text);
                    setHeaderMenuOpen(false);
                  }}
                  className="px-2 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer font-medium"
                >
                  Edit Header...
                </div>
                <div
                  onClick={() => { setDifferentFirstPage(!differentFirstPage); setHeaderMenuOpen(false); }}
                  className="px-2 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex justify-between"
                >
                  <span>Different First Page</span>
                  {differentFirstPage && <span>✓</span>}
                </div>
                <div
                  onClick={() => { setDifferentOddEven(!differentOddEven); setHeaderMenuOpen(false); }}
                  className="px-2 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex justify-between"
                >
                  <span>Different Odd & Even</span>
                  {differentOddEven && <span>✓</span>}
                </div>
                <div
                  onClick={() => { setHeaderText(''); setHeaderMenuOpen(false); }}
                  className="px-2 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer text-red-600 border-t mt-1"
                >
                  Remove Header
                </div>
              </div>
            </>
          )}
        </div>

        <RibbonLargeButton
          icon={<FooterIcon size={28} />}
          label="Footer"
          hasDropdown
          onClick={() => {
            const text = window.prompt('Edit Footer text:', footerText);
            if (text !== null) setFooterText(text);
          }}
        />

        {/* Page Number */}
        <div className="relative">
          <RibbonLargeButton
            icon={<PageNumberIcon size={28} />}
            label={'Page\nNumber'}
            hasDropdown
            onClick={() => setPageNumberMenuOpen(!pageNumberMenuOpen)}
          />
          {pageNumberMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setPageNumberMenuOpen(false)} />
              <div className="absolute top-[72px] left-0 bg-white border border-[#abc1db] shadow-xl rounded-[2px] py-1 z-50 text-[11px] w-[180px]">
                <div
                  onClick={() => { setPageNumberPosition('top'); setPageNumberMenuOpen(false); }}
                  className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex justify-between"
                >
                  <span>Top of Page (Header)</span>
                  {pageNumberPosition === 'top' && <span>✓</span>}
                </div>
                <div
                  onClick={() => { setPageNumberPosition('bottom'); setPageNumberMenuOpen(false); }}
                  className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex justify-between"
                >
                  <span>Bottom of Page (Footer)</span>
                  {pageNumberPosition === 'bottom' && <span>✓</span>}
                </div>
                <div
                  onClick={() => { setPageNumberFormat('1, 2, 3'); setPageNumberMenuOpen(false); }}
                  className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer border-t"
                >
                  Format: 1, 2, 3
                </div>
                <div
                  onClick={() => { setPageNumberFormat('i, ii, iii'); setPageNumberMenuOpen(false); }}
                  className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer"
                >
                  Format: i, ii, iii
                </div>
                <div
                  onClick={() => { setPageNumberPosition('none'); setPageNumberMenuOpen(false); }}
                  className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer text-red-600 border-t mt-1"
                >
                  Remove Page Numbers
                </div>
              </div>
            </>
          )}
        </div>
      </RibbonGroup>

      {/* 6. Text Group */}
      <RibbonGroup title="Text">
        <RibbonLargeButton icon={<TextBoxIcon size={28} />} label={'Text\nBox'} hasDropdown onClick={insertTextBox} />
        <div className="flex flex-col justify-center gap-1.5 h-[68px]">
          <RibbonSmallButton icon={<span className="text-[11px]">📅</span>} label="Date & Time" onClick={insertDateTime} />
        </div>
      </RibbonGroup>

      {/* 7. Symbols Group */}
      <RibbonGroup title="Symbols">
        <RibbonLargeButton icon={<EquationIcon size={28} />} label="Equation" hasDropdown onClick={() => onOpenDialog('equation')} />
        <RibbonLargeButton icon={<SymbolIcon size={28} />} label="Symbol" hasDropdown onClick={() => onOpenDialog('symbol')} />
      </RibbonGroup>

      {/* 8. Document References (MOVED FROM REFERENCES TAB) */}
      <RibbonGroup title="References">
        <div className="relative">
          <RibbonLargeButton
            icon={<TableOfContentsIcon size={28} />}
            label={'Table of\nContents'}
            hasDropdown
            onClick={() => setTocMenuOpen(!tocMenuOpen)}
          />
          {tocMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setTocMenuOpen(false)} />
              <div className="absolute top-[72px] left-0 bg-white border border-[#abc1db] shadow-xl rounded-[2px] py-1 z-50 text-[11px] w-[200px]">
                <div
                  onClick={() => { insertTableOfContents(); setTocMenuOpen(false); }}
                  className="px-3 py-1.5 hover:bg-[#3399ff] hover:text-white cursor-pointer font-bold"
                >
                  Automatic Table 1
                </div>
                <div
                  onClick={() => { updateTableOfContents(); setTocMenuOpen(false); }}
                  className="px-3 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer flex items-center gap-2 border-t"
                >
                  <span>↻</span> Update Table of Contents
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col justify-center gap-1 h-[68px]">
          <RibbonSmallButton
            icon={<FootnoteIcon size={14} />}
            label="Insert Footnote"
            onClick={() => {
              const text = window.prompt('Enter footnote text:', 'Footnote reference note');
              if (text) insertFootnote(text);
            }}
          />
          <RibbonSmallButton
            icon={<span className="text-[10px] font-bold text-gray-700">ABi</span>}
            label="Insert Endnote"
            onClick={() => {
              const text = window.prompt('Enter endnote text:', 'Endnote reference note');
              if (text) insertFootnote(text, true);
            }}
          />
          <RibbonSmallButton
            icon={<span className="text-[10px]">📖</span>}
            label="Insert Citation"
            onClick={() => addCitation({ id: Date.now().toString(), author: 'Smith, J.', title: 'Research Review', year: '2025', sourceType: 'Book' })}
          />
        </div>

        <div className="flex flex-col justify-center gap-1.5 h-[68px] ml-1">
          <RibbonSmallButton
            icon={<span className="text-[11px]">📑</span>}
            label="Bibliography"
            hasDropdown
            onClick={insertBibliography}
          />
          <div className="text-[9px] text-gray-500 font-sans">
            Style: <span className="font-bold text-[#1e395b]">{citationStyle}</span>
          </div>
        </div>
      </RibbonGroup>

      {/* 9. Comments Group (MOVED FROM REVIEW TAB) */}
      <RibbonGroup title="Comments">
        <RibbonLargeButton
          icon={<span className="text-[24px]">💬</span>}
          label={'New\nComment'}
          onClick={() => {
            const text = window.prompt('Enter comment:', 'Comment on selected text.');
            if (text) addComment(text);
          }}
        />
        <div className="flex flex-col justify-center gap-1 h-[68px]">
          <RibbonSmallButton icon={<span className="text-[10px]">←</span>} label="Previous" onClick={() => navigateToComment('prev')} />
          <RibbonSmallButton icon={<span className="text-[10px]">→</span>} label="Next" onClick={() => navigateToComment('next')} />
          <RibbonSmallButton
            icon={<span className="text-[10px] text-red-500">✕</span>}
            label="Delete"
            onClick={() => {
              if (activeCommentId) deleteComment(activeCommentId);
              else if (comments.length > 0) deleteComment(comments[0].id);
            }}
          />
        </div>
      </RibbonGroup>

      {/* 10. Tracking & Proofing Group (MOVED FROM REVIEW TAB) */}
      <RibbonGroup title="Tracking & Proofing">
        <RibbonLargeButton
          icon={<TrackChangesIcon size={28} />}
          label={'Track\nChanges'}
          hasDropdown
          active={trackChanges}
          onClick={() => setTrackChanges(!trackChanges)}
        />
        <div className="flex flex-col justify-center gap-1 h-[68px]">
          <RibbonSmallButton
            icon={<span className="text-[10px] text-green-600 font-bold">✓</span>}
            label="Accept Change"
            onClick={() => {
              if (trackedChanges.length > 0) acceptChange(trackedChanges[0].id);
            }}
          />
          <RibbonSmallButton
            icon={<span className="text-[10px] text-red-600 font-bold">✗</span>}
            label="Reject Change"
            onClick={() => {
              if (trackedChanges.length > 0) rejectChange(trackedChanges[0].id);
            }}
          />
          <RibbonSmallButton
            icon={<span className="text-[10px] font-bold text-gray-700">123</span>}
            label="Word Count"
            onClick={() => onOpenDialog('wordCount')}
          />
        </div>
        <RibbonLargeButton
          icon={<SpellingGrammarIcon size={28} />}
          label={'Spelling &\nGrammar'}
          onClick={() => onOpenDialog('spelling')}
        />
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
