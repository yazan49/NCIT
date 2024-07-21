import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ViewHomeScreen({route, navigation}) {
  const data = route.params;
  // console.log(data);
  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={styles.main}>
          <ImageBackground
            source={{uri: data.data.path}}
            style={[styles.imageBackground, {height: 250}]} // Adjust the height here
            imageStyle={styles.imageStyle}>
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
              style={styles.gradient}
              pointerEvents="none"
            />

            <TouchableOpacity
              style={[styles.button, styles.leftButton]}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/back.png')}
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.rightButton]}
              onPress={() => {
                // Action for the button on the top right
              }}>
              <Image
                source={require('../assets/bookmark.png')} // Add your icon source
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>

            {/* Title and description */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{data.data.title}</Text>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../assets/bedroom.png')}
                  style={{width: 25, height: 20, marginHorizontal: 8}}
                />
                <Text style={styles.description2}>
                  {data.data.bedroom} Bedroom {'      '}
                </Text>
                <Image
                  source={require('../assets/bathroom.png')}
                  style={{width: 25, height: 20, marginHorizontal: 8}}
                />

                <Text style={styles.description2}>
                  {data.data.bathroom} Bathroom
                </Text>
              </View>
            </View>
          </ImageBackground>

          {/* Description section */}
          <View style={styles.description}>
            <Text
              style={{
                fontSize: 17.1,
                fontWeight: '500',
                lineHeight: 21,
                marginTop: 4,
              }}>
              Description{' '}
            </Text>
            <Text style={styles.descriptionText}>
              The 3 level house that has a modern design, has a large pool and a
              garage that fits up to four cars...{' '}
              <Text style={styles.seeMoreText}>Show More</Text>
            </Text>
          </View>
          <View style={styles.contactCard}>
            <View style={styles.profileContainer}>
              <Image
                source={require('../assets/pImg.png')}
                style={styles.profileImage}
              />
              <View style={styles.contactDetails}>
                <Text style={styles.contactName}>Garry Allen</Text>
                <Text style={styles.contactInfo}>Owner</Text>
              </View>
            </View>
            <View style={styles.contactButtons}>
              <TouchableOpacity style={styles.contactButton}>
                <Image
                  source={require('../assets/phone.png')}
                  style={styles.contactIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactButton}>
                <Image
                  source={require('../assets/message.png')}
                  style={styles.contactIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.gallery}>
            <Text style={styles.galleryTitle}>Gallery</Text>
            <View style={styles.imageRow}>
              <Image
                source={require('../assets/g1.png')}
                style={styles.galleryImage}
              />
              <Image
                source={require('../assets/g2.png')}
                style={styles.galleryImage}
              />
              <Image
                source={require('../assets/g3.png')}
                style={styles.galleryImage}
              />
              <Image
                source={require('../assets/g4.png')}
                style={styles.galleryImage}
              />
            </View>
          </View>
          <View style={{flex: 1, marginTop: 20}}>
            <Image
              source={require('../assets/map.png')}
              style={{borderRadius: 20}}
            />
          </View>
        </SafeAreaView>
      </View>
      {/* Price and Rent Now Button */}
      <View style={styles.bottomOverlay}>
        <Text style={styles.priceText}>Rp,2,500,000 / Year</Text>
        <TouchableOpacity style={styles.rentNowButton}>
          <Text style={styles.rentNowText}>Rent Now</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15, // Padding for the whole screen
    backgroundColor: '#FAFAFA',
  },
  main: {
    flex: 1,
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    alignItems: 'center', // Center image horizontally
    justifyContent: 'center', // Center image vertically
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 10, // Adjust if needed
  },
  imageStyle: {
    borderRadius: 10, // Ensures the border radius is applied correctly
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    zIndex: 1,
  },
  button: {
    position: 'absolute',
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 20,
    zIndex: 2, // Adjust z-index to place it above the gradient
    opacity: 0.7,
  },
  leftButton: {
    left: 10,
    top: 10,
  },
  rightButton: {
    right: 10,
    top: 10,
  },

  titleContainer: {
    position: 'absolute',
    bottom: 10, // Adjust the positioning as needed
    left: 15, // Adjust left positioning
    zIndex: 2, // Adjust z-index to place it above the gradient
  },
  title: {
    color: '#FFFFFF',
    fontSize: 21.38, // Adjusted font size
    fontWeight: '600', // Adjusted font weight
    lineHeight: 25,
    marginBottom: 5,
  },
  description: {
    color: 'white',
    fontSize: 14, // Adjusted font size
  },
  description2: {
    color: '#D4D4D4',
    fontWeight: '400',
    fontSize: 12.83, // Adjusted font size
    lineHeight: 15,
    fontFamily: 'Raleway',
  },

  descriptionText: {
    fontWeight: '400',
    fontSize: 12.83,
    marginBottom: 10,
    color: '#858585',
    marginTop: 10,
  },
  seeMoreText: {
    color: '#0A8ED9', // Light blue color
    fontSize: 13, // Adjust the font size as needed
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Set width to 100%
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contactDetails: {},
  contactName: {
    fontSize: 17.1,
    fontWeight: '500',
    lineHeight: 20.1,
  },
  contactInfo: {
    fontSize: 12.8,
    color: '#858585',
    fontWeight: '400',
    lineHeight: 15,
    marginTop: 4,
  },
  contactButtons: {
    flexDirection: 'row',
  },
  contactButton: {
    backgroundColor: '#0A8ED9',
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
    opacity: 0.7,
  },
  contactIcon: {
    width: 20,
    height: 20,
  },
  gallery: {
    marginTop: 20,
  },
  galleryTitle: {
    fontSize: 17.1,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: 'Raleway',
    marginBottom: 15,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  galleryImage: {
    width: '23%',
    aspectRatio: 1, // Ensures images maintain aspect ratio
    borderRadius: 10,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust opacity as needed
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  rentNowButton: {
    backgroundColor: '#0A8ED9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    opacity: 0.8,
  },
  rentNowText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
