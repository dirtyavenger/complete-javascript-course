import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError(this._errorMessage);
    }

    this._data = data;

    const markup = this._createMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderMessage(message = MESSAGE) {
    const markup = ` <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(message) {
    console.log('Error console log');
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    let html = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this._clear;
    this._parentElement.insertAdjacentHTML('afterBegin', html);
  }

  update(data) {
    if (!data || (data.lenght === 0 && Array.isArray(data)))
      return this.renderError();
    this._data = data;
    const newMarkup = this._createMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      if (!newEl.isEqualNode(curElements[i]))
        Array.from(newEl.attributes).forEach(el =>
          curElements[i].setAttribute(el.name, el.value)
        );
    });
    newElements.forEach((newEl, i) => {
      if (
        !newEl.isEqualNode(curElements[i]) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      )
        curElements[i].textContent = newEl.textContent;
    });
  }
}
