/**
 * The Configuration class with default values.
 */

(function() {
  var window_ = this,
      //The base url for deploying this gadget on internet
      baseUrl = 'http://hoatle-dev.appspot.com/gadgets/stream-mixer/';

  /**
   * Class definition
   */
  function Configuration() {

  }

  /**
   * Gets the base url
   */
  Configuration.getBaseUrl = function() {
    return baseUrl;
  }


  /**
   * Sets new base url.
   *
   * @param newBaseUrl
   */
  Configuration.setBaseUrl = function(newBaseUrl) {
    if (newBaseUrl && (newBaseUrl !== baseUrl)) {
      baseUrl = newBaseUrl;
    }
  };

  //exposes
  window_.Configuration = Configuration;
})();