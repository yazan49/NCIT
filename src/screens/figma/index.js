import React, {act, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  FlatList,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import data from './houseData';
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import Overlay from '../../component/Overlay';
import Drawer from '../../component/Drawer';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {getData} from '../../api/network';

const filtersData = [
  {id: '1', title: 'House'},
  {id: '2', title: 'Apartment'},
  {id: '3', title: 'Hotel'},
  {id: '4', title: 'Villa'},
  {id: '5', title: 'Room'},
  {id: '6', title: 'Shalleh'},
  {id: '7', title: 'Villa'},
];

export default function FigmaScreen({navigation}) {
  const [selectedFilter, setSelectedFilter] = useState('');
  const active = useSharedValue(false);

  const progress = useDerivedValue(() => {
    return withTiming(active.value ? 1 : 0);
  });

  const animatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      progress.value,
      [0, 1],
      [0, -40],
      Extrapolation.CLAMP,
    );
    return {
      transform: [
        {scale: active.value ? withTiming(0.8) : withTiming(1)},
        {translateX: active.value ? withSpring(240) : withTiming(0)},
        {rotateY: `${rotateY}deg`},
      ],
      borderRadius: active.value ? withTiming(20) : withTiming(0),
    };
  });

  const handleGestureEvent = event => {
    if (event.nativeEvent.translationX > 50) {
      // Check if swiping right
      active.value = true; // Set active value to true to open the drawer
    }
  };

  const HouseItem = ({house}) => {
    return (
      <View style={styles.house}>
        <Image source={{uri: house.path}} style={styles.houseImg} />
        <View style={styles.view}>
          <Text style={styles.houseTitle}>{house.title}</Text>
          <Text style={styles.housePrice}>
            Price: ${house.price.toLocaleString()}
          </Text>
          <View style={styles.hBed}>
            <Text style={styles.text}>{house.bedroom} Bedrooms </Text>
            <Text style={{marginLeft: 10, fontWeight: '200'}}>
              {house.bathroom} Bathrooms
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const RowItem = ({row}) => {
    return (
      <View style={styles.houseRow}>
        <TouchableOpacity
          onPress={() => navigation.navigate('View', {data: row})}>
          <ImageBackground
            source={{uri: row.path}}
            style={[styles.houseImgRow, {width: '110%'}]}
            resizeMode="stretch">
            <Text style={styles.distanceText}>{row.dist}</Text>
            <LinearGradient
              colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
              style={styles.gradient}>
              <Text style={styles.titleText}>{row.title}</Text>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.filterItem,
        selectedFilter === item.title && styles.selectedFilter,
      ]}
      onPress={() => setSelectedFilter(item.title)}>
      <Text style={styles.filterText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Drawer />
      <PanGestureHandler onGestureEvent={handleGestureEvent} minDeltaX={50}>
        <Animated.View style={[styles.Main, animatedStyle]}>
          <View style={styles.box} />
          <Text style={styles.location}>Location</Text>
          <View style={styles.row}>
            <View style={styles.cityContainer}>
              <Text style={styles.city}>Amman</Text>
              <Image
                source={require('../../assets/Arrowdown.png')}
                style={styles.arrow}
              />
            </View>
            <Image
              source={require('../../assets/bell.png')}
              style={styles.bell}
            />
          </View>
          <View
            style={[
              styles.searchRow,
              Platform.OS === 'ios' && styles.searchRowIOS,
            ]}>
            <View style={styles.searchContainer}>
              <Image
                source={require('../../assets/search.png')}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.search}
                placeholder="Search Address, Or Near You"
                placeholderTextColor="#000"
              />
            </View>
            <TouchableOpacity style={styles.filterButtonContainer}>
              <LinearGradient
                colors={['#A0DAFB', '#0A8ED9']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.filterButton}>
                <Image
                  source={require('../../assets/Vector.png')}
                  style={{width: '35%', height: '35%'}}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.filterContainer}>
            <FlatList
              data={filtersData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              horizontal
              contentContainerStyle={styles.filterList}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 20,
            }}>
            <Text style={styles.nearText}>Near From You</Text>
            <Text style={styles.seeMoreText}>See more</Text>
          </View>
          <FlatList
            horizontal
            data={data.row}
            renderItem={({item}) => (
              <RowItem row={item} navigation={navigation} />
            )}
            keyExtractor={item => item.Id.toString()} // Unique key for each item
          />
          <Text style={styles.bestText}>Best For You</Text>
          <FlatList
            data={data.Houses}
            renderItem={({item}) => <HouseItem house={item} />}
            keyExtractor={item => item.Id.toString()} // Unique key for each item
          />
          <Overlay active={active} />
        </Animated.View>
      </PanGestureHandler>
    </>
  );
}

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  location: {
    marginHorizontal: 10,
    fontFamily: 'Raleway',
    fontSize: 12.83,
    fontWeight: '400',
    lineHeight: 15.06,
    textAlign: 'left',
    marginTop: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  cityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  city: {
    color: '#000000',
    fontFamily: 'Raleway',
    fontSize: 21.38,
    fontWeight: '500',
    lineHeight: 25.1,
  },
  arrow: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
  bell: {
    marginRight: 10,
    width: 18.17,
    height: 22.98,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 10,
  },
  searchRowIOS: {
    marginTop: 20,
  },
  searchContainer: {
    flex: 1,
    height: 51.31,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 10.69,
    opacity: 0.9,
    paddingHorizontal: 17.61,
  },
  search: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  filterButtonContainer: {
    marginLeft: 10,
  },
  filterButton: {
    width: 51.31,
    height: 51.31,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10.69,
    opacity: 0.9,
  },
  filterContainer: {
    marginTop: 15,
    height: 50,
  },
  filterList: {
    paddingHorizontal: 10,
  },
  filterItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#A0DAFB',
  },
  selectedFilter: {
    backgroundColor: '#A0DAFB',
  },
  filterText: {
    color: '#000',
    fontFamily: 'Raleway',
    fontSize: 16,
    fontWeight: '500',
  },
  house: {
    padding: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    flex: 1,
  },
  houseImg: {
    width: '30%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 20,
  },
  view: {
    paddingHorizontal: 15,
  },
  houseTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  housePrice: {
    marginVertical: 5,
    color: '#0A8ED9',
  },
  hBed: {
    flexDirection: 'row',
  },
  text: {
    fontWeight: '200',
  },
  houseRow: {
    padding: 10,
    marginBottom: 1,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  houseImgRow: {
    width: '110%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  distanceText: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    color: 'white',
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  gradient: {
    height: 80,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  titleText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 17.1,
    lineHeight: 20,
  },
  nearText: {
    fontWeight: '500',
    fontSize: 17.1,
    color: '#000000',
    fontFamily: 'Raleway',
  },
  seeMoreText: {
    fontWeight: '400',
    fontSize: 12.83,
    marginTop: 2,
    color: '#858585',
    fontFamily: 'Raleway',
  },
  bestText: {
    fontWeight: '700',
    padding: 30,
    fontFamily: 'Raleway',
  },
  box: {
    flex: 1,
  },
});
