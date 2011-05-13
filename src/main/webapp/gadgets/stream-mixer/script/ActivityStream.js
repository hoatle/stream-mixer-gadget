/**
 * The activity stream to put/get activities, load more, load newer.
 *
 */


(function() {
  var window_ = this, activities = [], newerActivities = [], olderActivity = [];

  /**
   * Constructor.
   *
   * @param params
   */
  function ActivityStream(params) {
    this.init(params);
  }

  //Enum constants for activity stream type
  ActivityStream.Type = {
    UNIFIED : 'unified',
    EXO     : 'exo',
    TWITTER : 'twitter'
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

  ActivityStream.prototype.hasNewerActivities = function() {
    //TODO implements this
  }

  ActivityStream.prototype.hasOlderActivities = function() {
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