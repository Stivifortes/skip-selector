# Skip Selector Redesign

A modern, user-friendly skip selection interface that transforms the traditional skip booking experience into an intuitive and visually appealing journey.

## Main Approach & Key Changes

### 1. Enhanced Navigation & Filtering
- Implemented a segmented control system for skip size filtering
- Added intuitive tabs for quick size-based navigation (All, Small, Medium, Large)
- Created a responsive filtering system that adapts to user preferences

### 2. Improved Layout & Information Architecture
- Introduced a dedicated left panel for detailed skip information
- Redesigned the card layout to provide better visual hierarchy
- Implemented a slide-in panel for additional skip details
- Created a more spacious and organized information display

### 3. Modern Design Transformation
- Completely revamped the card design with a premium, modern aesthetic
- Implemented a dark theme with orange accents for better visual appeal
- Added subtle animations and transitions for a polished feel
- Improved typography and spacing for better readability
- Enhanced visual feedback for user interactions

### 4. Mobile-First Experience
- Optimized layout for all screen sizes
- Implemented a bottom sheet panel for mobile devices
- Created touch-friendly interaction areas
- Ensured consistent experience across devices

### 5. User-Centric Features
- Clear pricing display with VAT inclusion
- Prominent feature highlights (heavy waste, road placement)
- Intuitive selection mechanism
- Smooth transitions between states
- Clear call-to-action buttons

## Technical Implementation

### Component Structure
- `SkipCard`: Modern, interactive card component with hover and selection states
- `SegmentControl`: Custom tab navigation for skip size filtering
- `StepperHeader`: Progress indicator for the booking process
- Responsive panel system for detailed information

### Key Features
- Real-time filtering of skip options
- Interactive card selection
- Detailed information panel
- Responsive design
- Accessibility support
- Loading and error states
- Smooth animations

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. For component development and testing:
   ```bash
   npm run storybook
   ```

## Technologies Used
- React
- Tailwind CSS
- Storybook
- Vite

## Future Improvements
- Add skip size visualization
- Implement skip comparison feature
- Add more detailed skip specifications
- Enhance mobile interactions
- Add skip availability calendar
- Implement skip customization options

## Screenshot of redesign

## Link to deployed sandbox (e.g., CodeSandbox or Vercel)