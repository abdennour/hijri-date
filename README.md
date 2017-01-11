[![Build Status](https://travis-ci.org/abdennour/hijri-date.svg?branch=master)](https://travis-ci.org/abdennour/hijri-date)
[![Coverage Status](https://coveralls.io/repos/github/abdennour/hijri-date/badge.svg?branch=master)](https://coveralls.io/github/abdennour/hijri-date?branch=master)

# Overview :

 `hijri-date` provides `HijriDate` class which is  the appropriate class to handle hijri dates like the built-in `Date` is the appropriate class to handle gregorian dates.   

`HijriDate` class shared almost the same interface with `Date` class :

 - getFullYear
 - getDate (day of month)
 - getDay (day index of week)  
 - getHours
 - ...

# Install

```bash
npm install hijri-date --save;
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

If you do not want to work safety, use `hijri-date/safe` as following :

```js
import HijriDate,{toHijri} from 'hijri-date/safe';

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
//TODO : to write
```

# Contribution :

 - Will be written soon . However, if you want to contribute, please, check 🔬 uni-tests firstly.

# License:

MIT .
