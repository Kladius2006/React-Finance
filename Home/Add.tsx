import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Alert } from 'react-native';
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

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    top: 50,
    fontWeight: 'bold',
    color: '#333',
  },
  formContent: {
    flex: 1,
    marginTop: 80,
    paddingHorizontal: 20,
  },
  label: { fontSize: 14 * textMultiplier, fontWeight: 'bold', color: '#444', marginBottom: 6 },
  typeContainer: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  typeBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  incomeActiveBtn: { backgroundColor: '#34C759' },
  expenseActiveBtn: { backgroundColor: '#FF3B30' },
  typeBtnText: { fontWeight: 'bold', color: '#555' },
  activeText: { color: '#ffffff' },
  input: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 14,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  backButton: {
    marginTop: 10,
    paddingVertical: 12,
    backgroundColor: '#8e8e93',
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.add_new_transaction}</Text>
      
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
        />

        <Text style={styles.label}>{t.value}</Text>
        <TextInput
          style={styles.input}
          testID='Amount'
          value={amount}
          onChangeText={setAmount}
          placeholder="0.00"
          keyboardType="numeric"
        />

        <Text style={styles.label}>{t.details}</Text>
        <TextInput
          style={styles.input}
          testID='Description'
          value={note}
          onChangeText={setNote}
          placeholder={lang === 'th' ? "เช่น ค่าข้าว, เงินเดือน" : "e.g., Food, Salary"}
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