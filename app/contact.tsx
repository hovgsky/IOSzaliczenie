import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function ContactScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#111827" : "#e6ecf0" },
      ]}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: isDark ? "#1f2937" : "#ffffff" },
        ]}
      >
        <Text style={[styles.title, { color: isDark ? "#fff" : "#111" }]}>
          Kontakt
        </Text>

        <Text style={[styles.text, { color: isDark ? "#d1d5db" : "#333" }]}>
          📧 Email: nero@example.com
        </Text>

        <Text style={[styles.text, { color: isDark ? "#d1d5db" : "#333" }]}>
          📱 Telefon: 123 456 789
        </Text>

        <Text style={[styles.text, { color: isDark ? "#d1d5db" : "#333" }]}>
          💻 GitHub: github.com/nero
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  card: {
    padding: 20,
    borderRadius: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});