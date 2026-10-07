import React from 'react';
import { RibbonTabType, DocumentViewMode } from '../types';
import {
  HomeTab,
  InsertTab,
  PageLayoutTab,
  ReferencesTab,
  ReviewTab,
  ViewTab,
} from './RibbonTabsContent';

interface RibbonProps {
  activeTab: RibbonTabType;
  setActiveTab: (tab: RibbonTabType) => void;
  onOpenFileTab: () => void;
  isRibbonCollapsed: boolean;
  setIsRibbonCollapsed: (collapsed: boolean) => void;
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
  onHelpClick?: () => void;
}

export const Ribbon: React.FC<RibbonProps> = ({
  activeTab,
  setActiveTab,
  onOpenFileTab,
  isRibbonCollapsed,
  setIsRibbonCollapsed,
  onOpenDialog,
  showRuler,
  setShowRuler,
  showGridlines,
  setShowGridlines,
  showNavigationPane,
  setShowNavigationPane,
  viewMode,
  setViewMode,
  zoomLevel,
  setZoomLevel,
  onHelpClick,
}) => {
  // Approved tabs only: Home, Insert, Page Layout, References, Review, View
  const tabs: { id: RibbonTabType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'insert', label: 'Insert' },
    { id: 'page-layout', label: 'Page Layout' },
    { id: 'references', label: 'References' },
    { id: 'review', label: 'Review' },
    { id: 'view', label: 'View' },
  ];

  return (
    <div className="flex flex-col select-none border-b border-[#abbfd5] shadow-xs">
      {/* 1. Tab Bar Header */}
      <div className="h-[25px] bg-gradient-to-b from-[#cce0f5] via-[#bdd6ef] to-[#adcbe9] flex items-end justify-between px-1.5 pt-0.5 border-b border-[#a0b8d2]">
        {/* Left: File Button & Tabs */}
        <div className="flex items-end gap-[1px]">
          {/* File Tab Button */}
          <button
            onClick={onOpenFileTab}
            title="File / Backstage View"
            className="h-[23px] px-3.5 rounded-t-[3px] bg-gradient-to-b from-[#2a7fd5] via-[#1c68b7] to-[#12539a] text-white font-sans text-[11.5px] font-bold tracking-tight shadow-sm hover:from-[#3a8ee4] hover:to-[#1a61ae] active:from-[#114b8a] active:to-[#0d3b6e] flex items-center justify-center cursor-pointer border border-[#0d4582] border-b-0 mr-1"
          >
            File
          </button>

          {/* Ribbon Tabs */}
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (isRibbonCollapsed) {
                    setIsRibbonCollapsed(false);
                  }
                }}
                className={`h-[23px] px-2.5 rounded-t-[3px] font-sans text-[11px] font-normal transition-colors flex items-center justify-center cursor-pointer border-t border-x ${
                  isActive
                    ? 'bg-gradient-to-b from-[#ffffff] via-[#f5f9fd] to-[#e4edf8] text-[#1c385b] font-medium border-[#9db8d4] border-b-transparent shadow-[0_-1px_2px_rgba(0,0,0,0.05)] relative z-10 -mb-[1px]'
                    : 'bg-transparent text-[#213b5a] border-transparent hover:bg-gradient-to-b hover:from-[#e8f2fc] hover:to-[#d2e4f7] hover:border-[#b4cce5]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right: Ribbon Collapse and Help */}
        <div className="flex items-center gap-1 mb-1">
          <button
            onClick={() => setIsRibbonCollapsed(!isRibbonCollapsed)}
            title={isRibbonCollapsed ? 'Expand the Ribbon (Ctrl+F1)' : 'Minimize the Ribbon (Ctrl+F1)'}
            className="office-btn w-[18px] h-[18px] flex items-center justify-center text-[#41556e]"
          >
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
              {isRibbonCollapsed ? (
                <path d="M1 2L4 5L7 2" stroke="#41556e" strokeWidth="1.2" strokeLinecap="round" />
              ) : (
                <path d="M1 4L4 1L7 4" stroke="#41556e" strokeWidth="1.2" strokeLinecap="round" />
              )}
            </svg>
          </button>
          <button
            onClick={onHelpClick}
            title="Microsoft Word Help (F1)"
            className="office-btn w-[18px] h-[18px] flex items-center justify-center text-[#2563eb]"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="5.5" stroke="#2563eb" strokeWidth="1.1" fill="#eff6ff" />
              <text x="6.5" y="9.5" fill="#2563eb" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="Segoe UI, Arial">?</text>
            </svg>
          </button>
        </div>
      </div>

      {/* 2. Ribbon Body Content (Groups) */}
      {!isRibbonCollapsed && (
        <div className="h-[96px] bg-gradient-to-b from-[#eaf2fb] via-[#deecf9] to-[#d0e1f3] px-1 flex items-center overflow-x-auto overflow-y-hidden shadow-inner">
          {activeTab === 'home' && <HomeTab onOpenDialog={onOpenDialog} />}
          {activeTab === 'insert' && <InsertTab onOpenDialog={onOpenDialog} />}
          {activeTab === 'page-layout' && <PageLayoutTab onOpenDialog={onOpenDialog} />}
          {activeTab === 'references' && <ReferencesTab onOpenDialog={onOpenDialog} />}
          {activeTab === 'review' && <ReviewTab onOpenDialog={onOpenDialog} />}
          {activeTab === 'view' && (
            <ViewTab
              showRuler={showRuler}
              setShowRuler={setShowRuler}
              showGridlines={showGridlines}
              setShowGridlines={setShowGridlines}
              showNavigationPane={showNavigationPane}
              setShowNavigationPane={setShowNavigationPane}
              viewMode={viewMode}
              setViewMode={setViewMode}
              zoomLevel={zoomLevel}
              setZoomLevel={setZoomLevel}
              onOpenDialog={onOpenDialog}
            />
          )}
        </div>
      )}
    </div>
  );
};
