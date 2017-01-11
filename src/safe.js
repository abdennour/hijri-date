import HijriDate from './HijriDate';
import {GregToHijri} from './DateConverter';

export const toHijri = ((gregDate) => {
  const {year, month, date} = GregToHijri(gregDate);
  return new HijriDate(
    year,
    month,
    date,
    gregDate.getHours(),
    gregDate.getMinutes(),
    gregDate.getSeconds(),
    gregDate.getMilliseconds()
  );
});
export default HijriDate;
