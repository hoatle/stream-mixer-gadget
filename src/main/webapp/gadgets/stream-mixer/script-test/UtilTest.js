(function($) {
  $(document).ready(function() {
    module('UtilTest');

    test('check Util class', function() {
      ok(Util, 'Util must be defined.');
    });

    test('check Util.getPrettyTime', function() {
      ok(Util.getPrettyTime, 'Util.getPrettyTime must be defined.');
    });

    test('check Util.sortActivities', function() {
      var oldTime = new Date().getTime();
      var oldActivity = new Activity({
        type: Activity.Type.EXO_PLATFORM,
        content: 'old activity',
        postedTime: oldTime
      });

      var newTime = oldTime + 100;
      var newActivity = new Activity({
        type: Activity.Type.TWITTER,
        content: 'new activity',
        postedTime: newTime
      });

      var activities = [oldActivity, newActivity];

      Util.sortActivities(activities);

      equal(activities[0], newActivity, 'activities[0] must be newActivity');
      equal(activities[1], oldActivity, 'activities[1] must be odActivity');
    });
  });

})(jQuery);