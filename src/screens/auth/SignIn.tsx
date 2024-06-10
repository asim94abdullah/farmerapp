import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../styles/colors';
import {S_Regular, S_SemiBold} from '../../assets/fonts/FontNames';
import Images from '../../assets/Images';
import WrapperContainer from '../../components/WrapperContainer';
import {useNavigation} from '@react-navigation/native';
import {userLogin} from '../../reduxstore/actions/auth';

export default function SignIn() {
  const navigation = useNavigation();

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [loader, setLoader] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const SignIn = async () => {
    if (email === '') return Alert.alert('Please enter your email!');
    if (password === '') return Alert.alert('Please enter your password!');

    let data = {
      email: email,
      password: password,
    };
    try {
      setLoader(true);
      let respone = await userLogin(data);
      console.log('====================================');
      console.log('new response', respone);
      console.log('====================================');
      if (respone?.status === 'reject') {
        Alert.alert(respone?.res?.result);
      }
      setLoader(false);
    } catch (error: any) {
      setLoader(false);
      Alert.alert(error);
    }
  };

  return (
    <WrapperContainer>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <View
          style={{
            width: '100%',
            height: hp('100%'),
            backgroundColor: colors.white,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {loader ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size={35} color={colors.yellow} />
            </View>
          ) : (
            <View>
              <View
                style={{
                  marginTop: hp('8%'),
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: hp('5%'),
                    marginLeft: wp('5%'),
                    fontFamily: S_SemiBold,
                    color: colors.black,
                  }}>
                  Sign In
                </Text>
              </View>
              <View style={{marginTop: hp('3%')}}>
                <View
                  style={{
                    width: wp('90%'),
                    alignSelf: 'center',
                    backgroundColor: colors.white,
                  }}>
                  <Text
                    style={{
                      fontFamily: S_Regular,
                      color: colors.textColor,
                      fontSize: hp('2%'),
                    }}>
                    E-mail
                  </Text>
                  <View
                    style={{
                      marginTop: hp('1%'),
                      backgroundColor: colors.white,
                      width: wp('90%'),
                      borderRadius: 15,
                      borderWidth: 1,
                      borderColor: colors.green,
                    }}>
                    <TextInput
                      style={{padding: hp('2%')}}
                      placeholder="Enter your email"
                      placeholderTextColor={colors.textColor}
                      value={email}
                      onChangeText={(text: any) => setemail(text)}
                    />
                  </View>
                </View>
                <View
                  style={{
                    marginTop: hp('2%'),
                    width: wp('90%'),
                    alignSelf: 'center',
                    backgroundColor: colors.white,
                  }}>
                  <Text
                    style={{
                      fontFamily: S_Regular,
                      color: colors.textColor,
                      fontSize: hp('2%'),
                    }}>
                    Password
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingRight: wp('4%'),
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: hp('1%'),
                      backgroundColor: colors.white,
                      width: wp('90%'),
                      borderRadius: 15,
                      borderWidth: 1,
                      borderColor: colors.green,
                    }}>
                    <TextInput
                      style={{padding: hp('2%'), width: wp('75')}}
                      placeholder="Enter password"
                      placeholderTextColor={colors.textColor}
                      secureTextEntry={securePassword}
                      value={password}
                      onChangeText={(text: any) => setpassword(text)}
                    />
                    <TouchableOpacity
                      onPress={() => setSecurePassword(!securePassword)}>
                      {securePassword ? (
                        <Image
                          resizeMode="contain"
                          source={Images.Eyeclose}
                          style={{width: 20, height: 20}}
                        />
                      ) : (
                        <Image
                          resizeMode="contain"
                          source={Images.Eye}
                          style={{width: 20, height: 20}}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                {/* <View
                  style={{
                    width: '100%',
                    height: hp('6%'),
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <CheckBox
                    style={{
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={newValue => {
                      setToggleCheckBox(newValue);
                    }}
                    hideBox={false}
                    boxType={'square'}
                    onCheckColor={'#6F763F'}
                    onFillColor={'#4DABEC'}
                    onTintColor={'#F4DCF8'}
                    animationDuration={0.5}
                    onAnimationType={'bounce'}
                    offAnimationType={'stroke'}
                  />

                  <Text
                    onPress={() => {}}
                    style={{
                      fontSize: hp('2%'),
                      fontFamily: S_Regular,
                      color: colors.orange,
                      paddingLeft: Platform.OS === 'ios' ? 10 : 0,
                    }}>
                    Sign In is Admin
                  </Text>
                </View> */}
                <TouchableOpacity
                  onPress={() => SignIn()}
                  style={{
                    marginTop: hp('3%'),
                    alignSelf: 'center',
                    width: wp('70%'),
                    height: hp('8%'),
                    backgroundColor: colors.green,
                    borderRadius: hp('4%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: hp('3%'),
                      fontFamily: S_SemiBold,
                      color: colors.white,
                    }}>
                    SIGN IN
                  </Text>
                </TouchableOpacity>
                {/* <View  style={{ marginTop: hp('3%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text  style={{ fontFamily: S_Regular, fontSize: hp('2%'), color: colors.textColor }}>Don't have an account?</Text>
                                    <TouchableOpacity   onPress={() => { }}>
                                        <Text style={{ marginLeft: wp('1%'), fontFamily: S_Regular, fontSize: hp('2%'), color: colors.orange, textDecorationLine: 'underline' }}>Sign Up</Text>
                                    </TouchableOpacity>
                                </View> */}
              </View>
            </View>
          )}
        </View>
      </View>
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({});
