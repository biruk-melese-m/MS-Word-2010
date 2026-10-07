import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Word 2010 App Icon ('W' on dark blue/gold document)
export const WordAppIcon: React.FC<IconProps> = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="3" width="20" height="18" rx="2" fill="#2b579a" stroke="#183b6e" strokeWidth="1" />
    <path d="M5 6H19V18H5V6Z" fill="#1e3e70" />
    {/* Page fold & 'W' */}
    <rect x="4" y="5" width="16" height="14" fill="#295697" />
    <text x="12" y="16" fill="#ffffff" fontSize="13" fontWeight="bold" fontFamily="Segoe UI, Arial, sans-serif" textAnchor="middle">W</text>
    <rect x="2" y="3" width="20" height="2" fill="#467bc4" />
  </svg>
);

// Floppy disk Save icon
export const SaveIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M2 1.5C2 1.22386 2.22386 1 2.5 1H11.5L14 3.5V14.5C14 14.7761 13.7761 15 13.5 15H2.5C2.22386 15 2 14.7761 2 14.5V1.5Z" fill="#3a6ea5" stroke="#1e3f66" strokeWidth="1" />
    <rect x="4" y="1" width="7" height="5" fill="#f0f0f0" stroke="#777" strokeWidth="0.5" />
    <rect x="8" y="2" width="2" height="3" fill="#2c5282" />
    <rect x="3.5" y="8" width="9" height="6" rx="0.5" fill="#e2e8f0" stroke="#64748b" strokeWidth="0.5" />
    <line x1="5" y1="10" x2="11" y2="10" stroke="#334155" strokeWidth="0.8" />
    <line x1="5" y1="12" x2="11" y2="12" stroke="#334155" strokeWidth="0.8" />
  </svg>
);

// Curved Undo icon
export const UndoIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M6 3.5L2.5 7L6 10.5V8C9.5 8 12.5 9.5 13.5 13C13.5 9.5 11 5.5 6 5.5V3.5Z" fill="#3b72b8" stroke="#1f4477" strokeWidth="0.8" strokeLinejoin="round" />
  </svg>
);

// Curved Redo icon
export const RedoIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M10 3.5L13.5 7L10 10.5V8C6.5 8 3.5 9.5 2.5 13C2.5 9.5 5 5.5 10 5.5V3.5Z" fill="#3b72b8" stroke="#1f4477" strokeWidth="0.8" strokeLinejoin="round" />
  </svg>
);

// Quick Access customize arrow
export const QatDropdownIcon: React.FC<IconProps> = ({ size = 10, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 8 8" fill="none" className={className}>
    <line x1="1" y1="1" x2="7" y2="1" stroke="#3c5270" strokeWidth="1" strokeLinecap="round" />
    <path d="M1.5 3L4 6L6.5 3H1.5Z" fill="#3c5270" />
  </svg>
);

// Dialog box launcher (small square with diagonal arrow)
export const DialogLauncherIcon: React.FC<IconProps> = ({ size = 12, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none" className={className}>
    <path d="M1 9H9V1" stroke="#48607f" strokeWidth="1" />
    <path d="M2.5 7.5L8 2M8 2H5M8 2V5" stroke="#48607f" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Paste clipboard icon (large)
export const PasteIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    {/* Clipboard back */}
    <rect x="5" y="5" width="20" height="25" rx="1.5" fill="#e8ba4f" stroke="#9e731b" strokeWidth="1" />
    <rect x="7" y="7" width="16" height="21" rx="1" fill="#fffbe8" />
    {/* Clip top */}
    <rect x="10" y="2" width="10" height="5" rx="1" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
    <circle cx="15" cy="4.5" r="1.5" fill="#f8fafc" />
    {/* White Paper pasting over */}
    <path d="M11 11H25V29H11V11Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
    <line x1="14" y1="15" x2="22" y2="15" stroke="#3b82f6" strokeWidth="1.2" />
    <line x1="14" y1="18" x2="22" y2="18" stroke="#64748b" strokeWidth="1" />
    <line x1="14" y1="21" x2="22" y2="21" stroke="#64748b" strokeWidth="1" />
    <line x1="14" y1="24" x2="19" y2="24" stroke="#64748b" strokeWidth="1" />
    {/* Gold shimmer / yellow paste folder bottom */}
    <path d="M10 25H21L21 28H10Z" fill="#f59e0b" opacity="0.3" />
  </svg>
);

// Cut scissors icon
export const CutIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <circle cx="4.5" cy="11.5" r="2" fill="none" stroke="#2563eb" strokeWidth="1.2" />
    <circle cx="11.5" cy="11.5" r="2" fill="none" stroke="#2563eb" strokeWidth="1.2" />
    <line x1="5.5" y1="10" x2="11.5" y2="2.5" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="10.5" y1="10" x2="4.5" y2="2.5" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="8" cy="6.5" r="0.75" fill="#1e293b" />
  </svg>
);

// Copy dual documents icon
export const CopyIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <rect x="5" y="2" width="9" height="11" rx="0.5" fill="#f8fafc" stroke="#3b82f6" strokeWidth="1" />
    <rect x="2" y="5" width="9" height="11" rx="0.5" fill="#ffffff" stroke="#2563eb" strokeWidth="1" />
    <line x1="4" y1="8" x2="9" y2="8" stroke="#94a3b8" strokeWidth="0.8" />
    <line x1="4" y1="10.5" x2="9" y2="10.5" stroke="#94a3b8" strokeWidth="0.8" />
    <line x1="4" y1="13" x2="7" y2="13" stroke="#94a3b8" strokeWidth="0.8" />
  </svg>
);

