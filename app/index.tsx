import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
  Switch,
} from 'react-native';

import { useProfile } from '../context/ProfileContext';
import { useTheme } from '../context/ThemeContext';

export default function ProfileScreen() {
  const { profile, updateProfile } = useProfile();
  const { theme, toggleTheme } = useTheme();

  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [skills, setSkills] = useState(profile.skills.join(', '));

  const isDark = theme === 'dark';

  const save = () => {
    if (name.trim().length < 2) {
      Alert.alert('Błąd', 'Imię za krótkie');
      return;
    }

    if (bio.trim().length < 10) {
      Alert.alert('Błąd', 'Opis za krótki');
      return;
    }

    const skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);

    if (skillsArray.length === 0) {
      Alert.alert('Błąd', 'Dodaj przynajmniej 1 umiejętność');
      return;
    }

    updateProfile({
      name,
      bio,
      skills: skillsArray,
    });

    setEditing(false);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#0f172a' : '#e6ecf0' },
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* HEADER + DARK MODE */}
        <View style={styles.topBar}>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#111' }]}>
            Portfolio Studenta
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: isDark ? '#fff' : '#111', marginRight: 8 }}>
              Dark
            </Text>
            <Switch value={isDark} onValueChange={toggleTheme} />
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: isDark ? '#1e293b' : '#fff' }]}>

          <Image
            source={require('../assets/profile.jpg')}
            style={styles.image}
          />

          {!editing ? (
            <>
              <Text style={[styles.name, { color: isDark ? '#fff' : '#111' }]}>
                {profile.name}
              </Text>

              <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#111' }]}>
                O mnie
              </Text>
              <Text style={{ color: isDark ? '#ddd' : '#333' }}>
                {profile.bio}
              </Text>

              <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#111' }]}>
                Umiejętności
              </Text>

              {profile.skills.map((s, i) => (
                <Text key={i} style={{ color: isDark ? '#ddd' : '#333' }}>
                  • {s}
                </Text>
              ))}

              <TouchableOpacity style={styles.button} onPress={() => setEditing(true)}>
                <Text style={styles.buttonText}>Edytuj profil</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Imię"
              />

              <TextInput
                style={styles.input}
                value={bio}
                onChangeText={setBio}
                placeholder="Opis"
                multiline
              />

              <TextInput
                style={styles.input}
                value={skills}
                onChangeText={setSkills}
                placeholder="Umiejętności"
              />

              <TouchableOpacity style={styles.button} onPress={save}>
                <Text style={styles.buttonText}>Zapisz</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setEditing(false)}>
                <Text style={{ textAlign: 'center', marginTop: 10 }}>
                  Anuluj
                </Text>
              </TouchableOpacity>
            </>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  topBar: {
    marginTop: 40,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  card: {
    padding: 20,
    borderRadius: 12,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#10b981',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#f3f3f3',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
});