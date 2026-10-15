import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView,
} from 'react-native';
// 1. นำเข้า useLanguage จากไฟล์ Context ที่เราสร้าง
import {settingStyles} from './setting_styles'
import { translations } from '../config/language';
import { useLanguage } from './LanguageContext'; 

type TextSizeProps = {
  textSize: string;
  setTextSize: React.Dispatch<React.SetStateAction<string>>;
  textMultiplier: number;
};

export default function Setting({textSize, setTextSize, textMultiplier}: TextSizeProps) {
  // 2. เรียกใช้งานตัวแปรส่วนกลาง (แทนที่ useState ตัวเดิม)
  const styles = settingStyles(textMultiplier);
  const {lang, setLang } = useLanguage();
  const t = translations[lang];
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.gear}>⚙</Text>
          <Text style={styles.title}>{t.settings_title}</Text>
        </View>
      </View>


      {/* EVERYTHING BELOW HEADER CAN SCROLL */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t.language_section}</Text>

          <Text style={styles.sectionSub}>
            {t.choose_language}
          </Text>
        </View>

      <TouchableOpacity
      testID='Language'
      style={styles.languageCard}
      onPress={() => setIsOpen1(!isOpen1)}>
        <View>
          <Text style={styles.languageName}>
            {lang === 'th' ? t.thai_language : t.english_language}
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
                {t.thai_language}
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
                {t.english_language}
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
          <Text style={styles.sectionTitle}>{t.text_size_section}</Text>

          <Text style={styles.sectionSub}>
            {t.choose_text_size}
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

