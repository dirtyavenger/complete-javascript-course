import { API_URL, RESULTS_PER_PAGE, API_KEY } from './config.js';
import { getJSON, sendJSON } from './helpers';

export const state = {
  recipe: {},

  search: {
    query: '',
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

function createRecipeObject(data) {
  return {
    id: data.id,
    title: data.title,
    publisher: data.publisher,
    sourceUrl: data.source_url,
    image: data.image_url,
    servings: data.servings,
    cookingTime: data.cooking_time,
    ingredients: data.ingredients,
  };
}

export async function loadRecipe(id) {
  try {
    data = await getJSON(`${API_URL}${id}?key=${API_KEY}`);

    const { recipe } = data.data;
    state.recipe = createRecipeObject(recipe);
    state.recipe.bookmarked = state.bookmarks.some(el => el.id === recipe.id);
    console.log(state.recipe);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function loadSearchResults(query) {
  try {
    state.search.query = query;
    data = await getJSON(`${API_URL}?search=${query}&key=${API_KEY}`);

    const { recipes } = data.data;

    state.search.results = recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
    //console.log(state);
  } catch (err) {
    throw err;
  }
}

export function getSearchPageResults(page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
}

export function updateServings(operation) {
  oldQty = state.recipe.servings;
  operation === 'increase' ? (newQty = oldQty + 1) : (newQty = oldQty - 1);
  if (newQty < 1) newQty = 1;
  state.recipe.ingredients.forEach(
    el => (el.quantity = (el.quantity * newQty) / oldQty)
  );
  state.recipe.servings = newQty;
}
function persistBookmarks(bookmarks) {
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

export function addBookmark(recipe) {
  console.log('added bookmark');
  state.bookmarks.push(recipe);
  recipe.bookmarked = true;
  persistBookmarks(state.bookmarks);
}
export function deleteBookmark(id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  state.recipe.bookmarked = false;
  persistBookmarks(state.bookmarks);
}
export async function uploadRecipe(data) {
  const ingredients = data
    .filter(e => {
      return e[0].startsWith('ingredient') && e[1] !== '';
    })
    .map(e => {
      const [quantity, unit, description] = e[1].split(',');

      return { quantity: quantity ? +quantity : null, unit, description };
    });
  console.log(ingredients);
  dataObject = Object.fromEntries(data);
  console.log(dataObject);

  const newRecipe = {
    id: dataObject.id,
    title: dataObject.title,
    publisher: dataObject.publisher,
    source_url: dataObject.sourceUrl,
    image_url: dataObject.image,
    servings: dataObject.servings,
    cooking_time: dataObject.cookingTime,
    ingredients: ingredients,
  };
  console.log(newRecipe);
  const savedRecipeData = await sendJSON(
    `${API_URL}?key=${API_KEY}`,
    newRecipe
  );
  console.log(savedRecipeData);
  state.recipe = createRecipeObject(savedRecipeData.data.recipe);
  console.log(state.recipe);
}

function loadBookmarks() {
  const bookmarks = localStorage.getItem('bookmarks');

  if (bookmarks) state.bookmarks = JSON.parse(bookmarks);
}

function init() {
  loadBookmarks();
}

init();
