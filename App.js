import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');

  const renderHomeScreen = () => (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>GlobeMate</Text>
        <Text style={styles.headerSubtitle}>Your Smart Travel Companion</Text>
      </View>
      
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionCard} onPress={() => setCurrentTab('translate')}>
          <Ionicons name="language" size={40} color="#2196F3" />
          <Text style={styles.actionTitle}>Translate</Text>
          <Text style={styles.actionDesc}>Voice, text & image translation</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionCard} onPress={() => setCurrentTab('navigate')}>
          <Ionicons name="map" size={40} color="#4CAF50" />
          <Text style={styles.actionTitle}>Navigate</Text>
          <Text style={styles.actionDesc}>GPS navigation & transport</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionCard} onPress={() => setCurrentTab('emergency')}>
          <Ionicons name="warning" size={40} color="#F44336" />
          <Text style={styles.actionTitle}>Emergency</Text>
          <Text style={styles.actionDesc}>Emergency contacts & help</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionCard} onPress={() => setCurrentTab('culture')}>
          <Ionicons name="people" size={40} color="#FF9800" />
          <Text style={styles.actionTitle}>Culture</Text>
          <Text style={styles.actionDesc}>Local customs & etiquette</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Recent Translations</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>Where is the nearest train station?</Text>
          <Text style={styles.infoSubtext}>Japanese</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>How much does this cost?</Text>
          <Text style={styles.infoSubtext}>Chinese</Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderTranslateScreen = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Translation</Text>
        <Text style={styles.headerSubtitle}>Break language barriers</Text>
      </View>
      
      <View style={styles.translateContent}>
        <TouchableOpacity style={styles.translateButton}>
          <Ionicons name="mic" size={50} color="#2196F3" />
          <Text style={styles.translateButtonText}>Voice Translation</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.translateButton}>
          <Ionicons name="camera" size={50} color="#4CAF50" />
          <Text style={styles.translateButtonText}>Image Translation</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.translateButton}>
          <Ionicons name="text" size={50} color="#FF9800" />
          <Text style={styles.translateButtonText}>Text Translation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderNavigateScreen = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Navigation</Text>
        <Text style={styles.headerSubtitle}>Find your way around</Text>
      </View>
      
      <View style={styles.navigateContent}>
        <View style={styles.locationCard}>
          <Ionicons name="location" size={30} color="#4CAF50" />
          <Text style={styles.locationText}>Current Location: Tokyo, Japan</Text>
        </View>
        
        <TouchableOpacity style={styles.navigateButton}>
          <Ionicons name="search" size={30} color="#2196F3" />
          <Text style={styles.navigateButtonText}>Search Places</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navigateButton}>
          <Ionicons name="navigate" size={30} color="#FF9800" />
          <Text style={styles.navigateButtonText}>Get Directions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmergencyScreen = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emergency</Text>
        <Text style={styles.headerSubtitle}>Get help when you need it</Text>
      </View>
      
      <View style={styles.emergencyContent}>
        <TouchableOpacity style={styles.emergencyButton}>
          <Ionicons name="call" size={50} color="#F44336" />
          <Text style={styles.emergencyButtonText}>Emergency Call</Text>
        </TouchableOpacity>
        
        <View style={styles.emergencyInfo}>
          <Text style={styles.emergencyInfoText}>Police: 110</Text>
          <Text style={styles.emergencyInfoText}>Ambulance: 119</Text>
          <Text style={styles.emergencyInfoText}>Fire: 119</Text>
        </View>
      </View>
    </View>
  );

  const renderCultureScreen = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cultural Guide</Text>
        <Text style={styles.headerSubtitle}>Learn local customs</Text>
      </View>
      
      <View style={styles.cultureContent}>
        <View style={styles.cultureCard}>
          <Text style={styles.cultureTitle}>Greetings</Text>
          <Text style={styles.cultureText}>Bow slightly when greeting people</Text>
        </View>
        
        <View style={styles.cultureCard}>
          <Text style={styles.cultureTitle}>Dining</Text>
          <Text style={styles.cultureText}>Say "itadakimasu" before eating</Text>
        </View>
        
        <View style={styles.cultureCard}>
          <Text style={styles.cultureTitle}>Shoes</Text>
          <Text style={styles.cultureText}>Remove shoes when entering homes</Text>
        </View>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (currentTab) {
      case 'translate':
        return renderTranslateScreen();
      case 'navigate':
        return renderNavigateScreen();
      case 'emergency':
        return renderEmergencyScreen();
      case 'culture':
        return renderCultureScreen();
      default:
        return renderHomeScreen();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
      {renderContent()}
      
      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, currentTab === 'home' && styles.activeTab]} 
          onPress={() => setCurrentTab('home')}
        >
          <Ionicons name="home" size={24} color={currentTab === 'home' ? '#2196F3' : '#666'} />
          <Text style={[styles.tabText, currentTab === 'home' && styles.activeTabText]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, currentTab === 'translate' && styles.activeTab]} 
          onPress={() => setCurrentTab('translate')}
        >
          <Ionicons name="language" size={24} color={currentTab === 'translate' ? '#2196F3' : '#666'} />
          <Text style={[styles.tabText, currentTab === 'translate' && styles.activeTabText]}>Translate</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, currentTab === 'navigate' && styles.activeTab]} 
          onPress={() => setCurrentTab('navigate')}
        >
          <Ionicons name="map" size={24} color={currentTab === 'navigate' ? '#2196F3' : '#666'} />
          <Text style={[styles.tabText, currentTab === 'navigate' && styles.activeTabText]}>Navigate</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, currentTab === 'emergency' && styles.activeTab]} 
          onPress={() => setCurrentTab('emergency')}
        >
          <Ionicons name="warning" size={24} color={currentTab === 'emergency' ? '#2196F3' : '#666'} />
          <Text style={[styles.tabText, currentTab === 'emergency' && styles.activeTabText]}>Emergency</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, currentTab === 'culture' && styles.activeTab]} 
          onPress={() => setCurrentTab('culture')}
        >
          <Ionicons name="people" size={24} color={currentTab === 'culture' ? '#2196F3' : '#666'} />
          <Text style={[styles.tabText, currentTab === 'culture' && styles.activeTabText]}>Culture</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  quickActions: {
    padding: 20,
  },
  actionCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  actionDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  infoSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  infoSubtext: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  translateContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  translateButton: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  translateButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#333',
  },
  navigateContent: {
    flex: 1,
    padding: 20,
  },
  locationCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  navigateButton: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navigateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#333',
  },
  emergencyContent: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyButton: {
    backgroundColor: '#F44336',
    padding: 40,
    borderRadius: 50,
    marginBottom: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  emergencyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 15,
  },
  emergencyInfo: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emergencyInfoText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  cultureContent: {
    flex: 1,
    padding: 20,
  },
  cultureCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cultureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cultureText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 10,
    paddingTop: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  activeTab: {
    // Active tab styling
  },
  tabText: {
    fontSize: 12,
    marginTop: 5,
    color: '#666',
  },
  activeTabText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
}); 