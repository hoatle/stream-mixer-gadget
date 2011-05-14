/**
 * The main entry point for application
 */
(function($) {
  $(document).ready(function() {
		$("#ActivityContent").show();
		$("#Activities").show();
		var activityStream = new ActivityStream();
		
//		Util.renderActivity(activityStream.getActivities());
		Util.renderActivity(data);
		var activityComposerParam = { 
			componentIds : {"textBoxId" : "statusTxt" , "shareButtonId":"UpdateStatusButton","twitterCheckBoxId": "postToTwitter"},
			callback : {
				onSuccess: function(){
					
				},
				onSuccess: function(){
				}
			}
		};
		var socialAvailable = ["twitter"];
		var activityComposer = new ActivityComposer(activityComposerParam);
		$.each(socialAvailable, function(index,value){
			if(AccountManager.canDisplayAddAccountForm("twitter")){
				$("#LoginForm > div > #socialLogo").attr("src","style/images/"+value+"_big.jpeg");
				$("#ActivityContent").hide();
				$("#LoginForm").show();
			}
		});
  });
})(jQuery);