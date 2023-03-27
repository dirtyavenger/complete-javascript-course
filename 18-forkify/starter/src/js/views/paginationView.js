import icons from 'url:../../img/icons.svg';
import View from './View.js';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandler(handlerFunction) {
    this._parentElement.addEventListener('click', function (e) {
      alert('pagination clicked');
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      console.log(btn.dataset.targetpage);
      handlerFunction(+btn.dataset.targetpage);
    });
  }

  _createMarkup() {
    const totalNumPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    let markup = '';
    if (totalNumPages == 1) return;
    if (this._data.page != 1)
      markup += `<button class="btn--inline pagination__btn--prev" data-targetpage=${
        this._data.page - 1
      }>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${this._data.page - 1}</span>
  </button>`;
    if (this._data.page < totalNumPages)
      markup += `<button class="btn--inline pagination__btn--next" data-targetPage=${
        this._data.page + 1
      }>
  <span>Page ${this._data.page + 1}</span>
  <svg class="search__icon">
    <use href="${icons}#icon-arrow-right"></use>
  </svg>
</button>`;
    return markup;
  }
}
export default new PaginationView();
