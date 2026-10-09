
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { LanguageProvider } from './config/LanguageContext';

import Home from './Home/App';
import Add from './Home/Add';
import Balance from './Balance/balance';
import GroupBillSplitUI from './Qr_code/QR_code';
import Setting from './config/setting';

type Page = 'home' | 'add' | 'balance' | 'qr_code' | 'setting';

const NAV_ITEMS: {
  page: Page;
  label: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  testID?: string;
}[] = [
  {
    page: 'home',
    label: 'Home',
    icon: 'home-outline',
    testID: 'Home',
  },
  {
    page: 'add',
    label: 'Income/Expense',
    icon: 'add-circle-outline',
    testID: 'IncomeExpense',
  },
  {
    page: 'balance',
    label: 'Balance',
    icon: 'wallet-outline',
    testID: 'Balance',
  },
  {
    page: 'qr_code',
    label: 'Share',
    icon: 'qr-code-outline',
    testID: 'QRcode',
  },
  {
    page: 'setting',
    label: 'Settings',
    icon: 'settings-outline',
    testID: 'Settings',
  },
];

export default function App() {
  const [page, setPage] = useState<Page>('home');

  const [transactions, setTransactions] = useState<any[]>([]);

  const handleSaveTransaction = (newTransaction: any) => {
    setTransactions((previous) => [newTransaction, ...previous]);
    setPage('home');
  };

  const [textSize, setTextSize] = useState<string>('x1');

  const textMultipliers: Record<string, number> = {
    x1: 1,
    x2: 2,
    x4: 4,
  };

  const textMultiplier = textMultipliers[textSize];

  return (
    <LanguageProvider>
      <View style={styles.container}>
        <StatusBar style="dark" />

        {/* PAGE CONTENT */}
        <View style={styles.pageContent}>
          {page === 'home' && (
            <Home transactions={transactions} />
          )}

          {page === 'add' && (
            <Add
              textMultiplier={textMultiplier}
              onSave={handleSaveTransaction}
              onBack={() => setPage('home')}
            />
          )}

          {page === 'balance' && <Balance />}

          {page === 'qr_code' && <GroupBillSplitUI />}

          {page === 'setting' && (
            <Setting
              textSize={textSize}
              setTextSize={setTextSize}
            />
          )}
        </View>

        {/* MODERN BOTTOM NAVIGATION */}
        <View style={styles.bottomMenu}>
          {NAV_ITEMS.map((item) => {
            const isActive = page === item.page;

            return (
              <TouchableOpacity
                key={item.page}
                testID={item.testID}
                accessibilityRole="button"
                accessibilityLabel={item.label}
                accessibilityState={{ selected: isActive }}
                activeOpacity={0.75}
                style={[
                  styles.menuButton,
                  isActive && styles.activeMenuButton,
                ]}
                onPress={() => setPage(item.page)}
              >
                <View
                  style={[
                    styles.iconContainer,
                    isActive && styles.activeIconContainer,
                  ]}
                >
                  <Ionicons
                    name={
                      isActive
                        ? item.icon.replace('-outline', '') as React.ComponentProps<typeof Ionicons>['name']
                        : item.icon
                    }
                    size={23}
                    color={isActive ? '#167D55' : '#8B95A5'}
                  />
                </View>

                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={[
                    styles.menuItem,
                    isActive && styles.activeMenuItem,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F5',
  },

  pageContent: {
    flex: 1,
  },

  // Floating navigation bar
  bottomMenu: {
    position: 'absolute',
    bottom: 28,
    left: 14,
    right: 14,
    height: 72,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    backgroundColor: '#FFFFFF',
    borderRadius: 23,

    paddingHorizontal: 4,

    borderWidth: 1,
    borderColor: '#E9EFEB',

    shadowColor: '#183C2C',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 8,
    marginBottom: 20,
  },

  menuButton: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 1,
  },

  iconContainer: {
    width: 40,
    height: 34,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
  },

  activeIconContainer: {
    backgroundColor: 'transparent',
  },

  menuItem: {
    fontSize: 10,
    fontWeight: '500',
    color: '#8B95A5',
    textAlign: 'center',
  },

  activeMenuItem: {
    color: '#167D55',
    fontWeight: '800',
  },
  activeMenuButton: {
  height: '90%',
  backgroundColor: '#E0F4E9',
  borderRadius: 20,
  },
});