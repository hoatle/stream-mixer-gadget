/*
 * Activity class to hold data structure of activities
 */

(function() {
  var window_ = this;

  /**
   * Constructor
   * @param params
   * For example:
   *
   * var params = {
   *  type: 'exo',
   *  content: 'hello world',
   *  displayName: 'demo',
   *  profileUrl: 'http://int.exoplatform.org/profile/demo',
   *  avatarUrl: 'http://int.exoplatform.com/profile/avatar/abc.jpg',
   *  postedTime: '123456789'
   * };
   * var activity = new Activity(params);
   */
  function Activity(params) {
    this.init(params);

    //Getters, Setters
    Activity.prototype.getType = function() {
      return this.type;
    }

    Activity.prototype.setType = function(activityType) {
      this.type = activityType;
    }

    Activity.prototype.getContent = function() {
      return this.content;
    }

    Activity.prototype.setContent = function(activityContent) {
      this.content = activityContent;
    }

    Activity.prototype.getDisplayName = function() {
      return this.displayName;
    }

    Activity.prototype.setDisplayName = function(userDisplayName) {
      this.displayName = userDisplayName;
    }

    Activity.prototype.getProfileUrl = function() {
      return this.profileUrl;
    }

    Activity.prototype.setProfileUrl = function(userProfileUrl) {
      this.profileUrl = userProfileUrl;
    }

    Activity.prototype.getAvatarUrl = function() {
      return this.avatarUrl;
    }
    Activity.prototype.setAvatarUrl = function(userAvatarUrl) {
      this.avatarUrl = userAvatarUrl;
    }

    Activity.prototype.getPostedTime = function() {
      return this.postedTime;
    }

    Activity.prototype.setPostedTime = function(activityPostedTime) {
      this.postedTime = activityPostedTime;
    }

    Activity.prototype.getPrettyTime = function() {
      return this.prettyTime;
    }

    Activity.prototype.setPrettyTime = function(activityPrettyTime) {
      this.prettyTime = activityPrettyTime;
    }

    Activity.prototype.getAppIcon = function() {
      return this.appIcon;
    }

    Activity.prototype.setAppIcon = function(activityAppIcon) {
      this.appIcon = activityAppIcon;
    }
  }

  //enum constants for activity type
  Activity.Type = {
    TWITTER      : 'twitter',
    EXO_PLATFORM : 'exo',
    FACEBOOK     : 'facebook',
    LINKEDIN     : 'linkedin'
  };

  Activity.prototype.init = function(params) {
    this.type = params.type;
    this.content = params.content;
    this.displayName = params.displayName;
    this.profileUrl = params.profileUrl;
    this.avatarUrl = params.avatarUrl;
    this.postedTime = params.postedTime;
    this.prettyTime = getPrettyTime(params.postedTime);
    this.appIcon    = getAppIcon(params.type);
  };


  /**
   * Gets pretty time from timestamp.
   *
   * @param postedTimeStamp
   */
  function getPrettyTime(postedTimeStamp) {
    return Util.getPrettyTime(new Date(postedTimeStamp));
  };

  /**
   * Gets url of app icon image from activity type.
   *
   * @param activityType
   */
  function getAppIcon(activityType) {
    //TODO implement this
  };

  //exposes
  window_.Activity = Activity;
})();

