(function($) {
  $(document).ready(function() {
    module('UtilTest');

    test('Util class', function() {
      ok(Util, 'Util must be defined.');
    });

    test('Util#getPrettyTime', function() {
      ok(Util.getPrettyTime, 'Util.getPrettyTime must be defined.');
      var justNowTimeStamp = new Date().getTime() - 1000;
      equal(Util.getPrettyTime(new Date(justNowTimeStamp)), Locale.getMsg('just_now'));
    });

    test('Util#sortActivities', function() {
      var oldTime = new Date().getTime();
      var oldActivity = {
        content: 'old activity',
        postedTime: oldTime
      };

      var newTime = oldTime + 100;
      var newActivity = {
        content: 'new activity',
        postedTime: newTime
      };

      var activities = [oldActivity, newActivity];

      Util.sortActivities(activities);

      equal(activities[0], newActivity, 'activities[0] must be newActivity');
      equal(activities[1], oldActivity, 'activities[1] must be odActivity');
    });
  });

})(jQuery);