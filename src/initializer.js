import {
  GregToHijri
} from './DateConverter';
import StringDateParser from './StringDateParser';

const defaultFormat = 'yyyy/mm/dd';
const defaultProps ={
  month:1,
  date:1,
  hours:0,
  minutes:0,
  seconds:0,
  milliseconds:0
};

class Initializer {

   static initDefault() {
      return GregToHijri(new Date());
   }

   static init_number (number) {
     return GregToHijri(new Date(number));
   }

   static init_number_number (year, month) {

     return this.init_number_number_number(year, month, 1);
   }
   static init_number_number_number () {
     return this.initFromNumbers(...arguments);
   }
   static init_number_number_number_number () {
     return this.initFromNumbers(...arguments);
   }
   static init_number_number_number_number_number () {
     return this.initFromNumbers(...arguments);
   }
   static init_number_number_number_number_number_number () {
     return this.initFromNumbers(...arguments);
   }
   static init_number_number_number_number_number_number_number () {
     return this.initFromNumbers(...arguments);
   }

   static init_string() {
     return this.initFromStrings(...arguments);
   }

   static init_string_string() {
     return this.initFromStrings(...arguments);
   }

   static init_object(object) {
     return Object.assign({}, defaultProps, object);
   }
   static initFromNumbers(year,
     month,
     date,
     hours = 0,
     minutes = 0,
     seconds = 0,
     milliseconds = 0)
   {
     Array.from(arguments).forEach((arg, index) => {
       arguments[index] = parseInt(arg);
     });

     return {
       year,
       month,
       date,
       hours,
       minutes,
       seconds,
       milliseconds
     }
   }


   //TODO
   static initFromStrings(dateString, format = defaultFormat) {
      const props = {};
      props.year= StringDateParser.extractYear(dateString, format);
      props.month= StringDateParser.extractMonth(dateString, format);
      props.date= StringDateParser.extractDate(dateString, format);
      return Object.assign({}, defaultProps, props);
   }



}

Initializer.defaultFormat = defaultFormat;

export default Initializer;
