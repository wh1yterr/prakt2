document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Собираем данные формы
        const formData = {
            org: form.org.value.trim(),
            fio: form.fio.value.trim(),
            phone: form.phone.value.trim(),
            email: form.email.value.trim()
        };

        // Очищаем сообщение
        messageDiv.textContent = '';

        try {
            // Отправка данных на backend
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                form.reset();
                messageDiv.style.color = "#388e3c";
                messageDiv.textContent = 'Заявка успешно отправлена! Ожидайте подтверждения.';
            } else {
                const data = await response.json();
                messageDiv.style.color = "#c0392b";
                messageDiv.textContent = data.error || 'Произошла ошибка при отправке. Попробуйте позже.';
            }
        } catch (error) {
            messageDiv.style.color = "#c0392b";
            messageDiv.textContent = 'Ошибка соединения с сервером.';
        }
    });
});