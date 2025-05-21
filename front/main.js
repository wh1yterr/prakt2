document.getElementById('regForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    company_name: document.getElementById('company').value,
    contact_name: document.getElementById('contact').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value
  };

  await fetch('https://your-backend-url.onrender.com/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  alert('Заявка отправлена!');
});
