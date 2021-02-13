/**
 * Creating libraries out of order
 *
 * Function purpose.
 * librarySystem function creates and returns the libraries.
 * Libraries could depend on each other.
 * Libraries can be created out of order
 * (i.e. dependent library could be created before its dependencies).
 */

/**
 * Demo usage.
librarySystem('workBlurb', ['name', 'company'], function (name, company) {
  return name + ' works at ' + company;
});

librarySystem('name', [], function () {
  return 'Gordon';
});

librarySystem('company', [], function () {
  return 'Watch and Code';
});

librarySystem('workBlurb'); // 'Gordon works at Watch and Code'
*/

/** Function signature.
 * librarySystem(libraryName[, dependencies, callback])
 *
 * Parameters.
 * libraryName: The name of the library to use.
 * dependencies: Array with dependency libraries names.
 * callback: Function that returns the library.
 *
 * Return value: It returns the library, if only libraryName provided; otherwise, undefined.
 *
 * Requirements.
 * It should create and return the library whithout dependencies.
 * It should handle dependencies, provided as the array elements in the second argument.
 * It should deal with dependencies out of order.
 * It should run the callback only once for each library.
*/

// Implementation.
(function() {
  var libraryStorage = {};

  function librarySystem(libraryName, dependencies, callback) {
    // Helper
    if (libraryName === 'clean') {
      libraryStorage = {};
      return;
    }

    // 1. Creating the library.
    if (arguments.length > 1) {

      // Check if all dependencies have been loaded.
      var dependenciesLoaded = dependencies.every(function(dependency) {
        return libraryStorage.hasOwnProperty(dependency);
      });

      // If all dependencies loaded, create library
      if (dependenciesLoaded) {

        var dependencyLibraries = dependencies.map(function(dependency) {
          if (libraryStorage[dependency].unresolved) {
            var unresolvedLibrary = libraryStorage[dependency];
            var deps = unresolvedLibrary.dependencies;
            var cb = unresolvedLibrary.callback;

            librarySystem(dependency, deps, cb);
          }
          return libraryStorage[dependency];
        });

        libraryStorage[libraryName] = callback.apply(null, dependencyLibraries);

        // If any dependency not loaded, create library and mark it unresolved
      } else {
        libraryStorage[libraryName] = {
          unresolved: true,
          dependencies: dependencies,
          callback: callback
        };
      }

      // 2. Using the library.
    } else {
      // If library is not resolved - resolve, then return it.
      if (libraryStorage[libraryName].unresolved) {
        var unresolvedLibrary = libraryStorage[libraryName];
        var deps = unresolvedLibrary.dependencies;
        var cb = unresolvedLibrary.callback;

        librarySystem(libraryName, deps, cb);
      }

      return libraryStorage[libraryName];
    }
  }

  window.librarySystem = librarySystem;
})();
