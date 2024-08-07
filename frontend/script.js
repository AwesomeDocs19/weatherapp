document.getElementById('auth-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const action = e.submitter.textContent === 'Submit' ? 'register' : 'login';
    const response = await fetch(`http://localhost:3000/api/auth/${action}`, { // make sure to change the url to where you are running it (for anyone that wants to use my code)
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    if (response.ok) {
        localStorage.setItem('token', result.token);
        document.getElementById('auth').style.display = 'none';
        document.getElementById('weather').style.display = 'block';
        loadWeatherData();
    } else {
        alert(result.error);
    }
});

async function loadWeatherData() {
    const token = localStorage.getItem('token');
    const userId = parseJwt(token).id; // Assumes parseJwt is a function to decode JWT
    const response = await fetch(`http://localhost:3000/api/preferences/${userId}`);
    const preferences = await response.json();
    // Fetch and display weather data based on preferences
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
}
