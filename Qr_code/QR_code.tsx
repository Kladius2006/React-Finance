import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {styles} from './QR_code_styles'
import {translations} from '../config/language'
import QRCode from 'react-native-qrcode-svg';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { useLanguage } from '../config/LanguageContext';

// โครงสร้างข้อมูลผู้ร่วมหาร
interface Participant {
  id: string;
  name: string;
  isMe?: boolean;
}

export default function GroupBillSplitUI() {
  // สถานะเก็บยอดเงินรวม
  const [totalAmount, setTotalAmount] = useState<string>('');
  // การเปลี่ยนภาษา (ตั้งค่าเริ่มต้นเป็นภาษาไทย)
  const { lang } = useLanguage(); 
  const t = translations[lang];

  // สถานะรายชื่อผู้ร่วมหาร (เริ่มต้นที่ตัวเราเอง 1 คน)
  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', name: 'ฉัน (Me)', isMe: true }
  ]);

  const displayName = (p: Participant | null) => (p ? (p.isMe ? t.me : p.name) : '');

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newParticipantName, setNewParticipantName] = useState('');

  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Participant | null>(null);

  const amountNumber = parseFloat(totalAmount) || 0;
  const splitAmount = participants.length > 0 ? (amountNumber / participants.length).toFixed(2) : '0.00';
  const percentage = participants.length > 0 ? (100 / participants.length).toFixed(0) : '0';

  const handleAddParticipant = () => {
    if (newParticipantName.trim() !== '') {
      const newUser = {
        id: Date.now().toString(),
        name: newParticipantName.trim(),
      };
      setParticipants([...participants, newUser]);
      setNewParticipantName('');
      setAddModalVisible(false);
    }
  };

const generatePromptPayPayload = (mobileNumber: string, amount: number) => {
  let formattedPhone = mobileNumber.replace(/[^0-9]/g, '');
  if (formattedPhone.startsWith('0')) {
    formattedPhone = '0066' + formattedPhone.slice(1);
  }

  const formatField = (id: string, value: string) => {
    const len = value.length.toString().padStart(2, '0');
    return id + len + value;
  };

  const aid = 'A000000677010111';
  const merchantAccount = formatField('29', formatField('00', aid) + formatField('01', formattedPhone));
  const currency = '5303764'; 
  const amtStr = amount.toFixed(2);
  const amountField = formatField('54', amtStr);
  const country = '5802TH';
  const nameField = formatField('59', 'POMTPAY'); 

  let dataToCrc = formatField('00', '01') +
                  formatField('01', '12') +
                  merchantAccount +
                  currency +
                  amountField +
                  country +
                  nameField +
                  '6304';

  let crc = 0xffff;
  for (let i = 0; i < dataToCrc.length; i++) {
    crc ^= dataToCrc.charCodeAt(i) << 8;
    for (let b = 0; b < 8; b++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return dataToCrc + crc.toString(16).toUpperCase().padStart(4, '0');
  };

  const qrCardRef = useRef<View>(null);
  const handleShareQR = async () => {
    try {
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert(t.share_unsupported, t.share_unsupported_message);
        return;
      }
      const uri = await captureRef(qrCardRef, {
        format: 'png',
        quality: 1,
        result: 'tmpfile',
      });
      await Sharing.shareAsync(uri, {
        mimeType: 'image/png',
        dialogTitle: t.share_dialog_title,
        UTI: 'public.png',
      });
    } catch (e) {
      Alert.alert(t.share_failed, t.share_failed_message);
    }
  };

  const openQRModal = (user: Participant) => {
    setSelectedUser(user);
    setQrModalVisible(true);
  };
  const PROMPTPAY_PHONE = '0989368545';

  return (
    <View style={[styles.container, { paddingTop: 30 }]}>
      <View style={styles.mainContent}>
        
        {/* 1. ส่วนหัว */}
        <View style={styles.header}>
          <FontAwesome5 name="qrcode" size={28} color="#fff" style={styles.headerIcon} />
          <Text style={styles.headerText}>{t.QR_title}</Text>
        </View>

        {/* 2. ส่วนกรอกจำนวนเงินรวม */}
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>{t.totalAmountLabel} ({t.currency})</Text>
          <View style={styles.inputContainer}>
            <TextInput
              testID="input_Value"
              style={styles.inputField}
              placeholder="0.00"
              keyboardType="numeric"
              textAlign="center"
              value={totalAmount}
              onChangeText={setTotalAmount}
            />
          </View>
        </View>

        {/* 3. รายชื่อผู้ร่วมหาร */}
        <View style={styles.listHeader}>
          <Text style={styles.subTitle}>{t.participants} ({participants.length} {t.people})</Text>
          <TouchableOpacity testID="add_participant__button" style={styles.addCircleButton} onPress={() => setAddModalVisible(true)}>
            <FontAwesome5 name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={participants}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity testID={`user_row_${item.name}__button`} style={styles.userRow} onPress={() => openQRModal(item)}>
              <Ionicons name="person-circle" size={55} color="#3b5998" />
              <View style={styles.userBadge}>
                <Text style={styles.userNameText}>{displayName(item)}</Text>
                <View style={styles.badgeDetails}>
                  <Text style={styles.userDetailText}>{percentage}%</Text>
                  <Text style={styles.userAmountText}>{splitAmount} ฿</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>


      {/* 4. Modal เพิ่มชื่อผู้ร่วมหาร */}
      <Modal visible={addModalVisible} transparent={true} animationType="fade">
        <KeyboardAvoidingView style={styles.modalOverlay} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.addModalContent}>
            <Text style={styles.modalTitle}>{t.addParticipant}</Text>
            <TextInput
              testID="add_participant_name"
              style={styles.addModalInput}
              placeholder={t.placeholder}
              value={newParticipantName}
              onChangeText={setNewParticipantName}
              autoFocus={true}
              keyboardType='default'
            />
            <View style={styles.addModalActions}>
              <TouchableOpacity testID="cancel_add_button" style={styles.cancelBtn} onPress={() => setAddModalVisible(false)}>
                <Text style={styles.cancelBtnText}>{t.cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity testID="confirm_add_button" style={styles.confirmBtn} onPress={handleAddParticipant}>
                <Text style={styles.confirmBtnText}>{t.add}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* 5. Modal QR Code */}
      <Modal visible={qrModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.qrModalContent}>
            <TouchableOpacity testID="close_qr_button" style={styles.closeModalButton} onPress={() => setQrModalVisible(false)}>
              <FontAwesome5 name="times" size={24} color="#666" />
            </TouchableOpacity>
            
            <View ref={qrCardRef} collapsable={false} style={{ backgroundColor: 'white', alignItems: 'center', padding: 12 }}>
              <View style={styles.qrUserBadge}>
                <Ionicons name="person-circle" size={36} color="black" style={{marginRight: 8}}/>
                <Text style={styles.qrUserText}>{displayName(selectedUser)}  |  {percentage}%</Text>
              </View>

              <View style={styles.qrBox}>
                <QRCode
                  value={generatePromptPayPayload(PROMPTPAY_PHONE, parseFloat(splitAmount) || 0)}
                  size={180}
                  color="#3b5998"
                  backgroundColor="white"
                />
              </View>

              <Text style={styles.qrAmountText}>{t.payAmount} {splitAmount} {t.currency}</Text>
            </View>

            <TouchableOpacity testID="share_qr_button" style={styles.shareButton} onPress={handleShareQR}>
              <MaterialCommunityIcons name="share-variant" size={20} color="white" style={{marginRight: 10}}/>
              <Text style={styles.shareButtonText}>{t.share}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}