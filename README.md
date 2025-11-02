# Campus Companion 🎓

A comprehensive React Native app built with Expo that helps students track events, manage notes, and access quick links for campus life.

## 📱 Demo Video

[![Campus Companion Demo](https://img.youtube.com/vi/EAJJrh6ygFQ/0.jpg)](https://youtube.com/shorts/EAJJrh6ygFQ?feature=share)

*Click the thumbnail above to watch the full app demonstration showing all features and navigation flows*

## ✨ Features

### 🏠 **Home (Bottom Tabs)**
- **Feed Tab**: Hero banner with campus image, real-time clock, and 8+ quick links
- **Notes Tab**: Create, edit, and manage personal notes with form validation
- Responsive grid layout (1 column < 600px, 2 columns ≥ 600px)

### 📅 **Events**
- Browse 10+ upcoming campus events with images and descriptions
- Simulated API fetch with loading states (800-1200ms delay)
- Navigate to detailed event view with custom transitions

### 👤 **Profile**
- Editable profile with image, name, email, and phone
- Real-time form validation (email pattern, phone digits only)
- Profile statistics and save functionality

### ⚙️ **Settings**
- Toggle switches for notifications, dark mode, auto-sync, location services
- Action buttons for cache clearing and settings reset
- App information section

## 🏗️ Architecture

### Navigation Structure
```
DrawerNavigator (Root)
├── Home → BottomTabNavigator
│   ├── Feed
│   └── Notes
├── Events → StackNavigator
│   ├── EventsList
│   └── EventDetails (with route params)
├── Profile
└── Settings
```

### Key Technical Features
- **Class Component**: LegacyClock with lifecycle methods (componentDidMount/componentWillUnmount)
- **Hooks**: useState, useEffect, useRef, useWindowDimensions
- **Form Validation**: Real-time validation with error states
- **Platform Detection**: Android Toast vs iOS Alert feedback
- **Responsive Design**: Dynamic grid columns based on screen width
- **Custom Transitions**: Slide animation for EventDetails navigation

## 🛠️ Technologies Used

- **React Native** with **Expo CLI**
- **React Navigation v6** (Drawer, Stack, Bottom Tabs)
- **TypeScript** for type safety
- **React Hooks** for state management
- **Platform-specific APIs** (Alert, ToastAndroid)
- **Responsive Design** with useWindowDimensions

## 📁 Project Structure

```
├── components/
│   └── LegacyClock.tsx          # Class component with lifecycle
├── data/
│   ├── events.json              # Sample events data (10 items)
│   └── links.json               # Quick links data (8 items)
├── navigation/
│   ├── DrawerNavigator.tsx      # Root drawer navigation
│   ├── HomeTabNavigator.tsx     # Bottom tabs for Home
│   └── EventsStackNavigator.tsx # Stack navigation for Events
├── screens/
│   ├── FeedScreen.tsx           # Hero banner + quick links
│   ├── NotesScreen.tsx          # Notes CRUD with validation
│   ├── EventsScreen.tsx         # Events list with loading
│   ├── EventDetailsScreen.tsx   # Event details with params
│   ├── ProfileScreen.tsx        # Profile management
│   └── SettingsScreen.tsx       # App settings
└── App.tsx                      # Main app entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- iOS Simulator or Android Emulator (optional)
- Expo Go app on your mobile device

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd campus-companion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run the app**
   - Scan QR code with Expo Go app (iOS/Android)
   - Press `w` for web version
   - Press `a` for Android emulator
   - Press `i` for iOS simulator

## 📋 Feature Checklist

### ✅ Navigation Requirements
- [x] Drawer as root navigator (Home, Events, Profile, Settings)
- [x] Bottom Tab inside Home (Feed, Notes)
- [x] Stack navigation from Events to EventDetails
- [x] Route params passing (id, title)
- [x] Custom screen transition animation

### ✅ Screen Components
- [x] Feed: Hero image + FlatList of 8+ quick links
- [x] Notes: Form with validation + saved notes display
- [x] Events: FlatList of 10+ events with navigation
- [x] EventDetails: Full data display + route params
- [x] Profile: Image + editable fields with validation
- [x] Settings: Toggles and options using Flexbox

### ✅ State & Lifecycle
- [x] Class component (LegacyClock) with lifecycle methods
- [x] useState for local form state
- [x] useEffect for simulated API fetch
- [x] useRef for TextInput focus chaining and scroll control

### ✅ Validation & Feedback
- [x] Notes validation (title ≥3, description ≥10)
- [x] Profile validation (email pattern, phone digits 10-13)
- [x] Platform-specific feedback (Toast/Alert)
- [x] Disabled save states until valid

### ✅ Layout & Styling
- [x] Flexbox layouts throughout
- [x] StyleSheet for all styles
- [x] Cards with padding, margin, rounded corners
- [x] Typography hierarchy (title, subtitle, body)

### ✅ Responsive UI
- [x] useWindowDimensions for responsive grid
- [x] 1 column (<600px) vs 2 columns (≥600px)
- [x] Platform-specific conditional rendering

### ✅ Required Components
- [x] View, Text, Image, TextInput, Button
- [x] ScrollView, FlatList, TouchableOpacity
- [x] SafeAreaView, ActivityIndicator, Switch

## 🎯 Key Demonstrations

1. **Navigation Flow**: Drawer → Tabs → Stack with route params
2. **Form Validation**: Real-time validation with error states
3. **useRef Usage**: Focus chaining and programmatic scrolling
4. **useEffect**: Simulated API calls with loading states
5. **Platform Detection**: Different feedback mechanisms
6. **Responsive Design**: Dynamic grid based on screen width
7. **Class Component**: Legacy clock with proper lifecycle management

## 📱 Screenshots

The app features a clean, modern design with:
- Intuitive navigation structure
- Responsive layouts for different screen sizes
- Form validation with inline error messages
- Loading states and smooth transitions
- Platform-appropriate user feedback

## 🤝 Contributing

This project was built as a demonstration of React Native concepts including navigation, state management, form validation, and responsive design patterns.

## 📄 License

This project is for educational purposes and demonstration of React Native development skills.

---

**Built with ❤️ using React Native & Expo**