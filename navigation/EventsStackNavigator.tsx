import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import EventsScreen from '../screens/EventsScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';

export type EventsStackParamList = {
  EventsList: undefined;
  EventDetails: {
    id: string;
    title: string;
  };
};

const Stack = createStackNavigator<EventsStackParamList>();

export default function EventsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6366f1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="EventsList" 
        component={EventsScreen}
        options={{
          title: 'Upcoming Events',
        }}
      />
      <Stack.Screen 
        name="EventDetails" 
        component={EventDetailsScreen}
        options={{
          title: 'Event Details',
          // Custom transition animation
          ...TransitionPresets.SlideFromRightIOS,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}