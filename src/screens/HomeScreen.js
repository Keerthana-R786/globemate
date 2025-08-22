import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Searchbar,
  Chip,
  Avatar,
  Text,
  Surface,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState('Tokyo, Japan');
  const [weather, setWeather] = useState({ temp: 22, condition: 'Sunny' });

  const quickActions = [
    {
      title: 'Translate',
      icon: 'language',
      color: '#2196F3',
      onPress: () => navigation.navigate('Translate'),
      description: 'Voice, text & image translation'
    },
    {
      title: 'Navigate',
      icon: 'map',
      color: '#4CAF50',
      onPress: () => navigation.navigate('Navigate'),
      description: 'GPS navigation & transport'
    },
    {
      title: 'Emergency',
      icon: 'warning',
      color: '#F44336',
      onPress: () => navigation.navigate('Emergency'),
      description: 'Emergency contacts & help'
    },
    {
      title: 'Culture',
      icon: 'people',
      color: '#FF9800',
      onPress: () => navigation.navigate('Culture'),
      description: 'Local customs & etiquette'
    }
  ];

  const recentTranslations = [
    { text: 'Where is the nearest train station?', language: 'Japanese' },
    { text: 'How much does this cost?', language: 'Chinese' },
    { text: 'I need help, please', language: 'Thai' }
  ];

  const nearbyPlaces = [
    { name: 'Tokyo Station', type: 'Transport', distance: '0.5 km' },
    { name: 'Convenience Store', type: 'Shopping', distance: '0.2 km' },
    { name: 'Restaurant', type: 'Food', distance: '0.3 km' }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header with location and weather */}
      <LinearGradient
        colors={['#2196F3', '#1976D2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={20} color="white" />
            <Text style={styles.locationText}>{currentLocation}</Text>
          </View>
          <View style={styles.weatherContainer}>
            <Ionicons name="sunny" size={24} color="white" />
            <Text style={styles.weatherText}>{weather.temp}°C</Text>
          </View>
        </View>
        <Text style={styles.welcomeText}>Welcome to GlobeMate!</Text>
        <Text style={styles.subtitleText}>Your smart travel companion</Text>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search for places, translate text..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor="#2196F3"
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Quick Actions</Title>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <Card
              key={index}
              style={[styles.actionCard, { borderLeftColor: action.color }]}
              onPress={action.onPress}
            >
              <Card.Content style={styles.actionCardContent}>
                <View style={[styles.iconContainer, { backgroundColor: action.color }]}>
                  <Ionicons name={action.icon} size={24} color="white" />
                </View>
                <View style={styles.actionTextContainer}>
                  <Title style={styles.actionTitle}>{action.title}</Title>
                  <Paragraph style={styles.actionDescription}>
                    {action.description}
                  </Paragraph>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>

      {/* Recent Translations */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Recent Translations</Title>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recentTranslations.map((translation, index) => (
            <Card key={index} style={styles.translationCard}>
              <Card.Content>
                <Text style={styles.translationText}>{translation.text}</Text>
                <Chip style={styles.languageChip} textStyle={styles.chipText}>
                  {translation.language}
                </Chip>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </View>

      {/* Nearby Places */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Nearby Places</Title>
        {nearbyPlaces.map((place, index) => (
          <Card key={index} style={styles.placeCard}>
            <Card.Content style={styles.placeCardContent}>
              <View style={styles.placeInfo}>
                <Title style={styles.placeName}>{place.name}</Title>
                <Paragraph style={styles.placeType}>{place.type}</Paragraph>
              </View>
              <View style={styles.placeDistance}>
                <Text style={styles.distanceText}>{place.distance}</Text>
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate('Navigate')}
                  style={styles.navigateButton}
                >
                  Navigate
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Travel Tips */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Travel Tips</Title>
        <Card style={styles.tipCard}>
          <Card.Content>
            <View style={styles.tipHeader}>
              <Ionicons name="bulb" size={24} color="#FF9800" />
              <Title style={styles.tipTitle}>Cultural Etiquette</Title>
            </View>
            <Paragraph style={styles.tipText}>
              In Japan, it's polite to bow when greeting someone. The deeper the bow, 
              the more respect you show. Remember to remove your shoes when entering 
              traditional establishments.
            </Paragraph>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('Culture')}
              style={styles.tipButton}
            >
              Learn More
            </Button>
          </Card.Content>
        </Card>
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
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '500',
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  welcomeText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitleText: {
    color: 'white',
    fontSize: 16,
    opacity: 0.9,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 20,
  },
  searchBar: {
    elevation: 4,
    borderRadius: 25,
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
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 50) / 2,
    marginBottom: 15,
    borderLeftWidth: 4,
    elevation: 2,
  },
  actionCardContent: {
    padding: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  actionDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  translationCard: {
    width: 200,
    marginRight: 15,
    elevation: 2,
  },
  translationText: {
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 20,
  },
  languageChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
  },
  chipText: {
    color: '#1976D2',
    fontSize: 12,
  },
  placeCard: {
    marginBottom: 10,
    elevation: 2,
  },
  placeCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  placeType: {
    fontSize: 14,
    color: '#666',
  },
  placeDistance: {
    alignItems: 'flex-end',
  },
  distanceText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  navigateButton: {
    borderRadius: 20,
  },
  tipCard: {
    elevation: 2,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
    color: '#666',
  },
  tipButton: {
    alignSelf: 'flex-start',
  },
}); 