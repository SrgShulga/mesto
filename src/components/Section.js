export class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach(this._renderer);
  }

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
};
