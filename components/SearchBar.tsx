import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {
  withHorizontalPadding: boolean;
};

const SearchBar = ({ withHorizontalPadding }: Props) => {
  return (
    <View
      style={[
        styles.container,
        withHorizontalPadding && { paddingHorizontal: 20 },
      ]}
    >
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color={Colors.lightGrey} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={Colors.lightGrey}
          style={styles.searchText}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: "#E4E4E4",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchText: {
    fontSize: 14,
    flex: 1,
    color: Colors.darkGrey,
  },
});