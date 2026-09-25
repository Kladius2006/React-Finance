import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useState } from 'react';

import Home from './Home';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';

export default function App() {

  const [page, setPage] = useState('home');

  return (
    <View style={styles.container}>

      {/* PAGE CONTENT */}

        {page === 'home' && <Home />}
        {page === 'page1' && <Page1 />}
        {page === 'page2' && <Page2 />}
        {page === 'page3' && <Page3 />}

        <StatusBar style="auto" />


      {/* BOTTOM MENU */}
      <View style={styles.bottomMenu}>

        {/* HOME */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setPage('home')}
        >
          <Text style={styles.menuItem}>Home</Text>
        </TouchableOpacity>


        {/* PAGE 1 */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setPage('page1')}
        >
          <Text style={styles.menuItem}>I</Text>
        </TouchableOpacity>


        {/* PAGE 2 */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setPage('page2')}
        >
          <Text style={styles.menuItem}>B</Text>
        </TouchableOpacity>


        {/* PAGE3 */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setPage('page3')}
        >
          <Text style={styles.menuItem}>S</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 100,
  },

  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    height: 70,

    flexDirection: 'row',

    borderTopWidth: 1,
    borderTopColor: '#000000',
  },

  menuButton: {
    flex: 1,
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',

    borderLeftWidth: 1,
    borderLeftColor: '#000',

    backgroundColor: '#207820',
  },

  menuItem: {
    fontSize: 20,
    color: '#fff',
  },

});