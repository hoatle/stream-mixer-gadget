/**
 * The activity stream to put/get activities, load more, load newer.
 *
 */


(function() {
  var window_ = this,
      unifiedActivities = [], newerUnifiedActivities = [], olderUnifiedActivities = [],
      exoActivities = [], newerExoActivities = [], olderExoActivities = [],
      twitterActivities = [], newerTwitterActivities = [], olderTwitterActivities = [],
      facebookActivities = [], newerFacebookActivities = [], olderFacebookActivities = [];


  /**
   * Constructor.
   *
   * For example:
   *
   * var params = {
   *   selectedType: ActivityStream.Type.UNIFIED, //this is default value
   *   callback: {
   *     //when init successfully
   *     onSuccess: function() {
   *
   *     },
   *     //when init failed
   *     onFail: function() {
   *
   *     }
   *   }
   * };
   *
   * @param params
   */
  function ActivityStream(params) {
    this.init(params);
  }

  //Enum constants for activity stream type
  ActivityStream.Type = {
    UNIFIED      : 'unified',
    EXO_PLATFORM : 'exo',
    TWITTER      : 'twitter',
    FACEBOOK     : 'facebook',
    LINKEDIN     : 'linkedin'
  }

  /**
   * Inits, gets activities, try to lazy loading.
   *
   * @param params
   */
  ActivityStream.prototype.init = function(params) {
    this.selectedType = params.selectedType || ActivityStream.Type.UNIFIED;
    this.successCallback = params.onSuccess;
    this.failCallback = params.onFail;
  };

  ActivityStream.prototype.getSelectedType = function() {
    return this.selectedType;
  };


  ActivityStream.prototype.setSelectedType = function(type) {
    this.selectedType = type;
  }


  ActivityStream.prototype.getActivities = function() {
    return this.activities;
  }

  ActivityStream.prototype.putActivity = function(newActivity) {
    //TODO implements this
  }

  ActivityStream.prototype.removeActivity = function(newActivity) {
    //TODO implements this
  }

  ActivityStream.prototype.hasNewer = function() {
    //TODO implements this
  }

  ActivityStream.prototype.hasOlder = function() {
    //TODO implements this
  }

  /**
   * Gets older activities based on a specified activity, the count is optional. If no count is specified,
   * use default value
   * from service provider.
   *
   * For example:
   *
   * var params = {
   *   baseActivity: activity,
   *   count: 20
   * };
   *
   * @param params
   */
  ActivityStream.prototype.getOlder = function(params) {
    //TODO implements this
  }

  /**
   * Gets newer activities based on a specified activity, the count is optional.
   *
   * For example:
   *
   * var params = {
   *   baseActivity: activity,
   *   count: 20
   * }
   *
   * @param params
   */
  ActivityStream.prototype.getNewer = function(params) {
    //TODO implements this
  }


  // exposes
  window_.ActivityStream = ActivityStream;
})();