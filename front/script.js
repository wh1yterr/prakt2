document.getElementById('regForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    company_name: document.getElementById('company').value,
    contact_name: document.getElementById('contact').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    password: document.getElementById('password').value
  };

  try {
    const response = await fetch('https://prakt2.onrender.com/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      // Можно очистить форму
      document.getElementById('regForm').reset();
    } else {
      alert(result.error);
    }
  } catch (error) {
    alert('Ошибка сети или сервера');
    console.error(error);
  }
});

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
