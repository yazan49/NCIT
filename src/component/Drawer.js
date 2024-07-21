import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useState} from 'react';

const Drawer = ({active}) => {
  const [selectedItem, setSelectedItem] = useState('Home');

  const handleSelectItem = item => {
    setSelectedItem(item);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={[
                styles.containerItem,
                selectedItem === 'Home' && styles.selectedItem,
                styles.buttonPadding,
              ]}
              onPress={() => handleSelectItem('Home')}>
              <Image
                source={require('../assets/hom.png')}
                style={styles.icon}
              />

              <Text
                style={[
                  styles.textItem,
                  selectedItem === 'Home' && styles.selectedText,
                ]}>
                Home
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.containerItem,
              selectedItem === 'Profile' && styles.selectedItem,
              styles.buttonPadding,
            ]}
            onPress={() => handleSelectItem('Profile')}>
            <Image source={require('../assets/prf.png')} style={styles.icon} />

            <Text
              style={[
                styles.textItem,
                selectedItem === 'Profile' && styles.selectedText,
              ]}>
              Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.containerItem,
              selectedItem === 'Nearby' && styles.selectedItem,
              styles.buttonPadding,
            ]}
            onPress={() => handleSelectItem('Nearby')}>
            <Image
              source={require('../assets/location.png')}
              style={styles.icon}
            />

            <Text
              style={[
                styles.textItem,
                selectedItem === 'Nearby' && styles.selectedText,
              ]}>
              Nearby
            </Text>
          </TouchableOpacity>
          <Text style={{color: '#FFFFFF80', marginTop: 20}}>
            ______________
          </Text>
          <TouchableOpacity
            style={[
              styles.containerItem1,
              selectedItem === 'Bookmark' && styles.selectedItem,
              styles.buttonPadding,
            ]}
            onPress={() => handleSelectItem('Bookmark')}>
            <Image
              source={require('../assets/bookmark.png')}
              style={styles.icon}
            />

            <Text
              style={[
                styles.textItem,
                selectedItem === 'Bookmark' && styles.selectedText,
              ]}>
              Bookmark
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.containerItem,
              selectedItem === 'Notification' && styles.selectedItem,
              styles.buttonPadding,
            ]}
            onPress={() => handleSelectItem('Notification')}>
            <Image source={require('../assets/msg.png')} style={styles.icon} />

            <Text
              style={[
                styles.textItem,
                selectedItem === 'Notification' && styles.selectedText,
              ]}>
              Notification
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.containerItem,
              selectedItem === 'Message' && styles.selectedItem,
              styles.buttonPadding,
            ]}
            onPress={() => handleSelectItem('Message')}>
            <Image source={require('../assets/msg.png')} style={styles.icon} />

            <Text
              style={[
                styles.textItem,
                selectedItem === 'Message' && styles.selectedText,
              ]}>
              Message
            </Text>
          </TouchableOpacity>
          <Text style={{color: '#FFFFFF80', marginTop: 20}}>
            ______________
          </Text>

          <TouchableOpacity
            style={[
              styles.containerItem,
              selectedItem === 'Setting' && styles.selectedItem,
              styles.buttonPadding,
            ]}
            onPress={() => handleSelectItem('Setting')}>
            <Image source={require('../assets/stng.png')} style={styles.icon} />

            <Text
              style={[
                styles.textItem,
                selectedItem === 'Setting' && styles.selectedText,
              ]}>
              Setting
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.containerItem,
              selectedItem === 'Help' && styles.selectedItem,
              styles.buttonPadding,
            ]}
            onPress={() => handleSelectItem('Help')}>
            <Image source={require('../assets/help.png')} style={styles.icon} />

            <Text
              style={[
                styles.textItem,
                selectedItem === 'Help' && styles.selectedText,
              ]}>
              Help
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.containerItem,
              selectedItem === 'Logout' && styles.selectedItem,
              styles.buttonPadding,
            ]}
            onPress={() => handleSelectItem('Logout')}>
            <Image
              source={require('../assets/logout.png')}
              style={styles.icon}
            />

            <Text
              style={[
                styles.textItem,
                selectedItem === 'Logout' && styles.selectedText,
              ]}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0A8ED9',
    zIndex: -9999,
  },
  contentContainer: {
    paddingTop: 120,
    maxWidth: 180,
  },
  containerItem: {
    marginTop: 10,
    paddingLeft: 20,
    flexDirection: 'row',
  },
  containerItem1: {
    marginTop: 20,
    paddingLeft: 20,
    flexDirection: 'row',
  },

  textItem: {
    color: 'white',
    fontSize: 18,
  },
  selectedItem: {
    backgroundColor: 'white',
    paddingRight: 20,
    borderEndEndRadius: 30,
    borderTopEndRadius: 30,
  },
  selectedText: {
    color: '#0A8ED9',
  },
  buttonPadding: {
    paddingVertical: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 6,
    marginTop: 1,
  },
});
