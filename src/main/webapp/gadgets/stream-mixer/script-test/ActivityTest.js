(function($) {
  $(document).ready(function() {
    module("ActivityTest");

    test('Activity class', function() {
      ok(Activity, 'Activity must be defined.');
    });

    test('Activity object', function() {
      var timeStamp = new Date().getTime();
      var params = {
        type: 'exo',
        content: 'hello world test',
        displayName: 'demo',
        profileUrl: 'http://abc.com/profile/demo',
        avatarUrl: 'http://abc.com/profile/avatar/demo.jpg',
        postedTime: timeStamp
      };
      var activity = new Activity(params);
      ok(activity, 'activity object must be created.');
      equal(activity.getType(), 'exo', 'activity.type must be exo');
      equal(activity.getContent(), params.content, 'activity.content must be' + params.content);
      equal(activity.getPrettyTime(), Locale.getMsg('just_now'),
              'activity.getPrettyTime() must be ' + Locale.getMsg('just_now'));
      var expectedAppIcon = Configuration.getBaseUrl() + 'style/images/exo.png';
      equal(activity.getAppIcon(), expectedAppIcon,
            'activity.getAppIcon() must return: ' + expectedAppIcon);

    });
  });
})(jQuery);