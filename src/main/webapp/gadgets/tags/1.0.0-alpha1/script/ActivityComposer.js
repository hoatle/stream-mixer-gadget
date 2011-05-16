/**
 * The composer to post activity
 */

(function($) {
  var window_ = this;

  /**
   * Constructor
   *
   * For example:
   *
   * var params = {
   *   componentIds: {
   *    textBoxId: '',
   *    shareButtonId: '',
   *    twitterCheckBoxId: '',
   *   },
   *   callback: {
   *     onSuccess: function() {
   *
   *     },
   *     onFail: function() {
   *
   *     }
   *   }
   * };
   *
   * @param $params
   */
  function ActivityComposer(params) {
    this.init(params);
  }

  /**
   * Inits.
   *
   * @param params
   */
  ActivityComposer.prototype.init = function(params) {
    this.textBoxId = params.componentIds.textBoxId;
    this.shareButtonId = params.componentIds.shareButtonId;
    this.twitterCheckBoxId = params.componentIds.twitterCheckBoxId;
    this.onSuccessCallback = params.callback.onSuccess;
    this.onFailCallback = params.callback.onFail;
  };

  //exposes
  window_.ActivityComposer = ActivityComposer;
})(jQuery);
