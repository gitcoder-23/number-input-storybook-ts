export interface INumberInput {
  /**This is used to define the type of modes eg.- decimal, shortened, scientific */
  displayMode: string;
  /** The number of digits after the decimal mark. */
  precision: number;
  /** The character used as a thousands separator. */
  delimiter: string;
  /***This is Decimal point mark symbol */
  decimalMark: string;
}
