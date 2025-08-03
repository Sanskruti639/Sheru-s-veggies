let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let cartTotal = 0;

  function addToCart(productName, pricePerKg, quantityId) {
   const quantity = parseInt(document.getElementById(quantityId).value);
    const totalPrice = pricePerKg * quantity;

    const item = { productName, quantity, pricePerKg, totalPrice };
    cartItems.push(item);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    renderCart();
  }

  function renderCart() {
    const cartContainer = document.querySelector(".cart-items");
    cartContainer.innerHTML = "";
    cartTotal = 0;

    cartItems.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        ${item.productName} - ${item.quantity} KG = ₹${item.totalPrice}
        <button class="remove-btn" onclick="removeItem(${index})">✖</button>
      `;
      cartContainer.appendChild(div);
      cartTotal += item.totalPrice;
    });

    document.querySelector(".cart-total").textContent = `Total: ₹${cartTotal}`;
  }

  function removeItem(index) {
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    renderCart();
  }

  function clearCart() {
    if (confirm("Are you sure you want to clear the cart?")) {
      cartItems = [];
      localStorage.removeItem("cart");
      renderCart();
    }
  }

  function checkoutCart() {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
    } else {
      alert(`Thank you! Your total is ₹${cartTotal}. Proceeding to checkout...`);
      clearCart();
    }
  }

  // Load from localStorage on page load
  window.onload = renderCart;