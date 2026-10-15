import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {appStyles} from './App_styles'
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
  onDelete?: (id: string) => void;
};

export default function Home({ transactions = [], textMultiplier, onDelete }: HomeProps) {

  const styles = appStyles(textMultiplier);
  const { lang } = useLanguage(); 
  const t = translations[lang];

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

    const confirmDelete = (id: string, note: string) => {
    Alert.alert(
      t.confirm_delete,
      t.delete_transaction_message.replace('{note}', note),
      [
        { text: t.cancel, style: 'cancel' },
        {
          text: t.delete,
          style: 'destructive',
          onPress: () => onDelete?.(id),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
      >

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
          {transactions.length === 0 ? (
            <Text style={styles.emptyText}>
              {t.non_data}
            </Text>
          ) : (
            transactions.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemNote}>{item.note}</Text>
                  <Text style={styles.itemDate}>{item.date}</Text>
                </View>

                <Text
                  style={[
                    styles.itemAmount,
                    {
                      color: item.type === 'income' ? '#29a248' : '#cb322a',
                    },
                  ]}
                >
                  {item.type === 'income' ? '+' : '-'}
                  ฿{item.amount.toLocaleString()}
                </Text>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => confirmDelete(item.id, item.note)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  accessibilityRole="button"
                  accessibilityLabel={t.delete}
                  testID={`Delete-${item.id}`}
                >
                  <Ionicons name="trash-outline" size={20} color="#cb322a" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </View>
      </ScrollView>
    </View>
  );
}