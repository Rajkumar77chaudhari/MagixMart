import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  DefaultTheme,
  TextInput,
  Provider as PaperProvider,
} from 'react-native-paper';
import {colors, textStyle} from '../utils/defaultStyles';
import CustomButton from '../components/CustomButton';
import {ActivityIndicator} from 'react-native';

interface LoginProps {
  navigation: NativeStackNavigationProp<any>;
}

interface credentialsType {
  username: string;
  password: string;
}

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.yellow,
  },
};

const Login: React.FunctionComponent<LoginProps> = ({navigation}) => {
  const translation = useRef(new Animated.Value(0)).current;
  const [credentials, setCredentials] = useState<credentialsType>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [ispassVisible, setIsPassVisible] = useState<boolean>(false);

  const handleLogin = async () => {
    if (credentials.username === '' || credentials.password === '') {
      animateError();
    } else {
      setLoading(true);
      try {
        const res = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {'Content-Type': 'application/json'},
        });
        const data = await res.json();
        navigation.replace('Tab', {screen: 'Home'});
        setLoading(false);
      } catch (e) {
        setLoading(false);
        animateError();
      }
    }
  };

  const animateError = () => {
    setError(true);
    Animated.sequence([
      Animated.timing(translation, {
        duration: 100,
        toValue: 5,
        useNativeDriver: true,
      }),
      Animated.timing(translation, {
        duration: 100,
        toValue: -5,
        useNativeDriver: true,
      }),
      Animated.timing(translation, {
        duration: 100,
        toValue: 5,
        useNativeDriver: true,
      }),
      Animated.timing(translation, {
        duration: 100,
        toValue: -5,
        useNativeDriver: true,
      }),
      Animated.timing(translation, {
        duration: 100,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(() => {
      setError(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[styles.card, {transform: [{translateX: translation}]}]}>
        <Image
          source={require('./../assets/logo.png')}
          resizeMode="center"
        />
        <View style={styles.inputContainer}>
          <TextInput
            label="Username"
            value={credentials.username}
            onChangeText={text =>
              setCredentials(prev => ({...prev, username: text.trim()}))
            }
            style={styles.input}
            placeholderTextColor={colors.grey}
            mode="flat"
            theme={theme}
          />
          <TextInput
            right={
              <TextInput.Icon
                icon={ispassVisible ? 'eye-off' : 'eye'}
                size={28}
                onPress={() => setIsPassVisible(!ispassVisible)}
              />
            }
            label="Password"
            value={credentials.password}
            onChangeText={text =>
              setCredentials(prev => ({...prev, password: text.trim()}))
            }
            style={styles.input}
            placeholderTextColor={colors.grey}
            secureTextEntry={ispassVisible}
            mode="flat"
            theme={theme}
          />
        </View>
        {error ? (
          <Text style={{color: 'red', marginVertical: 5}}>
            Please check the credentials
          </Text>
        ) : null}
        {loading ? (
          <ActivityIndicator color={colors.yellow} size="large" />
        ) : (
          <CustomButton
            title="Login"
            onPress={handleLogin}
            isPrimary={true}
            propStyle={{width: '80%', marginTop: 10}}
          />
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 12,
    width: '90%',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 24,
    marginVertical: 20,
    color: colors.yellow,
  },
  titleText: {
    color: colors.yellow,
  },
  inputContainer: {
    marginVertical: 8,
    width: '100%',
  },
  input: {
    // height: 50,
    width: '100%',
    marginVertical: 10,
    padding: 5,
    backgroundColor: colors.white,
    ...textStyle,
  },
});
