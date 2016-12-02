function getOS (ua) {
  var name = 'unknown',
    ver = 0;

  if (ua.indexOf('win') != -1) {
    name = 'windows';
  } else if (ua.match(/android (\d+\.\d+)(\.\d+)*/)) {
    name = 'android';
    ver = RegExp.$1;
  } else if (ua.match(/iphone|ipad/) && ua.match(/os (\d+_\d+)(_\d+)*/)) {
    name = 'ios';
    ver = RegExp.$1.replace(/_/g, '.');
  } else if (ua.match(/mac os x (\d+_\d+)(_\d+)*/)) {
    name = 'mac';
    ver = RegExp.$1.replace(/_/g, '.');
  }

  return {
    name: name,
    version: ver
  };
}

function getBrowser (ua) {
  var name = 'unknown',
    ver = 0;

  if (ua.indexOf('trident/7') != -1) {
    name = 'ie11';
  } else if (ua.match(/chrome\/(\d+\.\d+)(\.\d+)*/)) {
    name = 'chrome';
    ver = RegExp.$1;
  } else if (ua.indexOf('safari') != -1 && ua.match(/version\/(\d+\.\d+)(\.\d+)*/)) {
    name = 'safari';
    ver = RegExp.$1;
  }
  return {
    name: name,
    version: ver
  };
}

function versionCompare(a, b) {
  if (a === b) {
    return 0;
  }

  var a_components = a.split(".");
  var b_components = b.split(".");

  var len = Math.min(a_components.length, b_components.length);

  // loop while the components are equal
  for (var i = 0; i < len; i++) {
    // A bigger than B
    if (parseInt(a_components[i]) > parseInt(b_components[i])) {
      return 1;
    }

    // B bigger than A
    if (parseInt(a_components[i]) < parseInt(b_components[i])) {
      return -1;
    }
  }

  // If one's a prefix of the other, the longer one is greater.
  if (a_components.length > b_components.length) {
    return 1;
  }

  if (a_components.length < b_components.length) {
    return -1;
  }

  // Otherwise they are the same.
  return 0;
}

function isSupported () {
  var ua = window.navigator.userAgent.toLowerCase(),
    browser = getBrowser(ua),
    os = getOS(ua),
    flg = false;

  if (browser.name == 'ie11') {
    flg = true;
  } else if (browser.name == 'chrome') {
    if (os.name == 'android' && versionCompare(os.version, '4.4') != -1) {
      if (versionCompare(browser.version, '50') != -1) {
        flg = true;
      }
    } else if (versionCompare(browser.version, '51') != -1) {
      flg = true;
    }
  } else if (browser.name == 'safari') {
    if (os.name == 'mac' && versionCompare(os.version, '10.10') != -1) {
      if (versionCompare(browser.version, '9.1') != -1) {
        flg = true;
      }
    } else if (os.name == 'ios' && versionCompare(os.version, '8') != -1) {
      if (versionCompare(browser.version, '9.3') != -1) {
        flg = true;
      }
    }
  }
  return flg;
}
