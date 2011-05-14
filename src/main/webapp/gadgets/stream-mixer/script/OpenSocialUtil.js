/**
 * OpenSocialUtil class
 */

(function() {
  var window_ = this;

  function OpenSocialUtil() {

  }

  /**
   * Gets owner activities based on the params.
   *
   * For example:
   *
   * var params = {
   *   firstIndex: 3, //default: 0
   *   max: 30, //default 20
   * };
   *
   * @static
   */
  OpenSocialUtil.getActivities = function(params) {
    if (!params) {
      params = {};
    }
    var req = opensocial.newDataRequest();
    var opts_params = {};
    opts_params[opensocial.DataRequest.ActivityRequestFields.FIRST] = params.firstIndex || 0;
    opts_params[opensocial.DataRequest.ActivityRequestFields.MAX] = params.max || 20;
    var ownerActivitiesSpec = opensocial.newIdSpec({'userId': 'OWNER'});
    req.add(req.newFetchActivitiesRequest(ownerActivitiesSpec, opts_params), 'ownerActivities');
    req.send(function(res) {
      if (res.hadError()) {

      }
      return
    });
  };


  //expose:
  window_.OpenSocialUtil = OpenSocialUtil;
})();