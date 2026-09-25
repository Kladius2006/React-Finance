import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {styles} from './QR_code_styles'

// โครงสร้างข้อมูลผู้ร่วมหาร
interface Participant {
  id: string;
  name: string;
}

export default function GroupBillSplitUI() {
  // สถานะเก็บยอดเงินรวม
  const [totalAmount, setTotalAmount] = useState<string>('');
  
  // สถานะรายชื่อผู้ร่วมหาร (เริ่มต้นที่ตัวเราเอง 1 คน)
  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', name: 'ฉัน (Me)' }
  ]);

  // สถานะ Modal สำหรับเพิ่มคน
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newParticipantName, setNewParticipantName] = useState('');

  // สถานะ Modal สำหรับ QR Code
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Participant | null>(null);

  // ระบบคำนวณอัตโนมัติ
  const amountNumber = parseFloat(totalAmount) || 0;
  const splitAmount = participants.length > 0 ? (amountNumber / participants.length).toFixed(2) : '0.00';
  const percentage = participants.length > 0 ? (100 / participants.length).toFixed(0) : '0';

  // ฟังก์ชันบันทึกชื่อเพื่อนใหม่
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

  // เปิดดู QR Code ของคนนั้นๆ
  const openQRModal = (user: Participant) => {
    setSelectedUser(user);
    setQrModalVisible(true);
  };

  return (
    <View style={[styles.container, { paddingTop: 30 }]}>
      <View style={styles.mainContent}>
        
        {/* 1. ส่วนหัว */}
        <View style={styles.header}>
          <FontAwesome5 name="qrcode" size={28} color="#fff" style={styles.headerIcon} />
          <Text style={styles.headerText}>การหารบิลกลุ่ม</Text>
        </View>

        {/* 2. ส่วนกรอกจำนวนเงินรวม */}
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>ยอดบิลรวมทั้งหมด (บาท)</Text>
          <View style={styles.inputContainer}>
            <TextInput
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
          <Text style={styles.subTitle}>ผู้ร่วมหาร ({participants.length} คน)</Text>
          <TouchableOpacity style={styles.addCircleButton} onPress={() => setAddModalVisible(true)}>
            <FontAwesome5 name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={participants}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.userRow} onPress={() => openQRModal(item)}>
              <Ionicons name="person-circle" size={55} color="#3b5998" />
              <View style={styles.userBadge}>
                <Text style={styles.userNameText}>{item.name}</Text>
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
            <Text style={styles.modalTitle}>เพิ่มผู้ร่วมหาร</Text>
            <TextInput
              style={styles.addModalInput}
              placeholder="พิมพ์ชื่อเพื่อน..."
              value={newParticipantName}
              onChangeText={setNewParticipantName}
              autoFocus={true}
              keyboardType='default'
            />
            <View style={styles.addModalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setAddModalVisible(false)}>
                <Text style={styles.cancelBtnText}>ยกเลิก</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtn} onPress={handleAddParticipant}>
                <Text style={styles.confirmBtnText}>เพิ่ม</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* 5. Modal QR Code */}
      <Modal visible={qrModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.qrModalContent}>
            <TouchableOpacity style={styles.closeModalButton} onPress={() => setQrModalVisible(false)}>
              <FontAwesome5 name="times" size={24} color="#666" />
            </TouchableOpacity>

            <View style={styles.qrUserBadge}>
              <Ionicons name="person-circle" size={36} color="black" style={{marginRight: 8}}/>
              <Text style={styles.qrUserText}>{selectedUser?.name}  |  {percentage}%</Text>
            </View>

            <View style={styles.qrBox}>
              <FontAwesome5 name="qrcode" size={180} color="#3b5998" />
            </View>

            <Text style={styles.qrAmountText}>ยอดจ่าย: {splitAmount} บาท</Text>

            <TouchableOpacity style={styles.shareButton}>
              <MaterialCommunityIcons name="share-variant" size={20} color="white" style={{marginRight: 10}}/>
              <Text style={styles.shareButtonText}>แชร์ให้เพื่อน</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
