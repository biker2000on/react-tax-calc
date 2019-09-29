export default (items) => Object.keys(items).reduce((a,c) => {
  return a += parseInt(items[c]) ? parseInt(items[c]) : 0
}, 0)