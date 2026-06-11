import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useProjects } from "../../context/ProjectsContext";

export default function NewProjectScreen() {
  const router = useRouter();
  const { addProject } = useProjects();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [year, setYear] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};

    if (name.trim().length < 3) e.name = "Min. 3 znaki";
    if (description.trim().length < 10) e.description = "Min. 10 znaków";

    const techs = technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (techs.length === 0) e.technologies = "Podaj min. 1 technologie";

    const y = parseInt(year, 10);
    if (isNaN(y) || y < 2000 || y > 2030) e.year = "Rok 2000–2030";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    addProject({
      name,
      description,
      technologies: technologies.split(",").map((t) => t.trim()),
      year: parseInt(year, 10),
    });

    Alert.alert("Sukces", "Projekt dodany!");
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Nowy projekt</Text>

          <Text style={styles.label}>Nazwa</Text>
          <TextInput
            style={[styles.input, errors.name && styles.errorInput]}
            value={name}
            onChangeText={setName}
            placeholder="np. Task Manager"
          />
          {errors.name && <Text style={styles.error}>{errors.name}</Text>}

          <Text style={styles.label}>Opis</Text>
          <TextInput
            style={[styles.input, errors.description && styles.errorInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Opis projektu"
            multiline
          />
          {errors.description && (
            <Text style={styles.error}>{errors.description}</Text>
          )}

          <Text style={styles.label}>Technologie (np. React, Node)</Text>
          <TextInput
            style={[styles.input, errors.technologies && styles.errorInput]}
            value={technologies}
            onChangeText={setTechnologies}
            placeholder="React, TypeScript"
          />
          {errors.technologies && (
            <Text style={styles.error}>{errors.technologies}</Text>
          )}

          <Text style={styles.label}>Rok</Text>
          <TextInput
            style={[styles.input, errors.year && styles.errorInput]}
            value={year}
            onChangeText={setYear}
            placeholder="2025"
            keyboardType="numeric"
          />
          {errors.year && <Text style={styles.error}>{errors.year}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Zapisz projekt</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.cancel}>Anuluj</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f8",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
  errorInput: {
    borderColor: "#ef4444",
  },
  error: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#10b981",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  cancel: {
    marginTop: 15,
    textAlign: "center",
    color: "#6b7280",
  },
});