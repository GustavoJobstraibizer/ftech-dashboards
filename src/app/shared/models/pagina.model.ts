export class Pagina {

  private _page = 0
  private _size = 10
  private _total = 0
  private _filter = ''
  private _order = ''
  private _sort = 0
  private _execution = 0

  constructor() {}

  get page() {
    return this._page
  }

  set page(page: number) {
    this._page = page
  }

  get size() {
    return this._size
  }

  set size(size: number) {
    this._size = size
  }

  get total() {
    return this._total
  }

  set total(total: number) {
    this._total = total
  }

  get filter() {
    return this._filter
  }

  set filter(filter: string) {
    this._filter = filter
  }

  get order() {
    return this._order
  }

  set order(order: string) {
    this._order = order
  }

  get sort() {
    return this._sort
  }

  set sort(sort: number) {
    this._sort = sort
  }

  query() {
    let resource = ''

    if (this.page > 0) {
      resource += `&Page=${this.page}`
    }

    if (this.size > 0) {
      resource += `&Size=${this.size}`
    }

    if (this.filter) {
      resource += this.filter
    }

    if (this.order) {
      resource += `&Order=${this.order}`

      if (this.sort) {
        resource += `&Sort=${this.sort}`
      }
    }

    return resource
  }

  isFinal() {
    if (this.total == 0) {
      return true
    }

    return this.page >= this.total / this.size
  }

}
