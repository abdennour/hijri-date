[![Build Status](https://travis-ci.org/abdennour/hijri-date.svg?branch=master)](https://travis-ci.org/abdennour/hijri-date)
[![Coverage Status](https://coveralls.io/repos/github/abdennour/hijri-date/badge.svg?branch=master)](https://coveralls.io/github/abdennour/hijri-date?branch=master)

# Overview :

 * `hijri-date` provides `HijriDate` class which is  the appropriate class to handle hijri dates like the built-in `Date` is the appropriate class to handle gregorian dates.   

* `HijriDate` class shared almost the same interface with `Date` class :

 - getFullYear
 - getDate (day of month)
 - getDay (day index of week)  
 - getHours
 - ...

* Works on client-side (browser) and server-side (NodeJS apps).

# Install

```bash
npm install hijri-date --save;
```
or

```html
<script src="https://rawgit.com/abdennour/hijri-date/master/cdn/hijri-date-latest.js" type="text/javascript" ></script>
```
# Examples :

### ES7 or after :

```js
 import 'hijri-date';

 const today = new HijriDate();
 const day_eid_adha = new HijriDate(1438, 12, 10); // عيد الأضحى لسنة 1438
 const dayGreg = day_eid_adha.toGregorian()  ;
 //  Fri Sep 01 2017 00:00:00 GMT+0300 (AST)
//------ Convert from Gregorian to Hijri---------
 const nowGreg = new Date();
 const nowHijri = nowGreg.toHijri();     
```

If you  want to work safety, use `hijri-date/lib/safe` as following :

```js
import HijriDate,{toHijri} from 'hijri-date/lib/safe';

const today = new HijriDate();
const day_eid_adha = new HijriDate(1438, 12, 10); // عيد الأضحى لسنة 1438
const dayGreg = day_eid_adha.toGregorian()  ;
//  Fri Sep 01 2017 00:00:00 GMT+0300 (AST)
//------ Convert from Gregorian to Hijri---------
const nowGreg = new Date();
const nowHijri = toHijri(nowGreg);

```

### ES6 or before :

```js
 require('hijri-date')
 // then HijriDate class will be public as Date class .
// then, the same as above (see ES7 )
//....
```
- safe import :


```js
 const hijriSafe= require('hijri-date/lib/safe');
 const HijriDate =  hijriSafe.default;
 const toHijri   = hijriSafe.toHijri;
// then, the same as above (see ES7 safe)
const today = new HijriDate();
const day_eid_adha = new HijriDate(1438, 12, 10); // عيد الأضحى لسنة 1438
//......
```


# Documentation:

   Documentation  was published [here](https://abdennour.github.io/hijri-date/)

# Contribution :

 - Will be written soon . However, if you want to contribute, please, check 🔬 uni-tests firstly & how it was written.


# History of releases :

   * **0.2.2** :


      - fix a bug related  to english localisation .

      - overload constructor to accept default month (1) and default (date : 1)   

      - add documentation
      
   * **0.2.0**  :

       - The first bundled version is generated (then, it will be embedded in `<script>` directly without using npm)

       - New methods added to HijriDate class : isToday, isYesterday, isTomorrow, is, clone, ignoreTime,...etc

       - Chaining methods calls by returning the instance itself (`this`) if it is possible  .  

   * **0.1.5**  :

       - Refactor code.

   * **0.1.4**  :

     - supports `locales` (`Hijri.locales`).

     - `locales` can be extended .

     - apply format on HijriDate's instance `new HijriDate().format('dddd')`

     - Override `toString` to log the full date clearly such as `Date` class.

     - Substract days,hours, minutes,...


   * **0.1.3**  : the first mature package.

# License:

MIT .
