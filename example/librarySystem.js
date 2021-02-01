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
    // 1. Creating the library.
    if (arguments.length > 1) {

      // If no dependecies
      if (dependencies.length === 0) {
        // Store the library returned from the callback in the libraryStorage.
        libraryStorage[libraryName] = callback();

        //If there are dependencies
      } else {
        // Save dependencies and callback in the libraryStorage for the future use.
        libraryStorage.dependencies = dependencies;
        libraryStorage.callback = callback;

        // Get dependency libraries and put them to the dependencyLibraries array.
        var dependencyLibraries = dependencies.map(function(dependency) {
          return libraryStorage[dependency];
        });

        var dependencyLoaded = !dependencyLibraries.some(function(dependency) {
          return dependency === undefined;
        });

        // If all dependencies loaded, create a library and put it to the libraryStorage.
        if (dependencyLoaded) {
          libraryStorage[libraryName] = callback.apply(this, dependencyLibraries);

          // If some dependency not loaded, tell this.
        } else {
          console.log('Please, load dependencies');
        }
      }

      // 2. Using the library.
    } else {
      // If library not loaded yet
      if (!libraryStorage[libraryName]) {
        // Get dependencies and callback from the storage.
        var dependencies = libraryStorage.dependencies;
        var callback = libraryStorage.callback;

        // Make an attempt to create the library (it will if all dependencies loaded).
        librarySystem(libraryName, dependencies, callback);
      }

      return libraryStorage[libraryName];
    }
  }

  window.librarySystem = librarySystem;
})();