import React, { useState, useEffect } from 'react';
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
import { api } from './src/api/client';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [recentTranslations, setRecentTranslations] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [recording, setRecording] = useState(null);
  const [showVoiceScreen, setShowVoiceScreen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    api
      .listTranslations()
      .then((rows) => {
        if (isMounted) setRecentTranslations(rows || []);
      })
      .catch(() => {
        if (isMounted)
          setRecentTranslations([
            { id: 1, text: 'Where is the nearest train station?', language: 'Japanese' },
            { id: 2, text: 'How much does this cost?', language: 'Chinese' },
          ]);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Voice recording functions
  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant microphone permission to use voice translation');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      setOriginalText('');
      setTranslatedText('');
      
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      
      const uri = recording.getURI();
      console.log('Recording stopped and stored at', uri);
      
      // Simulate speech recognition (in a real app, you'd use a speech recognition service)
      const recognizedText = await simulateSpeechRecognition();
      setOriginalText(recognizedText);
      
      // Translate the recognized text
      if (recognizedText) {
        await translateText(recognizedText);
      }
      
      setRecording(null);
    } catch (err) {
      console.error('Failed to stop recording', err);
      Alert.alert('Error', 'Failed to stop recording');
    }
  };

  const simulateSpeechRecognition = async () => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return a sample recognized text (in a real app, this would be actual speech recognition)
    const sampleTexts = [
      'Hello, how are you?',
      'Where is the nearest restaurant?',
      'How much does this cost?',
      'Thank you very much',
      'I need help',
      'What time is it?',
      'Can you help me?',
      'I am lost'
    ];
    
    return sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
  };

  const translateText = async (text) => {
    try {
      setIsTranslating(true);
      
      // Simulate translation API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Sample translations
      const translations = {
        'Hello, how are you?': 'Hola, ¿cómo estás?',
        'Where is the nearest restaurant?': '¿Dónde está el restaurante más cercano?',
        'How much does this cost?': '¿Cuánto cuesta esto?',
        'Thank you very much': 'Muchas gracias',
        'I need help': 'Necesito ayuda',
        'What time is it?': '¿Qué hora es?',
        'Can you help me?': '¿Puedes ayudarme?',
        'I am lost': 'Estoy perdido'
      };
      
      const translated = translations[text] || 'Translation not available';
      setTranslatedText(translated);
      
      // Add to recent translations
      const newTranslation = {
        id: Date.now(),
        text: text,
        translated: translated,
        language: 'Spanish',
        timestamp: new Date().toISOString()
      };
      
      setRecentTranslations(prev => [newTranslation, ...prev.slice(0, 4)]);
      
      // Speak the translation
      await Speech.speak(translated, { language: 'es' });
      
    } catch (err) {
      console.error('Translation failed', err);
      Alert.alert('Error', 'Translation failed');
    } finally {
      setIsTranslating(false);
    }
  };

  const speakTranslation = async () => {
    if (translatedText) {
      await Speech.speak(translatedText, { language: 'es' });
    }
  };

  const renderVoiceTranslationScreen = () => (
    <View style={styles.voiceScreenContainer}>
      {/* Header */}
      <View style={styles.voiceHeader}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => setShowVoiceScreen(false)}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.voiceHeaderContent}>
          <Text style={styles.voiceHeaderTitle}>Voice Translation</Text>
          <Text style={styles.voiceHeaderSubtitle}>Real-time speech translation</Text>
        </View>
        <View style={styles.voiceHeaderRight} />
      </View>

      {/* Main Content */}
      <View style={styles.voiceMainContent}>
        {/* Language Selection */}
        <View style={styles.languageSection}>
          <View style={styles.languageCard}>
            <Text style={styles.languageLabel}>From</Text>
            <View style={styles.languageSelector}>
              <Ionicons name="globe" size={20} color="#8E24AA" />
              <Text style={styles.languageText}>English</Text>
              <Ionicons name="chevron-down" size={16} color="#8E24AA" />
            </View>
          </View>
          
          <TouchableOpacity style={styles.swapButton}>
            <Ionicons name="swap-horizontal" size={24} color="#8E24AA" />
          </TouchableOpacity>
          
          <View style={styles.languageCard}>
            <Text style={styles.languageLabel}>To</Text>
            <View style={styles.languageSelector}>
              <Ionicons name="globe" size={20} color="#8E24AA" />
              <Text style={styles.languageText}>Spanish</Text>
              <Ionicons name="chevron-down" size={16} color="#8E24AA" />
            </View>
          </View>
        </View>

        {/* Voice Recording Area */}
        <View style={styles.recordingArea}>
          <View style={styles.recordingCircle}>
            <TouchableOpacity 
              style={[styles.recordButton, isRecording && styles.recordingActive]} 
              onPress={isRecording ? stopRecording : startRecording}
              disabled={isTranslating}
            >
              {isRecording ? (
                <Ionicons name="stop" size={40} color="white" />
              ) : (
                <Ionicons name="mic" size={40} color="white" />
              )}
            </TouchableOpacity>
          </View>
          
          <Text style={styles.recordingInstruction}>
            {isRecording ? 'Tap to stop recording' : 'Tap to start recording'}
          </Text>
          
          {isRecording && (
            <View style={styles.recordingStatus}>
              <View style={styles.recordingPulse} />
              <Text style={styles.recordingStatusText}>Listening...</Text>
            </View>
          )}
        </View>

        {/* Translation Results */}
        <View style={styles.resultsArea}>
          {originalText && (
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Ionicons name="chatbubble" size={20} color="#8E24AA" />
                <Text style={styles.resultTitle}>Original Text</Text>
              </View>
              <Text style={styles.resultText}>{originalText}</Text>
            </View>
          )}
          
          {isTranslating && (
            <View style={styles.resultCard}>
              <View style={styles.translatingContainer}>
                <ActivityIndicator size="small" color="#8E24AA" />
                <Text style={styles.translatingText}>Translating...</Text>
              </View>
            </View>
          )}
          
          {translatedText && !isTranslating && (
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Ionicons name="language" size={20} color="#00BCD4" />
                <Text style={styles.resultTitle}>Translation</Text>
                <TouchableOpacity onPress={speakTranslation} style={styles.speakButton}>
                  <Ionicons name="volume-high" size={20} color="#8E24AA" />
                </TouchableOpacity>
              </View>
              <Text style={styles.resultText}>{translatedText}</Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.voiceQuickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="bookmark" size={20} color="#8E24AA" />
            <Text style={styles.actionButtonText}>Save</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share" size={20} color="#8E24AA" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="copy" size={20} color="#8E24AA" />
            <Text style={styles.actionButtonText}>Copy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

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
        {recentTranslations.map((item) => (
          <View key={item.id} style={styles.infoCard}>
            <Text style={styles.infoText}>{item.text}</Text>
            <Text style={styles.infoSubtext}>{item.language}</Text>
          </View>
        ))}
        {recentTranslations.length === 0 && (
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>No translations yet.</Text>
            <Text style={styles.infoSubtext}>Start by adding one!</Text>
          </View>
        )}
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
        <TouchableOpacity 
          style={styles.translateButton}
          onPress={() => setShowVoiceScreen(true)}
        >
          <Ionicons name="mic" size={50} color="#8E24AA" />
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
      <StatusBar barStyle="light-content" backgroundColor="#8E24AA" />
      {showVoiceScreen ? renderVoiceTranslationScreen() : (
        <>
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
        </>
      )}
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
  // Voice Translation Screen Styles
  voiceScreenContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  voiceHeader: {
    backgroundColor: '#8E24AA',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  voiceHeaderContent: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  voiceHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  voiceHeaderSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  voiceHeaderRight: {
    width: 40,
  },
  voiceMainContent: {
    flex: 1,
    padding: 20,
  },
  languageSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  languageCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#8E24AA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  languageLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 8,
    fontWeight: '600',
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 16,
    color: '#2C3E50',
    marginLeft: 8,
    flex: 1,
    fontWeight: '500',
  },
  swapButton: {
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#F3E5F5',
  },
  recordingArea: {
    alignItems: 'center',
    marginBottom: 30,
  },
  recordingCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#8E24AA',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8E24AA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  recordButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#8E24AA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingActive: {
    backgroundColor: '#E91E63',
  },
  recordingInstruction: {
    fontSize: 16,
    color: '#2C3E50',
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  recordingStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  recordingPulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E91E63',
    marginRight: 8,
  },
  recordingStatusText: {
    fontSize: 14,
    color: '#E91E63',
    fontWeight: '600',
  },
  resultsArea: {
    flex: 1,
    marginBottom: 20,
  },
  resultCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#8E24AA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8E24AA',
    marginLeft: 8,
    flex: 1,
  },
  resultText: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
  },
  translatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  translatingText: {
    fontSize: 14,
    color: '#8E24AA',
    marginLeft: 8,
    fontStyle: 'italic',
  },
  voiceQuickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E1BEE7',
  },
  speakButton: {
    padding: 5,
    borderRadius: 15,
    backgroundColor: '#F3E5F5',
  },
}); 