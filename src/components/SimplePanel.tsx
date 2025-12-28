import React from 'react';
import { PanelProps, FieldType } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2, useTheme2 } from '@grafana/ui';
import { PanelDataErrorView } from '@grafana/runtime';

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => ({
  wrapper: css`
    font-family: Open Sans;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(0, 150, 255, 0.15);
      box-shadow: inset 0 0 15px rgba(0, 150, 255, 0.2);
    }
  `,
  svg: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  `,
  alertFlash: css`
    @keyframes flashing {
      0% {
        fill: #ff0000;
        opacity: 1;
      }
      50% {
        fill: #ff0000;
        opacity: 0.3;
      }
      100% {
        fill: #ff0000;
        opacity: 1;
      }
    }
    animation: flashing 0.8s infinite;
  `,
  dataDisplay: css`
    z-index: 5;
    text-align: center;
    font-weight: bold;
    pointer-events: none;
    word-break: break-word;
    padding: 0 20px;
  `,
  textBox: css`
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 10px;
    z-index: 10;
  `,
});

export const SimplePanel: React.FC<Props> = ({
  options,
  data,
  width,
  height,
  fieldConfig,
  id,
}) => {
  const theme = useTheme2();
  const styles = useStyles2(getStyles);

  // 🔐 Always guard first
  if (!data || data.series.length === 0) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} />;
  }

  const series = data.series[0];
  const field = series.fields.find((f) => f.type === FieldType.number);
  const lastValue =
    field && field.values.length > 0
      ? field.values.get(field.values.length - 1)
      : null;

  const isAlert = lastValue !== null && lastValue > (options.thresholdValue ?? 80);
  const color = isAlert ? '#ff0000' : options.primaryColor;
  const shapeSize = Math.min(width, height) / 2;

  return (
    <div
      onClick={() => alert(`Current Value: ${lastValue ?? 'No data'}`)}
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
          cursor: pointer;
        `
      )}
    >
      {/* Shape */}
      <svg className={styles.svg} width={shapeSize} height={shapeSize}>
        {options.shape === 'circle' ? (
          <circle
            cx={shapeSize / 2}
            cy={shapeSize / 2}
            r={shapeSize / 2}
            className={isAlert ? styles.alertFlash : ''}
            style={{ fill: color, transition: 'fill 0.5s' }}
          />
        ) : (
          <rect
            width={shapeSize}
            height={shapeSize}
            className={isAlert ? styles.alertFlash : ''}
            style={{ fill: color, transition: 'fill 0.5s' }}
          />
        )}
      </svg>

      {/* Value */}
      <div
        className={styles.dataDisplay}
        style={{
          fontSize: Math.min(width / 12, 40),
          color: 'white',
        }}
      >
        {lastValue !== null ? lastValue.toFixed(2) : 'No Data'}
      </div>

      {/* Footer */}
      <div className={styles.textBox}>
        {options.displayMode === 'advanced' && (
          <div
            style={{
              fontSize: '12px',
              color: isAlert ? '#ff0000' : theme.colors.text.secondary,
              fontWeight: 'bold',
            }}
          >
            {isAlert
              ? '⚠️ ALERT: THRESHOLD EXCEEDED'
              : `Project: ${series.name ?? 'N/A'}`}
          </div>
        )}

        <div style={{ fontSize: '14px', marginTop: '4px' }}>
          Developed by Hatice Kübra Çetin — Fall 2025
        </div>

        <div style={{ fontSize: '12px', opacity: 0.8 }}>{options.text}</div>
      </div>
    </div>
  );
};

