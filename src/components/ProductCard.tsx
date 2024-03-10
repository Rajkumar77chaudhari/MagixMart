import React from 'react';
import {View, Text, Image, StyleSheet, ViewStyle} from 'react-native';
import {cartStateType} from '../store/CartSlice';
import {colors, textStyle} from '../utils/defaultStyles';
import CustomButton from './CustomButton';

interface ProductCardProps {
  product: cartStateType;
  onAddToCart: () => void;
  onShare: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onShare,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: product.image}} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <View style={styles.reviewContainer}>
          <Text style={styles.reviewText}>Reviews: </Text>
          <Text style={styles.rating}>{product.rating.rate.toFixed(1)}/5</Text>
          <Text style={textStyle}>({product.rating.count} reviews)</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <CustomButton
            title="Share"
            onPress={onShare}
            isPrimary={false}
            propStyle={{width: '45%'}}
          />
          <CustomButton
            title="Add to Cart"
            onPress={onAddToCart}
            isPrimary
            propStyle={{width: '45%'}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: colors.white,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    ...textStyle,
  },
  description: {
    marginBottom: 5,
    ...textStyle,
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 5,
    ...textStyle,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewText: {
    fontWeight: 'bold',
    marginRight: 5,
    ...textStyle,
  },
  rating: {
    fontWeight: 'bold',
    marginRight: 3,
    color: 'orange',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default ProductCard;
