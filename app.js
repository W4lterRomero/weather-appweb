const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener('click', ()=>{
    const APIkey = 'cac11508c896f6b74a4301f228a9d3f8';
    const city = document.querySelector('.search-box input').value;

    if(city === ''){
        alert("Por favor pon una ciudad válida");
        return; 
    }

    // La llamada fetch ahora está fuera del if(city === '')
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then(response => response.json()) 
        .then(json => {
            if(json.cod === '404'){
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return; // Salir si la ciudad no se encuentra
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span'); 
            const wind = document.querySelector('.weather-details .wind span');
            
            switch(json.weather[0].main){
                case 'Clear':
                    image.src = 'img/clear.png';
                    break;
                case 'Rain':
                    image.src = 'img/Lluvia.png'; // Considera un nombre de archivo consistente como rain.png
                    break;
                case 'Snow':
                    image.src = 'img/nieve.png'; // Considera un nombre de archivo consistente como snow.png
                    break;
                case 'Clouds':
                    image.src = 'img/nublado.png'; // Considera un nombre de archivo consistente como cloud.png
                    break;
                case 'Haze':
                case 'Mist': // Puedes añadir más casos para neblina/bruma
                    image.src = 'img/mist.png'; // Corregido: ruta de imagen para Haze/Mist
                    break;
                default:
                    image.src = ''; // Imagen por defecto o un ícono genérico
            }

            // Estas actualizaciones ahora están fuera del switch, pero dentro del .then si no es 404
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

            weatherBox.style.display = ''; 
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';

        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            // Aquí se podría manejar problemas de red tambiémn
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
          
            const errorText = error404.querySelector('p');
            if(errorText) errorText.textContent = 'Could not retrieve weather data.';
        });
        
});