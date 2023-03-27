import icons from 'url:../../img/icons.svg';
import View from './View.js';
import previewView from './previewView.js';
import { ERROR_MESSAGE_RESULT } from '../config.js';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = ERROR_MESSAGE_RESULT;

  //   addHandler(handlerFunction) {
  //     this._parentElement.addEventListener('submit', handlerFunction);
  //   }

  _createMarkup() {
    const curHash = window.location.hash.slice(1);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join();
  }
}

export default new ResultsView();
