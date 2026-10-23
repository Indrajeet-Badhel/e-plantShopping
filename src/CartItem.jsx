import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem() {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const calculateTotalCost = item => parseFloat(item.cost.substring(1)) * item.quantity;
  const calculateTotalAmount = () => cart.reduce((total, item) => total + calculateTotalCost(item), 0);
  const handleIncrement = item => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  const handleDecrement = item => {
    if (item.quantity > 1) dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    else dispatch(removeItem(item.name));
  };
  const handleRemove = item => dispatch(removeItem(item.name));
  const handleContinueShopping = () => { window.location.hash = 'plants'; };
  const handleCheckoutShopping = () => setCheckoutMessage('Coming Soon! Checkout will be available in a future update.');
  const quantity = cart.reduce((total, item) => total + item.quantity, 0);
  return <main className="cart-container">
    <p className="eyebrow">YOUR OWN LITTLE PARADISE</p><h1>Shopping Cart</h1>
    <p className="cart-intro">{quantity} {quantity === 1 ? 'plant' : 'plants'} ready to brighten your space.</p>
    <div className="cart-layout"><div className="cart-items">
      {cart.length === 0 && <div className="empty-cart"><h2>Your cart is waiting to grow.</h2><p>Find a green companion in our plant collection.</p></div>}
      {cart.map(item => <article className="cart-item" key={item.name}>
        <img src={item.image} alt={item.name} />
        <div className="cart-item-details"><h2>{item.name}</h2><p>Unit price: {item.cost}</p>
          <div className="quantity-controls"><button aria-label={`Decrease ${item.name} quantity`} onClick={() => handleDecrement(item)}>−</button><span aria-label={`${item.name} quantity`}>{item.quantity}</span><button aria-label={`Increase ${item.name} quantity`} onClick={() => handleIncrement(item)}>+</button></div>
          <button className="delete-button" aria-label={`Delete ${item.name}`} onClick={() => handleRemove(item)}>Delete</button>
        </div>
        <p className="item-total">Total: ${calculateTotalCost(item).toFixed(2)}</p>
      </article>)}
    </div><aside className="order-summary"><h2>Order summary</h2><p>{quantity} items</p>
      <h3 className="cart-total" aria-live="polite">Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h3>
      <button disabled={!cart.length} onClick={handleCheckoutShopping}>Checkout</button>
      {checkoutMessage && <p role="status">{checkoutMessage}</p>}
      <button className="secondary-button" onClick={handleContinueShopping}>Continue Shopping</button>
    </aside></div>
  </main>;
}
export default CartItem;
