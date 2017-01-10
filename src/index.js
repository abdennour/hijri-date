import HijriDate from './HijriDate';
import {GregToHijri} from './DateConverter';

Date.prototype.toHijri = function() {
    const {year, month, day} = GregToHijri(this);
    return new HijriDate(
      year,
      month,
      day,
      this.getHours(),
      this.getMinutes(),
      this.getSeconds(),
      this.getMilliseconds()
    );
};

export default HijriDate;
