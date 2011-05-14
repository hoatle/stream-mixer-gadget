(function($) {
  $(document).ready(function() {
    module('AccountManagerTest');

    test('check AccountManager class', function() {
      ok(AccountManager, 'AccountManager must be defined.');
    });

    test('check add Account to AccountManager', function() {
      AccountManager.addAccount(AccountManager.Type.TWITTER, {
        username: 'fake',
        passwork: 'fake'
      });

      var account = AccountManager.getAccount(AccountManager.Type.TWITTER);
      equal(account.username, 'fake', 'account.username must be "fake"');
      equal(account.passwork, 'fake', 'account.password must be "fake"');
    });

    test('check authenticate', function() {
      ok(true); //TODO
    })
  });
})(jQuery);