(function($) {
  $(document).ready(function() {

    module('ConfigurationTest');

    test('Configuration class', function() {
      ok(Configuration, 'Configuration class must be defined.');
    });

    test('baseUrl', function() {
      var defaultBaseUrl = Configuration.getBaseUrl();
      ok(defaultBaseUrl, 'defaultBaseUrl must not be null.');
      Configuration.setBaseUrl();
      equal(Configuration.getBaseUrl(), defaultBaseUrl,
            'Configuration.getBaseUrl() must be ' + defaultBaseUrl);
      var newBaseUrl = 'http://exoplatform.org/gadgets/stream-mixer/';
      Configuration.setBaseUrl(newBaseUrl);
      equal(Configuration.getBaseUrl(), newBaseUrl,
            'Configuration.getBaseUrl() must be ' + newBaseUrl);
      //reset to default
      Configuration.setBaseUrl(defaultBaseUrl);
    });

  });
})(jQuery);