// Format Painter icon
export const FormatPainterIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <rect x="3" y="1" width="9" height="5" rx="1" fill="#eab308" stroke="#ca8a04" strokeWidth="0.8" />
    <rect x="4" y="6" width="7" height="3" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.6" />
    <path d="M7 9V14.5C7 14.7761 7.22386 15 7.5 15H8.5C8.77614 15 9 14.7761 9 14.5V9H7Z" fill="#b45309" stroke="#78350f" strokeWidth="0.6" />
    <path d="M4 6C4 7 5 7.5 5 8" stroke="#eab308" strokeWidth="0.8" strokeLinecap="round" />
  </svg>
);

// Bold 'B' icon
export const BoldIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <text x="3" y="11.5" fill="#1e293b" fontSize="13" fontWeight="900" fontFamily="Arial, sans-serif">B</text>
  </svg>
);

// Italic 'I' icon
export const ItalicIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <text x="3.5" y="11.5" fill="#1e293b" fontSize="13" fontWeight="bold" fontStyle="italic" fontFamily="Georgia, serif">I</text>
  </svg>
);

// Underline 'U' icon
export const UnderlineIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <text x="3" y="10" fill="#1e293b" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif">U</text>
    <line x1="2.5" y1="12" x2="11.5" y2="12" stroke="#1e293b" strokeWidth="1.2" />
  </svg>
);

// Strikethrough icon
export const StrikethroughIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 14" fill="none" className={className}>
    <text x="1" y="10.5" fill="#1e293b" fontSize="10" fontWeight="bold" fontFamily="Arial, sans-serif">abc</text>
    <line x1="0.5" y1="7" x2="15.5" y2="7" stroke="#ef4444" strokeWidth="1.2" />
  </svg>
);

// Subscript icon x₂
export const SubscriptIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <text x="1.5" y="10" fill="#1e293b" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif">x</text>
    <text x="8" y="13" fill="#1e293b" fontSize="7" fontWeight="bold" fontFamily="Arial, sans-serif">2</text>
  </svg>
);

// Superscript icon x²
export const SuperscriptIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <text x="1.5" y="12" fill="#1e293b" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif">x</text>
    <text x="8" y="6" fill="#1e293b" fontSize="7" fontWeight="bold" fontFamily="Arial, sans-serif">2</text>
  </svg>
);

// Text Effects / Typography glow 'A'
export const TextEffectsIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <text x="2" y="11.5" fill="#3b82f6" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif" stroke="#60a5fa" strokeWidth="0.5">A</text>
    <circle cx="10" cy="4" r="1.5" fill="#38bdf8" />
  </svg>
);

// Text Highlight Color icon
export const TextHighlightIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <text x="1" y="9.5" fill="#1e293b" fontSize="9" fontWeight="bold" fontFamily="Arial, sans-serif">ab</text>
    <rect x="0.5" y="10.5" width="13" height="3" fill="#facc15" stroke="#ca8a04" strokeWidth="0.5" rx="0.5" />
  </svg>
);

