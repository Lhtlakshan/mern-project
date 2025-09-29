export function getCart() {
  let cart = localStorage.getItem("myCart");

  if (!cart) {
    cart = [];
    localStorage.setItem("myCart", JSON.stringify(cart));
    return cart;
  }

  try {
    const parsed = JSON.parse(cart);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Invalid cart data in localStorage, resetting...", e);
    localStorage.setItem("myCart", JSON.stringify([]));
    return [];
  }
}

export function addToCart(product, qty) {
  let cart = getCart();

  const productIndex = cart.findIndex(
    (item) => item.productId === product.productId
  );

  if (productIndex === -1) {
    cart.push({
      productId: product.productId,
      name: product.name,
      quantity: qty,
      price: product.price,
      image: product.image[0]
    });
  } else {
    cart[productIndex].quantity += qty;

    if (cart[productIndex].quantity <= 0) {
      cart = cart.filter((item) => item.productId !== product.productId);
    }
  }

  localStorage.setItem("myCart", JSON.stringify(cart));
  console.log(cart);
  
  return cart;
}

export default function removeFromCart(productId) {
  let cart = getCart();

  cart = cart.filter((item) => item.productId !== productId);

  localStorage.setItem("myCart", JSON.stringify(cart));
  return cart;
}
