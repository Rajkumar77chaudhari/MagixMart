import * as React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {textStyle} from '../utils/defaultStyles';
import CustomButton from './../components/CustomButton';

interface ProfileProps {
  navigation: any;
}

const Profile: React.FunctionComponent<ProfileProps> = ({navigation}) => {
  const [user, setUser] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://fakestoreapi.com/users/1');
        const data = await res.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <>
          <Text style={styles.title}>User Profile</Text>
          <View style={styles.userInfo}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user?.email}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.value}>{user?.username}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.label}>Name:</Text>
            <Text
              style={
                styles.value
              }>{`${user?.name?.firstname} ${user?.name?.lastname}`}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.label}>Address:</Text>
            <Text
              style={
                styles.value
              }>{`${user?.address?.number}, ${user?.address?.street}, ${user?.address?.city}, ${user?.address?.zipcode}`}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{user?.phone}</Text>
          </View>
          <CustomButton
            title="Logout"
            onPress={handleLogout}
            isPrimary={false}
          />
        </>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007BFF',
    ...textStyle,
  },
  userInfo: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#333333',
    ...textStyle,
  },
  value: {
    flex: 1,
    color: '#666666',
    ...textStyle,
  },
});
