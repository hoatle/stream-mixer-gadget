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

    asyncTest('Util#getActivities - 1', function() {
      Util.getActivities({}, function(dataResponse) {
        ok(dataResponse, 'dataResponse must not be null.');
        equal(false, dataResponse.hadError(), 'dataResponse.hadError() must return false.');
        var activities = dataResponse.get('activities').getData().asArray();
        equal(activities.length, 0, 'activities.length must be 0.');
        start();
      });
    });

    asyncTest('Util#getActivities - 2', function() {
      var params = {
        groupId: opensocial.IdSpec.GroupId.FRIENDS,
        key: 'friendActivities'
      };
      Util.getActivities(params, function(dataResponse2) {
        ok(dataResponse2, 'dataResponse2 must not be null.');
        equal(dataResponse2.hadError(), false, 'dataResponse2.hadError() must return false.');
        var friendActivities = dataResponse2.get(params.key).getData().asArray();
        equal(friendActivities.length, 0, 'friendActivities.length must be 0.');
        start();
      });
    });

  });

})(jQuery);