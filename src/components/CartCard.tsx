import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import CustomButton from './CustomButton';
import {colors, textStyle} from '../utils/defaultStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {cartStateType} from '../store/CartSlice';

interface CartCardProps {
  product: cartStateType;
  onIncrement: () => void;
  onDecrement: () => void;
  onDelete: () => void;
}

const CartCard: React.FC<CartCardProps> = ({
  product,
  onIncrement,
  onDecrement,
  onDelete,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: product.image}} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="-"
            onPress={onDecrement}
            isPrimary={false}
            propStyle={styles.quantityButton}
          />
          <Text style={styles.quantity}>{product.quantity}</Text>
          <CustomButton
            title="+"
            onPress={onIncrement}
            isPrimary
            propStyle={styles.quantityButton}
          />
          <CustomButton
            title={'Delete'}
            onPress={onDelete}
            isPrimary={false}
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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    justifyContent:'space-between'
  },
  quantityButton: {
    width: 50,
  },
  quantity: {
    paddingHorizontal: 10,
    fontSize: 16,
    ...textStyle,
  },
});

export default CartCard;
