window.addEventListener('load', ()=> {
  let lon
  let lat

  let temperaturaValor = document.getElementById('temperatura-valor')  
  let temperaturaDescripcion = document.getElementById('temperatura-descripcion')  
  
  let localizacao = document.getElementById('localizacao')  
  let iconeAnimado = document.getElementById('icone-animado') 

  let ventoVelocidade = document.getElementById('vento-velocidade') 


  if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition( posicao => {
         //console.log(posicao.coords.latitude)
         lon = posicao.coords.longitude
         lat = posicao.coords.latitude
          //localizacao atual   
         const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt&appid=a5de0420b71da2a850e8db2dfa3186d0`

      
         //console.log(url)

         fetch(url)
          .then( response => { return response.json()})
          .then( data => {
              //console.log(data)
              
              let temp = Math.round(data.main.temp - 273.15); // converte de Kelvin para Celsius e arredonda
temperaturaValor.textContent = `${temp} °C`;

              //console.log(data.weather[0].description)
              let desc = data.weather[0].description
              temperaturaDescripcion.textContent = desc.toUpperCase()
              localizacao.textContent = data.name
              
              ventoVelocidade.textContent = `${(data.wind.speed * 3.6).toFixed(2)} km/h`
              
            
              //para icones dinámicos
              console.log(data.weather[0].main)
              switch (data.weather[0].main) {
                  case 'Thunderstorm':
                    iconeAnimado.src='animated/thunder.svg'
                    console.log('TORMENTA');
                    break;
                  case 'Drizzle':
                    iconeAnimado.src='animated/rainy-2.svg'
                    console.log('CHUVISCO');
                    break;
                  case 'Rain':
                    iconeAnimado.src='animated/rainy-7.svg'
                    console.log('CHUVA');
                    break;
                  case 'Snow':
                    iconeAnimado.src='animated/snowy-6.svg'
                      console.log('NEVE');
                    break;                        
                  case 'Clear':
                      iconeAnimado.src='animated/day.svg'
                      console.log('LIMPO');
                    break;
                  case 'Atmosphere':
                    iconeAnimado.src='animated/weather.svg'
                      console.log('ATMOSFERA');
                      break;  
                  case 'Clouds':
                      iconeAnimado.src='animated/cloudy-day-1.svg'
                      console.log('NUVENS');
                      break;  
                  default:
                    iconeAnimado.src='animated/cloudy-day-1.svg'
                    console.log('por defecto');
                }

          })
          .catch( error => {
              console.log(error)
          })
     })
        
  }
})