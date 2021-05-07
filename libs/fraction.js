import BigNumber from 'bignumber.js'
import _Decimal from 'decimal.js-light'
import toFormat from 'toformat'

const Decimal = toFormat(_Decimal)

export default class Fraction {
  constructor(numerator, denominator = 1) {
    this.numerator = BigNumber(numerator)
    this.denominator = BigNumber(denominator)
  }

  get quotient() {
    const quotient = this.numerator.div(this.denominator)
    if (quotient.isNaN() || !quotient.isFinite()) {
      return BigNumber(0)
    }
    return quotient
  }

  get remainder() {
    return new Fraction(this.numerator.mod(this.denominator), this.denominator)
  }

  invert() {
    return new Fraction(this.denominator, this.numerator)
  }

  plus(fraction) {
    fraction = fraction instanceof Fraction ? fraction : new Fraction(fraction)
    if (this.denominator.eq(fraction.denominator)) {
      return new Fraction(
        this.numerator.plus(fraction.numerator),
        this.denominator
      )
    }
    return new Fraction(
      this.numerator
        .times(fraction.denominator)
        .plus(this.denominator.times(fraction.numerator)),
      this.denominator.times(fraction.denominator)
    )
  }

  minus(fraction) {
    fraction = fraction instanceof Fraction ? fraction : new Fraction(fraction)
    if (this.denominator.eq(fraction.denominator)) {
      return new Fraction(
        this.numerator.minus(fraction.numerator),
        this.denominator
      )
    }
    return new Fraction(
      this.numerator
        .times(fraction.denominator)
        .minus(this.denominator.times(fraction.numerator)),
      this.denominator.times(fraction.denominator)
    )
  }

  times(fraction) {
    fraction = fraction instanceof Fraction ? fraction : new Fraction(fraction)
    return new Fraction(
      this.numerator.times(fraction.numerator),
      this.denominator.times(fraction.denominator)
    )
  }

  div(fraction) {
    fraction = fraction instanceof Fraction ? fraction : new Fraction(fraction)
    return new Fraction(
      this.numerator.times(fraction.denominator),
      this.denominator.times(fraction.numerator)
    )
  }

  lt(fraction) {
    fraction = fraction instanceof Fraction ? fraction : new Fraction(fraction)
    return this.numerator
      .times(fraction.denominator)
      .lt(this.denominator.times(fraction.numerator))
  }

  eq(fraction) {
    fraction = fraction instanceof Fraction ? fraction : new Fraction(fraction)
    return this.numerator
      .times(fraction.denominator)
      .eq(this.denominator.times(fraction.numerator))
  }

  gt(fraction) {
    fraction = fraction instanceof Fraction ? fraction : new Fraction(fraction)
    return this.numerator
      .times(fraction.denominator)
      .gt(this.denominator.times(fraction.numerator))
  }

  toFixed(dp, rounding = BigNumber.ROUND_HALF_UP) {
    return this.quotient.dp(dp, rounding).toString()
  }

  toString(dp = 6) {
    return this.toFixed(dp)
  }

  toPercent() {
    return this.times(100)
  }

  toSd(sd = 6) {
    if (this.quotient.eq(0)) {
      return 'NaN'
    }
    const quotient = new Decimal(this.numerator.toString())
      .div(this.denominator.toString())
      .toSignificantDigits(sd, Decimal.ROUND_DOWN)
    return quotient.toFormat(quotient.dp(), {
      groupSeparator: ''
    })
  }
}