// Font Color 'A' with color bar
export const FontColorIcon: React.FC<IconProps & { barColor?: string }> = ({ size = 14, barColor = '#ef4444', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <text x="3" y="9.5" fill="#1e293b" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif">A</text>
    <rect x="1" y="10.5" width="12" height="3" fill={barColor} rx="0.5" />
  </svg>
);

// Clear Formatting icon
export const ClearFormattingIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <text x="1" y="11" fill="#1e293b" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif">A</text>
    <path d="M8 8L13 13M13 8L8 13" stroke="#dc2626" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

// Grow font A^
export const GrowFontIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <text x="1" y="11.5" fill="#1e293b" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif">A</text>
    <path d="M10 3L8 6H12L10 3Z" fill="#15803d" />
  </svg>
);

// Shrink font Av
export const ShrinkFontIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <text x="1" y="11.5" fill="#1e293b" fontSize="9" fontWeight="bold" fontFamily="Arial, sans-serif">A</text>
    <path d="M10 7L8 4H12L10 7Z" fill="#15803d" />
  </svg>
);

// Align Left icon
export const AlignLeftIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <line x1="1" y1="2.5" x2="13" y2="2.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="1" y1="5.5" x2="8.5" y2="5.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="1" y1="8.5" x2="13" y2="8.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="1" y1="11.5" x2="7.5" y2="11.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Align Center icon
export const AlignCenterIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <line x1="1" y1="2.5" x2="13" y2="2.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="3" y1="5.5" x2="11" y2="5.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="1" y1="8.5" x2="13" y2="8.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="3.5" y1="11.5" x2="10.5" y2="11.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Align Right icon
export const AlignRightIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <line x1="1" y1="2.5" x2="13" y2="2.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="5.5" y1="5.5" x2="13" y2="5.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="1" y1="8.5" x2="13" y2="8.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="6.5" y1="11.5" x2="13" y2="11.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Align Justify icon
export const AlignJustifyIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <line x1="1" y1="2.5" x2="13" y2="2.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="1" y1="5.5" x2="13" y2="5.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="1" y1="8.5" x2="13" y2="8.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="1" y1="11.5" x2="13" y2="11.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Line & Paragraph Spacing icon
export const LineSpacingIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <path d="M2 4.5L3.5 2M3.5 2L5 4.5M3.5 2V12M3.5 12L2 9.5M3.5 12L5 9.5" stroke="#2563eb" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="7" y1="3" x2="13" y2="3" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="7" y1="7" x2="13" y2="7" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="7" y1="11" x2="13" y2="11" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// Bullets icon
export const BulletsIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <circle cx="2.5" cy="3" r="1.3" fill="#2563eb" />
    <circle cx="2.5" cy="7" r="1.3" fill="#2563eb" />
    <circle cx="2.5" cy="11" r="1.3" fill="#2563eb" />
    <line x1="5.5" y1="3" x2="13" y2="3" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="5.5" y1="7" x2="13" y2="7" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="5.5" y1="11" x2="13" y2="11" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// Numbering icon
export const NumberingIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <text x="1" y="4" fill="#2563eb" fontSize="5" fontWeight="bold" fontFamily="Arial">1</text>
    <text x="1" y="8" fill="#2563eb" fontSize="5" fontWeight="bold" fontFamily="Arial">2</text>
    <text x="1" y="12" fill="#2563eb" fontSize="5" fontWeight="bold" fontFamily="Arial">3</text>
    <line x1="5.5" y1="3" x2="13" y2="3" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="5.5" y1="7" x2="13" y2="7" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="5.5" y1="11" x2="13" y2="11" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// Multilevel List icon
export const MultilevelListIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <text x="1" y="4" fill="#2563eb" fontSize="5" fontWeight="bold">1</text>
    <text x="2.5" y="8" fill="#2563eb" fontSize="4.5" fontWeight="bold">a</text>
    <text x="4" y="12" fill="#2563eb" fontSize="4.5" fontWeight="bold">i</text>
    <line x1="5.5" y1="3" x2="13" y2="3" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="7" y1="7" x2="13" y2="7" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="8.5" y1="11" x2="13" y2="11" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// Decrease Indent icon
export const DecreaseIndentIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <path d="M4 7L1 5V9L4 7Z" fill="#2563eb" />
    <line x1="5" y1="3" x2="13" y2="3" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="5" y1="6" x2="13" y2="6" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="5" y1="9" x2="13" y2="9" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="5" y1="12" x2="13" y2="12" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// Increase Indent icon
