import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {TextInput, Button, useTheme} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Images} from '../assets/Index';
import {baseUrl} from '../utils/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const pharmacies = [
  {
    id: 1,
    name: 'Path lab pharmacy',
    distance: '5km Away',
    rating: '4.5',
    reviews: '120 review',
    image: require('../assets/images/uploadImage1.png'),
  },
  {
    id: 2,
    name: '24 pharmacy',
    distance: '5km Away',
    rating: '4.5',
    reviews: '120 review',
    image: require('../assets/images/uploadImage2.png'),
  },
  {
    id: 3,
    name: '24 pharmacy',
    distance: '5km Away',
    rating: '4.5',
    reviews: '120 review',
    image: require('../assets/images/uploadImage1.png'),
  },
];

const UploadPrescriptionScreen = () => {
  const [uploadMode, setUploadMode] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  const [link, setLink] = useState('');

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setUploadedFiles((prevFiles: any) => [
        ...prevFiles,
        ...result.map(file => ({name: file.name, uri: file.uri, type: 'file'})),
      ]);
      setUploadMode(null);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('File selection canceled');
      } else {
        console.error(err);
      }
    }
  };

  const handleLinkUpload = () => {
    setUploadedFiles((prevFiles: any) => [
      ...prevFiles,
      {name: link, type: 'link'},
    ]);
    setLink('');
    setUploadMode(null);
  };

  const handleContiue = async()=>{
    if (uploadedFiles.length === 0) {
      ToastAndroid.show('Upload File or Link', ToastAndroid.SHORT);
      return;
    }
    const user = await AsyncStorage.getItem('User');
    let userId = '';
    if(user){
      const parsedUser = JSON.parse(user);
      userId = parsedUser._id;
    }
    
    const formData = new FormData();
    formData.append('userId',userId);
  
    uploadedFiles.forEach((file: any) => {
      if (file.type === 'file') {
        formData.append('category_image', {
          uri: file.uri,
          name: file.name, 
          type: file.type, 
        });
      } else if (file.type === 'link') {
        formData.append('category_image', file.name);
      }
    });
  
    try {
      const response = await fetch(`${baseUrl}/api/uploads/addFile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      if (response.ok) {
        await response.json();
        ToastAndroid.show('File Uploaded Sccuessfully!', ToastAndroid.SHORT);
        setUploadedFiles([]); // Clear uploaded files
      } else {
        ToastAndroid.show('Failed to upload files. Please try again.', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('An error occurred while uploading. Please try again.', ToastAndroid.SHORT);
    }
  
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={Images.BACKBUTTONIMAGE}
            style={{width: 40, height: 40, marginRight: 15}}
            resizeMode="contain"
          />
          <Image
            source={Images.LOCATIONICON}
            style={{width: 25, height: 25, marginRight: 15}}
            resizeMode="contain"
          />
          <Text style={styles.location}>Mohali</Text>
        </View>

        <Text style={styles.sectionTitle}>Pharmacy Nearby</Text>
        <View>
          <FlatList
            horizontal
            data={pharmacies}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.pharmacyCard}>
                <Image source={item.image} style={styles.pharmacyImage} />
                <View style={styles.labDetails}>
                  <Text style={styles.pharmacyName}>{item.name}</Text>
                  <Text style={styles.pharmacyInfo}>{item.distance}</Text>
                  <Text style={styles.pharmacyRating}>
                    ⭐
                    <Text style={styles.pharmacyRating1}>
                      {''} {''}
                      {item.rating} ({item.reviews})
                    </Text>
                  </Text>
                </View>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
            style={styles.pharmacyList}
          />
        </View>

        <Text style={styles.uploadTitle}>Upload Prescription</Text>
        <Text style={styles.uploadSubtitle}>
          We will show the pharmacy that fits as per your prescription.
        </Text>
        <View style={styles.uploadContainer}>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => setUploadMode('link')}>
            <Image
              source={Images.LINKICON}
              style={{width: 80, height: 80}}
              resizeMode='contain'
            />
            <Text
              style={{
                fontSize: 20,
                color: '#000000',
                fontWeight: '500',
                marginTop: 20,
              }}>
              Upload Link
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={handleFileUpload}>
            <Image
              source={Images.UPLOADICON}
              style={{width: 80, height: 80}}
              resizeMode='contain'
            />
            <Text
              style={{
                fontSize: 20,
                color: '#000000',
                fontWeight: '500',
                marginTop: 20,
              }}>
              Upload File
            </Text>
          </TouchableOpacity>
        </View>

        {uploadMode === 'link' && (
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Paste your link"
              value={link}
              onChangeText={setLink}
              style={styles.inputField}
            />
            <Button
              mode="contained"
              onPress={handleLinkUpload}
              style={styles.submitButton}>
              Submit
            </Button>
          </View>
        )}

        <View style={styles.uploadedFilesContainer}>
          {uploadedFiles.map((file: any, index: any) => (
            <Text key={index} style={styles.uploadedFileText}>
              {file.type === 'link' ? `🔗 ${file.name}` : `📄 ${file.name}`}
            </Text>
          ))}
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={()=> handleContiue()}>
          <Text style={{color: '#fff', fontSize: 25}}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UploadPrescriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  backIcon: {
    fontSize: RFValue(18),
    color: '#000',
    marginRight: wp('3%'),
  },
  location: {
    fontSize: RFValue(16),
    fontWeight: '500',
    color: '#000000',
  },
  sectionTitle: {
    fontSize: RFValue(20),
    fontWeight: '700',
    marginVertical: hp('2%'),
    color: '#000000',
  },
  pharmacyList: {},
  pharmacyContainer: {
    marginRight: wp('4%'),
    width: wp('43%'),
    borderRadius: wp('6%'),
    borderWidth: 0.5,
    marginTop: 6,
    height: hp(43),
  },
  pharmacyCard: {
    marginRight: wp('4%'),
    width: wp('43%'),
    borderRadius: wp('6%'),
    borderWidth: 0.5,
    marginTop: 6,
    height: hp(23.2),
  },
  pharmacyImage: {
    height: hp('12.1%'),
    width: hp('21.3%'),
    borderTopLeftRadius: wp('5%'),
    borderTopRightRadius: wp('5%'),
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  labDetails: {
    marginLeft: 10,
  },
  pharmacyName: {
    fontSize: RFValue(14),
    fontWeight: '500',
    marginTop: hp('1%'),
    color: '#000000',
  },
  pharmacyInfo: {
    fontSize: RFValue(12),
    color: '#453E3E',
    fontWeight: '500',
    marginTop: 7,
    marginBottom: 5,
  },
  pharmacyRating: {
    fontSize: RFValue(11),
    color: '#FFD700',
    fontWeight: '500',
  },
  pharmacyRating1: {
    fontSize: RFValue(12),
    color: '#453E3E',
    fontWeight: '500',
  },
  uploadTitle: {
    fontSize: RFValue(29),
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: hp('1%'),
    marginTop: hp(5),
    color: '#000000',
  },
  uploadSubtitle: {
    fontSize: RFValue(16),
    textAlign: 'center',
    marginBottom: hp('2%'),
    color: '#000000',
    fontWeight: '400',
  },
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
    borderWidth: 0.5,
    borderColor: '#000000',
    padding: 40,
    borderRadius: 15,
  },
  uploadButton: {
    width: '48%',
    borderRadius: wp('2%'),
  },
  inputContainer: {
    marginBottom: hp('2%'),
  },
  inputField: {
    marginBottom: hp('1%'),
  },
  submitButton: {
    borderRadius: wp('2%'),
    marginTop: hp('1%'),
  },
  uploadedFilesContainer: {
    marginBottom: hp('3%'),
  },
  uploadedFileText: {
    fontSize: RFValue(12),
    color: '#6D6E6F',
    marginVertical: hp('0.5%'),
  },
  continueButton: {
    borderRadius: wp('3%'),
    padding: hp('1.5%'),
    backgroundColor: '#40b592',
    alignItems: 'center',
  },
});
