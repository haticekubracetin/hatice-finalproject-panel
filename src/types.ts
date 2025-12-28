export interface SimpleOptions {
  text: string;
  showSeriesCount: boolean;
  seriesCountSize: 'sm' | 'md' | 'lg';
  primaryColor: string;
  displayMode: 'basic' | 'advanced';
  shape: 'circle' | 'square';
  // Added only this:
  thresholdValue: number; 
}