/**
 * The utility class:
 * - Convert timestamp to pretty name
 *
 * - Requires: Locale
 */

(function() {
  var window_ = this;

  /**
   * Constructor class.
   */
  function Util() {

  }

  /**
   * Converts timestamp to pretty time
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

    if (time < 60) {
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
   * @param activities
   */
  Util.sortActivities = function(activities) {
    activities.sort(function(act1, act2) {
      return act1.postedTime - act2.postedTime;
    });
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
