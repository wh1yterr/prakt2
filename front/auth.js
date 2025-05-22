document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    // Удаляем или скрываем ссылки "Вход" и "Регистрация"
    const loginLink = document.getElementById("loginLink");
    const registerLink = document.getElementById("registerLink");

    if (loginLink) loginLink.style.display = "none";
    if (registerLink) registerLink.style.display = "none";
  }
});
