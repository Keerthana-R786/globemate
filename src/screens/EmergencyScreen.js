import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Text,
  Surface,
  IconButton,
  Divider,
  Chip,
  List,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function EmergencyScreen() {
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [hazardAlerts, setHazardAlerts] = useState([]);
  const [embassyInfo, setEmbassyInfo] = useState(null);

  useEffect(() => {
    // Load emergency data
    loadEmergencyData();
  }, []);

  const loadEmergencyData = () => {
    // Mock emergency contacts
    const contacts = [
      {
        id: 1,
        name: 'Police',
        number: '110',
        icon: 'shield',
        color: '#2196F3',
        description: 'Emergency police assistance'
      },
      {
        id: 2,
        name: 'Ambulance',
        number: '119',
        icon: 'medical',
        color: '#F44336',
        description: 'Emergency medical assistance'
      },
      {
        id: 3,
        name: 'Fire Department',
        number: '119',
        icon: 'flame',
        color: '#FF9800',
        description: 'Fire emergency services'
      },
      {
        id: 4,
        name: 'Tourist Helpline',
        number: '+81-3-3201-3331',
        icon: 'help-circle',
        color: '#4CAF50',
        description: '24/7 tourist assistance'
      }
    ];

    // Mock hazard alerts
    const alerts = [
      {
        id: 1,
        type: 'Weather Warning',
        severity: 'High',
        message: 'Heavy rainfall expected in Tokyo area',
        time: '2 hours ago',
        color: '#FF9800'
      },
      {
        id: 2,
        type: 'Transport Alert',
        severity: 'Medium',
        message: 'JR Yamanote Line experiencing delays',
        time: '1 hour ago',
        color: '#2196F3'
      }
    ];

    // Mock embassy information
    const embassy = {
      name: 'U.S. Embassy Tokyo',
      address: '1-10-5 Akasaka, Minato-ku, Tokyo 107-8420',
      phone: '+81-3-3224-5000',
      email: 'tokyoacs@state.gov',
      hours: 'Monday-Friday: 8:00 AM - 5:00 PM',
      emergency: '+81-3-3224-5000 (24/7)'
    };

    setEmergencyContacts(contacts);
    setHazardAlerts(alerts);
    setEmbassyInfo(embassy);
  };

  const handleEmergencyCall = (contact) => {
    Alert.alert(
      'Emergency Call',
      `Are you sure you want to call ${contact.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Call',
          onPress: () => {
            Linking.openURL(`tel:${contact.number}`);
          },
        },
      ]
    );
  };

  const handleOneClickHelp = () => {
    Alert.alert(
      'Emergency Help',
      'Sending your location and emergency information to local authorities...',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Send',
          onPress: () => {
            // Simulate sending emergency information
            setTimeout(() => {
              Alert.alert(
                'Help Sent',
                'Emergency information has been sent. Help is on the way.',
                [{ text: 'OK' }]
              );
            }, 2000);
          },
        },
      ]
    );
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return '#F44336';
      case 'medium':
        return '#FF9800';
      case 'low':
        return '#4CAF50';
      default:
        return '#666';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#F44336', '#D32F2F']}
        style={styles.header}
      >
        <Title style={styles.headerTitle}>Emergency</Title>
        <Paragraph style={styles.headerSubtitle}>
          Emergency Contacts & Safety Information
        </Paragraph>
      </LinearGradient>

      {/* One-Click Emergency Help */}
      <View style={styles.emergencyHelpContainer}>
        <TouchableOpacity
          style={styles.emergencyHelpButton}
          onPress={handleOneClickHelp}
        >
          <Ionicons name="warning" size={40} color="white" />
          <Text style={styles.emergencyHelpText}>EMERGENCY HELP</Text>
          <Text style={styles.emergencyHelpSubtext}>Tap for immediate assistance</Text>
        </TouchableOpacity>
      </View>

      {/* Emergency Contacts */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Emergency Contacts</Title>
        <View style={styles.contactsGrid}>
          {emergencyContacts.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              style={styles.contactCard}
              onPress={() => handleEmergencyCall(contact)}
            >
              <View style={[styles.contactIcon, { backgroundColor: contact.color }]}>
                <Ionicons name={contact.icon} size={24} color="white" />
              </View>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactNumber}>{contact.number}</Text>
              <Text style={styles.contactDescription}>{contact.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Hazard Alerts */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Hazard Alerts</Title>
        {hazardAlerts.map((alert) => (
          <Card key={alert.id} style={styles.alertCard}>
            <Card.Content>
              <View style={styles.alertHeader}>
                <View style={styles.alertTypeContainer}>
                  <Ionicons name="alert-circle" size={20} color={alert.color} />
                  <Text style={styles.alertType}>{alert.type}</Text>
                </View>
                <Chip
                  style={[
                    styles.severityChip,
                    { backgroundColor: getSeverityColor(alert.severity) }
                  ]}
                  textStyle={styles.severityChipText}
                >
                  {alert.severity}
                </Chip>
              </View>
              <Text style={styles.alertMessage}>{alert.message}</Text>
              <Text style={styles.alertTime}>{alert.time}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Embassy Information */}
      {embassyInfo && (
        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Embassy Information</Title>
          <Card style={styles.embassyCard}>
            <Card.Content>
              <View style={styles.embassyHeader}>
                <Ionicons name="business" size={24} color="#1976D2" />
                <Title style={styles.embassyName}>{embassyInfo.name}</Title>
              </View>
              <Divider style={styles.divider} />
              
              <View style={styles.embassyDetail}>
                <Ionicons name="location" size={20} color="#666" />
                <Text style={styles.embassyText}>{embassyInfo.address}</Text>
              </View>
              
              <View style={styles.embassyDetail}>
                <Ionicons name="call" size={20} color="#666" />
                <Text style={styles.embassyText}>{embassyInfo.phone}</Text>
              </View>
              
              <View style={styles.embassyDetail}>
                <Ionicons name="mail" size={20} color="#666" />
                <Text style={styles.embassyText}>{embassyInfo.email}</Text>
              </View>
              
              <View style={styles.embassyDetail}>
                <Ionicons name="time" size={20} color="#666" />
                <Text style={styles.embassyText}>{embassyInfo.hours}</Text>
              </View>
              
              <View style={styles.embassyDetail}>
                <Ionicons name="warning" size={20} color="#F44336" />
                <Text style={[styles.embassyText, styles.emergencyText]}>
                  Emergency: {embassyInfo.emergency}
                </Text>
              </View>
              
              <View style={styles.embassyActions}>
                <Button mode="outlined" onPress={() => Linking.openURL(`tel:${embassyInfo.phone}`)}>
                  <Ionicons name="call" size={16} />
                  {' '}Call Embassy
                </Button>
                <Button mode="outlined" onPress={() => Linking.openURL(`mailto:${embassyInfo.email}`)}>
                  <Ionicons name="mail" size={16} />
                  {' '}Email Embassy
                </Button>
              </View>
            </Card.Content>
          </Card>
        </View>
      )}

      {/* Safety Tips */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Safety Tips</Title>
        <Card style={styles.tipsCard}>
          <Card.Content>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.tipText}>
                Keep emergency contacts easily accessible
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.tipText}>
                Know your location and address in local language
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.tipText}>
                Carry embassy contact information
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.tipText}>
                Learn basic emergency phrases in local language
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Quick Actions</Title>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <Ionicons name="location" size={24} color="#2196F3" />
            <Text style={styles.quickActionText}>Share Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Ionicons name="medical" size={24} color="#F44336" />
            <Text style={styles.quickActionText}>Medical Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Ionicons name="translate" size={24} color="#4CAF50" />
            <Text style={styles.quickActionText}>Emergency Phrases</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Ionicons name="settings" size={24} color="#FF9800" />
            <Text style={styles.quickActionText}>Emergency Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 16,
    opacity: 0.9,
  },
  emergencyHelpContainer: {
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 20,
  },
  emergencyHelpButton: {
    backgroundColor: '#F44336',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  emergencyHelpText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  emergencyHelpSubtext: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#212121',
  },
  contactsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  contactCard: {
    width: '48%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  contactIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  contactNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F44336',
    marginBottom: 5,
  },
  contactDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  alertCard: {
    marginBottom: 10,
    elevation: 2,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  alertTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  severityChip: {
    marginLeft: 10,
  },
  severityChipText: {
    color: 'white',
    fontSize: 12,
  },
  alertMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  alertTime: {
    fontSize: 12,
    color: '#999',
  },
  embassyCard: {
    elevation: 2,
  },
  embassyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  embassyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  divider: {
    marginBottom: 15,
  },
  embassyDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  embassyText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  emergencyText: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  embassyActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  tipsCard: {
    elevation: 2,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    width: '48%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
}); 