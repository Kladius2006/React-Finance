import { StyleSheet } from 'react-native';

export const settingStyles = (textMultiplier: number) =>
    StyleSheet.create({

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
      fontSize: 12 * textMultiplier,
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
      fontSize: 28 * textMultiplier,
      color: '#172033',
      marginRight: 10,
    },

    title: {
      fontSize: 32 * textMultiplier,
      fontWeight: '800',
      color: '#172033',
    },

    sectionHeader: {
      marginBottom: 15,
    },

    sectionTitle: {
      fontSize: 20 * textMultiplier,
      fontWeight: '800',
      letterSpacing: 0.5,
      color: '#172033',
      marginBottom: 5,
    },

    sectionSub: {
      fontSize: 14 * textMultiplier,
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
      marginBottom: 20,
    },

    languageName: {
      fontSize: 17 * textMultiplier,
      fontWeight: '700',
      color: '#172033',
      marginBottom: 4,
    },

    languageSub: {
      fontSize: 13 * textMultiplier,
      color: '#9aa4b2',
    },

    arrow: {
      fontSize: 22 * textMultiplier,
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
      fontSize: 16 * textMultiplier,
      fontWeight: '600',
      color: '#172033',
      marginBottom: 3,
    },

    optionSub: {
      fontSize: 12 * textMultiplier,
      color: '#9aa4b2',
    },

    check: {
      fontSize: 22 * textMultiplier,
      fontWeight: '700',
      color: '#34C759',
    },

    scrollView: {
    flex: 1,
    },
    scrollContent: {
      paddingBottom: 140,
    },

  });