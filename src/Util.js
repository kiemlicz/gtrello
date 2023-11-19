function has(prop) {
  var ps = PropertiesService.getUserProperties();
  return ps.getProperty(prop) != null;
}

function save(prop, value) {
  var ps = PropertiesService.getUserProperties();
  ps.setProperty(prop, value);
}

function saveString(prop, strValue) {
  save(prop, JSON.stringify(strValue));
}

function get(prop) {
  var ps = PropertiesService.getUserProperties();
  return ps.getProperty(prop);
}

/**
 * Plain get for string returns: ["string"]
 * @param {*} prop 
 * @returns 
 */
function getString(prop) {
  var ps = PropertiesService.getUserProperties();
  var o = ps.getProperty(prop);
  return o ? JSON.parse(o) : null;
}

function drop(prop) {
  var ps = PropertiesService.getUserProperties();
  return ps.deleteProperty(prop);
}

function dropAll() {
  var ps = PropertiesService.getUserProperties();
  return ps.deleteAllProperties();
}

function dropCache() {
  //this drops Properties too
  dropAll();
}