export const IncreaseIndentIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <path d="M1 5L4 7L1 9V5Z" fill="#2563eb" />
    <line x1="5" y1="3" x2="13" y2="3" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="5" y1="6" x2="13" y2="6" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="5" y1="9" x2="13" y2="9" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="5" y1="12" x2="13" y2="12" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// Shading / Paint bucket icon
export const ShadingIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <path d="M3 5L8 1.5L11 6L6 9.5L3 5Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="0.8" />
    <path d="M10 6L12 9C12.5 9.8 11.5 11 10.5 10.5C9.5 10 10 7.5 10 6Z" fill="#60a5fa" />
    <rect x="1" y="11.5" width="12" height="2" fill="#3b82f6" rx="0.5" />
  </svg>
);

// Borders / Table bottom border icon
export const BordersIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <rect x="2" y="2" width="10" height="10" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="1.5 1.5" fill="none" />
    <line x1="2" y1="12" x2="12" y2="12" stroke="#1e293b" strokeWidth="1.8" />
  </svg>
);

// Sort A-Z icon
export const SortIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <text x="1" y="6" fill="#1e293b" fontSize="5" fontWeight="bold">A</text>
    <text x="1" y="12" fill="#1e293b" fontSize="5" fontWeight="bold">Z</text>
    <path d="M8 2L11 5H9V12H7V5H5L8 2Z" fill="#2563eb" />
  </svg>
);

// Show / Hide Paragraph symbol ¶
export const ShowHideIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <text x="2" y="11" fill="#1e293b" fontSize="13" fontWeight="bold" fontFamily="Segoe UI, Arial">¶</text>
  </svg>
);

// Find binoculars icon
export const FindIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <circle cx="5.5" cy="6.5" r="3" fill="#93c5fd" stroke="#2563eb" strokeWidth="1.2" />
    <circle cx="10.5" cy="6.5" r="3" fill="#93c5fd" stroke="#2563eb" strokeWidth="1.2" />
    <line x1="7.5" y1="5.5" x2="8.5" y2="5.5" stroke="#1e40af" strokeWidth="1.2" />
    <path d="M4 9.5L2 14" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 9.5L14 14" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Replace icon
export const ReplaceIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <text x="1" y="8" fill="#1e293b" fontSize="7" fontWeight="bold">b</text>
    <text x="8" y="14" fill="#2563eb" fontSize="7" fontWeight="bold">c</text>
    <path d="M4 11C4 9 7 9 7 9M7 9L5 7M7 9L5 11" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Select pointer icon
export const SelectIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M3 2L11 8L7.5 9L10 14L8 15L5.5 10L3 12V2Z" fill="#ffffff" stroke="#1e293b" strokeWidth="1" strokeLinejoin="round" />
  </svg>
);

// Change Styles icon
export const ChangeStylesIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <text x="2" y="18" fill="#2563eb" fontSize="16" fontWeight="bold" fontFamily="Georgia, serif">A</text>
    <text x="13" y="24" fill="#ea580c" fontSize="14" fontWeight="bold" fontFamily="Segoe UI, sans-serif">A</text>
    <path d="M18 4L22 8L18 12M21 8H10" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Small down arrow for ribbon split buttons
export const ArrowDownIcon: React.FC<IconProps> = ({ size = 8, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 8 5" fill="none" className={className}>
    <path d="M1 1L4 4L7 1" stroke="#48607f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

// Insert Page icons
export const CoverPageIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="5" y="3" width="18" height="22" rx="1" fill="#ffffff" stroke="#64748b" strokeWidth="1" />
    <rect x="5" y="3" width="18" height="8" fill="#2563eb" />
    <rect x="8" y="14" width="12" height="2" fill="#94a3b8" />
    <rect x="8" y="18" width="8" height="1.5" fill="#cbd5e1" />
  </svg>
);

export const BlankPageIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <rect x="3" y="1.5" width="10" height="13" rx="0.5" fill="#ffffff" stroke="#64748b" strokeWidth="1" />
    <line x1="10" y1="1.5" x2="13" y2="4.5" stroke="#64748b" strokeWidth="1" />
  </svg>
);

