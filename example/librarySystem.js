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
 *
 * It should not fail when trying to use a library before dependencies loaded.
 * It should throw error if tryig to use a library first.
 * It should handle dependencies with dependencies.
*/

// Implementation.
(function() {
  var libraryStorage = {};

  function librarySystem(libraryName, dependencies, callback) {

    // Create library
    if (arguments.length > 1) {
      libraryStorage[libraryName] = {
        dependencies: dependencies,
        callback: callback,
        notLoaded: true
      };

      // Use library
    } else {
      var lib = libraryStorage[libraryName];
      var result;

      // If library is not stored, throw error
      if (!lib) {
        throw new Error('Not loaded dependency: ' + libraryName);
      }

      if (lib.notLoaded) {

        // Wrap the code in the try-catch to not fail when trying to use a library with unloaded dependencies
        try {
          var cbArgs = lib.dependencies.map(function(dependency) {
            return librarySystem(dependency);
          });

          result = lib.callback.apply(null, cbArgs);
          libraryStorage[libraryName] = result;
        } catch (e) {
          console.log(e);
        }
      }

      return libraryStorage[libraryName];
    }
  }

  window.librarySystem = librarySystem;
})();
