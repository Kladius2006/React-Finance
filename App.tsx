import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useState } from 'react';

import Home from './Home/App';
import Add from './Home/Add';
import Balance from './Balance/balance';
import Page4 from './Page4';
import GroupBillSplitUI from './Qr_code/QR_code';

export default function App() {

  const [page, setPage] = useState('home');

  // 1. เพิ่ม State สำหรับเก็บรายการธุรกรรมทั้งหมด
  const [transactions, setTransactions] = useState<any[]>([]);

  // 2. เพิ่มฟังก์ชันสำหรับรับบันทึกข้อมูลจากหน้า Add
  const handleSaveTransaction = (newTransaction: any) => {
    setTransactions([newTransaction, ...transactions]);
    setPage('home');
  };

  return (
    <View style={styles.container}>

      {/* PAGE CONTENT */}

        {/* ส่ง transactions ไปให้ Home แสดงผล */}
        {page === 'home' && <Home transactions={transactions} />}

        {page === 'add' && (
          <Add 
            onSave={handleSaveTransaction} 
            onBack={() => setPage('home')} 
          />
        )}
        {page === 'balance' && <Balance />}
        {page === 'qr_code' && <GroupBillSplitUI />}
        {page === 'page4' && <Page4 />}

        <StatusBar style="auto" />


      {/* BOTTOM MENU */}
      <View style={styles.bottomMenu}>

        {/* HOME */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setPage('home')}
        >
          <Text style={styles.menuItem}>Home</Text>
        </TouchableOpacity>


        {/* PAGE 1 */}
        <TouchableOpacity
          style={styles.menuButton}
          testID = 'IncomeExpense'
          onPress={() => setPage('add')}
        >
          <Text style={styles.menuItem}>Income/Expense</Text>
        </TouchableOpacity>


        {/* PAGE 2 */}
        <TouchableOpacity
          style={styles.menuButton}
          testID = 'Balance'
          onPress={() => setPage('balance')}
        >
          <Text style={styles.menuItem}>Balance</Text>
        </TouchableOpacity>


        {/* PAGE3 */}
        <TouchableOpacity
          style={styles.menuButton}
          testID = 'QRcode'
          onPress={() => setPage('qr_code')}
        >
          <Text style={styles.menuItem}>Share</Text>
        </TouchableOpacity>

        {/* PAGE4 */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setPage('page4')}
        >
          <Text style={styles.menuItem}>Settings</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 100,
  },

  bottomMenu: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,

    height: 70,

    flexDirection: 'row',

    borderTopWidth: 1,
    borderTopColor: '#000000',
  },

  menuButton: {
    flex: 1,
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',

    borderLeftWidth: 1,
    borderLeftColor: '#000',

    backgroundColor: '#207820',
  },

  menuItem: {
    fontSize: 20,
    color: '#fff',
  },

});