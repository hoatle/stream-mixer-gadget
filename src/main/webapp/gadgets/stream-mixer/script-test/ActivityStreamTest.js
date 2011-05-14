(function($) {
  $(document).ready(function() {
    module("ActivityStream Test");

    test('check ActivityStream class', function() {
      ok(ActivityStream, 'ActivityStream must be defined.');
    });
  });
})(jQuery);