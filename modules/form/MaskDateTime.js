class MaskDateTime {
  constructor(inputEl) {
    this.input = inputEl;
    this.inputValue = '';
    this.allowedCharacters = [
      /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, ' ',
      /\d/, /\d/, ':', /\d/, /\d/, /[AP]M/
    ];
    this.currentPosition = 0;
    this.init();
  }

  init() {
    this.input.addEventListener('keydown', this.handleKeydown.bind(this));
    this.input.addEventListener('input', this.handleInput.bind(this));
  }

  handleKeydown(event) {
    const key = event.key;
    const allowedChar = this.allowedCharacters[this.currentPosition];
    if (allowedChar.test(key)) {
      this.inputValue =
        this.inputValue.slice(0, this.currentPosition) +
        key +
        this.inputValue.slice(this.currentPosition + 1);
      this.currentPosition++;
      this.input.value = this.inputValue;
      event.preventDefault();
    } else if (key === 'Backspace' && this.currentPosition > 0) {
      this.currentPosition--;
      this.inputValue =
        this.inputValue.slice(0, this.currentPosition) +
        this.inputValue.slice(this.currentPosition + 1);
      this.input.value = this.inputValue;
      event.preventDefault();
    }
  }

  handleInput() {
    if (!this.validateInput(this.inputValue)) {
      this.input.value = this.inputValue;
    }
  }

  validateInput(value) {
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}[AP]M$/;
    return regex.test(value);
  }
}
