import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useProjects } from '../../context/ProjectsContext';
import { useTheme } from '../../context/ThemeContext';
import { Stack } from "expo-router";

export default function ProjectsScreen() {
  const { projects, removeProject } = useProjects();
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const confirmDelete = (id: string, name: string) => {
    Alert.alert(
      'Usuń projekt',
      `Czy na pewno chcesz usunąć "${name}"?`,
      [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Usuń',
          style: 'destructive',
          onPress: () => removeProject(id),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#111827' : '#e6ecf0' }]}>
      <TouchableOpacity
        onPress={() => router.push('/projects/new')}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>+ Dodaj projekt</Text>
      </TouchableOpacity>
    <Stack
      screenOptions={{headerShown: false,}}
    />
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/projects/${item.id}`)}
            style={[
              styles.card,
              { backgroundColor: isDark ? '#1f2937' : '#fff' },
            ]}
          >
            <Text style={[styles.title, { color: isDark ? '#fff' : '#111' }]}>
              {item.name}
            </Text>

            <Text style={{ color: isDark ? '#9ca3af' : '#666' }}>
              {item.year}
            </Text>

            <TouchableOpacity onPress={() => confirmDelete(item.id, item.name)}>
              <Text style={styles.delete}>Usuń</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  addButton: {
    backgroundColor: '#10b981',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },

  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },

  card: {
    padding: 14,
    marginBottom: 10,
    borderRadius: 12,
    elevation: 2,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  delete: {
    color: '#ef4444',
    marginTop: 8,
    fontWeight: '600',
  },
});