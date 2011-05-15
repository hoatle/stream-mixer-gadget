/**
 * The activity stream to put/get activities, load more, load newer.
 *
 */


(function() {
  var window_ = this,
      selectedType,
      successCallback,
      failCallback,
      unifiedActivities = [], newerUnifiedActivities = [], olderUnifiedActivities = [],
      exoActivities = [], newerExoActivities = [], olderExoActivities = [],
      twitterActivities = [], newerTwitterActivities = [], olderTwitterActivities = [],
      facebookActivities = [], newerFacebookActivities = [], olderFacebookActivities = [];


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
    LINKEDIN     : 'linkedin'
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
    if (!params) {
      params = {};
    }
    selectedType = params.selectedType || ActivityStream.Type.UNIFIED;
    successCallback = params.onSuccess;
    failCallback = params.onFail;
  };

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
   * If count == null or 0, the default value will be used (Configuration.getNumberOfActivitiesEachFetch()).
   *
   * @param count
   */
  ActivityStream.getActivities = function(count) {
    if (selectedType === ActivityStream.Type.UNIFIED) {

    } else if (selectedType === ActivityStream.Type.EXO_PLATFORM) {
      exoActivities = getExoActivities(count);
    }
  };

  /**
   * Returns number of newer activities on the selected stream.
   *
   * If no newer activities found, return 0.
   * If yes, return the number of older activities.
   */
  ActivityStream.hasNewer = function() {
    //TODO implements this
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



  function getExoActivities(count) {
    var count = count || 20;

  };

  function putActivity(newActivity) {
    //TODO implements this
  };

  function removeActivity(existingActivity) {
    //TODO implements this
  };


  // exposes
  window_.ActivityStream = ActivityStream;
})();