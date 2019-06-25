var mainApp = angular.module("mainApp", []);
         
         mainApp.controller('userController', function($scope) {
            $scope.user = {
               firstName: "",
               lastName: "",
               address: "",
               email: "",
               phone:"",
               userFullName: function() {
                  var userObject;
                  userObject = $scope.user;
                  return userObject.firstName + " " + userObject.lastName;
               },
               userAddress: function() {
                  var userObject;
                  userObject = $scope.user;
                  return userObject.address;
               },
               userEmail: function() {
                  var userObject;
                  userObject = $scope.user;
                  return userObject.email;
               },
               userPhone: function() {
                  var userObject;
                  userObject = $scope.user;
                  return userObject.phone;
               }
            };
         });