import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Text,
  Avatar,
  Divider,
  List,
  Switch,
  TextInput,
  Chip,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { api } from '../api/client';

export default function ProfileScreen() {
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    nationality: 'United States',
    passportNumber: 'US123456789',
    emergencyContact: 'Jane Doe',
    emergencyPhone: '+1 (555) 987-6543',
    languages: ['English', 'Spanish'],
    preferences: {
      notifications: true,
      darkMode: false,
      autoTranslate: true,
      offlineMaps: true,
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({ ...userProfile });

  useEffect(() => {
    let isMounted = true;
    api.getProfile().then((data) => {
      if (!isMounted || !data) return;
      const parsed = {
        ...data,
        preferences: data.preferences ? JSON.parse(data.preferences) : {},
        languages: data.languages ? JSON.parse(data.languages) : [],
      };
      setUserProfile(parsed);
      setEditProfile(parsed);
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  const travelHistory = [
    {
      id: 1,
      destination: 'Tokyo, Japan',
      date: 'March 2024',
      duration: '7 days',
      highlights: ['Shibuya Crossing', 'Senso-ji Temple', 'Tsukiji Market']
    },
    {
      id: 2,
      destination: 'Bangkok, Thailand',
      date: 'January 2024',
      duration: '5 days',
      highlights: ['Grand Palace', 'Wat Phra Kaew', 'Chatuchak Market']
    },
    {
      id: 3,
      destination: 'Seoul, South Korea',
      date: 'November 2023',
      duration: '6 days',
      highlights: ['Gyeongbokgung Palace', 'Myeongdong', 'N Seoul Tower']
    }
  ];

  const savedPlaces = [
    {
      name: 'Senso-ji Temple',
      location: 'Tokyo, Japan',
      type: 'Cultural',
      saved: '2 months ago'
    },
    {
      name: 'Grand Palace',
      location: 'Bangkok, Thailand',
      type: 'Historical',
      saved: '3 months ago'
    },
    {
      name: 'Gyeongbokgung Palace',
      location: 'Seoul, South Korea',
      type: 'Cultural',
      saved: '4 months ago'
    }
  ];

  const handleSaveProfile = () => {
    const payload = {
      ...editProfile,
      preferences: editProfile.preferences || {},
      languages: editProfile.languages || [],
    };
    api.updateProfile(payload)
      .then((updated) => {
        const parsed = {
          ...updated,
          preferences: updated.preferences ? JSON.parse(updated.preferences) : {},
          languages: updated.languages ? JSON.parse(updated.languages) : [],
        };
        setUserProfile(parsed);
        setIsEditing(false);
        Alert.alert('Success', 'Profile updated successfully!');
      })
      .catch(() => Alert.alert('Error', 'Failed to update profile'));
  };

  const handleCancelEdit = () => {
    setEditProfile({ ...userProfile });
    setIsEditing(false);
  };

  const togglePreference = (key) => {
    setEditProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: !prev.preferences[key]
      }
    }));
  };

  const renderProfileHeader = () => (
    <LinearGradient
      colors={['#2196F3', '#1976D2']}
      style={styles.profileHeader}
    >
      <View style={styles.profileInfo}>
        <Avatar.Image
          size={80}
          source={{
            uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          }}
        />
        <View style={styles.profileText}>
          <Title style={styles.profileName}>{userProfile.name}</Title>
          <Text style={styles.profileSubtitle}>Frequent Traveler</Text>
          <Text style={styles.profileLocation}>📍 Currently in Tokyo, Japan</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setIsEditing(true)}
      >
        <Ionicons name="create" size={20} color="white" />
      </TouchableOpacity>
    </LinearGradient>
  );

  const renderProfileForm = () => (
    <Card style={styles.profileFormCard}>
      <Card.Content>
        <Title style={styles.formTitle}>Edit Profile</Title>
        
        <TextInput
          label="Full Name"
          value={editProfile.name}
          onChangeText={(text) => setEditProfile(prev => ({ ...prev, name: text }))}
          style={styles.input}
          mode="outlined"
        />
        
        <TextInput
          label="Email"
          value={editProfile.email}
          onChangeText={(text) => setEditProfile(prev => ({ ...prev, email: text }))}
          style={styles.input}
          mode="outlined"
          keyboardType="email-address"
        />
        
        <TextInput
          label="Phone"
          value={editProfile.phone}
          onChangeText={(text) => setEditProfile(prev => ({ ...prev, phone: text }))}
          style={styles.input}
          mode="outlined"
          keyboardType="phone-pad"
        />
        
        <TextInput
          label="Nationality"
          value={editProfile.nationality}
          onChangeText={(text) => setEditProfile(prev => ({ ...prev, nationality: text }))}
          style={styles.input}
          mode="outlined"
        />
        
        <TextInput
          label="Passport Number"
          value={editProfile.passportNumber}
          onChangeText={(text) => setEditProfile(prev => ({ ...prev, passportNumber: text }))}
          style={styles.input}
          mode="outlined"
        />
        
        <View style={styles.formActions}>
          <Button mode="outlined" onPress={handleCancelEdit} style={styles.cancelButton}>
            Cancel
          </Button>
          <Button mode="contained" onPress={handleSaveProfile} style={styles.saveButton}>
            Save Changes
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  const renderProfileInfo = () => (
    <Card style={styles.profileCard}>
      <Card.Content>
        <Title style={styles.cardTitle}>Personal Information</Title>
        <Divider style={styles.divider} />
        
        <View style={styles.infoRow}>
          <Ionicons name="person" size={20} color="#666" />
          <Text style={styles.infoLabel}>Name:</Text>
          <Text style={styles.infoValue}>{userProfile.name}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="mail" size={20} color="#666" />
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{userProfile.email}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="call" size={20} color="#666" />
          <Text style={styles.infoLabel}>Phone:</Text>
          <Text style={styles.infoValue}>{userProfile.phone}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="flag" size={20} color="#666" />
          <Text style={styles.infoLabel}>Nationality:</Text>
          <Text style={styles.infoValue}>{userProfile.nationality}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="card" size={20} color="#666" />
          <Text style={styles.infoLabel}>Passport:</Text>
          <Text style={styles.infoValue}>{userProfile.passportNumber}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  const renderEmergencyContacts = () => (
    <Card style={styles.profileCard}>
      <Card.Content>
        <Title style={styles.cardTitle}>Emergency Contacts</Title>
        <Divider style={styles.divider} />
        
        <View style={styles.infoRow}>
          <Ionicons name="person" size={20} color="#666" />
          <Text style={styles.infoLabel}>Contact:</Text>
          <Text style={styles.infoValue}>{userProfile.emergencyContact}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="call" size={20} color="#666" />
          <Text style={styles.infoLabel}>Phone:</Text>
          <Text style={styles.infoValue}>{userProfile.emergencyPhone}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  const renderPreferences = () => (
    <Card style={styles.profileCard}>
      <Card.Content>
        <Title style={styles.cardTitle}>Preferences</Title>
        <Divider style={styles.divider} />
        
        <View style={styles.preferenceRow}>
          <View style={styles.preferenceInfo}>
            <Ionicons name="notifications" size={20} color="#666" />
            <Text style={styles.preferenceLabel}>Push Notifications</Text>
          </View>
          <Switch
            value={editProfile.preferences.notifications}
            onValueChange={() => togglePreference('notifications')}
          />
        </View>
        
        <View style={styles.preferenceRow}>
          <View style={styles.preferenceInfo}>
            <Ionicons name="moon" size={20} color="#666" />
            <Text style={styles.preferenceLabel}>Dark Mode</Text>
          </View>
          <Switch
            value={editProfile.preferences.darkMode}
            onValueChange={() => togglePreference('darkMode')}
          />
        </View>
        
        <View style={styles.preferenceRow}>
          <View style={styles.preferenceInfo}>
            <Ionicons name="language" size={20} color="#666" />
            <Text style={styles.preferenceLabel}>Auto-Translate</Text>
          </View>
          <Switch
            value={editProfile.preferences.autoTranslate}
            onValueChange={() => togglePreference('autoTranslate')}
          />
        </View>
        
        <View style={styles.preferenceRow}>
          <View style={styles.preferenceInfo}>
            <Ionicons name="download" size={20} color="#666" />
            <Text style={styles.preferenceLabel}>Offline Maps</Text>
          </View>
          <Switch
            value={editProfile.preferences.offlineMaps}
            onValueChange={() => togglePreference('offlineMaps')}
          />
        </View>
      </Card.Content>
    </Card>
  );

  const renderTravelHistory = () => (
    <View style={styles.section}>
      <Title style={styles.sectionTitle}>Travel History</Title>
      {travelHistory.map((trip) => (
        <Card key={trip.id} style={styles.tripCard}>
          <Card.Content>
            <View style={styles.tripHeader}>
              <Title style={styles.tripDestination}>{trip.destination}</Title>
              <View style={styles.tripMeta}>
                <Text style={styles.tripDate}>{trip.date}</Text>
                <Text style={styles.tripDuration}>{trip.duration}</Text>
              </View>
            </View>
            <Text style={styles.tripHighlights}>
              Highlights: {trip.highlights.join(', ')}
            </Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  );

  const renderSavedPlaces = () => (
    <View style={styles.section}>
      <Title style={styles.sectionTitle}>Saved Places</Title>
      {savedPlaces.map((place, index) => (
        <Card key={index} style={styles.placeCard}>
          <Card.Content>
            <View style={styles.placeHeader}>
              <Title style={styles.placeName}>{place.name}</Title>
              <Chip style={styles.placeTypeChip}>
                {place.type}
              </Chip>
            </View>
            <Text style={styles.placeLocation}>{place.location}</Text>
            <Text style={styles.placeSaved}>Saved {place.saved}</Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {renderProfileHeader()}
      
      {isEditing ? renderProfileForm() : (
        <>
          {renderProfileInfo()}
          {renderEmergencyContacts()}
          {renderPreferences()}
        </>
      )}
      
      {renderTravelHistory()}
      {renderSavedPlaces()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  profileHeader: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileText: {
    marginLeft: 20,
    flex: 1,
  },
  profileName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileSubtitle: {
    color: 'white',
    fontSize: 16,
    opacity: 0.9,
    marginBottom: 5,
  },
  profileLocation: {
    color: 'white',
    fontSize: 14,
    opacity: 0.8,
  },
  editButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 20,
  },
  profileFormCard: {
    margin: 20,
    elevation: 4,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    flex: 1,
    marginLeft: 10,
  },
  profileCard: {
    margin: 20,
    marginBottom: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  divider: {
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    width: 80,
  },
  infoValue: {
    fontSize: 14,
    color: '#212121',
    flex: 1,
    fontWeight: '500',
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  preferenceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  preferenceLabel: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
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
  tripCard: {
    marginBottom: 10,
    elevation: 2,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tripDestination: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  tripMeta: {
    alignItems: 'flex-end',
  },
  tripDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  tripDuration: {
    fontSize: 12,
    color: '#999',
  },
  tripHighlights: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  placeCard: {
    marginBottom: 10,
    elevation: 2,
  },
  placeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  placeTypeChip: {
    backgroundColor: '#E3F2FD',
  },
  placeLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  placeSaved: {
    fontSize: 12,
    color: '#999',
  },
}); 