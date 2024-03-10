import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Share,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ProductCard from '../components/ProductCard';
import {addProduct, cartStateType} from '../store/CartSlice';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {colors, textStyle} from '../utils/defaultStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';

interface HomeProps {
  navigation: BottomTabNavigationProp<any>;
}

const Home: React.FunctionComponent<HomeProps> = ({navigation}) => {
  const [products, setProducts] = useState<cartStateType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<cartStateType[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const dispatch = useDispatch();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Something went wrong!');
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <Image
            source={require('./../assets/logo.png')}
            resizeMode="contain"
            style={{width: 150}}
          />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredProducts(filtered);
  }, [search, products]);

  const handleShare = (product: cartStateType) => {
    Share.share({
      message: `Check out this product: ${product.title} - ${product.description}`,
    });
  };

  const handleSort = () => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setFilteredProducts(sortedProducts);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}>
        <TextInput
          value={search}
          onChangeText={text => {
            setSearch(text);
          }}
          placeholder="Search Products..."
          placeholderTextColor={colors.grey}
          style={[textStyle, {flex: 1, marginRight: 10}]}
        />
        <TouchableOpacity onPress={handleSort}>
          <Icon name="swap" size={20} style={textStyle} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={({item}) => (
            <ProductCard
              product={item}
              onAddToCart={() => dispatch(addProduct({...item, quantity: 1}))}
              onShare={() => handleShare(item)}
            />
          )}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchProducts} />
          }
        />
      )}
    </View>
  );
};

export default Home;