export const PageBreakIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <rect x="3" y="1" width="10" height="6" fill="#ffffff" stroke="#64748b" strokeWidth="0.8" />
    <line x1="1" y1="8" x2="15" y2="8" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
    <rect x="3" y="9" width="10" height="6" fill="#ffffff" stroke="#64748b" strokeWidth="0.8" />
  </svg>
);

// Table icon
export const TableIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="4" y="5" width="20" height="18" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
    <line x1="4" y1="11" x2="24" y2="11" stroke="#2563eb" strokeWidth="1" />
    <line x1="4" y1="17" x2="24" y2="17" stroke="#2563eb" strokeWidth="1" />
    <line x1="10.5" y1="5" x2="10.5" y2="23" stroke="#2563eb" strokeWidth="1" />
    <line x1="17.5" y1="5" x2="17.5" y2="23" stroke="#2563eb" strokeWidth="1" />
    <rect x="4" y="5" width="20" height="6" fill="#bfdbfe" opacity="0.6" />
  </svg>
);

// Picture icon
export const PictureIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="4" y="4" width="20" height="20" rx="1.5" fill="#f8fafc" stroke="#3b82f6" strokeWidth="1.2" />
    <circle cx="10" cy="10" r="2.5" fill="#f59e0b" />
    <path d="M5 22L12 14L17 19L20 16L23 22H5Z" fill="#10b981" />
  </svg>
);

// Clip Art icon
export const ClipArtIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="4" y="4" width="20" height="20" rx="1" fill="#ecfdf5" stroke="#059669" strokeWidth="1" />
    <path d="M8 12C8 9 12 7 15 9C18 11 15 15 12 15M12 18H12.01" stroke="#047857" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Shapes icon
export const ShapesIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <circle cx="9" cy="11" r="5" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="1" />
    <rect x="12" y="12" width="10" height="10" fill="#f87171" stroke="#b91c1c" strokeWidth="1" />
    <path d="M19 6L23 13H15L19 6Z" fill="#facc15" stroke="#b45309" strokeWidth="1" />
  </svg>
);

// SmartArt icon
export const SmartArtIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="3" y="10" width="6" height="8" fill="#3b82f6" rx="1" />
    <rect x="11" y="10" width="6" height="8" fill="#10b981" rx="1" />
    <rect x="19" y="10" width="6" height="8" fill="#f59e0b" rx="1" />
    <path d="M9 14H11M17 14H19" stroke="#64748b" strokeWidth="1.5" />
    <path d="M7 6L14 3L21 6" stroke="#2563eb" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// Chart icon
export const ChartIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="5" y="14" width="4" height="9" fill="#3b82f6" />
    <rect x="12" y="8" width="4" height="15" fill="#ef4444" />
    <rect x="19" y="11" width="4" height="12" fill="#10b981" />
    <line x1="3" y1="23" x2="25" y2="23" stroke="#475569" strokeWidth="1.5" />
  </svg>
);

// Screenshot icon
export const ScreenshotIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="4" y="5" width="20" height="16" rx="2" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.2" />
    <path d="M10 24H18M14 21V24" stroke="#64748b" strokeWidth="1.5" />
    <circle cx="14" cy="13" r="3" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
  </svg>
);

// Hyperlink icon
export const HyperlinkIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <circle cx="8" cy="8" r="6" stroke="#2563eb" strokeWidth="1" />
    <line x1="2" y1="8" x2="14" y2="8" stroke="#2563eb" strokeWidth="0.8" />
    <ellipse cx="8" cy="8" rx="3" ry="6" stroke="#2563eb" strokeWidth="0.8" fill="none" />
    <path d="M5 11L11 5" stroke="#f59e0b" strokeWidth="1.5" />
  </svg>
);

// Header & Footer icons
export const HeaderIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="5" y="4" width="18" height="20" fill="#ffffff" stroke="#64748b" strokeWidth="1" />
    <rect x="7" y="6" width="14" height="4" fill="#3b82f6" rx="0.5" />
    <line x1="7" y1="14" x2="17" y2="14" stroke="#cbd5e1" strokeWidth="1" />
    <line x1="7" y1="17" x2="15" y2="17" stroke="#cbd5e1" strokeWidth="1" />
  </svg>
);

