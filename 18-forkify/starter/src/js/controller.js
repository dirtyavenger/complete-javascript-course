import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import { ERROR_MESSAGE } from './config.js';
import addRecipeView from './views/addRecipeView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  // 1. Loading the recipe from API
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    resultsView.update(model.getSearchPageResults());
    await model.loadRecipe(id);

    // rendering the recipe
    //console.log(model.state.recipe);
    recipeView.render(model.state.recipe);
    bookmarksView.update(model.state.bookmarks);

    // recipeContainer.innerHTML = '';
    // recipeContainer.insertAdjacentHTML('beforeend', html);
  } catch (err) {
    console.error(err);
    recipeView.renderError(ERROR_MESSAGE);
  }
};

const controlSearchResults = async function () {
  // 1. Loading the recipe from API
  try {
    model.state.search.page = 1;
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    await model.loadSearchResults(query);

    // rendering the recipe
    //console.log(model.state.recipe);

    resultsView.render(model.getSearchPageResults());

    //render initial pagination button
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (page = 1) {
  //1 get search results for requested page
  //2 render search sults for requsted page
  resultsView.render(model.getSearchPageResults(page));
  //3 update pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (operation) {
  model.updateServings(operation);
  recipeView.update(model.state.recipe);
};
const controlToggleBookmarks = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  console.log(model.state.bookmarks);
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  console.log(model.state.bookmarks);
  bookmarksView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  //1. create proper Ingredients object

  await model.uploadRecipe(newRecipe);
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerButtons(controlServings);
  searchView.addHandler(controlSearchResults);
  paginationView.addHandler(controlPagination);
  recipeView.addBookmarkHandler(controlToggleBookmarks);
  bookmarksView.addHandlerRender(controlBookmarks);
  addRecipeView.addHandlerUploadData(controlAddRecipe);
};

init();
