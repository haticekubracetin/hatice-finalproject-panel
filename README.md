# Grafana Panel Plugin - Final Project

**Student:** Hatice Kübra Çetin

**Term:** Fall 2025

## Project Overview

For this project, I developed a custom Grafana panel plugin that renders real-time data from a Grafana query. The plugin displays a central geometric shape that serves as both a data container and a visual status indicator.

## Key Features

- **Mandatory Requirement:** The student name "Developed by Hatice Kübra Çetin - Fall 2025" is clearly visible in the plugin UI.
- **Real Data Rendering:** The plugin successfully reads and displays live numeric data (e.g., Random Walk) from a Grafana query.
- **Dynamic Alert Logic:**
    - **Threshold Mapping:** Users can define an "Alert Threshold" in the panel settings.
    - **Bright Red Flashing Alert:** When the live data exceeds the set threshold, the shape automatically changes from its default purple to a bright red with a high-visibility flashing animation.
- **Advanced Panel Configuration:**
    - **Shape Toggle:** Users can switch the display between a Circle and a Square.
    - **Color Picker:** The primary color is customizable through a hex color picker.
    - **Display Modes:** A toggle for "Basic" and "Advanced" modes to show or hide additional metadata.
- **Interactivity & UX:**
    - Includes a blueish background hover effect and a box-shadow for depth.
    - Integrated an `onClick` alert that displays the exact data value when the panel is clicked.
- **Responsive Design:** The shape and font sizes scale dynamically based on the panel's dimensions.

## How to Run

1. Navigate to the project folder: `cd hatice-finalproject-panel`
2. Install dependencies: `npm install`
3. Build the plugin: `npm run build`
4. Restart Grafana to load the new plugin.
