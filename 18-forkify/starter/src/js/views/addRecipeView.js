import View from './View.js';
import previewView from './previewView.js';
import { ERROR_MESSAGE_BOOKMARK } from '../config';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnUpload = document.querySelector('.upload__btn');
  _form = document.querySelector('.upload');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  _toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnClose.addEventListener('click', this._toggleWindow.bind(this));
    this._overlay.addEventListener('click', this._toggleWindow.bind(this));
  }
  _addHandlerHideWindow() {
    this._btnOpen.addEventListener('click', this._toggleWindow.bind(this));
  }
  addHandlerUploadData(handlerFunction) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = [...new FormData(this)];

      handlerFunction(data);
    });
  }
  _createMarkup() {}
}
export default new AddRecipeView();
