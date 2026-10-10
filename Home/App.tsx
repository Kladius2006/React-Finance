import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { translations } from '../config/language';
import { useLanguage } from '../config/LanguageContext';

type HomeProps = {
  transactions?: Array<{
    id: string;
    type: 'income' | 'expense';
    date: string;
    amount: number;
    note: string;
  }>;
  textMultiplier: number;
};

export default function Home({ transactions = [], textMultiplier }: HomeProps) {
  // การเปลี่ยนภาษา (ตั้งค่าเริ่มต้นเป็นภาษาไทย)
  const { lang } = useLanguage(); 
  const t = translations[lang];

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8fafc',
    },
    content: {
      flex: 1,
      marginTop: 30,
      paddingHorizontal: 20,
      paddingBottom: 80, 
    },
    header: {
      backgroundColor: '#2C3E50', 
      paddingTop: 20,
      paddingBottom: 24,
      marginHorizontal: 16,
      marginTop: 50,
      borderRadius: 24,
      alignItems: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    title: {
      fontSize: 22 * textMultiplier,
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#FFFFFF',
      letterSpacing: 0.5,
    },
    summaryCard: {
      backgroundColor: '#ffffff',
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    summaryLabel: { fontSize: 14 * textMultiplier, color: '#666' },
    summaryBalance: { fontSize: 32 * textMultiplier, fontWeight: 'bold', marginVertical: 4 },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: '#eee',
    },
    sectionHeader: {
      fontSize: 16 * textMultiplier,
      fontWeight: '600',
      color: '#334155',
      marginBottom: 12,
    },
    listSection: { flex: 1 },
    emptyText: { textAlign: 'center', color: '#999', marginTop: 30 },
    itemCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 12,
      marginBottom: 10,
      elevation: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    itemNote: { fontSize: 16 * textMultiplier, fontWeight: '500', color: '#333' },
    itemDate: { fontSize: 12 * textMultiplier, color: '#999', marginTop: 2 },
    itemAmount: { fontSize: 16 * textMultiplier, fontWeight: 'bold' },
  });

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Piggy Gold</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>{t.balance}</Text>
          <Text style={[styles.summaryBalance, { color: balance >= 0 ? '#29a248' : '#cb322a' }]}>
            ฿{balance.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
          </Text>
          <View style={styles.summaryRow}>
            <Text style={{ color: '#29a248', fontWeight: '600',fontSize: 15 * textMultiplier }}>
              {t.income} +฿{totalIncome.toLocaleString()}
            </Text>
            <Text style={{ color: '#cb322a', fontWeight: '600',fontSize: 15 * textMultiplier }}>
              {t.expenses}: -฿{totalExpense.toLocaleString()}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionHeader}>{t.recent_transections}</Text>

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
                    { color: item.type === 'income' ? '#29a248' : '#cb322a' },
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