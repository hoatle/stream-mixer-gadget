(function($) {
  $(document).ready(function() {
    module("ActivityTest");

    test('check Activity class', function() {
      ok(Activity, 'Activity must be defined.');
    });

    test('test create Activity object', function() {
      var params = {
        type: 'exo',
        content: 'hello world test',
        displayName: 'demo',
        profileUrl: 'http://abc.com/profile/demo',
        avatarUrl: 'http://abc.com/profile/avatar/demo.jpg',
        postedTime: '123456789'
      };
      var activity = new Activity(params);
      ok(activity, 'activity object must be created.');
      equal(activity.getType(), 'exo', 'activity.type must be exo');
      equal(activity.getContent(), params.content, 'activity.content must be' + params.content);
    });
  });
})(jQuery);