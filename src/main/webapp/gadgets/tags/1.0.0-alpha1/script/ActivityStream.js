/**
 * The activity stream to put/get activities, load more, load newer.
 *
 * depends:
 * Configuration.js
 *
 */


(function($) {
  var window_ = this,
      selectedType,
      successCallback,
      failCallback,
      viewer, viewerFriends = [],
      viewerActivities = [], viewerFriendsActivities = [],
      unifiedActivities = [], newerUnifiedActivities = [], olderUnifiedActivities = [],
      exoActivities = [], newerExoActivities = [], olderExoActivities = [],
      twitterActivities = [], newerTwitterActivities = [], olderTwitterActivities = [],
      facebookActivities = [], newerFacebookActivities = [], olderFacebookActivities = [];

  //Loads viewer, viewerFriends
  function initProfiles() {
    debug.debug('ActivityStream#initProfiles()');
    var viewerOpts = {};
    viewerOpts[opensocial.DataRequest.PeopleRequestFields.PROFILE_DETAILS] =
            [opensocial.Person.Field.ID,
              opensocial.Person.Field.NAME,
              opensocial.Person.Field.PROFILE_URL,
              opensocial.Person.Field.THUMBNAIL_URL,
              "portalName", //TODO hoatle tricky, need exo-environment feature
              "restContext",
              "host"
            ];

    Util.getViewer(viewerOpts, function(res) {
      if (res.hadError()) {
        debug.error('Failed to get viewer');
        debug.info(res);
        return;
      }
      viewer = res.get('viewer').getData();

      Configuration.portalEnvironment = {
        'portalName': viewer.getField('portalName'),
        'restContextName': viewer.getField('restContextName'),
        'host': viewer.getField('hostName')
      };

      debug.info('Configuration.portalEnvironment:');
      debug.debug(Configuration.portalEnvironment);

      var viewerFriendsOpts = {};
      viewerFriendsOpts[opensocial.DataRequest.PeopleRequestFields.FIRST] = 0;
      viewerFriendsOpts[opensocial.DataRequest.PeopleRequestFields.MAX] = 100;
      viewerFriendsOpts[opensocial.DataRequest.PeopleRequestFields.PROFILE_DETAILS] =
              [opensocial.Person.Field.ID,
                opensocial.Person.Field.NAME,
                opensocial.Person.Field.PROFILE_URL,
                opensocial.Person.Field.THUMBNAIL_URL
              ];
      Util.getViewerFriends(viewerFriendsOpts, function(res) {
        if (res.hadError()) {
          debug.error('Failed to get viewer friends');
          debug.info(res);
          return;
        }
        viewerFriends = res.get('viewerFriends').getData();
        debug.info('viewerFriends:');
        debug.debug(viewerFriends);
        initActivities();
      });
    });
  }


  /**
   * ActivityStream class definition
   *
   */
  function ActivityStream() {
  };

  //Enum constants for activity stream type
  ActivityStream.Type = {
    UNIFIED      : 'unified',
    EXO_PLATFORM : 'exo',
    TWITTER      : 'twitter',
    FACEBOOK     : 'facebook',
    LINKEDIN     : 'linkedin',
    CONNECTIONS  : 'connections',
    ME           : 'me'
  };

  /**
   * Configures the the activity stream to work.
   *
   * For example:
   *
   * var params = {
   *   selectedType: ActivityStream.Type.UNIFIED, //this is default value
   *   callback: {
   *     //when the call is successfully
   *     onSuccess: function() {
   *
   *     },
   *     //when something is wrong
   *     onFail: function(msg) {
   *
   *     }
   *   }
   * };
   *
   * ActivityStream.configure(params);
   *
   * @param params
   */
  ActivityStream.configure = function(params) {
    debug.debug('ActiivtyStream#configure');
    if (!params) {
      params = {};
    }
    selectedType = params.selectedType || ActivityStream.Type.UNIFIED;
    successCallback = params.onSuccess;
    failCallback = params.onFail;
    initProfiles();
  };

  function initActivities() {
    debug.debug('ActivityStream#initActivities()');
    Util.getActivities({}, function(res) {
      //viewer activities
      if (res.hadError()) {
        debug.warn('Failed to init viewer activities');
        debug.info(res);
        return;
      }
      var osViewerActivities = res.get('activities').getData();
      osViewerActivities.each(function(osActivity) {
        var avatarUrl = viewer.getField(opensocial.Person.Field.THUMBNAIL_URL);
        //Tricky, Social's bug
        if (!avatarUrl) {
          avatarUrl = Configuration.portalEnvironment.host + '/' +
                  'social-resources/skin/ShareImages/activity/AvatarPeople.gif';
          debug.info('default avatarUrl: ' + avatarUrl);
        }
        var osActivityTitle = osActivity.getField(opensocial.Activity.Field.TITLE).replace(/&#60;/g,
                '<').replace(/&#62;/g, '>').replace(/&#34;/g, '"');
        var params = {
          type: Activity.Type.EXO_PLATFORM,
          content: unescape(osActivityTitle),
          displayName: viewer.getDisplayName(),
          profileUrl: viewer.getField(opensocial.Person.Field.PROFILE_URL),
          avatarUrl: viewer.getField(opensocial.Person.Field.THUMBNAIL_URL),
          postedTime: osActivity.getField(opensocial.Activity.Field.POSTED_TIME)
        };
        debug.info('osViewerActivities:');
        debug.debug(osViewerActivities);
        var activity = new Activity(params);
        viewerActivities.push(activity);
      });
      debug.info('viewerActivities:');
      debug.debug(viewerActivities);
      $.merge(exoActivities, viewerActivities);
      debug.info('exoActivities:');
      debug.debug(exoActivities);
      Util.getActivities({groupId: opensocial.IdSpec.GroupId.FRIENDS}, function(res) {

        function getPostedUser(id) {
          return viewerFriends.getById(id);
        }

        //viewer's friends activities
        if (res.hadError()) {
          debug.warn('Failed to init viewer\'s friends activities');
          debug.info(res);
          return;
        }
        var osViewerFriendsActivities = res.get('activities').getData();
        osViewerFriendsActivities.each(function(osActivity) {
          var postedUser = getPostedUser(osActivity.getField(opensocial.Activity.Field.USER_ID));
          var avatarUrl = postedUser.getField(opensocial.Person.Field.THUMBNAIL_URL);
          //Tricky, Social's bug
          if (!avatarUrl) {
            avatarUrl = Configuration.portalEnvironment.host + '/' +
                    'social-resources/skin/ShareImages/activity/AvatarPeople.gif';
            debug.info('default avatarUrl: ' + avatarUrl);
          }
          debug.info('postedUser:');
          debug.debug(postedUser);
          var osActivityTitle = osActivity.getField(opensocial.Activity.Field.TITLE).replace(/&#60;/g,
                  '<').replace(/&#62;/g, '>').replace(/&#34;/g, '"');
          var params = {
            type: Activity.Type.EXO_PLATFORM,
            content: unescape(osActivityTitle),
            displayName: postedUser.getDisplayName(),
            profileUrl: postedUser.getField(opensocial.Person.Field.PROFILE_URL),
            avatarUrl: postedUser.getField(opensocial.Person.Field.THUMBNAIL_URL),
            postedTime: osActivity.getField(opensocial.Activity.Field.POSTED_TIME)
          };
          debug.info('osViewerFriendsActivities:');
          debug.debug(osViewerFriendsActivities);
          var activity = new Activity(params);
          viewerFriendsActivities.push(activity);
        });
        $.merge(exoActivities, viewerFriendsActivities);
        debug.info('final exoActivities:');
        debug.debug(exoActivities);
        successCallback();
      });
    });

  }


  /**
   * Gets the selected type.
   */
  ActivityStream.getSelectedType = function() {
    return selectedType;
  };


  /**
   * Sets the selected type.
   * @param type
   */
  ActivityStream.setSelectedType = function(type) {
    selectedType = type;
  };


  /**
   * Gets the latest number of activities.
   *
   */
  ActivityStream.getActivities = function() {
    debug.debug('getActivities: ' + selectedType);
    if (selectedType === ActivityStream.Type.UNIFIED) {
      unifiedActivities = [];
      $.merge(unifiedActivities, exoActivities);
      $.merge(unifiedActivities, twitterActivities);
      Util.sortActivities(unifiedActivities);
      return unifiedActivities;

    } else if (selectedType === ActivityStream.Type.EXO_PLATFORM) {
      Util.sortActivities(exoActivities);
      return exoActivities; //TODO only return ~ 20 activities/ page
    } else if (selectedType === ActivityStream.Type.TWITTER) {
      return twitterActivities;
    } else if (selectedType === ActivityStream.Type.CONNECTIONS) {
      Util.sortActivities(viewerFriendsActivities);
      return viewerFriendsActivities;
    } else if (selectedType === ActivityStream.Type.ME) {
      Util.sortActivities(viewerActivities);
      return viewerActivities;
    }
    return [];
  };

  /**
   * Returns number of newer activities on the selected stream.
   *
   * If no newer activities found, return 0.
   * If yes, return the number of older activities.
   */
  ActivityStream.hasNewer = function() {
    //TODO implements this
    return false;
  };


  /**
   * Adds a newer handle to be called when newer activities are created.
   *
   * For example:
   *
   * ActivityStream.addNewerHandler(function(activities) {
   *  //
   * });
   *
   *
   * @param callback
   */
  ActivityStream.onNewerHandler = function(callback) {
    //TODO implements this
  };

  /**
   * Returns number of older activities on the selected stream.
   *
   * If no older activities found, return 0.
   * If yes, return the number of older activities.
   */
  ActivityStream.hasOlder = function() {
    //TODO implements this
    return false;
  };

  /**
   * Gets older activities based on a specified activity, the count is optional. If no count is specified,
   * use default value from service provider.
   *
   *
   * @param count
   */
  ActivityStream.getOlder = function(count) {
    //TODO implements this
  };

  /**
   * Gets newer activities based on a specified activity, the count is optional.
   *
   * @param count
   */
  ActivityStream.getNewer = function(count) {
    //TODO implements this
  };


  // exposes
  window_.ActivityStream = ActivityStream;
})(jQuery);