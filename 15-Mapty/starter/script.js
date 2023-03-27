'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// let lat, lng;
// let map;

class App {
  #map;
  #mapEvent;
  #workouts = [];
  constructor() {
    this._getLocation();
    inputType.addEventListener('change', this._toggleCadenceVsElevation);
    form.addEventListener('submit', this._newWorkout.bind(this));
    this._loadFromStorage();
    this.#workouts.forEach(workout => this._renderWorkout(workout));
  }
  _getLocation() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () =>
        console.log('could not get position')
      );
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude);
    this.#map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.#map);
    this.#map.on('click', this._showForm.bind(this));
    this.#workouts.forEach(workout => this._render_workout_marker(workout));
  }

  _showForm(e) {
    this.#mapEvent = e;

    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _hideForm() {
    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        '';
    form.classList.add('hidden');
  }
  _toggleCadenceVsElevation() {
    inputElevation.closest('div').classList.toggle('form__row--hidden');
    inputCadence.closest('div').classList.toggle('form__row--hidden');
  }
  _newWorkout(e) {
    let workout;
    const inputsNumerical = (...inputs) =>
      inputs.every(input => Number.isFinite(input));
    const numberPositive = (...inputs) => inputs.every(input => input > 0);
    e.preventDefault();
    //Validate inputs
    const { lat, lng } = this.#mapEvent.latlng;
    console.log(lat, lng);
    console.log(this.#mapEvent.latlng);
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    if (type == 'running') {
      const cadence = +inputCadence.value;
      console.log(inputsNumerical(distance, duration, cadence));
      console.log(numberPositive(distance, duration, cadence));
      if (
        !(
          inputsNumerical(distance, duration, cadence) &&
          numberPositive(distance, duration, cadence)
        )
      ) {
        alert('Inputs must be positive numerical values');
        return;
      }
      console.log(this.#mapEvent.latlng);
      workout = new Running([lat, lng], distance, duration, cadence);
    }
    if (type == 'cycling') {
      const elevation = +inputElevation.value;
      console.log(inputsNumerical(distance, duration, elevation));
      console.log(numberPositive(distance, duration));
      if (
        !(
          inputsNumerical(distance, duration, elevation) &&
          numberPositive(distance, duration)
        )
      ) {
        alert(
          'Inputs must be positive numerical values, expept the Elevation gain which needs to be a number'
        );
        return;
      }

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }
    console.log(inputType.value);
    console.log('kokot');
    console.log(workout);

    //add workout to #workouts array
    this.#workouts.push(workout);

    //render workout in list
    this._renderWorkout(workout);
    //render workout on map
    this._render_workout_marker(workout);
    //add to local storage
    this._saveToStorage();
    // center map on new workout
    this._moveToWorkout(workout);
    //hide form
    this._hideForm();
  }

  _renderWorkout(workout) {
    console.log(workout);
    let workoutHtml = `<li class="workout workout--${workout.type}" data-id=${workout.id}>
    <h2 class="workout__title">${workout.description}</h2>
    <div class="workout__details">
      <span class="workout__icon">🚴‍♀️</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">>${workout.duration}</span>
      <span class="workout__unit">min</span>
    </div>`;
    if (workout.type == 'running') {
      workoutHtml += ` <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.pace.toFixed(1)}</span>
      <span class="workout__unit">min/km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${workout.cadence}</span>
      <span class="workout__unit">spm</span>
    </div>`;
    }
    if (workout.type == 'cycling') {
      workoutHtml += `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.speed.toFixed(1)}</span>
      <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⛰</span>
      <span class="workout__value">${workout.elevation}</span>
      <span class="workout__unit">m</span>
    </div>
  </li>`;
    }
    containerWorkouts
      .querySelector('.form')
      .insertAdjacentHTML('afterend', workoutHtml);

    containerWorkouts
      .getElementsByClassName('workout')[0]
      .classList.toggle('workout--highlight');
  }

  _render_workout_marker(workout) {
    const weekday = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }
  _saveToStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }
  _loadFromStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    if (!data) return;
    this.#workouts = data;
  }
  _moveToWorkout(workout) {
    this.#map.panTo(workout.coords);
  }
}
/* 
let lat, lng;
let map;
const successCallback = position => {
  console.log(position);
  const { latitude, longitude } = position.coords;
  map = L.map('map').setView([latitude, longitude], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  map.on('click', function (e) {
    console.log(e);
    ({ lat, lng } = e.latlng);
    form.classList.remove('hidden');
    inputDistance.focus();
  });
};

const errorCallback = error => {
  console.log(error);
};


form.addEventListener('submit', function (e) {
  e.preventDefault();
  inputCadence.value =
    inputDistance.value =
    inputDuration.value =
    inputElevation.value =
      '';
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});

inputType.addEventListener('change', function () {
  inputElevation.closest('div').classList.toggle('form__row--hidden');
  inputCadence.closest('div').classList.toggle('form__row--hidden');
});
 */

class Workout {
  date = new Date();
  id = Date.now();
  // id = this.date.toString.slice(-10);
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
  _setDescription() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.description = `${this.constructor.name} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.pace = this._calcPace();
    this._setDescription();
  }
  _calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this.speed = this._calcSpeed();
    this._setDescription();
  }
  _calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const myApp = new App();

//12.1 skoncil som uplne zakladnymi triedami pre oba typy workoutov, mam validaciu inoputov a vytvorenie objektov pre oba typy workoutov
//17.1. zacal som robit na _renderWorkou, ale je to rozjebane, nefunkne
//28.1. opravil som renderWorkoutMarker, dorobil som ukladanie a loadovanie z lokal storage. Aj centrovanie mapy na novy workout. Pozri co treba este spravit vo videach
