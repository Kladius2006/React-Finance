import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'piggy_gold_transactions_v1';

export function useTransactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setTransactions(JSON.parse(raw));
      } catch (e) {
        console.warn('โหลดข้อมูลไม่สำเร็จ', e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions)).catch((e) =>
      console.warn('บันทึกข้อมูลไม่สำเร็จ', e)
    );
  }, [transactions, loaded]);

  const addTransaction = useCallback((tx: any) => {
    setTransactions((prev) => [tx, ...prev]);
  }, []);

  const removeTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  }, []);

  return { transactions, addTransaction, removeTransaction, loaded };
}