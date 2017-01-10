import {
  GregToHijri
} from './DateConverter';

class Initializer {

   static initDefault() {
      return GregToHijri(now);
   }

   static initNumbers(year,
     month,
     day,
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
       day,
       hours,
       minutes,
       seconds,
       milliseconds
     }
   }


   //TODO
   static initFromStrings(dateString, format = 'yyyy/mm/dd') {

   }



}

export default Initializer;
