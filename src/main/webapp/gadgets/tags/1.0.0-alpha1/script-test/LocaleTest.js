(function($) {
  $(document).ready(function() {
    module("LocaleTest");

    test('Locale class', function() {
      ok(Locale, 'Locale class must be defined.');
    });

    test('Locale.getLang', function() {
      ok(Locale.getLang, 'Locale.getLang must be defined.');
      ok(Locale.getLang(), 'Locale.getLang() must not be null');
    });

    test('Locale.getCountry', function() {
      ok(Locale.getCountry, 'Locale.getCountry must be defined.');
      ok(Locale.getCountry(), 'Locale.getCountry() must not be null.');
    });

    test('check Locale.getMsg', function() {
      ok(Locale.getMsg, 'Locale.getMsg must be defined.');
      ok(Locale.getMsg('just_now'), 'Locale.getMsg(\'just_now\') must not be null.');
    });
  });

})(jQuery);