import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LegacyClockState {
  currentTime: string;
}

export default class LegacyClock extends Component<{}, LegacyClockState> {
  private intervalId: NodeJS.Timeout | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      currentTime: new Date().toLocaleTimeString(),
    };
  }

  componentDidMount() {
    // Set up interval to update time every second
    this.intervalId = setInterval(() => {
      this.setState({
        currentTime: new Date().toLocaleTimeString(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    // Clean up interval
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.timeText}>{this.state.currentTime}</Text>
        <Text style={styles.labelText}>Current Time</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
  },
  timeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    fontFamily: 'monospace',
  },
  labelText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
});