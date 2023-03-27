import View from './View.js';
import previewView from './previewView.js';
import { ERROR_MESSAGE_BOOKMARK } from '../config';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = ERROR_MESSAGE_BOOKMARK;
  _createMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join();

    /*  return this._data.reduce((acc, cur) => {
      return (acc += `<li class="preview">
      <a class="preview__link ${
        cur.id === curHash ? 'preview__link--active' : ''
      }" href="#${cur.id}">
        <figure class="preview__fig">
          <img src="${cur.image}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${cur.title}</h4>
          <p class="preview__publisher">${cur.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>`);
    }, ''); */
  }
  addHandlerRender(handlerFunction) {
    window.addEventListener('load', handlerFunction);
  }
}
export default new BookmarksView();
