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

LogBox.ignoreLogs([
  'InteractionManager has been deprecated',
]);

const STORAGE_KEY = '@money_balance_categories_v1';

interface Category {
  id: string;
  name: string;
  allocated: number;
  spent: number;
}

export default function Balance() {
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
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถโหลดข้อมูลจากหน่วยความจำได้');
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
      Alert.alert('กรุณากรอกข้อมูล', 'ระบุชื่อหมวดหมู่และจำนวนเงินให้ครบถ้วน');
      return;
    }
    const allocatedAmount = parseFloat(newBudget);
    if (isNaN(allocatedAmount) || allocatedAmount <= 0) {
      Alert.alert('ข้อมูลไม่ถูกต้อง', 'กรุณาระบุจำนวนเงินเป็นตัวเลขที่มากกว่า 0');
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
    Alert.alert('ยืนยันการลบ', 'คุณต้องการลบหมวดหมู่นี้หรือไม่?', [
      { text: 'ยกเลิก', style: 'cancel' },
      {
        text: 'ลบ',
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
      Alert.alert('ข้อมูลไม่ถูกต้อง', 'กรุณากรอกจำนวนเงินจ่ายที่ถูกต้อง');
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
          Alert.alert(
            'เตือนสมดุลเงิน',
            'เงินในหมวดหมู่อื่นๆ ไม่พอชดเชยส่วนเกินนี้!'
          );
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
              <Text style={styles.dragHint}>⋮⋮ กดค้างเพื่อลาก</Text>

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
              จัดสรร: <Text style={styles.bold}>{item.allocated.toLocaleString()} B</Text>
            </Text>
            <Text style={styles.detailText}>
              ใช้ไป: <Text style={styles.bold}>{item.spent.toLocaleString()} B</Text>
            </Text>
            <Text style={[styles.detailText, { color: remaining < 0 ? '#e74c3c' : '#2ecc71' }]}>
              เหลือ: <Text style={styles.bold}>{remaining.toLocaleString()} B</Text>
            </Text>
          </View>

          <View style={styles.spendInputRow}>
            <TextInput
              style={styles.spendInput}
              placeholder="จำนวนเงินที่จ่าย (บาท)"
              keyboardType="numeric"
              value={spendInputs[item.id] || ''}
              onChangeText={(text) => handleSpendInputChange(item.id, text)}
            />
            <TouchableOpacity
              style={styles.spendSubmitButton}
              onPress={() => handleSpend(item.id)}
            >
              <Text style={styles.spendSubmitText}>บันทึกจ่าย</Text>
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
        <Text style={{ marginTop: 10, color: '#666' }}>กำลังโหลดข้อมูล...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>ยอดเงินรวมในระบบ</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>จัดสรรรวม: {totalAllocated.toLocaleString()} B</Text>
            <Text style={styles.summaryText}>ใช้ไปรวม: {totalSpent.toLocaleString()} B</Text>
          </View>
        </View>

        <View style={styles.addForm}>
          <TextInput
            testID = "category_name"
            style={[styles.input, { flex: 2 }]}
            placeholder="ชื่อหมวด (เช่น ค่าห้อง)"
            value={newName}
            onChangeText={setNewName}
          />
          <TextInput
            testID = "budget"
            style={[styles.input, { flex: 1.5 }]}
            placeholder="งบ (บาท)"
            keyboardType="numeric"
            value={newBudget}
            onChangeText={setNewBudget}
          />
          <TouchableOpacity testID = "add_button" style={styles.addButton} onPress={addCategory}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeader}>
          ลำดับความสำคัญ (บนสุด = สำคัญที่สุด)
        </Text>

        {categories.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>ยังไม่มีหมวดหมู่เงินจัดสรร</Text>
            <Text style={styles.emptySubText}>กรอกชื่อหมวดหมู่และงบประมาณด้านบนเพื่อเพิ่มรายการ</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
  },
  summaryContainer: {
    backgroundColor: '#2c3e50',
    padding: 16,
    borderRadius: 12,
    marginTop: 40,
    marginBottom: 12,
  },
  summaryTitle: {
    color: '#ecf0f1',
    fontSize: 14,
    marginBottom: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addForm: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    backgroundColor: '#3498db',
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 13,
    color: '#7f8c8d',
    marginBottom: 8,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#95a5a6',
    fontWeight: 'bold',
  },
  emptySubText: {
    fontSize: 12,
    color: '#bdc3c7',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardActive: {
    backgroundColor: '#eaf2f8',
    borderColor: '#3498db',
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rightHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priorityBadge: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  dragHint: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  deleteButton: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  deleteText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 6,
  },
  detailText: {
    fontSize: 13,
    color: '#666',
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
  spendInputRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  spendInput: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  spendSubmitButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spendSubmitText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});