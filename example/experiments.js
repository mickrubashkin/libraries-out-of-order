(function() {

  var libraryStorage = {};
  var resolve = {};

  function librarySystem(libraryName, dependencies, callback) {
    // Helper
    if (libraryName === 'clean') {
      libraryStorage = {};
      return;
    }

    // Create library
    if (arguments.length > 1) {
      var dependenciesLoaded = true;

      var callbackArgs = dependencies.map(function(dependency) {
        dependenciesLoaded = false;

        if (libraryStorage[dependency]) {
          dependenciesLoaded = true;
        }

        if (resolve[dependency]) {
          libraryStorage[dependency] = resolve[dependency]();
          dependenciesLoaded = true;
        }

        dependenciesLoaded = libraryStorage[dependency];

        return libraryStorage[dependency];
      });

      if (dependenciesLoaded) {
        libraryStorage[libraryName] = callback.apply(null, callbackArgs);
      } else {
        resolve[libraryName] = function() {
          librarySystem(libraryName, dependencies, callback);
          return libraryStorage[libraryName];
        };
      }

      // Use library
    } else {
      if (libraryStorage[libraryName]) {
        return libraryStorage[libraryName];
      } else {
        return resolve[libraryName]();
      }
    }
  }

  window.librarySystem = librarySystem;
})();