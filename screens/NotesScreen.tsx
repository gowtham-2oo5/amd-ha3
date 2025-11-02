import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  FlatList,
  StyleSheet,
  Alert,
  Platform,
  ToastAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Note {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const titleInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);

  // Validation functions
  const validateTitle = (text: string) => {
    if (text.length < 3) {
      setTitleError('Title must be at least 3 characters long');
      return false;
    }
    setTitleError('');
    return true;
  };

  const validateDescription = (text: string) => {
    if (text.length < 10) {
      setDescriptionError('Description must be at least 10 characters long');
      return false;
    }
    setDescriptionError('');
    return true;
  };

  const isFormValid = () => {
    return title.length >= 3 && description.length >= 10 && !titleError && !descriptionError;
  };

  const handleTitleChange = (text: string) => {
    setTitle(text);
    validateTitle(text);
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
    validateDescription(text);
  };

  const handleTitleSubmit = () => {
    // Focus next TextInput when pressing return
    descriptionInputRef.current?.focus();
  };

  const saveNote = () => {
    if (!isFormValid()) return;

    const noteData = {
      id: editingId || Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      createdAt: new Date().toLocaleString(),
    };

    if (editingId) {
      // Update existing note
      setNotes(prev => prev.map(note => 
        note.id === editingId ? noteData : note
      ));
    } else {
      // Add new note
      setNotes(prev => [noteData, ...prev]);
    }

    // Clear form
    setTitle('');
    setDescription('');
    setEditingId(null);
    titleInputRef.current?.focus();

    // Platform-specific feedback
    if (Platform.OS === 'android') {
      ToastAndroid.show(
        editingId ? 'Note updated successfully!' : 'Note saved successfully!',
        ToastAndroid.SHORT
      );
    } else {
      Alert.alert(
        'Success',
        editingId ? 'Note updated successfully!' : 'Note saved successfully!'
      );
    }
  };

  const editNote = (note: Note) => {
    setTitle(note.title);
    setDescription(note.description);
    setEditingId(note.id);
    titleInputRef.current?.focus();
  };

  const deleteNote = (id: string) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setNotes(prev => prev.filter(note => note.id !== id)),
        },
      ]
    );
  };

  const renderNote = ({ item }: { item: Note }) => (
    <View style={styles.noteCard}>
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.noteDescription}>{item.description}</Text>
      <Text style={styles.noteDate}>{item.createdAt}</Text>
      <View style={styles.noteActions}>
        <Button title="Edit" onPress={() => editNote(item)} />
        <Button title="Delete" color="#ef4444" onPress={() => deleteNote(item.id)} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Form Section */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>
            {editingId ? 'Edit Note' : 'Add New Note'}
          </Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              ref={titleInputRef}
              style={[styles.textInput, titleError ? styles.inputError : null]}
              value={title}
              onChangeText={handleTitleChange}
              placeholder="Enter note title..."
              returnKeyType="next"
              onSubmitEditing={handleTitleSubmit}
            />
            {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              ref={descriptionInputRef}
              style={[styles.textInput, styles.textArea, descriptionError ? styles.inputError : null]}
              value={description}
              onChangeText={handleDescriptionChange}
              placeholder="Enter note description..."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            {descriptionError ? <Text style={styles.errorText}>{descriptionError}</Text> : null}
          </View>

          <Button
            title={editingId ? 'Update Note' : 'Save Note'}
            onPress={saveNote}
            disabled={!isFormValid()}
          />
          
          {editingId && (
            <Button
              title="Cancel Edit"
              onPress={() => {
                setTitle('');
                setDescription('');
                setEditingId(null);
              }}
              color="#64748b"
            />
          )}
        </View>

        {/* Notes List */}
        <View style={styles.notesContainer}>
          <Text style={styles.notesTitle}>Saved Notes ({notes.length})</Text>
          {notes.length === 0 ? (
            <Text style={styles.emptyText}>No notes yet. Create your first note above!</Text>
          ) : (
            <FlatList
              data={notes}
              renderItem={renderNote}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}
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
  scrollContainer: {
    padding: 16,
  },
  formContainer: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 100,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
  notesContainer: {
    flex: 1,
  },
  notesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 16,
    marginTop: 32,
  },
  noteCard: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  noteDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 8,
  },
  noteDate: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 12,
  },
  noteActions: {
    flexDirection: 'row',
    gap: 8,
  },
});