import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [textSize, setTextSize] = useState(1);

  return (
    <View style={styles.container}>

        <Text style={styles.title}>Settings</Text>
        <StatusBar style="auto" />

        <View style={styles.content}>
          <Text style={{fontSize:20*textSize}}>Lorem Ipsum</Text>
          
          <View style={styles.fontRow}>
            <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setTextSize(1)}>
              <Text style={styles.menuItem}>x1</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setTextSize(2)}>
              <Text style={styles.menuItem}>x2</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setTextSize(4)}>
              <Text style={styles.menuItem}>x4</Text>
            </TouchableOpacity>
          </View>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fontRow: {
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
  title: {
    fontSize: 22,
    textAlign: 'center',
    top: 40,
    fontWeight: 'bold',
    color: '#333',
  },
  menuItem: {
    fontSize: 20,
    color: '#fff'
  },
  content: {
    flex: 1,
    marginTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 80, // เผื่อระยะด้านล่างไม่ให้เมนูบังรายการ
  },
  
});