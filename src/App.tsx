/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TitleBar } from './components/TitleBar';
import { Ribbon } from './components/Ribbon';
import { DocumentWorkspace } from './components/DocumentWorkspace';
import { StatusBar } from './components/StatusBar';
import { BackstageView } from './components/BackstageView';
import {
  PasteSpecialDialog,
  FontDialog,
  ParagraphDialog,
  FindReplaceDialog,
  WordCountDialog,
  InsertTableDialog,
  HyperlinkDialog,
  SymbolDialog,
  EquationDialog,
  WatermarkDialog,
  ProtectDocumentDialog,
  SpellingDialog,
  ZoomDialog,
  WordOptionsDialog,
} from './components/Dialogs';
import { RibbonTabType, DocumentViewMode } from './types';
import { DocumentProvider } from './context/DocumentContext';

function WordApp() {
  const [activeTab, setActiveTab] = useState<RibbonTabType>('home');
  const [isBackstageOpen, setIsBackstageOpen] = useState(false);
  const [isRibbonCollapsed, setIsRibbonCollapsed] = useState(false);
  const [showRuler, setShowRuler] = useState(true);
  const [showGridlines, setShowGridlines] = useState(false);
  const [showNavigationPane, setShowNavigationPane] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [viewMode, setViewMode] = useState<DocumentViewMode>('print-layout');

  // Dialog states
  const [activeDialog, setActiveDialog] = useState<string | null>(null);

  const handleOpenDialog = (dialogName: string) => {
    setActiveDialog(dialogName);
  };

  const handleCloseDialog = () => {
    setActiveDialog(null);
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-[#8297b0] select-none font-sans relative">
      {/* Full-Screen Reading Mode Bar (if in full-screen) */}
      {viewMode === 'full-screen' && (
        <div className="h-[30px] bg-[#24589d] text-white px-3 flex items-center justify-between z-30 text-[11px]">
          <span className="font-semibold">Full Screen Reading View</span>
          <button
            onClick={() => setViewMode('print-layout')}
            className="px-2 py-0.5 bg-white/20 hover:bg-white/30 rounded"
          >
            Close Full Screen
          </button>
        </div>
      )}

      {/* 1. Title Bar */}
      {viewMode !== 'full-screen' && (
        <TitleBar
          isRibbonCollapsed={isRibbonCollapsed}
          onToggleRibbon={() => setIsRibbonCollapsed(!isRibbonCollapsed)}
          onHelpClick={() => setIsBackstageOpen(true)}
          onOpenDialog={handleOpenDialog}
        />
      )}

      {/* 2. Ribbon Strip and Commands */}
      {viewMode !== 'full-screen' && (
        <Ribbon
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setIsBackstageOpen(false);
            setActiveTab(tab);
          }}
          onOpenFileTab={() => setIsBackstageOpen(true)}
          isRibbonCollapsed={isRibbonCollapsed}
          setIsRibbonCollapsed={setIsRibbonCollapsed}
          onOpenDialog={handleOpenDialog}
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
          onHelpClick={() => setIsBackstageOpen(true)}
        />
      )}

      {/* 3. Document Workspace */}
      <DocumentWorkspace
        showRuler={showRuler}
        setShowRuler={setShowRuler}
        showGridlines={showGridlines}
        showNavigationPane={showNavigationPane}
        setShowNavigationPane={setShowNavigationPane}
        zoomLevel={zoomLevel}
        viewMode={viewMode}
        onOpenDialog={handleOpenDialog}
      />

      {/* 4. Bottom Status Bar with Zoom and Views */}
      <StatusBar
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenZoomDialog={() => handleOpenDialog('zoom')}
        onOpenWordCountDialog={() => handleOpenDialog('wordCount')}
        onOpenSpellingDialog={() => handleOpenDialog('spelling')}
      />

      {/* 5. Backstage View (File Tab Overlay) */}
      <BackstageView
        isOpen={isBackstageOpen}
        onClose={() => setIsBackstageOpen(false)}
        onOpenOptionsDialog={() => handleOpenDialog('options')}
        onOpenProtectDialog={() => handleOpenDialog('protect')}
      />

      {/* 6. Authentic Word 2010 Modals */}
      <PasteSpecialDialog
        isOpen={activeDialog === 'pasteSpecial'}
        onClose={handleCloseDialog}
      />

      <FontDialog
        isOpen={activeDialog === 'font' || activeDialog === 'clipboard'}
        onClose={handleCloseDialog}
      />

      <ParagraphDialog
        isOpen={activeDialog === 'paragraph'}
        onClose={handleCloseDialog}
      />

      <FindReplaceDialog
        isOpen={activeDialog === 'find' || activeDialog === 'replace'}
        onClose={handleCloseDialog}
      />

      <WordCountDialog
        isOpen={activeDialog === 'wordCount'}
        onClose={handleCloseDialog}
      />

      <InsertTableDialog
        isOpen={activeDialog === 'table'}
        onClose={handleCloseDialog}
      />

      <HyperlinkDialog
        isOpen={activeDialog === 'hyperlink'}
        onClose={handleCloseDialog}
      />

      <SymbolDialog
        isOpen={activeDialog === 'symbol'}
        onClose={handleCloseDialog}
      />

      <EquationDialog
        isOpen={activeDialog === 'equation'}
        onClose={handleCloseDialog}
      />

      <WatermarkDialog
        isOpen={activeDialog === 'watermark'}
        onClose={handleCloseDialog}
      />

      <ProtectDocumentDialog
        isOpen={activeDialog === 'protect'}
        onClose={handleCloseDialog}
      />

      <SpellingDialog
        isOpen={activeDialog === 'spelling'}
        onClose={handleCloseDialog}
      />

      <ZoomDialog
        isOpen={activeDialog === 'zoom'}
        onClose={handleCloseDialog}
        currentZoom={zoomLevel}
        setZoom={setZoomLevel}
      />

      <WordOptionsDialog
        isOpen={activeDialog === 'options'}
        onClose={handleCloseDialog}
      />
    </div>
  );
}

export default function App() {
  return (
    <DocumentProvider>
      <WordApp />
    </DocumentProvider>
  );
}
