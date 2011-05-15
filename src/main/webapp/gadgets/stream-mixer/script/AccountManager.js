/*
 * The account manager for authenticating and authorization purpose
 */

(function() {
  var window_ = this;

  var accounts = {};

  /**
   * Constructor.
   */
  function AccountManager() {

  };

  AccountManager.Type = {
    TWITTER: 'twitter'//currently only twitter for basic authentication, later must use 0Auth
  };


  /**
   * Adds a count by type.
   *
   * For example:
   *
   * AccountManager.addAccount(AccountManager.Type.TWITTER, {
   *   username: '',
   *   password: ''
   * });
   *
   * @param type
   * @param account
   */
  AccountManager.addAccount = function(type, account) {
    accounts[type] = account;
  };

  /**
   * Gets a count by type.
   *
   * For example:
   *
   * var acc = AccountManager.getAccount(AccountManager.Type.TWITTER);
   *
   * @param type
   * @static
   */
  AccountManager.getAccount = function(type) {
    return accounts[type];
  };

  /**
   * Authenticate an account with the service provider.
   *
   * For example:
   *
   * var params = {
   *   type: AccountManager.Type.TWITTER,
   *   onSuccess: function() {
   *
   *   },
   *   onFail: function() {
   *
   *   }
   * };
   *
   * AccountManager.authenticate(params);
   *
   *
   * If ok, saves this account info to user prefs.
   *
   * @param params
   */
  AccountManager.authenticate = function(params) {
    //TODO implements this
  };

  /**
   * Checks if an account is authenticated with service provider or not.
   *
   * @param type
   */
  AccountManager.isAuthenticated = function(type) {
    //TODO implements this
  };

  /**
   * Checks if an account form should be displayed for user to add account base on the type.
   *
   * For example:
   *
   * if (AccountManager.canDisplayAddAccountForm(AccountManager.Type.TWITTER) {
   *   //show form to display
   * } else {
   *  //do something else?
   * }
   *
   * @param type
   */
  AccountManager.canDisplayAddAccountForm = function(type) {
    //TODO implements this
  };

  //expose
  window_.AccountManager = AccountManager;
})();