export const FooterIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="5" y="4" width="18" height="20" fill="#ffffff" stroke="#64748b" strokeWidth="1" />
    <line x1="7" y1="8" x2="17" y2="8" stroke="#cbd5e1" strokeWidth="1" />
    <line x1="7" y1="11" x2="15" y2="11" stroke="#cbd5e1" strokeWidth="1" />
    <rect x="7" y="18" width="14" height="4" fill="#3b82f6" rx="0.5" />
  </svg>
);

export const PageNumberIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="5" y="4" width="18" height="20" fill="#ffffff" stroke="#64748b" strokeWidth="1" />
    <circle cx="14" cy="20" r="3" fill="#ef4444" />
    <text x="14" y="22" fill="#ffffff" fontSize="5" fontWeight="bold" textAnchor="middle">#</text>
  </svg>
);

// Text Box icon
export const TextBoxIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="4" y="5" width="20" height="18" rx="1" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="2 1.5" />
    <text x="7" y="18" fill="#1e293b" fontSize="14" fontWeight="bold" fontFamily="Arial">A</text>
    <line x1="14" y1="10" x2="20" y2="10" stroke="#94a3b8" strokeWidth="1" />
    <line x1="14" y1="14" x2="20" y2="14" stroke="#94a3b8" strokeWidth="1" />
    <line x1="14" y1="18" x2="18" y2="18" stroke="#94a3b8" strokeWidth="1" />
  </svg>
);

// WordArt icon
export const WordArtIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <text x="6" y="22" fill="#2563eb" fontSize="22" fontWeight="900" fontFamily="Impact, Arial Black" stroke="#1d4ed8" strokeWidth="0.8" transform="rotate(-12 6 22)">A</text>
  </svg>
);

// Equation icon π
export const EquationIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <text x="14" y="22" fill="#2563eb" fontSize="22" fontWeight="bold" fontFamily="Times New Roman, serif" textAnchor="middle">π</text>
  </svg>
);

// Symbol icon Ω
export const SymbolIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <text x="14" y="22" fill="#2563eb" fontSize="20" fontWeight="bold" fontFamily="Times New Roman, serif" textAnchor="middle">Ω</text>
  </svg>
);

// Page Layout icons
export const ThemesIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="4" y="4" width="20" height="20" rx="2" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
    <text x="7" y="19" fill="#2563eb" fontSize="16" fontWeight="bold" fontFamily="Georgia">A</text>
    <rect x="15" y="8" width="6" height="4" fill="#ef4444" rx="0.5" />
    <rect x="15" y="14" width="6" height="4" fill="#10b981" rx="0.5" />
  </svg>
);

export const MarginsIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="5" y="4" width="18" height="20" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.2" />
    <rect x="8" y="7" width="12" height="14" fill="#dbeafe" stroke="#93c5fd" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
    <line x1="8" y1="4" x2="8" y2="24" stroke="#60a5fa" strokeWidth="0.6" strokeDasharray="1 1" />
    <line x1="20" y1="4" x2="20" y2="24" stroke="#60a5fa" strokeWidth="0.6" strokeDasharray="1 1" />
  </svg>
);

export const OrientationIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="4" y="6" width="11" height="15" fill="#ffffff" stroke="#64748b" strokeWidth="1" />
    <rect x="12" y="11" width="13" height="10" fill="#ffffff" stroke="#2563eb" strokeWidth="1" />
  </svg>
);

export const PageSizeIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="6" y="4" width="16" height="20" fill="#ffffff" stroke="#2563eb" strokeWidth="1" />
    <line x1="9" y1="7" x2="19" y2="7" stroke="#cbd5e1" strokeWidth="1" />
    <line x1="9" y1="10" x2="19" y2="10" stroke="#cbd5e1" strokeWidth="1" />
    <line x1="9" y1="13" x2="15" y2="13" stroke="#cbd5e1" strokeWidth="1" />
    <path d="M19 18L22 21M22 21L19 24M22 21H16" stroke="#f59e0b" strokeWidth="1" />
  </svg>
);

export const ColumnsIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="4" y="5" width="20" height="18" fill="#ffffff" stroke="#64748b" strokeWidth="1" />
    <rect x="6" y="7" width="7" height="14" fill="#bfdbfe" />
    <rect x="15" y="7" width="7" height="14" fill="#bfdbfe" />
  </svg>
);

