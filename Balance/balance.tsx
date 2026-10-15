import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {balanceStyles} from './balance_styles'
import { translations } from '../config/language';
import { useLanguage } from '../config/LanguageContext';

LogBox.ignoreLogs([
  'InteractionManager has been deprecated',
]);

const STORAGE_KEY = '@money_balance_categories_v1';

type BalanceProp = {
  textMultiplier: number;
}

interface Category {
  id: string;
  name: string;
  allocated: number;
  spent: number;
}

export default function Balance({textMultiplier}: BalanceProp) {

  const styles = balanceStyles(textMultiplier);
  const { lang } = useLanguage();
  const t = translations[lang];

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [newName, setNewName] = useState('');
  const [newBudget, setNewBudget] = useState('');
  const [spendInputs, setSpendInputs] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveCategories(categories);
    }
  }, [categories, isLoading]);

  const loadCategories = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData !== null) {
        setCategories(JSON.parse(storedData));
      } else {
        setCategories([]);
      }
    } catch (e) {
      Alert.alert(t.error, t.load_error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCategories = async (data: Category[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving data:', e);
    }
  };

  const addCategory = () => {
    if (!newName.trim() || !newBudget.trim()) {
      Alert.alert(t.please_fill, t.fill_category_budget);
      return;
    }
    const allocatedAmount = parseFloat(newBudget);
    if (isNaN(allocatedAmount) || allocatedAmount <= 0) {
      Alert.alert(t.invalid_data, t.invalid_amount);
      return;
    }

    const newCat: Category = {
      id: Date.now().toString(),
      name: newName.trim(),
      allocated: allocatedAmount,
      spent: 0,
    };

    setCategories((prev) => [...prev, newCat]);
    setNewName('');
    setNewBudget('');
  };

  const deleteCategory = (id: string) => {
    Alert.alert(t.confirm_delete, t.confirm_delete_message, [
      { text: t.cancel, style: 'cancel' },
      {
        text: t.delete,
        style: 'destructive',
        onPress: () => {
          setCategories((prev) => prev.filter((cat) => cat.id !== id));
        },
      },
    ]);
  };

  const handleSpendInputChange = (id: string, text: string) => {
    setSpendInputs((prev) => ({ ...prev, [id]: text }));
  };

  const handleSpend = (id: string) => {
    const amountText = spendInputs[id];
    const amount = parseFloat(amountText || '');

    if (isNaN(amount) || amount <= 0) {
      Alert.alert(t.invalid_data, t.invalid_spend);
      return;
    }

    setCategories((prevCategories) => {
      const updatedList = [...prevCategories];
      const targetIndex = updatedList.findIndex((item) => item.id === id);

      if (targetIndex === -1) return prevCategories;

      const target = { ...updatedList[targetIndex] };
      const newSpent = target.spent + amount;
      target.spent = newSpent;
      updatedList[targetIndex] = target;

      let deficit = target.spent - target.allocated;

      if (deficit > 0) {
        let currentDeficit = deficit;

        for (let i = updatedList.length - 1; i >= 0; i--) {
          if (i === targetIndex) continue;

          const lowerCat = { ...updatedList[i] };
          const availableInLower = lowerCat.allocated - lowerCat.spent;

          if (availableInLower > 0) {
            if (availableInLower >= currentDeficit) {
              lowerCat.allocated -= currentDeficit;
              target.allocated += currentDeficit;
              updatedList[i] = lowerCat;
              updatedList[targetIndex] = target;
              currentDeficit = 0;
              break;
            } else {
              lowerCat.allocated -= availableInLower;
              target.allocated += availableInLower;
              currentDeficit -= availableInLower;
              updatedList[i] = lowerCat;
              updatedList[targetIndex] = target;
            }
          }
        }

        if (currentDeficit > 0) {
          Alert.alert(t.balance_warning, t.balance_warning_message);
        }
      }

      return updatedList;
    });

    setSpendInputs((prev) => ({ ...prev, [id]: '' }));
  };

  const totalAllocated = categories.reduce((sum, item) => sum + item.allocated, 0);
  const totalSpent = categories.reduce((sum, item) => sum + item.spent, 0);
  const renderItem = ({ item, drag, isActive, getIndex }: RenderItemParams<Category>) => {
    const index = getIndex() ?? 0;
    const remaining = item.allocated - item.spent;

    return (
      <ScaleDecorator>
        <TouchableOpacity
          testID={`category-card-${index}`}
          activeOpacity={0.9}
          onLongPress={drag}
          disabled={isActive}
          style={[styles.card, isActive && styles.cardActive]}
        >
          <View style={styles.cardHeader}>
            <View style={styles.titleContainer}>
              <Text style={styles.priorityBadge}>#{index + 1}</Text>
              <Text style={styles.categoryName}>{item.name}</Text>
            </View>
            <View style={styles.rightHeaderContainer}>
              <Text style={styles.dragHint}>{t.drag_hint}</Text>

              <TouchableOpacity
                onPress={() => deleteCategory(item.id)}
                style={styles.deleteButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.deleteText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.cardDetail}>
            <Text style={styles.detailText}>
              {t.allocated} <Text style={styles.bold}>{item.allocated.toLocaleString()} B</Text>
            </Text>
            <Text style={styles.detailText}>
              {t.spent} <Text style={styles.bold}>{item.spent.toLocaleString()} B</Text>
            </Text>
            <Text style={[styles.detailText, { color: remaining < 0 ? '#e74c3c' : '#2ecc71' }]}>
              {t.remaining} <Text style={styles.bold}>{remaining.toLocaleString()} B</Text>
            </Text>
          </View>

          <View style={styles.spendInputRow}>
            <TextInput
              style={styles.spendInput}
              placeholder={t.spend_placeholder}
              keyboardType="numeric"
              value={spendInputs[item.id] || ''}
              onChangeText={(text) => handleSpendInputChange(item.id, text)}
            />
            <TouchableOpacity
              style={styles.spendSubmitButton}
              onPress={() => handleSpend(item.id)}
            >
              <Text style={styles.spendSubmitText}>{t.save_spend}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={{ marginTop: 10, color: '#666' }}>{t.loading}</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>{t.total_balance}</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>{t.total_allocated} {totalAllocated.toLocaleString()} B</Text>
            <Text style={styles.summaryText}>{t.total_spent} {totalSpent.toLocaleString()} B</Text>
          </View>
        </View>

        <View style={styles.addForm}>
          <TextInput
            testID="category_name"
            style={[styles.input, { flex: 2 }]}
            placeholder={t.category_name_placeholder}
            placeholderTextColor="#808080"
            value={newName}
            onChangeText={setNewName}
          />
          <TextInput
            testID="budget"
            style={[styles.input, { flex: 1.5 }]}
            placeholder={t.budget_placeholder}
            placeholderTextColor="#808080"
            keyboardType="numeric"
            value={newBudget}
            onChangeText={setNewBudget}
          />
          <TouchableOpacity testID="add_button" style={styles.addButton} onPress={addCategory}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeader}>
          {t.priority}
        </Text>

        {categories.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{t.no_categories}</Text>
            <Text style={styles.emptySubText}>{t.add_category_hint}</Text>
          </View>
        ) : (
          <DraggableFlatList
            data={categories}
            onDragEnd={({ data }) => setCategories(data)}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            containerStyle={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 150 }}
            activationDistance={10}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
}