import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {Images} from '../assets/Index';

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.menuButton}>
            <Image
              source={Images.DRAWERICON}
              style={styles.drawerStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Image source={Images.APPLOGO} style={styles.logo} />
        </View>
        <TouchableOpacity style={styles.voiceButton}>
          <Image
            source={Images.MICICON}
            style={styles.voiceIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Questions</Text>
          <Image
            source={Images.QUESTIONICON}
            style={styles.actionRowIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Reminders</Text>
          <Image
            source={Images.REMINDERICON}
            style={styles.actionRowIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Messages</Text>
          <Image
            source={Images.MESSAGEICON}
            style={styles.actionRowIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Calendar</Text>
          <Image
            source={Images.CALENDERICON}
            style={styles.actionRowIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.uploadSection}>
        <Text style={styles.uploadText}>UPLOAD PRESCRIPTION</Text>
        <Text style={styles.uploadSubtitle}>
          Upload a Prescription and Tell Us What you Need. We do the Rest.!
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingRight: 20,
          }}>
          <Text style={styles.offerText}>{`Flat 25% OFF ON\nMEDICINES`}</Text>
          <TouchableOpacity style={styles.orderButton}>
            <Text style={styles.orderButtonText}>ORDER NOW</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardTextContainer}>
          <Text
            style={styles.cardTitle}>{`Get the Best\nMedical Service`}</Text>
          <Text style={styles.cardDescription}>
            Rem illum facere quo corporis Quis in saepe itaque ut quos pariatur.
            Qui numquam rerum hic repudiandae rerum id amet tempore nam
            molestias omnis qui earum voluptatem!
          </Text>
        </View>
        <Image source={Images.DOCTORIMAGE} style={styles.cardImage} />
      </View>

      <View style={styles.offerCard}>
        <View>
          <View style={styles.uptoContainerStyle}>
            <Text style={[styles.offerTextLarge, styles.uptoTextStyle]}>
              UPTO
            </Text>
            <View>
              <Text style={styles.eightPercent}>80 % </Text>
              <Text style={styles.offerTextLarge}>offer</Text>
            </View>
          </View>
          <Text style={styles.cardDescriptionV}>On Health Products</Text>
          <TouchableOpacity style={styles.shopButton}>
            <Text style={styles.shopButtonText}>SHOP NOW</Text>
          </TouchableOpacity>
        </View>
        <Image source={Images.VITAMINIMAGE} style={styles.cardImageV} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  drawerStyle: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 25,
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    fontSize: 20,
  },
  logo: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  voiceButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#5F5B5B',
    borderRadius: 30,
    backgroundColor: '#FFF',
    alignSelf: 'center',
  },
  voiceIcon: {
    height: 25,
    width: 25,
  },
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    marginHorizontal: 5,
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '45%',
    borderColor: '#6C6060',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6C6060',
  },
  actionRowIcon: {
    height: 30,
    width: 30,
    alignSelf: 'center',
  },
  uploadSection: {
    paddingHorizontal: 4,
    marginBottom: 30,
  },
  uploadText: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
    color: '#3A3A3A',
  },
  uploadSubtitle: {
    fontSize: 14,
    textAlign: 'justify',
    marginBottom: 15,
    color: '#3A3A3A',
    marginRight: 18,
  },
  orderButton: {
    backgroundColor: '#1C82DF',
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 10,
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'center',
  },
  offerText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4A4A4A',
    textAlignVertical: 'center',
  },
  card: {
    backgroundColor: '#C8F5C4',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#3A3A3A',
  },
  cardDescription: {
    fontSize: 12,
    textAlign: 'justify',
    fontWeight: '700',
    marginBottom: 10,
  },
  cardImage: {
    width: 70,
    height: 170,
    resizeMode: 'contain',
  },
  offerCard: {
    backgroundColor: '#D7D0FF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  offerTextLarge: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'justify',
  },
  eightPercent: {
    color: '#000000',
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'justify',
  },
  shopButton: {
    backgroundColor: '#1C82DF',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  shopButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'center',
  },
  cardDescriptionV: {
    fontSize: 16,
    textAlign: 'justify',
    fontWeight: '700',
    margin: 6,
  },
  cardImageV: {
    width: 130,
    height: 170,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  uptoContainerStyle: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  uptoTextStyle: {
    transform: [{rotate: '-90deg'}],
    marginRight: -36,
  },
});

export default HomeScreen;
