import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

export default function Link(props) {
  const { onPress, title = "Save", disabled = false } = props;
  return (
    <Pressable style={styles.button} onPress={onPress} disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "blue",
  },
});
