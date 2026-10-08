import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { translations } from '../config/language';

type HomeProps = {
  transactions?: Array<{
    id: string;
    type: 'income' | 'expense';
    date: string;
    amount: number;
    note: string;
  }>;
};

export default function Home({ transactions = [] }: HomeProps) {
  // การเปลี่ยนภาษา (ตั้งค่าเริ่มต้นเป็นภาษาไทย)
  const [lang, setLang] = useState<'th' | 'en'>('th');
  const t = translations[lang];

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Money Expo</Text>

      <View style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>{t.balance}</Text>
          <Text style={[styles.summaryBalance, { color: balance >= 0 ? '#34C759' : '#FF3B30' }]}>
            ฿{balance.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
          </Text>
          <View style={styles.summaryRow}>
            <Text style={{ color: '#34C759', fontWeight: '600' }}>
              {t.income} +฿{totalIncome.toLocaleString()}
            </Text>
            <Text style={{ color: '#FF3B30', fontWeight: '600' }}>
              {t.expenses}: -฿{totalExpense.toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.listSection}>
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.emptyText}>{t.non_data}</Text>
            }
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemNote}>{item.note}</Text>
                  <Text style={styles.itemDate}>{item.date}</Text>
                </View>
                <Text
                  style={[
                    styles.itemAmount,
                    { color: item.type === 'income' ? '#34C759' : '#FF3B30' },
                  ]}
                >
                  {item.type === 'income' ? '+' : '-'}฿{item.amount.toLocaleString()}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    marginTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 80, 
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    top: 40,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  summaryLabel: { fontSize: 14, color: '#666' },
  summaryBalance: { fontSize: 26, fontWeight: 'bold', marginVertical: 4 },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  listSection: { flex: 1 },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 30 },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemNote: { fontSize: 16, fontWeight: '500', color: '#333' },
  itemDate: { fontSize: 12, color: '#999', marginTop: 2 },
  itemAmount: { fontSize: 16, fontWeight: 'bold' },
});