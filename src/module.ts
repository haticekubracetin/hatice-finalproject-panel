import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'text',
      name: 'Display Text',
      defaultValue: 'Final Project 2025',
    })
    .addBooleanSwitch({
      path: 'showSeriesCount',
      name: 'Show Series Count',
      defaultValue: false,
    })
    .addRadio({
      path: 'seriesCountSize',
      name: 'Series Count Size',
      defaultValue: 'sm',
      settings: {
        options: [
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' },
        ],
      },
      showIf: (config) => config.showSeriesCount,
    })
    .addRadio({
      path: 'displayMode',
      name: 'Display Mode',
      defaultValue: 'basic',
      settings: {
        options: [
          { value: 'basic', label: 'Basic' },
          { value: 'advanced', label: 'Advanced' },
        ],
      },
    })
    .addSelect({
      path: 'shape',
      name: 'Shape',
      defaultValue: 'circle',
      settings: {
        options: [
          { value: 'circle', label: 'Circle' },
          { value: 'square', label: 'Square' },
        ],
      },
    })
    .addColorPicker({
      path: 'primaryColor',
      name: 'Primary Color',
      defaultValue: 'purple',
    })
    // Added only this:
    .addNumberInput({
      path: 'thresholdValue',
      name: 'Alert Threshold',
      defaultValue: 80,
    });
});
