function getWindowDimensions(window) {
  const {innerWidth: width, innerHeight: height} = window;
  return {width, height};
}
function formatCurrency(amount) {
  if (!amount) {
    return 0;
  }
  return Math.ceil(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function formatCurrencyStringToNumber(amount) {
  if (!amount) {
    return 0;
  }
  return Math.ceil(amount).toString().replace(',', '');
}
function formatCurrencyToSring(amount) {
  if (!amount) {
    return 0;
  }
  return Math.floor(amount / 1000000);
}

export {getWindowDimensions, formatCurrency, formatCurrencyToSring};
