import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}>
        <Text>This is Page3</Text>
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,

    // Prevent the bottom menu from covering the last content
    paddingBottom: 100,
  },
  bottomMenu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: "#000000",
  },
  menuButton: {
  flex: 1,                  // Each button takes equal width
  height: "100%",           // Fill menu height

  justifyContent: "center",
  alignItems: "center",

  borderLeftWidth: 1,
  borderLeftColor: "#000",

  backgroundColor: "#207820",
  },
  Title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  menuItem: {
    fontSize: 20,
    color: '#fff'
  }
});