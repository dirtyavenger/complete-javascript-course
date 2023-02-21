import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

console.log('test');

const controlRecipe = async function () {
  // 1. Loading the recipe from API
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    await model.loadRecipe(id);

    // rendering the recipe
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe);

    // recipeContainer.innerHTML = '';
    // recipeContainer.insertAdjacentHTML('beforeend', html);
  } catch (err) {
    alert(err);
  }
};

//showRecipe();

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipe)
);
