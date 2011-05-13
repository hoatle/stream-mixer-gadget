/**
 * The main entry point for application
 */
(function($) {
  $(document).ready(function() {
		$("#statusForm").show();
		$("#Activities").show();
		var activityStream = new ActivityStream();
		
//		Util.renderActivity(activityStream.getActivities());
		Util.renderActivity(data);
		var activityComposerParam = { 
			"textboxID" : "statusTxt" , "textboxID":"UpdateStatusButton","textboxID": "postToTwitter",
			onSuccess: function(){
				
			},
			onSuccess: function(){
			}
		};
		var activityComposer = new ActivityComposer(activityComposerParam); 
  });
})(jQuery);