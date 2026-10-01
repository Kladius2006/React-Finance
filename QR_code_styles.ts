
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  mainContent: { flex: 1, paddingTop: 20, paddingHorizontal: 25 },
  header: {
    flexDirection: 'row',
    backgroundColor: '#3b5998',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 25,
  },
  headerIcon: { marginRight: 15 },
  headerText: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#fff' 
  },
  inputSection: { 
    alignItems: 'center', 
    marginBottom: 25 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 15 
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: '100%',
    paddingVertical: 10,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    shadowOffset: { width: 0, height: 2 },
  },
  inputField: { 
    fontSize: 36, 
    fontWeight: 'bold', 
    color: '#3b5998', 
    paddingVertical: 10 
  },
  listHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 15 },
  subTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  addCircleButton: { 
    backgroundColor: '#7ED321', 
    padding: 12, 
    borderRadius: 25, 
    elevation: 2 
  },
  userRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15, 
    backgroundColor: '#fff', 
    padding: 12, 
    borderRadius: 15, 
    elevation: 1 
  },
  userBadge: { 
    flex: 1, 
    marginLeft: 15, 
    justifyContent: 'center' 
  },
  userNameText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 5 
  },
  badgeDetails: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  userDetailText: { 
    fontSize: 16, 
    color: '#666' 
  },
  userAmountText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#E53935' 
  },
  bottomNav: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    paddingVertical: 15, 
    borderTopWidth: 1, 
    borderColor: '#ddd' 
  },
  navItem: { 
    alignItems: 'center', 
    padding: 10 
  },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  addModalContent: { 
    backgroundColor: '#fff', 
    width: '85%', 
    borderRadius: 20, 
    padding: 25, 
    alignItems: 'center' 
  },
  modalTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#333' 
  },
  addModalInput: { 
    width: '100%', 
    fontSize: 20, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 10, 
    padding: 15, 
    marginBottom: 25, 
    textAlign: 'center' 
  },
  addModalActions: { 
    flexDirection: 'row', 
    width: '100%', 
    justifyContent: 'space-between' 
  },
  cancelBtn: { 
    flex: 1, 
    backgroundColor: '#E0E0E0', 
    paddingVertical: 15, 
    borderRadius: 10, 
    marginRight: 10, 
    alignItems: 'center' 
  },
  cancelBtnText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#555' 
  },
  confirmBtn: { 
    flex: 1, 
    backgroundColor: '#3b5998', 
    paddingVertical: 15, 
    borderRadius: 10, 
    marginLeft: 10, 
    alignItems: 'center' 
  },
  confirmBtnText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#fff' 
  },
  qrModalContent: { 
    backgroundColor: '#fff', 
    width: '85%', 
    borderRadius: 20, 
    padding: 25, 
    alignItems: 'center', 
    elevation: 5 
  },
  closeModalButton: { 
    alignSelf: 'flex-end', 
    marginBottom: 10 
  },
  qrUserBadge: { 
    flexDirection: 'row', 
    backgroundColor: '#F0F0F0', 
    paddingVertical: 8, 
    paddingHorizontal: 20, 
    borderRadius: 25, 
    alignItems: 'center', 
    marginBottom: 25 
  },
  qrUserText: { 
    color: '#333', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  qrBox: { 
    padding: 20, 
    backgroundColor: '#f9f9f9', 
    borderRadius: 15, 
    marginBottom: 20 
  },
  qrAmountText: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#E53935', 
    marginBottom: 25 
  },
  shareButton: { 
    flexDirection: 'row', 
    backgroundColor: '#000', 
    paddingVertical: 15, 
    paddingHorizontal: 40, 
    borderRadius: 30, 
    alignItems: 'center', 
    width: '100%', 
    justifyContent: 'center' 
  },
  shareButtonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});