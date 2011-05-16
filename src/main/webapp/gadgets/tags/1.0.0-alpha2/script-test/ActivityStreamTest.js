(function($) {
  $(document).ready(function() {
    module("ActivityStreamTest");

    test('ActivityStream class', function() {
      ok(ActivityStream, 'ActivityStream must be defined.');
    });

    test('ActivityStream#configure', function() {
      ActivityStream.configure();
      var selectedType = ActivityStream.getSelectedType();
      equal(selectedType, ActivityStream.Type.UNIFIED,
            'selectedType must be: ' + ActivityStream.Type.UNIFIED);
      ActivityStream.configure({
        selectedType: ActivityStream.Type.TWITTER
      });
      var selectedType2 = ActivityStream.getSelectedType();
      equal(selectedType2, ActivityStream.Type.TWITTER,
            'selectedTyp2 must be: ' + ActivityStream.Type.TWITTER);
    });

    test('ActivityStream#get/setSelectedType', function() {
      ActivityStream.setSelectedType('exo');
      var selectedType = ActivityStream.getSelectedType();
      equal(selectedType, ActivityStream.Type.EXO_PLATFORM,
            "selectedType must be: " + ActivityStream.Type.EXO_PLATFORM);
    });

    test('ActivityStream#getActivities - exo', function() {
      ActivityStream.setSelectedType(ActivityStream.Type.EXO_PLATFORM);
      var eXoActivities = ActivityStream.getActivities();
      ok(eXoActivities, 'eXoActivities must not be null.');
      equal(eXoActivities.length, 0, 'eXoActivities.length must be 0');
    });

  });
})(jQuery);