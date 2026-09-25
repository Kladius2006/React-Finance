import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Alert } from 'react-native';

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
};

export default function AddScreen({ onSave, onBack }: AddScreenProps) {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const handleSave = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกจำนวนเงินให้ถูกต้อง');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type,
      date: date || new Date().toISOString().split('T')[0],
      amount: parseFloat(amount),
      note: note.trim() || (type === 'income' ? 'รายรับ' : 'รายจ่าย'),
    };

    onSave(newTransaction);
    
    // เคลียร์ฟอร์ม
    setAmount('');
    setNote('');
    setType('expense');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>หน้าเพิ่มรายการใหม่</Text>
      
      <View style={styles.formContent}>
        <Text style={styles.label}>ประเภทรายการ</Text>
        <View style={styles.typeContainer}>
          <Pressable
            style={[styles.typeBtn, type === 'income' && styles.incomeActiveBtn]}
            onPress={() => setType('income')}
          >
            <Text style={[styles.typeBtnText, type === 'income' && styles.activeText]}>รายรับ</Text>
          </Pressable>

          <Pressable
            style={[styles.typeBtn, type === 'expense' && styles.expenseActiveBtn]}
            onPress={() => setType('expense')}
          >
            <Text style={[styles.typeBtnText, type === 'expense' && styles.activeText]}>รายจ่าย</Text>
          </Pressable>
        </View>

        <Text style={styles.label}>วันที่ (ปี-เดือน-วัน)</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
        />

        <Text style={styles.label}>จำนวนเงิน (บาท)</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="0.00"
          keyboardType="numeric"
        />

        <Text style={styles.label}>รายละเอียด / หมายเหตุ</Text>
        <TextInput
          style={styles.input}
          value={note}
          onChangeText={setNote}
          placeholder="เช่น ค่าข้าว, เงินเดือน"
        />

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>บันทึกรายการ</Text>
        </Pressable>

        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>ย้อนกลับ</Text>
        </Pressable>
      </View>
    </View>
  );
}

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
  label: { fontSize: 14, fontWeight: 'bold', color: '#444', marginBottom: 6 },
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