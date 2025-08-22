import React, { useState, useEffect } from 'react';
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
  List,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

export default function NavigationScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [destination, setDestination] = useState('');
  const [transportMode, setTransportMode] = useState('walking');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [estimatedDistance, setEstimatedDistance] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);
  const [showMap, setShowMap] = useState(true);

  const transportModes = [
    { id: 'walking', name: 'Walking', icon: 'walk', color: '#4CAF50' },
    { id: 'transit', name: 'Public Transport', icon: 'train', color: '#2196F3' },
    { id: 'driving', name: 'Driving', icon: 'car', color: '#FF9800' },
    { id: 'cycling', name: 'Cycling', icon: 'bicycle', color: '#9C27B0' },
  ];

  const nearbyPlaces = [
    {
      name: 'Tokyo Station',
      type: 'Transport',
      distance: '0.5 km',
      rating: 4.5,
      coordinates: { latitude: 35.6812, longitude: 139.7671 },
    },
    {
      name: 'Convenience Store',
      type: 'Shopping',
      distance: '0.2 km',
      rating: 4.2,
      coordinates: { latitude: 35.6752, longitude: 139.6483 },
    },
    {
      name: 'Restaurant',
      type: 'Food',
      distance: '0.3 km',
      rating: 4.7,
      coordinates: { latitude: 35.6772, longitude: 139.6523 },
    },
  ];

  const publicTransportRoutes = [
    {
      route: 'JR Yamanote Line',
      destination: 'Shibuya',
      time: '5 min',
      platform: 'Platform 1',
      status: 'On Time',
    },
    {
      route: 'Tokyo Metro Marunouchi Line',
      destination: 'Ginza',
      time: '8 min',
      platform: 'Platform 3',
      status: 'Delayed 2 min',
    },
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter a destination');
      return;
    }

    // Simulate search
    setDestination(searchQuery);
    setEstimatedTime('15 min');
    setEstimatedDistance('2.3 km');
    
    // Update map to show route
    Alert.alert('Route Found', `Route to ${searchQuery} found!`);
  };

  const startNavigation = () => {
    if (!destination) {
      Alert.alert('Error', 'Please search for a destination first');
      return;
    }

    setIsNavigating(true);
    Alert.alert('Navigation Started', `Navigating to ${destination}`);
  };

  const toggleMapView = () => {
    setShowMap(!showMap);
  };

  const getTransportIcon = (mode) => {
    const transport = transportModes.find(t => t.id === mode);
    return transport ? transport.icon : 'walk';
  };

  const getTransportColor = (mode) => {
    const transport = transportModes.find(t => t.id === mode);
    return transport ? transport.color : '#4CAF50';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#4CAF50', '#388E3C']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Title style={styles.headerTitle}>Navigation</Title>
          <Paragraph style={styles.headerSubtitle}>
            GPS Navigation & Public Transport
          </Paragraph>
        </View>
        <TouchableOpacity style={styles.mapToggle} onPress={toggleMapView}>
          <Ionicons 
            name={showMap ? "list" : "map"} 
            size={24} 
            color="white" 
          />
        </TouchableOpacity>
      </LinearGradient>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search for destination..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            mode="outlined"
            right={
              <TextInput.Icon 
                icon="magnify" 
                onPress={handleSearch}
                color="#4CAF50"
              />
            }
          />
        </View>
        
        {/* Transport Mode Selection */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.transportModes}>
          {transportModes.map((mode) => (
            <TouchableOpacity
              key={mode.id}
              style={[
                styles.transportMode,
                transportMode === mode.id && styles.selectedTransportMode
              ]}
              onPress={() => setTransportMode(mode.id)}
            >
              <Ionicons 
                name={mode.icon} 
                size={24} 
                color={transportMode === mode.id ? 'white' : mode.color} 
              />
              <Text style={[
                styles.transportModeText,
                transportMode === mode.id && styles.selectedTransportModeText
              ]}>
                {mode.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Map View */}
      {showMap && (
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={currentLocation}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            {/* Current Location Marker */}
            <Marker
              coordinate={currentLocation}
              title="You are here"
              description="Current location"
              pinColor="#4CAF50"
            />
            
            {/* Nearby Places Markers */}
            {nearbyPlaces.map((place, index) => (
              <Marker
                key={index}
                coordinate={place.coordinates}
                title={place.name}
                description={`${place.type} • ${place.distance}`}
                pinColor="#2196F3"
              />
            ))}
          </MapView>
          
          {/* Map Controls */}
          <View style={styles.mapControls}>
            <TouchableOpacity style={styles.mapControl}>
              <Ionicons name="locate" size={24} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mapControl}>
              <Ionicons name="layers" size={24} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mapControl}>
              <Ionicons name="compass" size={24} color="#4CAF50" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Route Information */}
      {destination && (
        <Card style={styles.routeCard}>
          <Card.Content>
            <View style={styles.routeHeader}>
              <Title style={styles.routeTitle}>Route to {destination}</Title>
              <Chip 
                icon={() => <Ionicons name={getTransportIcon(transportMode)} size={16} color="white" />}
                style={[styles.transportChip, { backgroundColor: getTransportColor(transportMode) }]}
              >
                {transportModes.find(t => t.id === transportMode)?.name}
              </Chip>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.routeDetails}>
              <View style={styles.routeDetail}>
                <Ionicons name="time" size={20} color="#666" />
                <Text style={styles.routeDetailText}>{estimatedTime}</Text>
              </View>
              <View style={styles.routeDetail}>
                <Ionicons name="map" size={20} color="#666" />
                <Text style={styles.routeDetailText}>{estimatedDistance}</Text>
              </View>
            </View>
            <Button
              mode="contained"
              onPress={startNavigation}
              loading={isNavigating}
              disabled={isNavigating}
              style={styles.navigateButton}
              icon="navigation"
            >
              {isNavigating ? 'Navigating...' : 'Start Navigation'}
            </Button>
          </Card.Content>
        </Card>
      )}

      {/* Nearby Places */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Nearby Places</Title>
        {nearbyPlaces.map((place, index) => (
          <Card key={index} style={styles.placeCard}>
            <Card.Content style={styles.placeCardContent}>
              <View style={styles.placeInfo}>
                <Title style={styles.placeName}>{place.name}</Title>
                <View style={styles.placeMeta}>
                  <Text style={styles.placeType}>{place.type}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.rating}>{place.rating}</Text>
                  </View>
                </View>
                <Text style={styles.placeDistance}>{place.distance}</Text>
              </View>
              <View style={styles.placeActions}>
                <Button mode="outlined" onPress={() => {}}>
                  <Ionicons name="map" size={16} />
                  {' '}Map
                </Button>
                <Button mode="outlined" onPress={() => {}}>
                  <Ionicons name="navigate" size={16} />
                  {' '}Navigate
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Public Transport */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Public Transport</Title>
        {publicTransportRoutes.map((route, index) => (
          <Card key={index} style={styles.transportCard}>
            <Card.Content>
              <View style={styles.transportHeader}>
                <Title style={styles.transportRoute}>{route.route}</Title>
                <Chip 
                  style={[
                    styles.statusChip,
                    { backgroundColor: route.status === 'On Time' ? '#4CAF50' : '#FF9800' }
                  ]}
                  textStyle={styles.statusChipText}
                >
                  {route.status}
                </Chip>
              </View>
              <View style={styles.transportDetails}>
                <View style={styles.transportDetail}>
                  <Ionicons name="location" size={16} color="#666" />
                  <Text style={styles.transportDetailText}>{route.destination}</Text>
                </View>
                <View style={styles.transportDetail}>
                  <Ionicons name="time" size={16} color="#666" />
                  <Text style={styles.transportDetailText}>{route.time}</Text>
                </View>
                <View style={styles.transportDetail}>
                  <Ionicons name="train" size={16} color="#666" />
                  <Text style={styles.transportDetailText}>{route.platform}</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Offline Maps */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Offline Maps</Title>
        <Card style={styles.offlineCard}>
          <Card.Content>
            <View style={styles.offlineHeader}>
              <Ionicons name="download" size={24} color="#4CAF50" />
              <Title style={styles.offlineTitle}>Download Maps</Title>
            </View>
            <Paragraph style={styles.offlineText}>
              Download maps for offline use when traveling to areas with limited connectivity.
            </Paragraph>
            <View style={styles.offlineActions}>
              <Button mode="outlined" onPress={() => {}}>
                Tokyo Area (150 MB)
              </Button>
              <Button mode="outlined" onPress={() => {}}>
                Osaka Area (120 MB)
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>
    </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
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
  mapToggle: {
    padding: 10,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 20,
  },
  searchContainer: {
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: 'white',
    elevation: 4,
  },
  transportModes: {
    marginBottom: 10,
  },
  transportMode: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginRight: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: 'white',
  },
  selectedTransportMode: {
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
  },
  transportModeText: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  selectedTransportModeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  mapContainer: {
    height: height * 0.4,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 4,
  },
  map: {
    flex: 1,
  },
  mapControls: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  mapControl: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
    elevation: 4,
  },
  routeCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 4,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  transportChip: {
    marginLeft: 10,
  },
  divider: {
    marginBottom: 15,
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  routeDetail: {
    alignItems: 'center',
  },
  routeDetailText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  navigateButton: {
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
  placeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  placeType: {
    fontSize: 14,
    color: '#666',
    marginRight: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  placeDistance: {
    fontSize: 14,
    color: '#999',
  },
  placeActions: {
    alignItems: 'flex-end',
  },
  transportCard: {
    marginBottom: 10,
    elevation: 2,
  },
  transportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  transportRoute: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  statusChip: {
    marginLeft: 10,
  },
  statusChipText: {
    color: 'white',
    fontSize: 12,
  },
  transportDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transportDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transportDetailText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  offlineCard: {
    elevation: 2,
  },
  offlineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  offlineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  offlineText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  offlineActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
}); 