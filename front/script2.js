const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
  window.location.href = 'login.html';
} else {
  const profileDiv = document.getElementById('profile');
  profileDiv.innerHTML = `
    <p><strong>Компания:</strong> ${user.company_name || 'Не указано'}</p>
    <p><strong>Контактное лицо:</strong> ${user.contact_name || 'Не указано'}</p>
    <p><strong>Email:</strong> ${user.email || 'Не указано'}</p>
    <p><strong>Телефон:</strong> ${user.phone || 'Не указано'}</p>
    <p><strong>Дата регистрации:</strong> ${new Date(user.created_at).toLocaleDateString() || 'Неизвестно'}</p>
  `;

  // Скрываем ссылки "Вход" и "Регистрация"
  document.getElementById('loginLink')?.remove();
  document.getElementById('registerLink')?.remove();
}
