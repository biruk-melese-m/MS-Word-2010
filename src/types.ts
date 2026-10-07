export type RibbonTabType = 
  | 'file'
  | 'home'
  | 'insert'
  | 'page-layout'
  | 'references'
  | 'review'
  | 'view';

export type BackstageSection = 
  | 'info'
  | 'recent'
  | 'new'
  | 'print'
  | 'save-send'
  | 'help'
  | 'options';

export type DocumentViewMode = 
  | 'print-layout'
  | 'full-screen'
  | 'web-layout'
  | 'outline'
  | 'draft';

export interface StyleItem {
  id: string;
  name: string;
  sample: string;
  font: string;
  size: string;
  color: string;
  bold?: boolean;
  italic?: boolean;
}

export interface PageMargin {
  top: number;
  bottom: number;
  left: number;
  right: number;
  name: string;
}

export interface PageSize {
  name: string;
  width: number; // in pixels at 100% (e.g. 816)
  height: number; // in pixels at 100% (e.g. 1056)
}

export interface DocumentComment {
  id: string;
  author: string;
  text: string;
  date: string;
  resolved: boolean;
  replies?: { author: string; text: string; date: string }[];
}

export interface TrackedChange {
  id: string;
  type: 'insertion' | 'deletion' | 'format';
  author: string;
  text: string;
  date: string;
}

export interface CitationItem {
  id: string;
  title: string;
  author: string;
  year: string;
  sourceType: string;
  publisher?: string;
}

export interface FootnoteItem {
  id: string;
  number: number;
  text: string;
  type: 'footnote' | 'endnote';
}

export interface WordCountStats {
  pages: number;
  words: number;
  charactersNoSpaces: number;
  charactersWithSpaces: number;
  paragraphs: number;
  lines: number;
}
