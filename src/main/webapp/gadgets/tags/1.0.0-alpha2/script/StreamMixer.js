/**
 * The main entry point for application
 */
(function($) {

  $('progressbar').progressbar({
    value: 10
  });

  $(document).ready(function() {

    $('progressbar').progressbar({
      value: 15
    });

    $("#ActivityContent").show();

    ActivityStream.configure({
      selectedType: ActivityStream.Type.EXO_PLATFORM,
      onSuccess: function() {
        debug.info('onSuccess with activities:');
        debug.info(ActivityStream.getActivities());
        Util.renderActivity(ActivityStream.getActivities());
      },
      onFail: function(msg) {
        debug.error(msg);
      }
    });

    var activityComposerParam = {
      componentIds : {"textBoxId" : "statusTxt" , "shareButtonId":"UpdateStatusButton","twitterCheckBoxId": "postToTwitter"},
      callback : {
        onSuccess: function() {

        },
        onSuccess: function() {
        }
      }
    };

    var activityComposer = new ActivityComposer(activityComposerParam);
    $.each(AccountManager.Type, function(index, value) {
      if (AccountManager.canDisplayAddAccountForm(value)) {
        $("#LoginForm > #socialLogo").attr("src", "style/images/" + value + "_big.jpeg");
        $("#LoginForm > #socialLogo").attr("title", "value");
        $("#ActivityContent").hide();
        $("#LoginForm").show();
      }
    });

    $("#postToTwitter").change(function() {
      if ($(this).attr('checked')) {
        if ((AccountManager.getAccount("twitter") == undefined) || (!AccountManager.isAuthenticated("twitter"))) {
          $(this).attr('checked', false);
          $("#LoginForm > #socialLogo").attr("src", "style/images/twitter_big.jpeg");
          $("#LoginForm > #socialLogo").attr("title", "twitter");
          $("#LoginForm").show();
          $("#ActivityContent").hide();
        }
      }
    });

    $("#LoginForm input[type=button]").click(function() {
      var parent = $(this).parent();
      var accountType = $("img", parent).attr("title");
      var userName = $("#userName", parent).val();
      $("#userName", parent).val("");
      var passWord = $("#passWord", parent).val();
      $("#passWord", parent).val("");
      AccountManager.addAccount(accountType, {
        'username': userName,
        'password': passWord
      }
              );

      AccountManager.authenticate(AccountManager.Type.TWITTER, {
        'onSuccess': function() {
          $("#LoginForm").hide();
          $("#ActivityContent").show();
        },
        'onFail': function() {
          $("#dialog").dialog();
          $("#LoginForm").hide();
          $("#ActivityContent").show();
        }
      })
      gadgets.window.adjustHeight();
    })
  });
})(jQuery);