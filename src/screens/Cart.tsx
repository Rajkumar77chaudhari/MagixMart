import React from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  cartStateType,
  decreaseProductCount,
  increaseProductCount,
} from '../store/CartSlice';
import CartCard from '../components/CartCard';
import {removeProduct} from '../store/CartSlice';
import {colors, textStyle} from '../utils/defaultStyles';
import CustomButton from '../components/CustomButton';

interface CartProps {}

const Cart: React.FC<CartProps> = props => {
  const cartProducts = useSelector(
    (state: {cart: cartStateType[]}) => state.cart,
  );
  const dispatch = useDispatch();

  const handleIncrement = (productId: number) => {
    dispatch(increaseProductCount(productId));
  };

  const handleDecrement = (productId: number) => {
    dispatch(decreaseProductCount(productId));
  };

  const handleDelete = (productId: number) => {
    dispatch(removeProduct(productId));
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
    // For example, navigate to the checkout screen
  };

  const getTotalAmount = () => {
    // Calculate total amount based on cartProducts
    let total = 0;
    for (const product of cartProducts) {
      total += product.price * product.quantity;
    }
    return total.toFixed(2);
  };

  return (
    <View style={{flex: 1}}>
      {cartProducts.length === 0 ? (
        <Text style={textStyle}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartProducts}
            renderItem={({item}) => (
              <CartCard
                product={item}
                onIncrement={() => handleIncrement(item.id)}
                onDecrement={() => handleDecrement(item.id)}
                onDelete={() => handleDelete(item.id)}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
          <View style={styles.checkoutContainer}>
            <Text style={styles.checkoutText}>Checkout</Text>
            <View style={styles.checkoutAmountContainer}>
              <Text style={styles.checkoutAmountText}>
                Total: ${getTotalAmount()}
              </Text>
              <CustomButton
                isPrimary
                title="Pay"
                onPress={handleCheckout}
                propStyle={{paddingHorizontal:20}}
              />
            </View>
          </View>
        </>
      )}
      {/* Checkout Section */}
    </View>
  );
};

const styles = StyleSheet.create({
  checkoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  checkoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    ...textStyle,
  },
  checkoutAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutAmountText: {
    marginRight: 10,
    ...textStyle,
  },
  checkoutButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default Cart;
