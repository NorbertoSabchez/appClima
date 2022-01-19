import React, { useState } from 'react';

const api ={
  key: "32c4208e08f9ed680da2b24af166543b",
  base: "https://api.openweathermap.org/data/2.5/"

}
function App() {

  const[query, setQuery] = useState('');
  const[clima, setClima] = useState('');

  const busqueda = evt => {
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setClima(result);
        setQuery('');
        console.log(result);
      });
    }
    
  }

  const creadorFecha = (d) => {
    let months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Nooviembre","Diciembre"];
    let days = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];

    let day = days[d.getDay()];
    let date = d.getDate();

    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof clima.main != "undefined")
     ? ((clima.main.temp > 16) ? 'app ' : 'app nublado') 
     : 'app'}>
      <main>
        <div className='caja-busqueda'>
          <input type="text" 
          className='barra-busqueda'
          placeholder='Buscar...'
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={busqueda}
          />
        </div>
        {(typeof clima.main != "undefined") ? (
          <><div className='caja-ubicacion'>
            <div className='ubicacion'>{clima.name}, {clima.sys.country}</div>
            <div className='fecha'>{creadorFecha(new Date())}</div>
          </div><div className='clima-box'>
              <div className='temperatura'>
                {Math.round(clima.main.temp)}°c
              </div>
              <div className='tiempo'>{clima.weather[0].main}</div>
            </div></>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
