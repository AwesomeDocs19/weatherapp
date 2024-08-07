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
    const userId = parseJwt(token).id;
    const response = await fetch(`http://localhost:3000/api/preferences/${userId}`);
    const preferences = await response.json();

    const apiKey = 'YOUR_API_KEY';
    for (const pref of preferences) {
        const location = encodeURIComponent(pref.location);
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
        const weatherData = await weatherResponse.json();
        updateCurrentWeather(weatherData);
        // Add code to handle forecast data if needed (later)
    }
}

function updateCurrentWeather(data) {
    const weatherText = `Temperature: ${data.main.temp}°C\nWeather: ${data.weather[0].description}`;
    document.getElementById('current-weather').textContent = weatherText;
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
}
