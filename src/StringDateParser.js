class StringDateParser {

  static extract(string, format, formatChunk, ignoreCase = true) {
    const targetFormat = (ignoreCase) ? format.toLowerCase() : format;
    if(targetFormat.includes(formatChunk)) {
      return parseInt(string.substr(targetFormat.indexOf(formatChunk), formatChunk.length));
    }

  }


  static extractYear(dateString, format) {
    let year = this.extract(...arguments, 'yyyy');
    if (!year)
    {
      year = this.extract(...arguments,'yy');
      if (year)
        year = Number('14'+year);
    }
    return year;
  }

  static extractMonth(dateString, format) {
    let month = this.extract(...arguments, 'mm', false);
    if (month)
     return month
    return 1;
  }

  static extractDate(dateString, format) {
    let date = this.extract(...arguments, 'dd', false);
    if (date)
     return date
    return 1;
  }

  static extractHours(dateString, format) {
    let hours = this.extract(...arguments, 'hh');
    if (hours)
     return hours
    return 0;
  }

  static extractMinutes(dateString, format) {
    let minutes = this.extract(...arguments, 'MM', false);
    if (minutes)
     return minutes
    return 0;
  }

  static extractSeconds(dateString, format) {

    let seconds = this.extract(...arguments, 'ss', false);
    if (seconds)
     return seconds
    return 0;
  }

  static extractMilliseconds(dateString, format) {

    let milliseconds = this.extract(...arguments, 'SS', false);
    if (milliseconds)
     return milliseconds
    return 0;
  }
}

export default StringDateParser;
