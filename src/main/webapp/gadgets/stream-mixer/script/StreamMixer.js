/**
 * The main entry point for application
 */
(function($) {
  $(document).ready(function() {
		$("#ActivityContent").show();

		var activityStream = new ActivityStream();
		
		Util.renderActivity(activityStream.getActivities(10));
		var activityComposerParam = { 
			componentIds : {"textBoxId" : "statusTxt" , "shareButtonId":"UpdateStatusButton","twitterCheckBoxId": "postToTwitter"},
			callback : {
				onSuccess: function(){
					//TODO process on post Success
				},
				onFail : function(){
					//TODO process on post Success
				}
			}
		};

		var activityComposer = new ActivityComposer(activityComposerParam);
		$.each(AccountManager.Type, function(index,value){
			if(AccountManager.canDisplayAddAccountForm(value)){
				$("#LoginForm > #socialLogo").attr("src","style/images/"+value+"_big.jpeg");
				$("#LoginForm > #socialLogo").attr("title","value");
				$("#ActivityContent").hide();
				$("#LoginForm").show();
			}
		});
		
		$("#postToTwitter").change(function(){
			if($(this).attr('checked')){
				if( (AccountManager.getAccount("twitter")==undefined) ||  (!AccountManager.isAuthenticated("twitter"))){
					$(this).attr('checked',false);
					$("#LoginForm > #socialLogo").attr("src","style/images/twitter_big.jpeg");
					$("#LoginForm > #socialLogo").attr("title","twitter");
					$("#LoginForm").show();
					$("#ActivityContent").hide();
				}
			}
		});
		
		$("#LoginForm input[type=button]").click(function(){
			var parent = $(this).parent();
			var accountType = $("img", parent).attr("title");
			var userName = $("#userName", parent).val();
			$("#userName", parent).val("");
			var passWord = $("#passWord", parent).val();
			$("#passWord", parent).val("");
			AccountManager.addAccount(accountType,{ 
													'username': userName,
													'password': passWord
													}				
			)
			AccountManager.authenticate(AccountManager.Type.TWITTER,{
				onSuccess: function() {
					$("#LoginForm").hide();
					$("#ActivityContent").show();					
				},
				onFail: function() {
					$("#dialog").dialog();
					$("#LoginForm").hide();
					$("#ActivityContent").show();
				}
			})
			
		})
		var statusInput = $("#statusTxt");
		$(statusInput).css("color","#CCCCCC");		
		$(statusInput).focus(function(){
			if($(this).css("color")=="rgb(204, 204, 204)"){
				$(this).val("");
				$(this).css("color","black");
			}
		});
		$(statusInput).blur(function(){
			if($(this).val()==""){
				$(this).val("Default Text");
				$(this).css("color","#CCCCCC");
			}
		});
		
		$("#moreButton").click(function(){
		   if(activityStream.hasNewer()){
			   Util.renderActivity(activityStream.getActivities(10));
		   }
		});
		
//		$("#LoginForm").show();
//		$("#ActivityContent").hide();
  });
})(jQuery);