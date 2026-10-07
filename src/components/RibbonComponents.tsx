import React, { useState } from 'react';
import { ArrowDownIcon, DialogLauncherIcon } from './WordIcons';

// Ribbon Group component
interface RibbonGroupProps {
  title: string;
  children: React.ReactNode;
  hasDialogLauncher?: boolean;
  onDialogLaunch?: () => void;
  className?: string;
}

export const RibbonGroup: React.FC<RibbonGroupProps> = ({
  title,
  children,
  hasDialogLauncher = false,
  onDialogLaunch,
  className = '',
}) => {
  return (
    <div className={`flex flex-col h-[94px] px-1.5 relative border-r border-[#cad8e7] border-l border-l-[#ffffff] first:border-l-0 ${className}`}>
      {/* Group Controls Area */}
      <div className="flex items-center flex-1 gap-1 pt-1 pb-0.5">
        {children}
      </div>

      {/* Group Title Footer */}
      <div className="h-[17px] flex items-center justify-center relative select-none">
        <span className="text-[10.5px] text-[#41556e] font-sans font-medium tracking-tight">
          {title}
        </span>
        {hasDialogLauncher && (
          <button
            onClick={onDialogLaunch}
            title={`${title} Dialog`}
            className="absolute right-0 bottom-[1px] w-[13px] h-[13px] flex items-center justify-center office-btn text-[#41556e] hover:bg-[#fff9d7] hover:border-[#f1c15d]"
          >
            <DialogLauncherIcon size={9} />
          </button>
        )}
      </div>
    </div>
  );
};

// Ribbon Large Button (Icon on top, text below)
interface RibbonLargeButtonProps {
  icon: React.ReactNode;
  label: string;
  hasDropdown?: boolean;
  active?: boolean;
  onClick?: () => void;
  title?: string;
}

export const RibbonLargeButton: React.FC<RibbonLargeButtonProps> = ({
  icon,
  label,
  hasDropdown = false,
  active = false,
  onClick,
  title,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={title || label.replace('\n', ' ')}
      className={`office-btn flex flex-col items-center justify-center px-1.5 py-0.5 min-w-[42px] h-[70px] ${
        active ? 'active' : ''
      }`}
    >
      <div className="h-[32px] flex items-center justify-center mb-0.5">
        {icon}
      </div>
      <div className="flex items-center gap-0.5 text-center leading-[11px]">
        <span className="text-[11px] text-[#1e293b] whitespace-pre-line font-sans">
          {label}
        </span>
        {hasDropdown && (
          <div className="pt-0.5">
            <ArrowDownIcon size={7} />
          </div>
        )}
      </div>
    </button>
  );
};

// Split Button (Upper button action, lower dropdown trigger)
interface RibbonSplitButtonProps {
  icon: React.ReactNode;
  label: string;
  onMainClick?: () => void;
  onDropClick?: () => void;
  title?: string;
}

export const RibbonSplitButton: React.FC<RibbonSplitButtonProps> = ({
  icon,
  label,
  onMainClick,
  onDropClick,
  title,
}) => {
  return (
    <div className="flex flex-col items-center h-[70px] min-w-[44px] rounded-[2px] border border-transparent hover:border-[#f1c15d] hover:bg-gradient-to-b hover:from-[#fffdf2] hover:to-[#ffebad] transition-all">
      <button
        onClick={onMainClick}
        title={title || label}
        className="w-full h-[46px] flex flex-col items-center justify-center hover:bg-[#fff9d7] rounded-t-[2px]"
      >
        <div className="h-[32px] flex items-center justify-center">
          {icon}
        </div>
      </button>
      <div className="w-[80%] h-[1px] bg-[#f0d494]" />
      <button
        onClick={onDropClick}
        className="w-full flex-1 flex items-center justify-center gap-1 hover:bg-[#ffe395] rounded-b-[2px] px-1"
      >
        <span className="text-[11px] text-[#1e293b] font-sans leading-none">{label}</span>
        <ArrowDownIcon size={7} />
      </button>
    </div>
  );
};

// Ribbon Small Button
interface RibbonSmallButtonProps {
  icon: React.ReactNode;
  label?: string;
  hasDropdown?: boolean;
  active?: boolean;
  onClick?: () => void;
  title?: string;
  className?: string;
}

export const RibbonSmallButton: React.FC<RibbonSmallButtonProps> = ({
  icon,
  label,
  hasDropdown = false,
  active = false,
  onClick,
  title,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      title={title || label}
      className={`office-btn flex items-center gap-1 px-1 py-[2px] h-[22px] min-w-[22px] justify-center ${
        active ? 'active' : ''
      } ${className}`}
    >
      <div className="flex items-center justify-center">{icon}</div>
      {label && <span className="text-[11px] text-[#1e293b] font-sans leading-none">{label}</span>}
      {hasDropdown && <ArrowDownIcon size={6} />}
    </button>
  );
};

// Ribbon Dropdown Combo Box (e.g. Font family, Font size)
interface RibbonDropdownProps {
  value: string;
  width?: string;
  options?: string[];
  onChange?: (val: string) => void;
  title?: string;
}

