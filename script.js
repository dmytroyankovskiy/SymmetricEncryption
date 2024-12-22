const app = (() => {
    const admin = { username: 'admin', password: btoa('Admin@1234') };
    localStorage.setItem('admin', JSON.stringify(admin));

    const loginPage = document.getElementById('login-page');
    const adminPage = document.getElementById('admin-page');
    const userPage = document.getElementById('user-page');

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    const showPage = (page) => {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        page.classList.add('active');
    };

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const user = JSON.parse(localStorage.getItem(username));

        if (user && atob(user.password) === password) {
            if (username === 'admin') {
                populateAdminTable();
                showPage(adminPage);
            } else {
                showPage(userPage);
            }
        } else {
            alert('Невірний логін або пароль');
        }
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        if (localStorage.getItem(username)) {
            alert('Такий користувач вже існує');
        } else {
            localStorage.setItem(username, JSON.stringify({ username, password: btoa(password) }));
            alert('Реєстрація успішна!');
            registerForm.reset();
        }
    });

    const populateAdminTable = () => {
        const tableBody = document.getElementById('user-table').querySelector('tbody');
        tableBody.innerHTML = '';
        Object.keys(localStorage).forEach(key => {
            if (key !== 'admin') {
                const user = JSON.parse(localStorage.getItem(key));
                const row = `<tr><td>${user.username}</td><td>${atob(user.password)}</td></tr>`;
                tableBody.insertAdjacentHTML('beforeend', row);
            }
        });
    };

    document.getElementById('logout-admin').addEventListener('click', () => showPage(loginPage));
    document.getElementById('logout-user').addEventListener('click', () => showPage(loginPage));

    showPage(loginPage);
})();
