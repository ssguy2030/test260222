# Blueprint: Personal Stylist Service

## Overview
A web application providing personalized styling services. Users can input their physical information (photo, height, weight) and receive tailored style recommendations.

## Project Outline
- **Tech Stack**: React (TypeScript), Vite, Material UI (MUI).
- **Design Philosophy**: Modern, clean, and interactive user interface. High contrast, clean typography, and intuitive navigation.
- **Features**:
  - User Profile Setup (Current Focus).
  - Photo Upload.
  - Height/Weight tracking.
  - Future: Style recommendations, closet management.

## Current Plan
1. **Initialize UI Framework**: Install MUI (@mui/material, @emotion/react, @emotion/styled) and Lucide React icons.
2. **Create Profile Setup Screen**:
   - UI for uploading a photo.
   - Input fields for height (cm) and weight (kg).
   - "Start My Style Journey" CTA button.
3. **Styling**: Implement a premium feel with MUI theming, soft shadows, and a clean layout.
4. **Validation**: Ensure inputs are valid.

## Implementation Steps
1. Install dependencies: `npm install @mui/material @emotion/react @emotion/styled lucide-react`.
2. Update `App.tsx` with the new Profile Setup UI.
3. Add custom styles for a premium look in `App.css` or using MUI's `sx` prop.
4. Verify the preview.
