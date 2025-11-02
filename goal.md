Build a “Campus Companion” React Native app (Expo CLI or React Native CLI) that helps students track events, notes, and quick links. Implement the features below exactly as specified.

Functional Requirements
Navigation (react-navigation v6)

Use a Drawer as the root navigator with items: Home, Events, Profile, Settings.

Inside Home, use a Bottom Tab with tabs: Feed, Notes.

From Events tab, navigate via a Stack to EventDetails (push) and pass route params (id, title).

Demonstrate a custom screen transition or header animation on navigating to EventDetails.

Screens & Components

Feed (Tab): Show a hero Image banner and a FlatList of “quick links” (at least 8). Each list item must be a TouchableOpacity that opens a link (dummy open with Alert is fine).

Notes (Tab): A form to add/edit a note using TextInput fields (title, description) plus a Button to save. Show saved notes in a ScrollView or FlatList below the form.

Events (Drawer item): Show upcoming events via FlatList (at least 10). Tapping an item navigates to EventDetails (Stack) with route params.

EventDetails (Stack): Display full data (title, date, image, description). Include a Back button and show the route params on screen.

Profile (Drawer item): Show a profile Image, name, and editable TextInput fields (email, phone). Include a Save Button.

Settings (Drawer item): Show toggles or simple options (dummy) arranged using Flexbox.

State & Lifecycle

Use functional components everywhere, but include one class component (e.g., LegacyClock) that displays current time and demonstrates componentDidMount/componentWillUnmount (interval cleanup). Show it anywhere suitable.

Use useState for local form state, useEffect to simulate fetching events from a local JSON (use setTimeout 800–1200ms), and useRef to:

Focus the next TextInput when pressing return in the Notes form, and

Scroll to top of the Feed list when a “Scroll to Top” Button is pressed.

Validation & Feedback

Notes form validation:

Title: min length 3

Description: min length 10

Profile:

Email: basic pattern check

Phone: digits only, length 10–13

Show inline error Text near the fields and disable Save if invalid.

Layout & Styling

Use Flexbox for layout and StyleSheet for all styles (no inline styles except tiny one-offs).

Cards must have padding, margin, and rounded corners.

Provide a light spacing scale and typographic hierarchy (title, subtitle, body).

Responsive UI

Use Dimensions or useWindowDimensions to switch Feed grid:

< 600 width: 1 column

≥ 600 width: 2 columns

On Platform check:

Android: show a Toast on successful note save

iOS: show an Alert on successful note save

Required Components (use at least once)

View, Text, Image, TextInput, Button, ScrollView, FlatList, TouchableOpacity.

Non-Functional Requirements
Project must run with Expo CLI or React Native CLI.

Use @react-navigation/native + stack/tab/drawer packages.

TypeScript optional; if using JS, add PropTypes for at least one list item component.

Clean folder structure: navigation/, screens/, components/, data/, hooks/, assets/.

No external UI kits (RN core components only).

Sample Data (place in data/)
events.json with at least 10 items: { id, title, dateISO, imageUrl, description }.

links.json with at least 8 items: { id, label, url }.

What to Demonstrate (checklist)
Drawer + Tab + Stack working together.

Passing route params to EventDetails.

Custom transition or header animation for EventDetails.

Form validation and disabled Save state until valid.

useRef: focus chaining between TextInputs; programmatic scroll to top.

useEffect: simulated fetch + loading state for Events.

Platform conditional feedback (Toast vs Alert).

Responsive grid switch using width breakpoints.

