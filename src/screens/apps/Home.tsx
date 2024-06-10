import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperContainer from '../../components/WrapperContainer';
import colors from '../../styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Images from '../../assets/Images';
import {logout} from '../../reduxstore/actions/auth';
import {removeData} from '../../utils/helperFunctions';
import {
  getOrderData,
  getSingleOrderData,
  getSingleUserOrderData,
} from '../../reduxstore/actions/order';
import {useSelector} from 'react-redux';

export default function Home({navigation}: {navigation: any}) {
  // const navigation = useNavigation();
  const userData = useSelector((state: any) => state.auth.userData);
  // console.log('====================================');
  // console.log('User', userData);
  // console.log('====================================');

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getOrders();
    });

    return unsubscribe;
  }, [navigation]);

  const getOrders = async () => {
    setLoader(true);
    if (userData.name === 'Admin') {
      let response = await getOrderData();
      console.log('Admin responseeeeee', response);
      setData(response.data);
    } else {
      let response = await getOrderData();
      console.log('User responseeeeee', response);
      console.log('User responseeeeee', userData);
      let filterdata = response?.data?.filter(
        (item: any) => item.user._id === userData._id,
      );
      console.log('User responseeeeee', filterdata);
      setData(filterdata);
    }
    setLoader(false);
  };
  if (loader) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <WrapperContainer>
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            logout();
            removeData('userData');
          }}>
          <Text
            style={{
              color: colors.black,
              fontSize: hp(3),
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            Orders
          </Text>
        </TouchableOpacity>
        <ScrollView>
          {data?.map((item: any, index) => {
            // console.log('item', item);

            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('singleorder', {orderId: item._id})
                }
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: colors.white,
                  margin: hp(1),
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: colors.lineColor,
                  paddingVertical: 10,
                }}>
                <Image
                  source={Images.Avatar}
                  style={{width: hp(4), height: hp(4), margin: hp(2)}}
                />
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                      Order Id:
                    </Text>
                    <Text style={{fontSize: 11}}>{item._id}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                      Order Buyer:
                    </Text>
                    <Text>{item?.user?.name}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                      Prduct Buy:
                    </Text>
                    <Text>{item?.product?.productname}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                      Order Status:
                    </Text>
                    <Text>{item?.status}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                      Order Price:
                    </Text>
                    <Text>Rs:{item?.product.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({});
