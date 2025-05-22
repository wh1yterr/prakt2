function renderCart() {
  const cartItemsContainer = document.getElementById("cartItems");
  const totalPriceEl = document.getElementById("totalPrice");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <span>${item.name}</span>
      <span>${item.price} ₽</span>
      <button class="remove-btn" data-index="${index}">Удалить</button>
    `;
    cartItemsContainer.appendChild(itemDiv);
    total += item.price;
  });

  totalPriceEl.textContent = total.toFixed(2);

  // Удаление товара
  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart(); // перерисовать корзину
    });
  });
}

// Обработчик кнопки "Оформить заказ"
document.getElementById("checkoutBtn").addEventListener("click", () => {
  alert("Заказ оформлен! Очистка корзины.");
  localStorage.removeItem("cart");
  renderCart();
});

renderCart();
