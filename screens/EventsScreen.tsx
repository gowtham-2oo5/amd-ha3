import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EventsStackParamList } from '../navigation/EventsStackNavigator';
import eventsData from '../data/events.json';

interface Event {
  id: string;
  title: string;
  dateISO: string;
  imageUrl: string;
  description: string;
}

type EventsScreenNavigationProp = StackNavigationProp<EventsStackParamList, 'EventsList'>;

export default function EventsScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<EventsScreenNavigationProp>();

  useEffect(() => {
    // Simulate fetching events with setTimeout (800-1200ms)
    const fetchEvents = () => {
      const delay = Math.random() * 400 + 800; // Random delay between 800-1200ms
      
      setTimeout(() => {
        setEvents(eventsData);
        setLoading(false);
      }, delay);
    };

    fetchEvents();
  }, []);

  const formatDate = (dateISO: string) => {
    const date = new Date(dateISO);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleEventPress = (event: Event) => {
    navigation.navigate('EventDetails', {
      id: event.id,
      title: event.title,
    });
  };

  const renderEvent = ({ item }: { item: Event }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => handleEventPress(item)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.eventImage} />
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.eventDate}>{formatDate(item.dateISO)}</Text>
        <Text style={styles.eventDescription} numberOfLines={3}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Loading events...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
  listContainer: {
    padding: 16,
  },
  eventCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  eventContent: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});