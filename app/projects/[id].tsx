import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useProjects } from "../../context/ProjectsContext";
import { useTheme } from "../../context/ThemeContext";

export default function ProjectDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { projects, removeProject, updateProject } = useProjects();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const project = projects.find((p) => p.id === String(id));

  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState(project?.name ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [technologies, setTechnologies] = useState(
    project?.technologies.join(", ") ?? ""
  );
  const [year, setYear] = useState(project?.year?.toString() ?? "");

  if (!project) {
    return (
      <View style={[styles.center, { backgroundColor: isDark ? "#111827" : "#e6ecf0" }]}>
        <Text style={{ color: isDark ? "#fff" : "#000" }}>
          Nie znaleziono projektu
        </Text>

        <TouchableOpacity onPress={() => router.push("/projects")}>
          <Text style={{ color: "#3b82f6", marginTop: 10 }}>
            ← Wróć do projektów
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleUpdate = () => {
    updateProject({
      id: project.id,
      name,
      description,
      technologies: technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      year: parseInt(year, 10),
    });

    setEditMode(false);
    Alert.alert("Sukces", "Projekt zaktualizowany!");
  };

  const handleDelete = () => {
    Alert.alert("Usuń", "Na pewno?", [
      { text: "Anuluj", style: "cancel" },
      {
        text: "Usuń",
        style: "destructive",
        onPress: () => {
          removeProject(project.id);

          // 🔥 SAFE NAVIGATION (działa nawet bez Stacka)
          router.replace("/projects");
        },
      },
    ]);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#111827" : "#e6ecf0" },
      ]}
    >
      <TouchableOpacity
        onPress={() => router.push("/projects")}
          style={{
            backgroundColor: "#3b82f6",
            paddingVertical: 10,
            paddingHorizontal: 14,
            borderRadius: 8,
            alignSelf: "flex-start",
            marginBottom: 15,
          }}
        >
        <Text style={{ color: "#fff", fontWeight: "600" }}>
          ← Wróć do projektów
        </Text>
      </TouchableOpacity>
      {!editMode ? (
        <>
          <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
            {project.name}
          </Text>

          <Text style={{ color: isDark ? "#ccc" : "#000" }}>
            {project.description}
          </Text>

          <Text style={{ color: isDark ? "#ccc" : "#000" }}>
            {project.technologies.join(", ")}
          </Text>

          <Text style={{ color: isDark ? "#ccc" : "#000" }}>
            {project.year}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setEditMode(true)}
          >
            <Text style={styles.buttonText}>Edytuj</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.delete} onPress={handleDelete}>
            <Text style={styles.buttonText}>Usuń</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            value={technologies}
            onChangeText={setTechnologies}
          />
          <TextInput
            style={styles.input}
            value={year}
            onChangeText={setYear}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Zapisz</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setEditMode(false)}>
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              Anuluj
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },

  button: {
    backgroundColor: "#3b82f6",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },

  delete: {
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },

  buttonText: { color: "#fff", textAlign: "center" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});