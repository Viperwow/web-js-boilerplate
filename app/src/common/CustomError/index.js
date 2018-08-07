export default class CustomError {
  constructor({
    message = 'No error message',
    code = -1,
    causedBy = null,
    data = null,
  } = {}) {
    this._message = message;
    this._code = code;
    this._causedBy = causedBy;
    this._data = data;
  }

  get message() {
    return this._message;
  }

  set message(message) {
    this._message = message;
  }

  get code() {
    return this._code;
  }

  set code(code) {
    this._code = code;
  }

  get causedBy() {
    return this._causedBy;
  }

  set causedBy(causedBy) {
    this._causedBy = causedBy;
  }

  get data() {
    return this._data;
  }

  set data(data) {
    this._data = data;
  }
}
