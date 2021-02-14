(function() {

  var libraryStorage = {};
  var unresolvedLibraries = {};

  function librarySystem(libraryName, dependencies, callback) {

    // Create library
    if (arguments.length > 1) {
      var resolved = true;
      var callbackArgs = dependencies.map(function(dependency) {
        // if !libStorage[dp] resolved = false
        // return resolveLib(dp)
      });

      // if (resolved) libStorage[lib] = cb.apply(null, cbArgs);
      // else unresolvedLibs[libName] = [dps, cb];

    } else if (!libraryStorage[libraryName]) {
      var dps = 'TBD';
      var cb = 'TBD';

      librarySystem(libraryName, dps, cb);

    } else {
      return libraryStorage[libraryName];
    }
  }

  window.librarySystem = librarySystem;
})();