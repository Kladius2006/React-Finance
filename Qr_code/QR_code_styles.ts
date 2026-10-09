import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#F5F6FA',
},

mainContent: {
flex: 1,
paddingTop: 20,
paddingHorizontal: 16,
},

// Header — matches the dark slate Balance summary
header: {
flexDirection: 'row',
backgroundColor: '#2C3E50',
paddingVertical: 16,
paddingHorizontal: 18,
borderRadius: 16,
alignItems: 'center',
marginBottom: 24,
elevation: 3,
shadowColor: '#183C2C',
shadowOffset: { width: 0, height: 3 },
shadowOpacity: 0.10,
shadowRadius: 6,
},

headerIcon: {
marginRight: 14,
},

headerText: {
fontSize: 22,
fontWeight: 'bold',
color: '#FFFFFF',
},

// Total amount input
inputSection: {
alignItems: 'center',
marginBottom: 25,
},

sectionTitle: {
fontSize: 18,
fontWeight: '700',
color: '#2C3E50',
marginBottom: 12,
},

inputContainer: {
backgroundColor: '#FFFFFF',
borderRadius: 14,
width: '100%',
paddingVertical: 8,
borderWidth: 1,
borderColor: '#E1E7ED',
elevation: 2,
shadowColor: '#183C2C',
shadowOpacity: 0.06,
shadowRadius: 5,
shadowOffset: { width: 0, height: 2 },
},

inputField: {
fontSize: 32,
fontWeight: 'bold',
color: '#2C3E50',
paddingVertical: 10,
},

// Participants heading and add button
listHeader: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: 14,
},

subTitle: {
fontSize: 18,
fontWeight: 'bold',
color: '#2C3E50',
},

addCircleButton: {
backgroundColor: '#3498DB',
width: 46,
height: 46,
borderRadius: 16,
justifyContent: 'center',
alignItems: 'center',
elevation: 3,
shadowColor: '#183C2C',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.14,
shadowRadius: 4,
},

// Participant cards
userRow: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 12,
backgroundColor: '#FFFFFF',
padding: 14,
borderRadius: 16,
borderWidth: 1,
borderColor: '#E9EDF2',
elevation: 2,
shadowColor: '#000000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.06,
shadowRadius: 4,
},

userBadge: {
flex: 1,
marginLeft: 12,
justifyContent: 'center',
},

userNameText: {
fontSize: 17,
fontWeight: 'bold',
color: '#2C3E50',
marginBottom: 6,
},

badgeDetails: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
},

userDetailText: {
fontSize: 14,
color: '#7F8C8D',
},

userAmountText: {
fontSize: 17,
fontWeight: 'bold',
color: '#167D55',
},

// Retained in case the existing component uses its own navigation
bottomNav: {
flexDirection: 'row',
justifyContent: 'space-around',
alignItems: 'center',
backgroundColor: '#FFFFFF',
paddingVertical: 15,
borderTopWidth: 1,
borderColor: '#E9EDF2',
},

navItem: {
alignItems: 'center',
padding: 10,
},

// Add-participant modal
modalOverlay: {
flex: 1,
backgroundColor: 'rgba(23, 37, 31, 0.50)',
justifyContent: 'center',
alignItems: 'center',
},

addModalContent: {
backgroundColor: '#FFFFFF',
width: '88%',
borderRadius: 22,
padding: 24,
alignItems: 'center',
elevation: 8,
shadowColor: '#000000',
shadowOffset: { width: 0, height: 5 },
shadowOpacity: 0.15,
shadowRadius: 12,
},

modalTitle: {
fontSize: 22,
fontWeight: 'bold',
marginBottom: 20,
color: '#2C3E50',
},

addModalInput: {
width: '100%',
fontSize: 18,
color: '#2C3E50',
backgroundColor: '#F5F6FA',
borderWidth: 1,
borderColor: '#DCE3EA',
borderRadius: 14,
padding: 14,
marginBottom: 24,
textAlign: 'center',
},

addModalActions: {
flexDirection: 'row',
width: '100%',
justifyContent: 'space-between',
},

cancelBtn: {
flex: 1,
backgroundColor: '#E9EDF2',
paddingVertical: 14,
borderRadius: 12,
marginRight: 8,
alignItems: 'center',
},

cancelBtnText: {
fontSize: 16,
fontWeight: 'bold',
color: '#566573',
},

confirmBtn: {
flex: 1,
backgroundColor: '#3498DB',
paddingVertical: 14,
borderRadius: 12,
marginLeft: 8,
alignItems: 'center',
elevation: 2,
},

confirmBtnText: {
fontSize: 16,
fontWeight: 'bold',
color: '#FFFFFF',
},

// QR code modal
qrModalContent: {
backgroundColor: '#FFFFFF',
width: '88%',
borderRadius: 22,
padding: 22,
alignItems: 'center',
elevation: 8,
shadowColor: '#000000',
shadowOffset: { width: 0, height: 5 },
shadowOpacity: 0.15,
shadowRadius: 12,
},

closeModalButton: {
alignSelf: 'flex-end',
marginBottom: 10,
padding: 4,
},

qrUserBadge: {
flexDirection: 'row',
backgroundColor: '#EAF2F8',
paddingVertical: 9,
paddingHorizontal: 18,
borderRadius: 18,
alignItems: 'center',
marginBottom: 22,
},

qrUserText: {
color: '#2C3E50',
fontSize: 16,
fontWeight: 'bold',
},

qrBox: {
padding: 16,
backgroundColor: '#FFFFFF',
borderRadius: 18,
borderWidth: 1,
borderColor: '#E9EDF2',
marginBottom: 18,
elevation: 2,
shadowColor: '#000000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.05,
shadowRadius: 4,
},

qrAmountText: {
fontSize: 24,
fontWeight: 'bold',
color: '#167D55',
marginBottom: 22,
},

shareButton: {
flexDirection: 'row',
backgroundColor: '#167D55',
paddingVertical: 15,
paddingHorizontal: 24,
borderRadius: 16,
alignItems: 'center',
width: '100%',
justifyContent: 'center',
elevation: 2,
},

shareButtonText: {
color: '#FFFFFF',
fontSize: 17,
fontWeight: 'bold',
},
});