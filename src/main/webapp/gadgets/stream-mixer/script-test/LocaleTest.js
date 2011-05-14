(function($) {
  $(document).ready(function() {
    module("LocaleTest");

    test('check Locale class', function() {
      ok(Locale, 'Locale class must be defined.');
    });

    test('check Locale.getLang', function() {
      ok(Locale.getLang, 'Locale.getLang must be defined.');
    });

    test('check Locale.getCountry', function() {
      ok(Locale.getCountry, 'Locale.getCountry must be defined.');
    });

    test('check Locale.getMsg', function() {
      ok(Locale.getMsg, 'Locale.getMsg must be defined.');
    });
  });

})(jQuery);