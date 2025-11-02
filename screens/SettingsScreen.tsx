import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [locationServices, setLocationServices] = useState(false);

  const handleNotificationToggle = (value: boolean) => {
    setNotifications(value);
    Alert.alert(
      'Notifications',
      value ? 'Notifications enabled' : 'Notifications disabled'
    );
  };

  const handleDarkModeToggle = (value: boolean) => {
    setDarkMode(value);
    Alert.alert(
      'Theme',
      value ? 'Dark mode enabled' : 'Light mode enabled'
    );
  };

  const handleAutoSyncToggle = (value: boolean) => {
    setAutoSync(value);
  };

  const handleLocationToggle = (value: boolean) => {
    setLocationServices(value);
    if (value) {
      Alert.alert(
        'Location Services',
        'Location services enabled for better event recommendations'
      );
    }
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to clear the app cache?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => Alert.alert('Success', 'Cache cleared successfully!'),
        },
      ]
    );
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'This will reset all settings to default values. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setNotifications(true);
            setDarkMode(false);
            setAutoSync(true);
            setLocationServices(false);
            Alert.alert('Success', 'Settings reset to default values!');
          },
        },
      ]
    );
  };

  const SettingItem = ({
    title,
    description,
    value,
    onValueChange,
  }: {
    title: string;
    description: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
  }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#d1d5db', true: '#6366f1' }}
        thumbColor={value ? '#ffffff' : '#f4f3f4'}
      />
    </View>
  );

  const ActionButton = ({
    title,
    description,
    onPress,
    color = '#6366f1',
  }: {
    title: string;
    description: string;
    onPress: () => void;
    color?: string;
  }) => (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <View style={styles.actionContent}>
        <Text style={[styles.actionTitle, { color }]}>{title}</Text>
        <Text style={styles.actionDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* App Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <SettingItem
            title="Push Notifications"
            description="Receive notifications about new events and updates"
            value={notifications}
            onValueChange={handleNotificationToggle}
          />
          
          <SettingItem
            title="Dark Mode"
            description="Use dark theme throughout the app"
            value={darkMode}
            onValueChange={handleDarkModeToggle}
          />
          
          <SettingItem
            title="Auto Sync"
            description="Automatically sync data when connected to WiFi"
            value={autoSync}
            onValueChange={handleAutoSyncToggle}
          />
        </View>

        {/* Privacy Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Location</Text>
          
          <SettingItem
            title="Location Services"
            description="Allow app to access your location for personalized content"
            value={locationServices}
            onValueChange={handleLocationToggle}
          />
        </View>

        {/* Actions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          
          <ActionButton
            title="Clear Cache"
            description="Free up storage space by clearing cached data"
            onPress={handleClearCache}
          />
          
          <ActionButton
            title="Reset Settings"
            description="Reset all settings to their default values"
            onPress={handleResetSettings}
            color="#ef4444"
          />
        </View>

        {/* App Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Version: 1.0.0</Text>
            <Text style={styles.infoText}>Build: 2024.12.02</Text>
            <Text style={styles.infoText}>Developer: Campus Team</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  settingContent: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 18,
  },
  actionButton: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 18,
  },
  infoContainer: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  infoText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
});