export const RibbonDropdown: React.FC<RibbonDropdownProps> = ({
  value,
  width = 'w-[100px]',
  options = [],
  onChange,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentVal, setCurrentVal] = useState(value);

  const handleSelect = (val: string) => {
    setCurrentVal(val);
    setIsOpen(false);
    onChange?.(val);
  };

  return (
    <div className={`relative ${width}`}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        title={title}
        className="h-[21px] flex items-center justify-between px-1.5 bg-white border border-[#abc1db] rounded-[2px] cursor-pointer hover:border-[#5c8bc2] text-[11px] text-[#1e293b]"
      >
        <span className="truncate font-sans">{currentVal}</span>
        <ArrowDownIcon size={7} />
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-[22px] left-0 min-w-full max-h-[220px] overflow-y-auto bg-white border border-[#7f9db9] shadow-lg z-50 py-1 text-[11px]">
            {options.map((opt) => (
              <div
                key={opt}
                onClick={() => handleSelect(opt)}
                className="px-2 py-1 hover:bg-[#3399ff] hover:text-white cursor-pointer select-none"
                style={{ fontFamily: title?.includes('Font') ? opt : undefined }}
              >
                {opt}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Authentic Quick Styles Gallery
interface StylesGalleryProps {
  onStyleSelect?: (name: string) => void;
}

export const StylesGallery: React.FC<StylesGalleryProps> = ({ onStyleSelect }) => {
  const [selectedStyle, setSelectedStyle] = useState('Normal');
  const [scrollIndex, setScrollIndex] = useState(0);

  const stylesList = [
    { name: 'Normal', sample: 'AaBbCcDd', sub: 'Normal' },
    { name: 'No Spacing', sample: 'AaBbCcDd', sub: 'No Spacing' },
    { name: 'Heading 1', sample: 'AaBbCc', sub: 'Heading 1', color: '#365f91', bold: true },
    { name: 'Heading 2', sample: 'AaBbCc', sub: 'Heading 2', color: '#4f81bd', bold: true },
    { name: 'Title', sample: 'AaBbCcDd', sub: 'Title', color: '#17365d', bold: true },
    { name: 'Subtitle', sample: 'AaBbCcDd', sub: 'Subtitle', color: '#4f81bd', italic: true },
    { name: 'Subtle Emphasis', sample: 'AaBbCc', sub: 'Subtle Emphasis', italic: true, color: '#595959' },
    { name: 'Emphasis', sample: 'AaBbCc', sub: 'Emphasis', italic: true },
    { name: 'Intense Emphasis', sample: 'AaBbCc', sub: 'Intense...', italic: true, color: '#4f81bd' },
    { name: 'Strong', sample: 'AaBbCc', sub: 'Strong', bold: true },
    { name: 'Quote', sample: 'AaBbCc', sub: 'Quote', italic: true, color: '#595959' },
    { name: 'Intense Quote', sample: 'AaBbCc', sub: 'Intense Q...', italic: true, color: '#4f81bd' },
  ];

  // 4 items visible in compact/standard view
  const visibleStyles = stylesList.slice(scrollIndex, scrollIndex + 4);

  return (
    <div className="flex items-center h-[70px] bg-white border border-[#abc1db] rounded-[2px] p-0.5">
      {/* Styles Swatches */}
      <div className="flex items-center gap-0.5">
        {visibleStyles.map((item) => {
          const isSelected = selectedStyle === item.name;
          return (
            <button
              key={item.name}
              onClick={() => {
                setSelectedStyle(item.name);
                onStyleSelect?.(item.name);
              }}
              title={item.name}
              className={`flex flex-col items-center justify-center w-[66px] h-[64px] px-1 rounded-[1px] border ${
                isSelected
                  ? 'bg-gradient-to-b from-[#fff6d2] to-[#fedb85] border-[#c28b2a]'
                  : 'border-transparent hover:bg-gradient-to-b hover:from-[#fffdf2] hover:to-[#ffebad] hover:border-[#f1c15d]'
              }`}
            >
              <div
                className="text-[15px] font-sans leading-none mb-1 truncate w-full text-center"
                style={{
                  color: item.color || '#000000',
                  fontWeight: item.bold ? 'bold' : 'normal',
                  fontStyle: item.italic ? 'italic' : 'normal',
                }}
              >
                {item.sample}
              </div>
              <span className="text-[10px] text-[#41556e] font-sans truncate w-full text-center">
                {item.sub}
              </span>
            </button>
          );
        })}
      </div>

      {/* Up, Down, Expand Gallery buttons */}
      <div className="flex flex-col w-[16px] h-[64px] border-l border-[#d3dfed] ml-0.5">
        <button
          onClick={() => setScrollIndex(Math.max(0, scrollIndex - 1))}
          disabled={scrollIndex === 0}
          title="Scroll Up"
          className="flex-1 flex items-center justify-center office-btn disabled:opacity-30"
        >
          <svg width="6" height="4" viewBox="0 0 6 4">
            <path d="M1 3L3 1L5 3" stroke="#41556e" strokeWidth="1.2" fill="none" />
          </svg>
        </button>
        <button
          onClick={() => setScrollIndex(Math.min(stylesList.length - 4, scrollIndex + 1))}
          disabled={scrollIndex >= stylesList.length - 4}
          title="Scroll Down"
          className="flex-1 flex items-center justify-center office-btn disabled:opacity-30"
        >
          <svg width="6" height="4" viewBox="0 0 6 4">
            <path d="M1 1L3 3L5 1" stroke="#41556e" strokeWidth="1.2" fill="none" />
          </svg>
        </button>
        <button
          title="More Styles"
          className="flex-1 flex items-center justify-center office-btn border-t border-[#d3dfed]"
        >
          <svg width="7" height="6" viewBox="0 0 7 6">
            <line x1="1" y1="1" x2="6" y2="1" stroke="#41556e" strokeWidth="1" />
            <path d="M1.5 3L3.5 5L5.5 3" stroke="#41556e" strokeWidth="1.2" fill="none" />
          </svg>
        </button>
      </div>
    </div>
  );
};
