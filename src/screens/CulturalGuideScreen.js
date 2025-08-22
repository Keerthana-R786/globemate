import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
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
  Searchbar,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function CulturalGuideScreen() {
  const [selectedCountry, setSelectedCountry] = useState('Japan');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('etiquette');

  const countries = [
    { name: 'Japan', flag: '🇯🇵', color: '#E91E63' },
    { name: 'China', flag: '🇨🇳', color: '#F44336' },
    { name: 'Thailand', flag: '🇹🇭', color: '#2196F3' },
    { name: 'Korea', flag: '🇰🇷', color: '#3F51B5' },
    { name: 'Vietnam', flag: '🇻🇳', color: '#4CAF50' },
  ];

  const categories = [
    { id: 'etiquette', name: 'Etiquette', icon: 'people' },
    { id: 'phrases', name: 'Phrases', icon: 'chatbubbles' },
    { id: 'customs', name: 'Customs', icon: 'heart' },
    { id: 'taboos', name: 'Taboos', icon: 'close-circle' },
  ];

  const culturalData = {
    Japan: {
      etiquette: [
        {
          title: 'Bowing',
          description: 'Bow when greeting someone. The deeper the bow, the more respect you show.',
          icon: 'body',
          importance: 'High'
        },
        {
          title: 'Shoes Off',
          description: 'Remove your shoes when entering traditional establishments, homes, and some restaurants.',
          icon: 'footsteps',
          importance: 'High'
        },
        {
          title: 'Chopsticks',
          description: 'Never stick chopsticks upright in rice, pass food directly, or point with them.',
          icon: 'restaurant',
          importance: 'Medium'
        }
      ],
      phrases: [
        {
          english: 'Hello',
          local: 'こんにちは (Konnichiwa)',
          pronunciation: 'kon-nee-chee-wah',
          category: 'Greeting'
        },
        {
          english: 'Thank you',
          local: 'ありがとうございます (Arigatou gozaimasu)',
          pronunciation: 'ah-ree-gah-toh goh-zah-ee-mahs',
          category: 'Politeness'
        },
        {
          english: 'Excuse me',
          local: 'すみません (Sumimasen)',
          pronunciation: 'soo-mee-mah-sen',
          category: 'Apology'
        }
      ],
      customs: [
        {
          title: 'Gift Giving',
          description: 'Gifts are important in Japanese culture. Always give and receive with both hands.',
          icon: 'gift'
        },
        {
          title: 'Business Cards',
          description: 'Exchange business cards (meishi) with both hands and bow slightly.',
          icon: 'card'
        },
        {
          title: 'Public Behavior',
          description: 'Keep your voice down in public places and avoid eating while walking.',
          icon: 'volume-low'
        }
      ],
      taboos: [
        {
          title: 'Pointing',
          description: 'Avoid pointing with your index finger. Use an open hand instead.',
          icon: 'hand-left'
        },
        {
          title: 'Tipping',
          description: 'Tipping is not expected and can be considered rude in Japan.',
          icon: 'cash'
        },
        {
          title: 'Public Displays',
          description: 'Avoid public displays of affection, especially in traditional areas.',
          icon: 'heart-outline'
        }
      ]
    },
    China: {
      etiquette: [
        {
          title: 'Greetings',
          description: 'A slight bow or nod is appropriate. Handshakes are becoming more common.',
          icon: 'handshake',
          importance: 'Medium'
        },
        {
          title: 'Gift Giving',
          description: 'Avoid giving clocks, handkerchiefs, or white flowers as they symbolize death.',
          icon: 'gift',
          importance: 'High'
        },
        {
          title: 'Dining',
          description: 'Wait for the host to begin eating. Try everything offered to you.',
          icon: 'restaurant',
          importance: 'High'
        }
      ],
      phrases: [
        {
          english: 'Hello',
          local: '你好 (Nǐ hǎo)',
          pronunciation: 'nee how',
          category: 'Greeting'
        },
        {
          english: 'Thank you',
          local: '谢谢 (Xièxie)',
          pronunciation: 'shieh-shieh',
          category: 'Politeness'
        },
        {
          english: 'Goodbye',
          local: '再见 (Zàijiàn)',
          pronunciation: 'dzai-jee-en',
          category: 'Farewell'
        }
      ],
      customs: [
        {
          title: 'Face (Mianzi)',
          description: 'Maintaining face and dignity is crucial. Never embarrass someone publicly.',
          icon: 'happy'
        },
        {
          title: 'Hierarchy',
          description: 'Respect for elders and authority figures is deeply ingrained.',
          icon: 'people'
        },
        {
          title: 'Business',
          description: 'Business relationships are built on trust and personal connections.',
          icon: 'business'
        }
      ],
      taboos: [
        {
          title: 'Numbers',
          description: 'The number 4 is considered unlucky as it sounds like "death" in Chinese.',
          icon: 'close-circle'
        },
        {
          title: 'Colors',
          description: 'White and black are associated with funerals and should be avoided.',
          icon: 'color-palette'
        },
        {
          title: 'Topics',
          description: 'Avoid discussing politics, Taiwan, or sensitive historical topics.',
          icon: 'chatbubble-ellipses'
        }
      ]
    }
  };

  const getCountryData = () => {
    return culturalData[selectedCountry] || culturalData.Japan;
  };

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'High':
        return '#F44336';
      case 'Medium':
        return '#FF9800';
      case 'Low':
        return '#4CAF50';
      default:
        return '#666';
    }
  };

  const renderEtiquette = () => {
    const data = getCountryData().etiquette;
    return (
      <View>
        {data.map((item, index) => (
          <Card key={index} style={styles.etiquetteCard}>
            <Card.Content>
              <View style={styles.etiquetteHeader}>
                <View style={styles.etiquetteIconContainer}>
                  <Ionicons name={item.icon} size={24} color="#FF9800" />
                  <Title style={styles.etiquetteTitle}>{item.title}</Title>
                </View>
                <Chip
                  style={[
                    styles.importanceChip,
                    { backgroundColor: getImportanceColor(item.importance) }
                  ]}
                  textStyle={styles.importanceChipText}
                >
                  {item.importance}
                </Chip>
              </View>
              <Paragraph style={styles.etiquetteDescription}>
                {item.description}
              </Paragraph>
            </Card.Content>
          </Card>
        ))}
      </View>
    );
  };

  const renderPhrases = () => {
    const data = getCountryData().phrases;
    return (
      <View>
        {data.map((phrase, index) => (
          <Card key={index} style={styles.phraseCard}>
            <Card.Content>
              <View style={styles.phraseHeader}>
                <Title style={styles.phraseEnglish}>{phrase.english}</Title>
                <Chip style={styles.categoryChip}>
                  {phrase.category}
                </Chip>
              </View>
              <Text style={styles.phraseLocal}>{phrase.local}</Text>
              <Text style={styles.phrasePronunciation}>
                Pronunciation: {phrase.pronunciation}
              </Text>
              <Button mode="outlined" style={styles.listenButton}>
                <Ionicons name="volume-high" size={16} />
                {' '}Listen
              </Button>
            </Card.Content>
          </Card>
        ))}
      </View>
    );
  };

  const renderCustoms = () => {
    const data = getCountryData().customs;
    return (
      <View>
        {data.map((custom, index) => (
          <Card key={index} style={styles.customCard}>
            <Card.Content>
              <View style={styles.customHeader}>
                <Ionicons name={custom.icon} size={24} color="#4CAF50" />
                <Title style={styles.customTitle}>{custom.title}</Title>
              </View>
              <Paragraph style={styles.customDescription}>
                {custom.description}
              </Paragraph>
            </Card.Content>
          </Card>
        ))}
      </View>
    );
  };

  const renderTaboos = () => {
    const data = getCountryData().taboos;
    return (
      <View>
        {data.map((taboo, index) => (
          <Card key={index} style={styles.tabooCard}>
            <Card.Content>
              <View style={styles.tabooHeader}>
                <Ionicons name={taboo.icon} size={24} color="#F44336" />
                <Title style={styles.tabooTitle}>{taboo.title}</Title>
              </View>
              <Paragraph style={styles.tabooDescription}>
                {taboo.description}
              </Paragraph>
            </Card.Content>
          </Card>
        ))}
      </View>
    );
  };

  const renderContent = () => {
    switch (activeCategory) {
      case 'etiquette':
        return renderEtiquette();
      case 'phrases':
        return renderPhrases();
      case 'customs':
        return renderCustoms();
      case 'taboos':
        return renderTaboos();
      default:
        return renderEtiquette();
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#FF9800', '#F57C00']}
        style={styles.header}
      >
        <Title style={styles.headerTitle}>Cultural Guide</Title>
        <Paragraph style={styles.headerSubtitle}>
          Local Customs & Cultural Etiquette
        </Paragraph>
      </LinearGradient>

      {/* Country Selection */}
      <View style={styles.countryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {countries.map((country) => (
            <TouchableOpacity
              key={country.name}
              style={[
                styles.countryButton,
                selectedCountry === country.name && styles.selectedCountryButton
              ]}
              onPress={() => setSelectedCountry(country.name)}
            >
              <Text style={styles.countryFlag}>{country.flag}</Text>
              <Text style={[
                styles.countryName,
                selectedCountry === country.name && styles.selectedCountryName
              ]}>
                {country.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search cultural information..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor="#FF9800"
        />
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryTab,
                activeCategory === category.id && styles.activeCategoryTab
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <Ionicons 
                name={category.icon} 
                size={20} 
                color={activeCategory === category.id ? '#FF9800' : '#666'} 
              />
              <Text style={[
                styles.categoryText,
                activeCategory === category.id && styles.activeCategoryText
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>

      {/* Quick Tips */}
      <View style={styles.tipsSection}>
        <Title style={styles.tipsTitle}>Quick Cultural Tips</Title>
        <Card style={styles.tipsCard}>
          <Card.Content>
            <View style={styles.tipItem}>
              <Ionicons name="bulb" size={20} color="#FF9800" />
              <Text style={styles.tipText}>
                When in doubt, observe how locals behave and follow their lead
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="bulb" size={20} color="#FF9800" />
              <Text style={styles.tipText}>
                Learning a few basic phrases in the local language shows respect
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="bulb" size={20} color="#FF9800" />
              <Text style={styles.tipText}>
                Research cultural norms before your trip to avoid misunderstandings
              </Text>
            </View>
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
  countryContainer: {
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 20,
  },
  countryButton: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginRight: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: 'white',
    minWidth: 80,
  },
  selectedCountryButton: {
    borderColor: '#FF9800',
    backgroundColor: '#FF9800',
  },
  countryFlag: {
    fontSize: 24,
    marginBottom: 5,
  },
  countryName: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  selectedCountryName: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: 'white',
    elevation: 4,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryTab: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginRight: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: 'white',
  },
  activeCategoryTab: {
    borderColor: '#FF9800',
    backgroundColor: '#FFF3E0',
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
  activeCategoryText: {
    color: '#FF9800',
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  etiquetteCard: {
    marginBottom: 15,
    elevation: 2,
  },
  etiquetteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  etiquetteIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  etiquetteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  importanceChip: {
    marginLeft: 10,
  },
  importanceChipText: {
    color: 'white',
    fontSize: 12,
  },
  etiquetteDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  phraseCard: {
    marginBottom: 15,
    elevation: 2,
  },
  phraseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  phraseEnglish: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  categoryChip: {
    backgroundColor: '#E3F2FD',
  },
  phraseLocal: {
    fontSize: 16,
    color: '#1976D2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  phrasePronunciation: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  listenButton: {
    alignSelf: 'flex-start',
  },
  customCard: {
    marginBottom: 15,
    elevation: 2,
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  customTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  customDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  tabooCard: {
    marginBottom: 15,
    elevation: 2,
  },
  tabooHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tabooTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  tabooDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  tipsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#212121',
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
}); 