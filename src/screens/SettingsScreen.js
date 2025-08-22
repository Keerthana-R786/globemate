import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Text,
  List,
  Divider,
  Switch as PaperSwitch,
  TextInput,
  Dialog,
  Portal,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    notifications: {
      push: true,
      email: false,
      sms: false,
      emergency: true,
      updates: true,
    },
    appearance: {
      darkMode: false,
      language: 'English',
      fontSize: 'Medium',
      theme: 'Blue',
    },
    privacy: {
      locationSharing: true,
      dataCollection: false,
      analytics: false,
      crashReports: true,
    },
    translation: {
      autoTranslate: true,
      defaultSourceLang: 'English',
      defaultTargetLang: 'Japanese',
      offlineTranslation: true,
    },
    navigation: {
      offlineMaps: true,
      trafficUpdates: true,
      publicTransport: true,
      walkingRoutes: true,
    }
  });

  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [showFontSizeDialog, setShowFontSizeDialog] = useState(false);
  const [showThemeDialog, setShowThemeDialog] = useState(false);

  const languages = [
    'English', 'Japanese', 'Chinese', 'Korean', 'Thai', 'Vietnamese',
    'French', 'German', 'Spanish', 'Italian', 'Portuguese', 'Russian'
  ];

  const fontSizes = ['Small', 'Medium', 'Large', 'Extra Large'];
  const themes = ['Blue', 'Green', 'Purple', 'Orange', 'Red'];

  const toggleSetting = (category, key) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key]
      }
    }));
  };

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'Your travel data will be exported to your email. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => {
          Alert.alert('Success', 'Data export initiated. Check your email shortly.');
        }},
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          Alert.alert('Account Deleted', 'Your account has been deleted successfully.');
        }},
      ]
    );
  };

  const renderHeader = () => (
    <LinearGradient
      colors={['#673AB7', '#512DA8']}
      style={styles.header}
    >
      <Title style={styles.headerTitle}>Settings</Title>
      <Paragraph style={styles.headerSubtitle}>
        Customize your GlobeMate experience
      </Paragraph>
    </LinearGradient>
  );

  const renderNotificationsSection = () => (
    <Card style={styles.settingsCard}>
      <Card.Content>
        <Title style={styles.cardTitle}>
          <Ionicons name="notifications" size={24} color="#673AB7" />
          {' '}Notifications
        </Title>
        <Divider style={styles.divider} />
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Text style={styles.settingDescription}>Receive alerts on your device</Text>
          </View>
          <Switch
            value={settings.notifications.push}
            onValueChange={() => toggleSetting('notifications', 'push')}
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Email Notifications</Text>
            <Text style={styles.settingDescription}>Receive updates via email</Text>
          </View>
          <Switch
            value={settings.notifications.email}
            onValueChange={() => toggleSetting('notifications', 'email')}
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>SMS Notifications</Text>
            <Text style={styles.settingDescription}>Receive alerts via text message</Text>
          </View>
          <Switch
            value={settings.notifications.sms}
            onValueChange={() => toggleSetting('notifications', 'sms')}
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Emergency Alerts</Text>
            <Text style={styles.settingDescription}>Critical safety notifications</Text>
          </View>
          <Switch
            value={settings.notifications.emergency}
            onValueChange={() => toggleSetting('notifications', 'emergency')}
          />
        </View>
      </Card.Content>
    </Card>
  );

  const renderAppearanceSection = () => (
    <Card style={styles.settingsCard}>
      <Card.Content>
        <Title style={styles.cardTitle}>
          <Ionicons name="color-palette" size={24} color="#673AB7" />
          {' '}Appearance
        </Title>
        <Divider style={styles.divider} />
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Text style={styles.settingDescription}>Switch to dark theme</Text>
          </View>
          <Switch
            value={settings.appearance.darkMode}
            onValueChange={() => toggleSetting('appearance', 'darkMode')}
          />
        </View>
        
        <TouchableOpacity
          style={styles.settingRow}
          onPress={() => setShowLanguageDialog(true)}
        >
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Language</Text>
            <Text style={styles.settingDescription}>App interface language</Text>
          </View>
          <View style={styles.settingValue}>
            <Text style={styles.settingValueText}>{settings.appearance.language}</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.settingRow}
          onPress={() => setShowFontSizeDialog(true)}
        >
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Font Size</Text>
            <Text style={styles.settingDescription}>Text size preference</Text>
          </View>
          <View style={styles.settingValue}>
            <Text style={styles.settingValueText}>{settings.appearance.fontSize}</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.settingRow}
          onPress={() => setShowThemeDialog(true)}
        >
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Theme Color</Text>
            <Text style={styles.settingDescription}>Primary color scheme</Text>
          </View>
          <View style={styles.settingValue}>
            <View style={[styles.themePreview, { backgroundColor: getThemeColor(settings.appearance.theme) }]} />
            <Text style={styles.settingValueText}>{settings.appearance.theme}</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </View>
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );

  const renderPrivacySection = () => (
    <Card style={styles.settingsCard}>
      <Card.Content>
        <Title style={styles.cardTitle}>
          <Ionicons name="shield" size={24} color="#673AB7" />
          {' '}Privacy & Security
        </Title>
        <Divider style={styles.divider} />
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Location Sharing</Text>
            <Text style={styles.settingDescription}>Share location for navigation</Text>
          </View>
          <Switch
            value={settings.privacy.locationSharing}
            onValueChange={() => toggleSetting('privacy', 'locationSharing')}
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Data Collection</Text>
            <Text style={styles.settingDescription}>Help improve app with usage data</Text>
          </View>
          <Switch
            value={settings.privacy.dataCollection}
            onValueChange={() => toggleSetting('privacy', 'dataCollection')}
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Analytics</Text>
            <Text style={styles.settingDescription}>App usage analytics</Text>
          </View>
          <Switch
            value={settings.privacy.analytics}
            onValueChange={() => toggleSetting('privacy', 'analytics')}
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Crash Reports</Text>
            <Text style={styles.settingDescription}>Send crash reports for debugging</Text>
          </View>
          <Switch
            value={settings.privacy.crashReports}
            onValueChange={() => toggleSetting('privacy', 'crashReports')}
          />
        </View>
      </Card.Content>
    </Card>
  );

  const renderTranslationSection = () => (
    <Card style={styles.settingsCard}>
      <Card.Content>
        <Title style={styles.cardTitle}>
          <Ionicons name="language" size={24} color="#673AB7" />
          {' '}Translation
        </Title>
        <Divider style={styles.divider} />
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Auto-Translate</Text>
            <Text style={styles.settingDescription}>Automatically translate text</Text>
          </View>
          <Switch
            value={settings.translation.autoTranslate}
            onValueChange={() => toggleSetting('translation', 'autoTranslate')}
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Offline Translation</Text>
            <Text style={styles.settingDescription}>Translate without internet</Text>
          </View>
          <Switch
            value={settings.translation.offlineTranslation}
            onValueChange={() => toggleSetting('translation', 'offlineTranslation')}
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Default Source Language</Text>
            <Text style={styles.settingDescription}>Your primary language</Text>
          </View>
          <Text style={styles.settingValueText}>{settings.translation.defaultSourceLang}</Text>
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Default Target Language</Text>
            <Text style={styles.settingDescription}>Language to translate to</Text>
          </View>
          <Text style={styles.settingValueText}>{settings.translation.defaultTargetLang}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  const renderNavigationSection = () => (
    <Card style={styles.settingsCard}>
      <Card.Content>
        <Title style={styles.cardTitle}>
          <Ionicons name="map" size={24} color="#673AB7" />
          {' '}Navigation
        </Title>
        <Divider style={styles.divider} />
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Offline Maps</Text>
            <Text style={styles.settingDescription}>Download maps for offline use</Text>
          </View>
          <Switch
            value={settings.navigation.offlineMaps}
            onValueChange={() => toggleSetting('navigation', 'offlineMaps')}
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Traffic Updates</Text>
            <Text style={styles.settingDescription}>Real-time traffic information</Text>
          </View>
          <Switch
            value={settings.navigation.trafficUpdates}
            onValueChange={() => toggleSetting('navigation', 'trafficUpdates')}
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Public Transport</Text>
            <Text style={styles.settingDescription}>Bus and train information</Text>
          </View>
          <Switch
            value={settings.navigation.publicTransport}
            onValueChange={() => toggleSetting('navigation', 'publicTransport')}
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Walking Routes</Text>
            <Text style={styles.settingDescription}>Pedestrian navigation</Text>
          </View>
          <Switch
            value={settings.navigation.walkingRoutes}
            onValueChange={() => toggleSetting('navigation', 'walkingRoutes')}
          />
        </View>
      </Card.Content>
    </Card>
  );

  const renderAccountSection = () => (
    <Card style={styles.settingsCard}>
      <Card.Content>
        <Title style={styles.cardTitle}>
          <Ionicons name="person" size={24} color="#673AB7" />
          {' '}Account
        </Title>
        <Divider style={styles.divider} />
        
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Change Password</Text>
            <Text style={styles.settingDescription}>Update your account password</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Two-Factor Authentication</Text>
            <Text style={styles.settingDescription}>Add extra security to your account</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingRow} onPress={handleExportData}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Export Data</Text>
            <Text style={styles.settingDescription}>Download your travel data</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingRow} onPress={handleDeleteAccount}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Delete Account</Text>
            <Text style={styles.settingDescription}>Permanently remove your account</Text>
          </View>
          <Ionicons name="trash" size={20} color="#F44336" />
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );

  const getThemeColor = (theme) => {
    const colors = {
      'Blue': '#2196F3',
      'Green': '#4CAF50',
      'Purple': '#9C27B0',
      'Orange': '#FF9800',
      'Red': '#F44336'
    };
    return colors[theme] || '#2196F3';
  };

  return (
    <ScrollView style={styles.container}>
      {renderHeader()}
      
      {renderNotificationsSection()}
      {renderAppearanceSection()}
      {renderPrivacySection()}
      {renderTranslationSection()}
      {renderNavigationSection()}
      {renderAccountSection()}

      {/* Language Selection Dialog */}
      <Portal>
        <Dialog visible={showLanguageDialog} onDismiss={() => setShowLanguageDialog(false)}>
          <Dialog.Title>Select Language</Dialog.Title>
          <Dialog.Content>
            {languages.map((language) => (
              <TouchableOpacity
                key={language}
                style={styles.languageOption}
                onPress={() => {
                  updateSetting('appearance', 'language', language);
                  setShowLanguageDialog(false);
                }}
              >
                <Text style={styles.languageText}>{language}</Text>
                {settings.appearance.language === language && (
                  <Ionicons name="checkmark" size={20} color="#673AB7" />
                )}
              </TouchableOpacity>
            ))}
          </Dialog.Content>
        </Dialog>
      </Portal>

      {/* Font Size Selection Dialog */}
      <Portal>
        <Dialog visible={showFontSizeDialog} onDismiss={() => setShowFontSizeDialog(false)}>
          <Dialog.Title>Select Font Size</Dialog.Title>
          <Dialog.Content>
            {fontSizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={styles.languageOption}
                onPress={() => {
                  updateSetting('appearance', 'fontSize', size);
                  setShowFontSizeDialog(false);
                }}
              >
                <Text style={styles.languageText}>{size}</Text>
                {settings.appearance.fontSize === size && (
                  <Ionicons name="checkmark" size={20} color="#673AB7" />
                )}
              </TouchableOpacity>
            ))}
          </Dialog.Content>
        </Dialog>
      </Portal>

      {/* Theme Selection Dialog */}
      <Portal>
        <Dialog visible={showThemeDialog} onDismiss={() => setShowThemeDialog(false)}>
          <Dialog.Title>Select Theme</Dialog.Title>
          <Dialog.Content>
            {themes.map((theme) => (
              <TouchableOpacity
                key={theme}
                style={styles.languageOption}
                onPress={() => {
                  updateSetting('appearance', 'theme', theme);
                  setShowThemeDialog(false);
                }}
              >
                <View style={styles.themeOption}>
                  <View style={[styles.themePreview, { backgroundColor: getThemeColor(theme) }]} />
                  <Text style={styles.languageText}>{theme}</Text>
                </View>
                {settings.appearance.theme === theme && (
                  <Ionicons name="checkmark" size={20} color="#673AB7" />
                )}
              </TouchableOpacity>
            ))}
          </Dialog.Content>
        </Dialog>
      </Portal>
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
  settingsCard: {
    margin: 20,
    marginBottom: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValueText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  themePreview: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  languageText: {
    fontSize: 16,
    color: '#212121',
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}); 