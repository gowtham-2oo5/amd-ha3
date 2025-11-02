import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  useWindowDimensions,
  Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LegacyClock from '../components/LegacyClock';
import linksData from '../data/links.json';

interface LinkItem {
  id: string;
  label: string;
  url: string;
}

export default function FeedScreen() {
  const { width } = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);
  
  // Responsive grid: 1 column if width < 600, 2 columns if >= 600
  const numColumns = width >= 600 ? 2 : 1;

  const handleLinkPress = (item: LinkItem) => {
    Alert.alert('Opening Link', `Would open: ${item.label}\nURL: ${item.url}`);
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  const renderLinkItem = ({ item }: { item: LinkItem }) => (
    <TouchableOpacity
      style={[
        styles.linkCard,
        { width: numColumns === 2 ? '48%' : '100%' }
      ]}
      onPress={() => handleLinkPress(item)}
    >
      <Text style={styles.linkLabel}>{item.label}</Text>
      <Text style={styles.linkUrl} numberOfLines={1}>
        {item.url}
      </Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View>
      {/* Hero Banner */}
      <View style={styles.heroContainer}>
        <Image
          source={{
            uri: 'https://picsum.photos/800/300?random=hero',
          }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Campus Companion</Text>
          <Text style={styles.heroSubtitle}>Your gateway to campus life</Text>
        </View>
      </View>

      {/* Legacy Clock Component */}
      <LegacyClock />

      {/* Quick Links Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <Button title="Scroll to Top" onPress={scrollToTop} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={linksData}
        renderItem={renderLinkItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        key={numColumns} // Force re-render when columns change
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={numColumns === 2 ? styles.row : undefined}
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
  listContainer: {
    padding: 16,
  },
  heroContainer: {
    position: 'relative',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: 200,
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#e2e8f0',
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  row: {
    justifyContent: 'space-between',
  },
  linkCard: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  linkLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  linkUrl: {
    fontSize: 12,
    color: '#64748b',
  },
});