export const WatermarkIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="5" y="4" width="18" height="20" fill="#ffffff" stroke="#64748b" strokeWidth="1" />
    <text x="14" y="16" fill="#cbd5e1" fontSize="9" fontWeight="bold" textAnchor="middle" transform="rotate(-30 14 16)">DRAFT</text>
  </svg>
);

export const PageColorIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="5" y="4" width="18" height="20" fill="#fed7aa" stroke="#f97316" strokeWidth="1" />
    <path d="M18 18L21 21M21 21L18 24M21 21H15" stroke="#ea580c" strokeWidth="1" />
  </svg>
);

export const PageBordersIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="4" y="4" width="20" height="20" fill="#ffffff" stroke="#2563eb" strokeWidth="1.8" />
    <rect x="8" y="8" width="12" height="12" fill="#eff6ff" stroke="#93c5fd" strokeWidth="0.8" />
  </svg>
);

// References Icons
export const TableOfContentsIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="5" y="4" width="18" height="20" fill="#ffffff" stroke="#2563eb" strokeWidth="1.2" />
    <line x1="8" y1="8" x2="16" y2="8" stroke="#1e293b" strokeWidth="1.5" />
    <text x="18" y="9.5" fill="#2563eb" fontSize="5" fontWeight="bold">1</text>
    <line x1="8" y1="12" x2="16" y2="12" stroke="#64748b" strokeWidth="1" />
    <text x="18" y="13.5" fill="#2563eb" fontSize="5" fontWeight="bold">2</text>
    <line x1="8" y1="16" x2="16" y2="16" stroke="#64748b" strokeWidth="1" />
    <text x="18" y="17.5" fill="#2563eb" fontSize="5" fontWeight="bold">3</text>
  </svg>
);

export const FootnoteIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <text x="5" y="15" fill="#1e293b" fontSize="11" fontWeight="bold" fontFamily="Arial">AB</text>
    <text x="19" y="10" fill="#ef4444" fontSize="8" fontWeight="bold">1</text>
    <line x1="5" y1="19" x2="23" y2="19" stroke="#94a3b8" strokeWidth="0.8" />
    <line x1="5" y1="22" x2="15" y2="22" stroke="#cbd5e1" strokeWidth="0.8" />
  </svg>
);

// Mailings Icons
export const EnvelopesIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="4" y="6" width="20" height="16" rx="1.5" fill="#ffffff" stroke="#d97706" strokeWidth="1.2" />
    <path d="M4 7L14 15L24 7" stroke="#d97706" strokeWidth="1.2" fill="none" />
    <rect x="18" y="8" width="4" height="3" fill="#ef4444" />
  </svg>
);

export const LabelsIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="4" y="5" width="20" height="18" fill="#ffffff" stroke="#64748b" strokeWidth="1" />
    <rect x="6" y="7" width="7" height="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.6" />
    <rect x="15" y="7" width="7" height="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.6" />
    <rect x="6" y="15" width="7" height="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.6" />
    <rect x="15" y="15" width="7" height="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.6" />
  </svg>
);

export const MailMergeIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="4" y="5" width="14" height="17" fill="#ffffff" stroke="#2563eb" strokeWidth="1" />
    <rect x="10" y="8" width="14" height="11" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
    <path d="M10 9L17 14L24 9" stroke="#d97706" strokeWidth="1" />
  </svg>
);

// Review Icons
export const SpellingGrammarIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <text x="3" y="14" fill="#1e293b" fontSize="10" fontWeight="bold" fontFamily="Arial">ABC</text>
    <path d="M6 19L11 24L23 9" stroke="#16a34a" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ResearchIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="4" y="6" width="18" height="16" rx="1" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
    <circle cx="16" cy="14" r="5" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.2" />
    <line x1="20" y1="18" x2="24" y2="22" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const TrackChangesIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <rect x="5" y="4" width="18" height="20" fill="#ffffff" stroke="#64748b" strokeWidth="1" />
    <line x1="8" y1="8" x2="16" y2="8" stroke="#dc2626" strokeWidth="1.2" />
    <line x1="8" y1="12" x2="20" y2="12" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="1.5 1" />
    <path d="M16 16L24 22M24 16L16 22" stroke="#eab308" strokeWidth="1.5" />
  </svg>
);

