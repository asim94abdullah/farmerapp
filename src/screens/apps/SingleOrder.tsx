import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import WrapperContainer from '../../components/WrapperContainer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import Images from '../../assets/Images';
import {
  deleteOrder,
  getSingleOrderData,
  updateOrderStatus,
} from '../../reduxstore/actions/order';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../../styles/colors';
import {useSelector} from 'react-redux';

export default function SingleOrder({route}: {route: any}) {
  console.log('route', route.params.orderId);
  const navigation = useNavigation();
  const userData = useSelector((state: any) => state.auth.userData);

  const [singleData, setSingleData] = useState<any>({});
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'On the way', value: 'On the way'},
    {label: 'Reached near branch', value: 'Reached near branch'},
    {label: 'Dlivered', value: 'Delivered'},
  ]);

  useEffect(() => {
    GetSingleOrder();
  }, []);

  const GetSingleOrder = async () => {
    setLoader(true);
    let response = await getSingleOrderData(route.params.orderId);
    console.log('responesssss', response);
    setSingleData(response.data);
    setLoader(false);
    // console.log('responesssss', response);
  };

  const SaveStatus = async (orderId: any) => {
    setLoader(true);
    // console.log('valllue', value + orderId);
    let data = {
      status: value,
    };

    let respone = await updateOrderStatus(orderId, data);
    console.log('valllue', respone);
    Alert.alert(respone?.data?.message);
    setLoader(false);
    // console.log('respppppasssim', respone);
  };

  const DeleteOrder = async (orderId: any) => {
    setLoader(true);
    let response = await deleteOrder(orderId);
    console.log('response delete', response);
    navigation.goBack();
    setLoader(false);
  };

  return (
    <WrapperContainer>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            resizeMode="contain"
            source={Images.back}
            style={{width: hp(2), height: hp(3), marginLeft: hp(2)}}
          />
        </TouchableOpacity>
        <Text style={{marginLeft: hp(2), fontSize: hp(3)}}>Order Details</Text>
      </View>
      {loader ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={{flex: 1, padding: hp(2)}}>
          <View style={{paddingVertical: hp(1)}}>
            <Text
              style={{
                fontSize: hp(2),
                fontWeight: 'bold',
                color: colors.black,
              }}>
              Order From:
            </Text>
            <Text style={{fontSize: hp(1.4), color: colors.black}}>
              {singleData?.user?.name}
            </Text>
          </View>
          <View style={{paddingVertical: hp(1)}}>
            <Text
              style={{
                fontSize: hp(2),
                fontWeight: 'bold',
                color: colors.black,
              }}>
              Order Id:
            </Text>
            <Text style={{fontSize: hp(1.4), color: colors.black}}>
              {singleData?._id}
            </Text>
          </View>
          <View style={{paddingVertical: hp(1)}}>
            <Text
              style={{
                fontSize: hp(2),
                fontWeight: 'bold',
                color: colors.black,
              }}>
              Order Product:
            </Text>
            <Text>{singleData?.product?.productname}</Text>
          </View>
          <View style={{paddingVertical: hp(1)}}>
            <Text
              style={{
                fontSize: hp(2),
                fontWeight: 'bold',
                color: colors.black,
              }}>
              Order Price:
            </Text>
            <Text>{singleData?.product?.price}</Text>
          </View>
          <View style={{paddingVertical: hp(1)}}>
            <Text
              style={{
                fontSize: hp(2),
                fontWeight: 'bold',
                color: colors.black,
              }}>
              Order Status:
            </Text>
            <Text>{singleData?.status}</Text>
          </View>
          {userData?.name === 'Admin' ? (
            <View>
              <View style={{paddingVertical: hp(1)}}>
                <Text
                  style={{
                    fontSize: hp(2),
                    fontWeight: 'bold',
                    color: colors.black,
                  }}>
                  Change Order Status:
                </Text>
                <View style={{width: '70%', marginTop: hp(2)}}>
                  <DropDownPicker
                    style={{zIndex: -1}}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                  />
                </View>
              </View>
              <View
                style={{alignItems: 'center', marginTop: hp(3), zIndex: -1}}>
                <TouchableOpacity
                  onPress={() => SaveStatus(singleData?._id)}
                  style={{
                    width: '60%',
                    height: hp(6),
                    borderRadius: 10,
                    backgroundColor: colors.green,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    Save Status
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            ''
          )}
          <View style={{alignItems: 'center', marginTop: hp(3), zIndex: -1}}>
            <TouchableOpacity
              onPress={() => DeleteOrder(singleData?._id)}
              style={{
                width: '60%',
                height: hp(6),
                borderRadius: 10,
                backgroundColor: colors.red,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Delete Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({});
