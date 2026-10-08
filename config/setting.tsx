import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export default function Setting() {

  const [language, setLanguage] = useState('th');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.smallTitle}>PERSONAL</Text>

        <View style={styles.titleRow}>
          <Text style={styles.gear}>⚙</Text>
          <Text style={styles.title}>Settings</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>LANGUAGE</Text>

        <Text style={styles.sectionSub}>
          Choose your preferred language
        </Text>
      </View>

      <TouchableOpacity
        style={styles.languageCard}
        onPress={() => setIsOpen(!isOpen)}
      >

        <View>
          <Text style={styles.languageName}>
            {language === 'th' ? 'ภาษาไทย' : 'English'}
          </Text>

          <Text style={styles.languageSub}>
            {language === 'th' ? 'Thai' : 'English'}
          </Text>
        </View>

        <Text style={styles.arrow}>
          {isOpen ? '⌃' : '⌄'}
        </Text>

      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownList}>

          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              setLanguage('th');
              setIsOpen(false);
            }}
          >

            <View>
              <Text style={styles.optionText}>
                ภาษาไทย
              </Text>

              <Text style={styles.optionSub}>
                Thai
              </Text>
            </View>

            {language === 'th' && (
              <Text style={styles.check}>✓</Text>
            )}

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              setLanguage('en');
              setIsOpen(false);
            }}
          >

            <View>
              <Text style={styles.optionText}>
                English
              </Text>

              <Text style={styles.optionSub}>
                English
              </Text>
            </View>

            {language === 'en' && (
              <Text style={styles.check}>✓</Text>
            )}

          </TouchableOpacity>

        </View>
      )}

      <View style={styles.infoCard}>

        <Text style={styles.infoTitle}>
          App Language
        </Text>

        <Text style={styles.infoText}>
          This setting controls the language
          used throughout the application.
        </Text>

      </View>

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f4f7fb',
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  header: {
    marginBottom: 40,
  },

  smallTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#9aa4b2',
    marginBottom: 8,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  gear: {
    fontSize: 28,
    color: '#172033',
    marginRight: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#172033',
  },

  sectionHeader: {
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: '#172033',
    marginBottom: 5,
  },

  sectionSub: {
    fontSize: 14,
    color: '#8b95a5',
  },

  languageCard: {
    backgroundColor: '#ffffff',
    minHeight: 75,
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 15,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    shadowColor: '#172033',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 15,

    elevation: 4,
  },

  languageName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#172033',
    marginBottom: 4,
  },

  languageSub: {
    fontSize: 13,
    color: '#9aa4b2',
  },

  arrow: {
    fontSize: 22,
    color: '#7c8798',
  },

  dropdownList: {
    backgroundColor: '#ffffff',
    marginTop: 8,
    borderRadius: 18,
    overflow: 'hidden',

    shadowColor: '#172033',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 15,

    elevation: 4,
  },

  option: {
    minHeight: 70,
    paddingHorizontal: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderBottomWidth: 1,
    borderBottomColor: '#f0f2f5',
  },

  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#172033',
    marginBottom: 3,
  },

  optionSub: {
    fontSize: 12,
    color: '#9aa4b2',
  },

  check: {
    fontSize: 22,
    fontWeight: '700',
    color: '#34C759',
  },


  // Bottom information
  infoCard: {
    marginTop: 30,
    backgroundColor: '#172033',
    borderRadius: 20,
    padding: 22,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },

  infoText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#aeb7c5',
  },

});