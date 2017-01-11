import HijriDate, {
  toHijri
} from './safe';

const globalScope = (() => {
  if (typeof window === 'object') {
    return window;
  }
  if (typeof global === 'object') {
    return global;
  }
  return {};
})();

globalScope.HijriDate = HijriDate;

Date.prototype.toHijri = function() {
  return toHijri(this);
};

export default HijriDate;
