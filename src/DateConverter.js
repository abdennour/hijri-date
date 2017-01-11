function intPart(floatNum) {
  if (floatNum < -0.0000001) {
    return Math.ceil(floatNum - 0.0000001)
  }
  return Math.floor(floatNum + 0.0000001)
}
var delta = 1

function GregToIsl(arg) {

  let d = parseInt(arg.CDay.value)
  let m = parseInt(arg.CMonth.value)
  let y = parseInt(arg.CYear.value)
  let jd, l, jd1, n, j, delta = 1;
  if ((y > 1582) || ((y == 1582) && (m > 10)) || ((y == 1582) && (m == 10) && (d > 14))) {
    //added delta=1 on jd to comply isna rulling 2007
    jd = intPart((1461 * (y + 4800 + intPart((m - 14) / 12))) / 4) + intPart((367 * (m - 2 - 12 * (intPart((m - 14) / 12)))) / 12) -
      intPart((3 * (intPart((y + 4900 + intPart((m - 14) / 12)) / 100))) / 4) + d - 32075 + delta
  } else {
    //added +1 on jd to comply isna rulling
    jd = 367 * y - intPart((7 * (y + 5001 + intPart((m - 9) / 7))) / 4) + intPart((275 * m) / 9) + d + 1729777 + delta
  }

    //added -1 on jd1 to comply isna rulling
  jd1 = jd - delta
  l = jd - 1948440 + 10632
  n = intPart((l - 1) / 10631)
  l = l - 10631 * n + 354
  j = (intPart((10985 - l) / 5316)) * (intPart((50 * l) / 17719)) + (intPart(l / 5670)) * (intPart((43 * l) / 15238))
  l = l - (intPart((30 - j) / 15)) * (intPart((17719 * j) / 50)) - (intPart(j / 16)) * (intPart((15238 * j) / 43)) + 29
  m = intPart((24 * l) / 709)
  d = l - intPart((709 * m) / 24)
  y = 30 * n + j - 30

  return {
    d,
    m,
    y,
    dateOfWeek: jd1 % 7,
    dayName:weekDay(jd1 % 7),
  };

}

function IslToGreg(arg) {


  let d = parseInt(arg.HDay.value)
  let m = parseInt(arg.HMonth.value)
  let y = parseInt(arg.HYear.value)
    //added - delta=1 on jd to comply isna rulling
  let jd = intPart((11 * y + 3) / 30) + 354 * y + 30 * m - intPart((m - 1) / 2) + d + 1948440 - 385 - delta

  let l,n ,i ,j,k ;

  if (jd > 2299160) {
    l = jd + 68569
    n = intPart((4 * l) / 146097)
    l = l - intPart((146097 * n + 3) / 4)
    i = intPart((4000 * (l + 1)) / 1461001)
    l = l - intPart((1461 * i) / 4) + 31
    j = intPart((80 * l) / 2447)
    d = l - intPart((2447 * j) / 80)
    l = intPart(j / 11)
    m = j + 2 - 12 * l
    y = 100 * (n - 49) + i + l
  } else {
    j = jd + 1402
    k = intPart((j - 1) / 1461)
    l = j - 1461 * k
    n = intPart((l - 1) / 365) - intPart(l / 1461)
    i = l - 365 * n + 30
    j = intPart((80 * i) / 2447)
    d = i - intPart((2447 * j) / 80)
    i = intPart(j / 11)
    m = j + 2 - 12 * i
    y = 4 * k + n + i - 4716
  }

  //arg.CDay.value=d
  //arg.CMonth.value=m
  //arg.CYear.value=y

  return {
    d,
    m,
    y,
    dateOfWeek: jd % 7,
    dayName: weekDay(jd % 7),
  };
}




export function weekDay(wdn) {
  if (wdn == 0) {
    return "Mon"
  }
  if (wdn == 1) {
    return "Tue"
  }
  if (wdn == 2) {
    return "Wed"
  }
  if (wdn == 3) {
    return "Thu"
  }
  if (wdn == 4) {
    return "Fri"
  }
  if (wdn == 5) {
    return "Sat"
  }
  if (wdn == 6) {
    return "Sun"
  }
  return ""

}

function isnumeric(num) {
  var strlen = num.length
  var i
  for (i = 0; i < strlen; ++i) {
    if (!((num.charAt(i) >= '0') && (num.charAt(i) <= '9') || (num.charAt(i) == '.') || (num.charAt(i) == '-'))) {
      return false;
    }
  }
}

function GregToHijri(gregDate) {
  const hijriDate = GregToIsl({
    CDay: {
      value: gregDate.getDate()
    },
    CYear: {
      value: gregDate.getFullYear()
    },
    CMonth: {
      value: gregDate.getMonth() + 1
    }
  });

  return {
    year: hijriDate.y,
    month: hijriDate.m,
    date: hijriDate.d,
    hours: gregDate.getHours(),
    minutes: gregDate.getMinutes(),
    seconds: gregDate.getSeconds(),
    milliseconds: gregDate.getMilliseconds(),
    day: hijriDate.dateOfWeek,
    dayName: hijriDate.dayName
  };

};

function HijriToGreg(hijriDate) {
  const gregDate =  IslToGreg({
    HDay: {
      value: hijriDate._date || hijriDate.date
    },
    HYear: {
      value: hijriDate._year || hijriDate.year
    },
    HMonth: {
      value: hijriDate._month || hijriDate.month
    }
  });

  return new Date(gregDate.y,
    gregDate.m -1 ,
    gregDate.d,
    hijriDate.getHours(),
    hijriDate.getMinutes() ,
    hijriDate.getSeconds(),
    hijriDate.getMilliseconds()
  )

};

export {GregToHijri};

export {HijriToGreg};