// View Icons
export const PrintLayoutIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <rect x="2" y="1.5" width="12" height="13" fill="#ffffff" stroke="#2563eb" strokeWidth="1" rx="0.5" />
    <line x1="4.5" y1="4.5" x2="11.5" y2="4.5" stroke="#94a3b8" strokeWidth="0.8" />
    <line x1="4.5" y1="7" x2="11.5" y2="7" stroke="#94a3b8" strokeWidth="0.8" />
    <line x1="4.5" y1="9.5" x2="9" y2="9.5" stroke="#94a3b8" strokeWidth="0.8" />
  </svg>
);

export const FullScreenReadingIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <rect x="1.5" y="2" width="6" height="11" fill="#ffffff" stroke="#475569" strokeWidth="0.8" />
    <rect x="8.5" y="2" width="6" height="11" fill="#ffffff" stroke="#475569" strokeWidth="0.8" />
  </svg>
);

export const WebLayoutIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <circle cx="8" cy="8" r="6" stroke="#2563eb" strokeWidth="1" fill="#eff6ff" />
    <line x1="2" y1="8" x2="14" y2="8" stroke="#2563eb" strokeWidth="0.8" />
    <ellipse cx="8" cy="8" rx="3" ry="6" stroke="#2563eb" strokeWidth="0.8" fill="none" />
  </svg>
);

export const OutlineIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <circle cx="3" cy="4" r="1" fill="#2563eb" />
    <line x1="6" y1="4" x2="14" y2="4" stroke="#475569" strokeWidth="1" />
    <circle cx="5" cy="8" r="1" fill="#2563eb" />
    <line x1="8" y1="8" x2="14" y2="8" stroke="#475569" strokeWidth="1" />
    <circle cx="5" cy="12" r="1" fill="#2563eb" />
    <line x1="8" y1="12" x2="14" y2="12" stroke="#475569" strokeWidth="1" />
  </svg>
);

export const DraftIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <rect x="2" y="2" width="12" height="12" stroke="#64748b" strokeWidth="1" strokeDasharray="1.5 1.5" fill="#f8fafc" />
    <line x1="4" y1="5" x2="10" y2="5" stroke="#94a3b8" strokeWidth="1" />
    <line x1="4" y1="8" x2="12" y2="8" stroke="#94a3b8" strokeWidth="1" />
  </svg>
);

// Zoom icon
export const ZoomIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
    <circle cx="12" cy="12" r="7" stroke="#2563eb" strokeWidth="2" fill="#eff6ff" />
    <text x="12" y="15" fill="#1d4ed8" fontSize="8" fontWeight="bold" textAnchor="middle">100</text>
    <line x1="17" y1="17" x2="24" y2="24" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Ruler toggle icon (above scrollbar)
export const RulerToggleIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <rect x="1" y="2" width="12" height="10" fill="#ffffff" stroke="#64748b" strokeWidth="0.8" rx="0.5" />
    <line x1="1" y1="5" x2="13" y2="5" stroke="#2563eb" strokeWidth="0.8" />
    <line x1="3" y1="2" x2="3" y2="5" stroke="#64748b" strokeWidth="0.6" />
    <line x1="6" y1="2" x2="6" y2="4" stroke="#64748b" strokeWidth="0.6" />
    <line x1="9" y1="2" x2="9" y2="5" stroke="#64748b" strokeWidth="0.6" />
    <line x1="11" y1="2" x2="11" y2="4" stroke="#64748b" strokeWidth="0.6" />
  </svg>
);

// Proofing Checkbook icon
export const ProofingIcon: React.FC<IconProps> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <rect x="1" y="2" width="12" height="9" rx="1" fill="#ffffff" stroke="#64748b" strokeWidth="0.8" />
    <path d="M4 6.5L6 8.5L10 4.5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Window caption minimize, maximize, close
export const WinMinimizeIcon: React.FC<IconProps> = ({ size = 10, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none" className={className}>
    <line x1="1" y1="8" x2="9" y2="8" stroke="#1e293b" strokeWidth="1.5" />
  </svg>
);

export const WinMaximizeIcon: React.FC<IconProps> = ({ size = 10, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none" className={className}>
    <rect x="1" y="1" width="8" height="8" stroke="#1e293b" strokeWidth="1.2" fill="none" />
    <line x1="1" y1="3" x2="9" y2="3" stroke="#1e293b" strokeWidth="1" />
  </svg>
);

export const WinCloseIcon: React.FC<IconProps> = ({ size = 10, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none" className={className}>
    <path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
