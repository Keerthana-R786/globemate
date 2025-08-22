import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  TextInput,
  Chip,
  Text,
  Surface,
  IconButton,
  Divider,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function TranslationScreen() {
  const [activeTab, setActiveTab] = useState('text');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('English');
  const [targetLanguage, setTargetLanguage] = useState('Japanese');
  const [isRecording, setIsRecording] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const languages = [
    'English', 'Japanese', 'Chinese', 'Korean', 'Thai', 'Vietnamese',
    'French', 'German', 'Spanish', 'Italian', 'Portuguese', 'Russian'
  ];

  const translationHistory = [
    {
      source: 'Where is the nearest train station?',
      translated: '最寄りの駅はどこですか？',
      sourceLang: 'English',
      targetLang: 'Japanese',
      timestamp: '2 min ago'
    },
    {
      source: 'How much does this cost?',
      translated: 'これはいくらですか？',
      sourceLang: 'English',
      targetLang: 'Japanese',
      timestamp: '5 min ago'
    }
  ];

  const handleTextTranslation = async () => {
    if (!sourceText.trim()) {
      Alert.alert('Error', 'Please enter text to translate');
      return;
    }

    setIsTranslating(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockTranslations = {
        'Where is the nearest train station?': '最寄りの駅はどこですか？',
        'How much does this cost?': 'これはいくらですか？',
        'I need help': '助けが必要です',
        'Thank you': 'ありがとうございます',
        'Hello': 'こんにちは'
      };

      const translation = mockTranslations[sourceText] || `[${targetLanguage} translation of: ${sourceText}]`;
      setTranslatedText(translation);
      setIsTranslating(false);
    }, 1500);
  };

  const handleVoiceTranslation = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // Simulate voice recognition and translation
      setTimeout(() => {
        setSourceText('Where is the nearest train station?');
        handleTextTranslation();
      }, 1000);
    } else {
      // Start recording
      setIsRecording(true);
      Alert.alert('Recording', 'Please speak now...');
    }
  };

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(status === 'granted');
    if (status === 'granted') {
      setShowCamera(true);
    }
  };

  const handleImageTranslation = async () => {
    if (cameraPermission === null) {
      await requestCameraPermission();
    } else if (cameraPermission === false) {
      Alert.alert('Permission Denied', 'Camera permission is required for image translation');
    } else {
      setShowCamera(true);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri);
      setShowCamera(false);
      
      // Simulate OCR and translation
      setTimeout(() => {
        setSourceText('駅の看板');
        setTranslatedText('Train station sign');
        Alert.alert('Image Translated', 'Text detected and translated successfully!');
      }, 2000);
    }
  };

  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCapturedImage(result.assets[0].uri);
      // Simulate OCR and translation
      setTimeout(() => {
        setSourceText('レストランのメニュー');
        setTranslatedText('Restaurant menu');
        Alert.alert('Image Translated', 'Text detected and translated successfully!');
      }, 2000);
    }
  };

  const cameraRef = useRef(null);

  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} ref={cameraRef}>
          <View style={styles.cameraOverlay}>
            <View style={styles.cameraHeader}>
              <IconButton
                icon="close"
                iconColor="white"
                size={30}
                onPress={() => setShowCamera(false)}
              />
              <Text style={styles.cameraTitle}>Take Photo for Translation</Text>
            </View>
            <View style={styles.cameraControls}>
              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#2196F3', '#1976D2']}
        style={styles.header}
      >
        <Title style={styles.headerTitle}>Translation</Title>
        <Paragraph style={styles.headerSubtitle}>
          Voice, Text & Image Translation
        </Paragraph>
      </LinearGradient>

      {/* Language Selection */}
      <View style={styles.languageContainer}>
        <View style={styles.languageSelector}>
          <Text style={styles.languageLabel}>From:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {languages.map((lang) => (
              <Chip
                key={lang}
                selected={sourceLanguage === lang}
                onPress={() => setSourceLanguage(lang)}
                style={styles.languageChip}
                textStyle={styles.chipText}
              >
                {lang}
              </Chip>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.languageSelector}>
          <Text style={styles.languageLabel}>To:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {languages.map((lang) => (
              <Chip
                key={lang}
                selected={targetLanguage === lang}
                onPress={() => setTargetLanguage(lang)}
                style={styles.languageChip}
                textStyle={styles.chipText}
              >
                {lang}
              </Chip>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Translation Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'text' && styles.activeTab]}
          onPress={() => setActiveTab('text')}
        >
          <Ionicons 
            name="text" 
            size={20} 
            color={activeTab === 'text' ? '#2196F3' : '#666'} 
          />
          <Text style={[styles.tabText, activeTab === 'text' && styles.activeTabText]}>
            Text
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'voice' && styles.activeTab]}
          onPress={() => setActiveTab('voice')}
        >
          <Ionicons 
            name="mic" 
            size={20} 
            color={activeTab === 'voice' ? '#2196F3' : '#666'} 
          />
          <Text style={[styles.tabText, activeTab === 'voice' && styles.activeTabText]}>
            Voice
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'image' && styles.activeTab]}
          onPress={() => setActiveTab('image')}
        >
          <Ionicons 
            name="camera" 
            size={20} 
            color={activeTab === 'image' ? '#2196F3' : '#666'} 
          />
          <Text style={[styles.tabText, activeTab === 'image' && styles.activeTabText]}>
            Image
          </Text>
        </TouchableOpacity>
      </View>

      {/* Translation Content */}
      <View style={styles.translationContent}>
        {activeTab === 'text' && (
          <View>
            <TextInput
              label="Enter text to translate"
              value={sourceText}
              onChangeText={setSourceText}
              multiline
              numberOfLines={4}
              style={styles.textInput}
              mode="outlined"
            />
            <Button
              mode="contained"
              onPress={handleTextTranslation}
              loading={isTranslating}
              disabled={isTranslating}
              style={styles.translateButton}
            >
              {isTranslating ? 'Translating...' : 'Translate'}
            </Button>
          </View>
        )}

        {activeTab === 'voice' && (
          <View style={styles.voiceContainer}>
            <TouchableOpacity
              style={[styles.voiceButton, isRecording && styles.recordingButton]}
              onPress={handleVoiceTranslation}
            >
              <Ionicons 
                name={isRecording ? "stop" : "mic"} 
                size={40} 
                color="white" 
              />
            </TouchableOpacity>
            <Text style={styles.voiceText}>
              {isRecording ? 'Recording... Tap to stop' : 'Tap to start recording'}
            </Text>
          </View>
        )}

        {activeTab === 'image' && (
          <View style={styles.imageContainer}>
            {capturedImage ? (
              <View>
                <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
                <View style={styles.imageButtons}>
                  <Button mode="outlined" onPress={handleImageTranslation}>
                    Retake Photo
                  </Button>
                  <Button mode="outlined" onPress={pickImageFromGallery}>
                    Choose from Gallery
                  </Button>
                </View>
              </View>
            ) : (
              <View style={styles.imageOptions}>
                <TouchableOpacity style={styles.imageOption} onPress={requestCameraPermission}>
                  <Ionicons name="camera" size={40} color="#2196F3" />
                  <Text style={styles.imageOptionText}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageOption} onPress={pickImageFromGallery}>
                  <Ionicons name="images" size={40} color="#2196F3" />
                  <Text style={styles.imageOptionText}>Choose from Gallery</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Translation Result */}
      {translatedText && (
        <Card style={styles.resultCard}>
          <Card.Content>
            <Title style={styles.resultTitle}>Translation Result</Title>
            <Divider style={styles.divider} />
            <Text style={styles.sourceText}>{sourceText}</Text>
            <Text style={styles.translatedText}>{translatedText}</Text>
            <View style={styles.resultActions}>
              <Button mode="outlined" onPress={() => {}}>
                <Ionicons name="volume-high" size={16} />
                {' '}Listen
              </Button>
              <Button mode="outlined" onPress={() => {}}>
                <Ionicons name="copy" size={16} />
                {' '}Copy
              </Button>
              <Button mode="outlined" onPress={() => {}}>
                <Ionicons name="share" size={16} />
                {' '}Share
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Translation History */}
      <View style={styles.historySection}>
        <Title style={styles.historyTitle}>Recent Translations</Title>
        {translationHistory.map((item, index) => (
          <Card key={index} style={styles.historyCard}>
            <Card.Content>
              <View style={styles.historyHeader}>
                <Text style={styles.historyLanguages}>
                  {item.sourceLang} → {item.targetLang}
                </Text>
                <Text style={styles.historyTimestamp}>{item.timestamp}</Text>
              </View>
              <Text style={styles.historySource}>{item.source}</Text>
              <Text style={styles.historyTranslated}>{item.translated}</Text>
            </Card.Content>
          </Card>
        ))}
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
  languageContainer: {
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 20,
  },
  languageSelector: {
    marginBottom: 15,
  },
  languageLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#212121',
  },
  languageChip: {
    marginRight: 10,
    backgroundColor: '#E3F2FD',
  },
  chipText: {
    color: '#1976D2',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#2196F3',
  },
  tabText: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  translationContent: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  textInput: {
    marginBottom: 15,
  },
  translateButton: {
    borderRadius: 25,
  },
  voiceContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  voiceButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  recordingButton: {
    backgroundColor: '#F44336',
  },
  voiceText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  imageContainer: {
    paddingVertical: 20,
  },
  imageOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageOption: {
    alignItems: 'center',
    padding: 20,
  },
  imageOptionText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  capturedImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  resultCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 4,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  divider: {
    marginBottom: 15,
  },
  sourceText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  translatedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 15,
  },
  resultActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  historySection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#212121',
  },
  historyCard: {
    marginBottom: 10,
    elevation: 2,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  historyLanguages: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
  historyTimestamp: {
    fontSize: 12,
    color: '#999',
  },
  historySource: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  historyTranslated: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  cameraTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cameraControls: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
  },
}); 