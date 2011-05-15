/**
 * The utility class:
 * - Convert timestamp to pretty name
 *
 * depends on:
 * jQuery
 * Locale.js
 */

(function() {
  var window_ = this;

  /**
   * Constructor class.
   */
  function Util() {

  }

  /**
   * Converts a date object to pretty time.
   * Use resource bundle
   * //TODO about (?) days ago?
   * @param  date Number
   * @static
   */
  Util.getPrettyTime = function(date) {
    var getPostedDate = function(date) {
      var dayNames = ["sunday", "monday", "tuesday",
        "wednesday", "thursday", "friday", "saturday"];

      var monthNames = ["january", "february", "march",
        "april", "may", "june", "july", "august", "september",
        "october", "november", "december"];
      for (var i = 0, l = dayNames.length; i < l; i++) {
        dayNames[i] = Locale.getMsg(dayNames[i]);
      }

      for (var i = 0, l = monthNames.length; i < l; i++) {
        monthNames[i] = Locale.getMsg(monthNames[i]);
      }

      var currentMonth = date.getMonth();
      var currentYear = date.getFullYear();
      var currentDay = date.getDay();
      var currentDate = date.getDate();
      var ap = "";
      var currentHour = date.getHours();

      if (currentHour < 12) {
        ap = Locale.getMsg('am');
      }
      else {
        ap = Locale.getMsg('pm');
      }
      if (currentHour === 0) {
        currentHour = 12;
      }
      if (currentHour > 12) {
        currentHour = currentHour - 12;
      }

      var currentMin = date.getMinutes();

      currentMin = currentMin + "";

      if (currentMin.length === 1) {
        currentMin = "0" + currentMin;
      }
      return Locale.getMsg('day_date_month_year_at_hour_min_ap',
              [dayNames[currentDay], currentDate, monthNames[currentMonth], currentYear, currentHour, currentMin, ap]);
    }

    if (isNaN(date)) {
      return Locale.getMsg('an_undetermined_amount_of_time_ago');
    }

    time = (new Date().getTime() - date.getTime()) / 1000;

    if (time < 30) {
      return Locale.getMsg('just_now');
    } else if (time < 60) {
      return Locale.getMsg('less_than_a_minute_ago');
    } else {
      if (time < 120) {
        return Locale.getMsg('about_a_minute_ago');
      } else {
        if (time < 3600) {
          var mins = Math.round(time / 60);
          return Locale.getMsg('about_0_minutes_ago', [mins]);
        } else {
          if (time < 7200) {
            return Locale.getMsg('about_an_hour_ago');
          } else {
            if (time < 86400) {
              var hours = Math.round(time / 3600);
              return Locale.getMsg('about_0_hours_ago', [hours]);
            } else {
              return '' + getPostedDate(date);
            }
          }
        }
      }
    }

  };


  /**
   * Sorts activities based on its postedTime.
   *
   * @param activities
   */
  Util.sortActivities = function(activities) {
    activities.sort(function(act1, act2) {
      return act2.postedTime - act1.postedTime;
    });
  };

  /**
   * Gets activities.
   *
   * For example:
   *
   * var params = {
   *   first: 3,
   *   max: 25,
   *   userId: opensocial.IdSpec.PersonId.VIEWER,
   *   groupId: opensocial.IdSpec.GroupId.FRIENDS,
   *   key: 'activities'
   * };
   *
   * Util.getActivities(params, function(response) {
   *    if (!response.hadError()) {
   *      var activities = response.get('activities');
   *    }
   * });
   *
   * @param params
   */
  Util.getActivities = function(params, callback) {
    if (!params) {
      params = {};
    }
    if (!callback || !jQuery.isFunction(callback)) {
      log.error('callback is not specified or not a function!');
      return;
    }
    var first = params.first || 0;
    var max = params.max || Configuration.getNumberOfActivitiesEachFetch();
    var userId = params.userId || opensocial.IdSpec.PersonId.VIEWER;
    var groupId = params.groupId || opensocial.IdSpec.GroupId.SELF;
    var key = params.key || 'activities';
    var req = opensocial.newDataRequest();
    var opts_act = {};
    opts_act[opensocial.DataRequest.ActivityRequestFields.FIRST] = first;
    opts_act[opensocial.DataRequest.ActivityRequestFields.MAX] = max;
    var idSpec = opensocial.newIdSpec({'userId': userId, 'groupId': groupId});
    req.add(req.newFetchActivitiesRequest(idSpec, opts_act), key);
    req.send(callback);
  };

  /**
   * Adds activity for displaying.
   *
   * @param activity
   */
  Util.addActivity = function(activity) {
    var newTemplate = $("#Activitytemplate").clone();

    newTemplate.attr("id", "Activity");
    $("#avatarIcon", newTemplate).attr("src", activity.avatar);
    $("#activityIcon", newTemplate).attr("src", activity.appIcon);
    $("#displayName", newTemplate).html(activity.displayName);
    $("#content", newTemplate).html(activity.content);
    $("#postedDay", newTemplate).html(activity.prettyTime);

    $("#Activities").append(newTemplate);
    newTemplate.show();
  };

  /**
   * Sends the array of Activity objects to be rendered.
   *
   * @param activities
   */
  Util.renderActivity = function(activities) {
    $.each(activities, function(index, value) {
      Util.addActivity(value);
    });
  };

  //exposes
  window_.Util = Util;
})();
