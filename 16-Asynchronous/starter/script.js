'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        data.population / 1000000
      ).toFixed(1)} milion</p>
      <p class="country__row"><span>🗣️</span>${
        Object.values(data.languages)[0]
      }</p>
      <p class="country__row"><span>💰</span>${
        Object.values(data.currencies)[0].name
      }</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

/* const getCountryAndNeigbour = function (country) {
  const request = new XMLHttpRequest();

  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderCountry(data);
    const neighbours = data.borders;

    neighbours.forEach(element => {
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.com/v3.1/alpha/${element}`);
      request2.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data);
        renderCountry(data, 'neighbour');
      });
      request2.send();
    });
  });
  request.send();
};
getCountryAndNeigbour('czechia'); */

//Button event handler ktory spusta vyhladanie krajiny a suseda
// btn.addEventListener('click', function () {
//   console.log(fetch('https://restcountries.com/v3.1/name/portugal'));
//   fetch('https://restcountries.com/v3.1/name/portugal')
//     .then(function (response) {
//       const data = response.json();
//       console.log(data);
//       return data;
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//       return fetch(
//         `https://restcountries.com/v3.1/alpha/${data[0].borders[0]}`
//       );
//     })
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(reason => console.log(`Mojreason${reason}`))
//     .finally(() => (countriesContainer.style.opacity = 1));
// });

// const getJson = function (url, msg) {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${msg} (${response.status})`);
//     return response.json();
//   });
// };

// const whereAmI = function (lat, lng) {
//   getJson(
//     `https://geocode.xyz/${lat},${lng}?geoit=json`,
//     'You are clicking to fast'
//   )
//     .then(data => {
//       console.log(data);
//       if (data.error) throw new Error(`${data.error.description}`);
//       console.log(`You are in ${data.city},${data.country}`);
//       return getJson(
//         `https://restcountries.com/v3.1/name/${data.country}`,
//         'No internet connection'
//       );
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => err)
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// if (navigator.geolocation)
//   navigator.geolocation.getCurrentPosition(
//     position => whereAmI(position.coords.latitude, position.coords.longitude),
//     () => console.log('could not get position')
//   );
// var image;
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const createImage = function (path) {
//   image = document.createElement('img');
//   return new Promise(function (resolve, reject) {
//     image.onload = () => resolve(image);
//     image.onerror = () => reject('File not found');
//     image.src = path;
//     console.dir(image);
//   });
// };

// createImage(' ./img/img-1.jpg')
//   .then(() => {
//     document.querySelector('.images').append(image);
//     return wait(5);
//   })
//   .then(() => {
//     console.log('cakal som 2 sekund');
//     image.style.display = 'none';
//     return createImage(' ./img/img-2.jpg');
//   })
//   .then(() => {
//     document.querySelector('.images').append(image);
//     return wait(5);
//   })
//   .then(() => {
//     console.log('cakal som 2 sekund');
//     image.style.display = 'none';
//     return createImage(' ./img/img-3.jpg');
//   })
//   .then(image => {
//     document.querySelector('.images').append(image);
//     return wait(5);
//   })
//   .then(() => (image.style.display = 'none'))
//   .catch(err => console.log(err));

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
//   countriesContainer.style.opacity = 1;
// };

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   try {
//     // Geolocation
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // Reverse geocoding
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if (!resGeo.ok) throw new Error('Problem getting location data');
//     const dataGeo = await resGeo.json();

//     // Country data
//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.country}`
//     );
//     if (!resGeo.ok) throw new Error('Problem getting country');
//     const data = await res.json();
//     renderCountry(data[0]);

//     return `You are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     //console.error(`${err} 💥`);
//     //renderError(`💥 ${err.message}`);

//     // Reject promise returned from async function
//     throw err;
//   }
// };

// console.log('1: Will get location');
// //const city = whereAmI();
// //console.log(city);

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`${err} 💥`);
//   }
//   console.log('3: Finished getting location');
// })();

//let image;

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (path) {
  const image = document.createElement('img');
  return new Promise(function (resolve, reject) {
    image.onload = () => {
      document.querySelector('.images').append(image);
      resolve(image);
    };
    image.onerror = () => reject('File not found');
    image.src = path;
    console.dir(image);
  });
};

const loadNPause = async function () {
  try {
    let img = await createImage(' ./img/img-1.jpg');
    //  document.querySelector('.images').append(image);
    await wait(5);
    console.log('cakal som 5 sekund');
    img.style.display = 'none';

    img = await createImage(' ./img/img-2.jpg');
    //    document.querySelector('.images').append(image);
    await wait(5);
    console.log('cakal som 5 sekund');
    img.style.display = 'none';
    img = await createImage(' ./img/img-3.jpg');
    //    document.querySelector('.images').append(image);
    await wait(5);
    img.style.display = 'none';
  } catch (err) {
    console.log(err);
  }
};

//loadNPause();
//console.log('kokot');

async function loadAll(pathArray) {
  try {
    const imgs = pathArray.map(async function (path) {
      console.log();
      return await createImage(path);
    });
    console.log(imgs);
    const plainImages = await Promise.all(imgs);
    console.log(plainImages);
    plainImages.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.log(err);
  }
}

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
