document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    const title = card.querySelector(".title").textContent;
    const priceText = card.querySelector(".price").textContent;
    const price = parseFloat(priceText.replace(/[^\d.]/g, ""));

    const item = { name: title, price: price };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${title} добавлен в корзину!`);
  });
});
