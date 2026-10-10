import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView,
} from 'react-native';
// 1. นำเข้า useLanguage จากไฟล์ Context ที่เราสร้าง
import { useLanguage } from '../config/LanguageContext'; 

type TextSizeProps = {
  textSize: string;
  setTextSize: React.Dispatch<React.SetStateAction<string>>;
  textMultiplier: number;
};

export default function Setting({textSize, setTextSize, textMultiplier}: TextSizeProps) {
  // 2. เรียกใช้งานตัวแปรส่วนกลาง (แทนที่ useState ตัวเดิม)
  const {lang, setLang } = useLanguage();
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

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
      fontSize: 13 * textMultiplier,
      fontWeight: '800',
      letterSpacing: 1.5,
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

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.smallTitle}>PERSONAL</Text>
        <View style={styles.titleRow}>
          <Text style={styles.gear}>⚙</Text>
          <Text style={styles.title}>Settings</Text>
        </View>
      </View>


      {/* EVERYTHING BELOW HEADER CAN SCROLL */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>LANGUAGE</Text>

          <Text style={styles.sectionSub}>
            Choose your preferred language
          </Text>
        </View>

      <TouchableOpacity
      testID='Language'
      style={styles.languageCard}
      onPress={() => setIsOpen1(!isOpen1)}>
        <View>
          <Text style={styles.languageName}>
            {lang === 'th' ? 'ภาษาไทย' : 'English'}
          </Text>
          <Text style={styles.languageSub}>
            {lang === 'th' ? 'Thai' : 'English'}
          </Text>
        </View>
        <Text style={styles.arrow}>{isOpen1 ? '⌃' : '⌄'}</Text>
      </TouchableOpacity>

      {isOpen1 && (
        <View style={styles.dropdownList}>

          <TouchableOpacity
            testID='LanguageTH'
            style={styles.option}
            onPress={() => {
              setLang('th');
              setIsOpen1(false);
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

            {lang === 'th' && (
              <Text style={styles.check}>✓</Text>
            )}

          </TouchableOpacity>

          <TouchableOpacity
            testID='LanguageEN'
            style={styles.option}
            onPress={() => {
              setLang('en');
              setIsOpen1(false);
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

            {lang === 'en' && (
              <Text style={styles.check}>✓</Text>
            )}

          </TouchableOpacity>

        </View>
      )}

      <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>TEXT SIZE</Text>

          <Text style={styles.sectionSub}>
            Choose your preferred text size
          </Text>
      </View>

      <TouchableOpacity
        testID='textSize'
        style={styles.languageCard}
        onPress={() => setIsOpen2(!isOpen2)}
      >

        <View>
          <Text style={styles.languageName}>
            {textSize === 'x1' ? 'x1' : textSize === 'x1.2' ? 'x1.2' : textSize === 'x1.5' ? 'x1.5' : 'x2'}
          </Text>

          <Text style={styles.languageSub}>
            {textSize === 'x1' ? 'x1' : textSize === 'x1.2' ? 'x1.2' : textSize === 'x1.5' ? 'x1.5' : 'x2'}
          </Text>
        </View>

        <Text style={styles.arrow}>
          {isOpen2 ? '⌃' : '⌄'}
        </Text>

      </TouchableOpacity>

      {isOpen2 && (
          <View style={styles.dropdownList}>

            <TouchableOpacity
              testID='textSizeX1'
              style={styles.option}
              onPress={() => {
                setTextSize('x1');
                setIsOpen2(false);
              }}
            >

              <View>
                <Text style={styles.optionText}>
                  x1
                </Text>

                <Text style={styles.optionSub}>
                  x1
                </Text>
              </View>

              {textSize === 'x1' && (
                <Text style={styles.check}>✓</Text>
              )}

            </TouchableOpacity>


            <TouchableOpacity
              testID='textSizeX1.2'
              style={styles.option}
              onPress={() => {
                setTextSize('x1.2');
                setIsOpen2(false);
              }}
            >

              <View>
                <Text style={styles.optionText}>
                  x1.2
                </Text>

                <Text style={styles.optionSub}>
                  x1.2
                </Text>
              </View>

              {textSize === 'x1.2' && (
                <Text style={styles.check}>✓</Text>
              )}

            </TouchableOpacity>


            <TouchableOpacity
              testID='textSizeX1.5'
              style={styles.option}
              onPress={() => {
                setTextSize('x1.5');
                setIsOpen2(false);
              }}
            >

              <View>
                <Text style={styles.optionText}>
                  x1.5
                </Text>

                <Text style={styles.optionSub}>
                  x1.5
                </Text>
              </View>

              {textSize === 'x1.5' && (
                <Text style={styles.check}>✓</Text>
              )}

            </TouchableOpacity>

            <TouchableOpacity
              testID='textSizeX2'
              style={styles.option}
              onPress={() => {
                setTextSize('x2');
                setIsOpen2(false);
              }}
            >

              <View>
                <Text style={styles.optionText}>
                  x2
                </Text>

                <Text style={styles.optionSub}>
                  x2
                </Text>
              </View>

              {textSize === 'x2' && (
                <Text style={styles.check}>✓</Text>
              )}

            </TouchableOpacity>

          </View>
        )}

    </ScrollView>
  </View>)}

