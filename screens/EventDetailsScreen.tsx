import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Button,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { EventsStackParamList } from '../navigation/EventsStackNavigator';
import eventsData from '../data/events.json';

type EventDetailsRouteProp = RouteProp<EventsStackParamList, 'EventDetails'>;

interface Event {
  id: string;
  title: string;
  dateISO: string;
  imageUrl: string;
  description: string;
}

export default function EventDetailsScreen() {
  const route = useRoute<EventDetailsRouteProp>();
  const navigation = useNavigation();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  const { id, title } = route.params;

  useEffect(() => {
    // Simulate loading event details
    const loadEventDetails = () => {
      setTimeout(() => {
        const foundEvent = eventsData.find(e => e.id === id);
        setEvent(foundEvent || null);
        setLoading(false);
      }, 500);
    };

    loadEventDetails();
  }, [id]);

  const formatDate = (dateISO: string) => {
    const date = new Date(dateISO);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Loading event details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!event) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Event not found</Text>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Route Params Display */}
        <View style={styles.paramsContainer}>
          <Text style={styles.paramsTitle}>Route Parameters:</Text>
          <Text style={styles.paramsText}>ID: {id}</Text>
          <Text style={styles.paramsText}>Title: {title}</Text>
        </View>

        {/* Event Image */}
        <Image source={{ uri: event.imageUrl }} style={styles.eventImage} />

        {/* Event Details */}
        <View style={styles.contentContainer}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Date & Time:</Text>
            <Text style={styles.dateText}>{formatDate(event.dateISO)}</Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>Description:</Text>
            <Text style={styles.descriptionText}>{event.description}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Register for Event"
              onPress={() => {
                // Dummy action
                alert('Registration feature coming soon!');
              }}
            />
            <Button
              title="Share Event"
              onPress={() => {
                // Dummy action
                alert('Sharing feature coming soon!');
              }}
              color="#64748b"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    marginBottom: 16,
  },
  scrollContainer: {
    paddingBottom: 32,
  },
  paramsContainer: {
    backgroundColor: '#f1f5f9',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  paramsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  paramsText: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'monospace',
  },
  eventImage: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: '500',
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 12,
  },
});