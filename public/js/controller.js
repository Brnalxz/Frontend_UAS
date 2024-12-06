angular.module("mainApp", []).controller("MainController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.loginData = {};
    $scope.signupData = {};
    $scope.isLoggedIn = false;
    // Login function
    $scope.submitLogin = function () {
      if ($scope.loginData.email && $scope.loginData.password) {
        $http
          .post("/auth/login", $scope.loginData)
          .then(function (response) {
            alert("Login Successful!");
            $scope.isLoggedIn = true;
          })
          .catch(function (error) {
            alert("Login Failed: " + error);
          });
      } else {
        alert("Please enter email and password!");
      }
    };

    // Signup function
    $scope.submitSignup = function () {
      if (
        $scope.signupData.username &&
        $scope.signupData.email &&
        $scope.signupData.password
      ) {
        $http
          .post("/auth/signup", $scope.signupData)
          .then(function (response) {
            alert("Sign Up Successful!");
          })
          .catch(function (error) {
            alert("Sign Up Failed: " + error.data.message);
          });
      } else {
        alert("All fields are required!");
      }
    };
    $scope.logout = function () {
      $http
        .post("/auth/logout")
        .then(function (response) {
          alert("Logout Successful!");
          $scope.isLoggedIn = false;
        })
        .catch(function (error) {
          alert("Logout Failed: " + error.data.message);
        });
    };
  },
]);
