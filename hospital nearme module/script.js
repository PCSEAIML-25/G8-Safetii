// accesstoken = pk.eyJ1IjoiZGV2YW5zaHUwMTEiLCJhIjoiY2xqODgwMzNvMTNjZTNkcXpmczgxaTVxayJ9.d22blqq7FwkClR4KInc5_g

function fetchNearbyHospitals(location) {
    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiZGV2YW5zaHUwMTEiLCJhIjoiY2xqODgwMzNvMTNjZTNkcXpmczgxaTVxayJ9.d22blqq7FwkClR4KInc5_g`;
  
    fetch(geocodingUrl)
      .then(response => response.json())
      .then(data => {
        const coordinates = data.features[0].geometry.coordinates;
        const longitude = coordinates[0];
        const latitude = coordinates[1];
  
        const placesUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?proximity=${longitude},${latitude}&access_token=pk.eyJ1IjoiZGV2YW5zaHUwMTEiLCJhIjoiY2xqODgwMzNvMTNjZTNkcXpmczgxaTVxayJ9.d22blqq7FwkClR4KInc5_g`;
  

        fetch(placesUrl)
          .then(response => response.json())
          .then(data => {
           
            const hospitalList = document.getElementById('hospitalList');
            hospitalList.innerHTML = '';
  

            const mapElement = document.getElementById('map');
            mapElement.innerHTML = '';
  
            data.features.forEach(hospital => {
              const listItem = document.createElement('li');
              listItem.innerText = hospital.text;
  
      
              listItem.addEventListener('click', () => navigateToHospital(hospital));
  
              hospitalList.appendChild(listItem);
            });
  
    
            mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2YW5zaHUwMTEiLCJhIjoiY2xqODgwMzNvMTNjZTNkcXpmczgxaTVxayJ9.d22blqq7FwkClR4KInc5_g';
            const map = new mapboxgl.Map({
              container: 'map',
              style: 'mapbox://styles/mapbox/streets-v11',
              center: [longitude, latitude],
              zoom: 12
            });

            data.features.forEach(hospital => {
              const marker = new mapboxgl.Marker()
                .setLngLat(hospital.center)
                .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<center> <h3>${hospital.text}</h3></center>`))
                .addTo(map);
            });
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }
  

function navigateToHospital(hospital) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const startCoordinates = `${longitude},${latitude}`;
      const endCoordinates = hospital.center.join(',');
  
      const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoordinates};${endCoordinates}?access_token=pk.eyJ1IjoiZGV2YW5zaHUwMTEiLCJhIjoiY2xqODgwMzNvMTNjZTNkcXpmczgxaTVxayJ9.d22blqq7FwkClR4KInc5_g`;
  
      const mapboxButton = document.createElement('button');
      mapboxButton.innerText = 'Open in Mapbox Maps';
      mapboxButton.addEventListener('click', () => {
        window.open(`https://www.mapbox.com/directions/?route=${endCoordinates}%3B${startCoordinates}`);
      });
  
      const googleMapsButton = document.createElement('button');
      googleMapsButton.innerText = 'Open in Google Maps';
      googleMapsButton.addEventListener('click', () => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${hospital.text}&destination_place_id=${hospital.place_name}&origin=${latitude},${longitude}`);
      });
  
      const buttonsContainer = document.createElement('div');
      buttonsContainer.appendChild(mapboxButton);
      buttonsContainer.appendChild(googleMapsButton);
  
      const navigationInfo = document.createElement('div');
      navigationInfo.innerHTML = `<center> <h3>${hospital.text}</h3></center>`;
      navigationInfo.appendChild(buttonsContainer);
  
      const mapElement = document.getElementById('map');
      mapElement.innerHTML = '';
      mapElement.appendChild(navigationInfo);
    });
  }
  
  

  function handleFormSubmit(event) {
    event.preventDefault();
  

    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
  
    if (city) {

      fetchNearbyHospitals(city);
    }
  }

  const locationForm = document.getElementById('locationForm');
  locationForm.addEventListener('submit', handleFormSubmit);
  