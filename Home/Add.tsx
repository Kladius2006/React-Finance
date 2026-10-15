import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Alert } from 'react-native';
import {addStyles} from './Add_styles'
import { translations } from '../config/language';
import { useLanguage } from '../config/LanguageContext';

export type Transaction = {
  id: string;
  type: 'income' | 'expense';
  date: string;
  amount: number;
  note: string;
};

type AddScreenProps = {
  onSave: (transaction: Transaction) => void;
  onBack: () => void;
  textMultiplier: number;
};

export default function AddScreen({ onSave, onBack, textMultiplier }: AddScreenProps) {
  // การเปลี่ยนภาษา (ตั้งค่าเริ่มต้นเป็นภาษาไทย)
  const styles = addStyles(textMultiplier);
  const { lang } = useLanguage(); 
  const t = translations[lang];

  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const handleSave = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert(t.error, t.invalid_amount);
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type,
      date: date || new Date().toISOString().split('T')[0],
      amount: parseFloat(amount),
      note: note.trim() || (type === 'income' ? t.income.replace(':', '').trim() : t.expenses),
    };

    onSave(newTransaction);
    
    setAmount('');
    setNote('');
    setType('expense');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.add_new_transaction}</Text>
      </View>
      
      <View style={styles.formContent}>
        <Text style={styles.label}>{t.category}</Text>
        <View style={styles.typeContainer}>
          <Pressable
            style={[styles.typeBtn, type === 'income' && styles.incomeActiveBtn]}
            onPress={() => setType('income')}
          >
            <Text style={[styles.typeBtnText, type === 'income' && styles.activeText]} testID='Income'>
              {t.income.replace(':', '').trim()}
            </Text>
          </Pressable>

          <Pressable
            style={[styles.typeBtn, type === 'expense' && styles.expenseActiveBtn]}
            onPress={() => setType('expense')}
          >
            <Text style={[styles.typeBtnText, type === 'expense' && styles.activeText]} testID='Expexse'>
              {t.expenses}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.label}>{t.date}</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#808080"
        />

        <Text style={styles.label}>{t.value}</Text>
        <TextInput
          style={styles.input}
          testID='Amount'
          value={amount}
          onChangeText={setAmount}
          placeholder="0.00"
          placeholderTextColor="#808080"
          keyboardType="numeric"
        />

        <Text style={styles.label}>{t.details}</Text>
        <TextInput
          style={styles.input}
          testID='Description'
          value={note}
          onChangeText={setNote}
          placeholder={lang === 'th' ? "เช่น ค่าข้าว, เงินเดือน" : "e.g., Food, Salary"}
          placeholderTextColor="#808080"
        />

        <Pressable style={styles.saveButton} testID='Save' onPress={handleSave}>
          <Text style={styles.saveButtonText}>{t.add}</Text>
        </Pressable>

        <Pressable style={styles.backButton} testID='Back' onPress={onBack}>
          <Text style={styles.backButtonText}>{t.cancel}</Text>
        </Pressable>
      </View>
    </View>
  );
}