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


# Contribution :

 - Will be written soon . However, if you want to contribute, please, check 🔬 uni-tests firstly.

# License:

MIT .
