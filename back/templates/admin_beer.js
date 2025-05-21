async function loadBeers() {
  const res = await fetch("https://your-backend-url/api/beers");
  const beers = await res.json();
  const list = document.getElementById("beer-list");
  list.innerHTML = "";
  beers.forEach(beer => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${beer.name}</h3>
      <p>${beer.description}</p>
      <p><b>Сорт:</b> ${beer.style} | <b>Крепость:</b> ${beer.abv}% | <b>Объём:</b> ${beer.volume} л</p>
      <button onclick="editBeer(${beer.id})">✏️</button>
      <button onclick="deleteBeer(${beer.id})">🗑️</button>
    `;
    list.appendChild(div);
  });
}

document.getElementById("beer-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    style: document.getElementById("style").value,
    abv: document.getElementById("abv").value,
    volume: document.getElementById("volume").value
  };

  const method = window.editingBeerId ? "PUT" : "POST";
  const url = window.editingBeerId
    ? `https://your-backend-url/api/beers/${window.editingBeerId}`
    : "https://your-backend-url/api/beers";

  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  window.editingBeerId = null;
  e.target.reset();
  loadBeers();
});

async function editBeer(id) {
  const res = await fetch(`https://your-backend-url/api/beers/${id}`);
  const beer = await res.json();
  document.getElementById("name").value = beer.name;
  document.getElementById("description").value = beer.description;
  document.getElementById("style").value = beer.style;
  document.getElementById("abv").value = beer.abv;
  document.getElementById("volume").value = beer.volume;
  window.editingBeerId = id;
}

async function deleteBeer(id) {
  if (confirm("Удалить пиво?")) {
    await fetch(`https://your-backend-url/api/beers/${id}`, { method: "DELETE" });
    loadBeers();
  }
}

loadBeers();
