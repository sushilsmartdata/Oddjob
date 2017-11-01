// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('oddJobs', ['ionic', 'ngCordova', 'oddJobs.controllers', 'oddJobs.routes', 'oddJobs.services', 'ionic.rating', 'ngSanitize', 'btford.socket-io'])

.run(function($ionicPlatform, $state, $rootScope,$location, $timeout,$rootScope, $cordovaNetwork, $cordovaToast, socket, $cordovaGeolocation, $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    if (window.cordova && window.cordova.plugins.Keyboard) {

      if (ionic.Platform.isAndroid()) {
        cordova.plugins.Keyboard.disableScroll(true);
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      } else {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        cordova.plugins.Keyboard.disableScroll(false);
      }

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // HANDLING LOCATION
    var isAndroid = ionic.Platform.isAndroid();
    var isIOS = ionic.Platform.isIOS();
    console.log(isAndroid)
    if (isAndroid) {
      //console.log("@@@@")

      screen.lockOrientation('portrait');
      var locationChecker = function() {
         $timeout(function() {
          $cordovaGeolocation
            .getCurrentPosition(POS_OPTIONS)
            .then(function(position) {

              window.localStorage['userlatitude'] = position.coords.latitude;
              window.localStorage['userlongitude'] = position.coords.longitude;
              // alert(position.coords.latitude +''+position.coords.longitude)

            }, function(err) {
              console.log('err: ', err)
              $ionicPopup.show({
                template: '',
                title: 'Need Your Location',
                subTitle: 'OddJob would like to access your location.',
                buttons: [{
                  text: 'Turn On',
                  type: 'button-balanced',
                  onTap: function(e) {
                    cordova.plugins.diagnostic.switchToLocationSettings();
                  }
                }]
              });
            });

          cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {
            console.log("Location setting is " + (enabled ? "enabled" : "disabled"));
          }, function(error) {
            console.error("The following error occurred: " + error);
          });

        }, 2000);
      }

      cordova.plugins.diagnostic.requestLocationAuthorization(function(status) {
        switch (status) {
          case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
            console.log("Permission not requested");
            locationChecker()
            break;
          case cordova.plugins.diagnostic.permissionStatus.GRANTED:
            console.log("Permission granted");
            locationChecker()
            break;
          case cordova.plugins.diagnostic.permissionStatus.DENIED:
            console.log("Permission denied");
             locationChecker()
            break;
          case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
            console.log("Permission permanently denied");
             locationChecker()
            break;
        }
      }, function(error) {
        console.error(error);
      });

    }
    cordova.plugins.diagnostic.requestMicrophoneAuthorization(function(status) {

      switch (status) {
        case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
          console.log("Permission not requested Micro");
          // locationChecker()
          break;
        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
          console.log("Permission granted Micro");
          //locationChecker()
          break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED:
          console.log("Permission denied Micro");
          // locationChecker()
          break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
          console.log("Permission permanently denied Micro");
          // locationChecker()
          break;
      }

    }, function(error) {
      console.error("The following error occurred: " + error);
    });


    $ionicPlatform.registerBackButtonAction(function(event) {
      //console.log(localStorage.getItem('localdata'));
      ///console.log($state.current.name);
      if (localStorage.getItem('localdata') != null || $state.current.name == "signin" || $state.current.name == "app.home") {

        //navigator.app.exitApp();   
        var confirmPopup = $ionicPopup.confirm({
          title: 'Warning!',
          template: 'Are you sure you want to exit?'
        });
        confirmPopup.then(function(res) {
          if (res) {
            navigator.app.exitApp();
          } else {
            console.log('You are not sure');
          }
        });
      } else {
        navigator.app.backHistory();
      }
    }, 100);

    $ionicPlatform.on('offline', function() {

      console.log("exit");
      socket.emit('forceDisconnect');

    });
    var myPopup;
    // Check for network connection
    var CheckInternetConnection = function() {
      if (window.Connection) {
        if (navigator.connection.type == Connection.NONE) {
          myPopup = $ionicPopup.alert({
            title: 'Warning!',
            template: 'Sorry, no internet connection detected. Please reconnect and try again.',
            buttons: [{
              text: '<b>OK</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (ionic.Platform.isIOS()) {
                  if (navigator.connection.type == Connection.NONE) {
                    $cordovaToast.showLongBottom('Connect to your internet connection first.');
                    e.preventDefault();
                  }
                }
                if (ionic.Platform.isAndroid()) {
                  if (navigator.connection.type == Connection.NONE) {
                    $cordovaToast.showLongBottom('Connect to your internet connection first.');
                    e.preventDefault();
                  }
                }
              }
            }]
          });
        }
      }
    }
    CheckInternetConnection();

    $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
      $cordovaToast.showLongBottom('Connected successfully.');
      if (myPopup) {
        myPopup.close();
      }
      //$state.go($state.current, {}, {reload: true});
    })
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
      CheckInternetConnection();
    })

    // PUSH NOTIFICATIONS CONFIGURATION

    var push = PushNotification.init({
      "android": {
        "senderID": SENDER_ID
      },
      "ios": {
        "alert": "true",
        "badge": "false",
        "sound": "true"
      },
      "windows": {}
    });

    push.on('registration', function(data) {
      //alert('data.registrationId: '+data.registrationId);
      console.log(ionic.Platform.device().platform)
      window.localStorage['deviceId'] = data.registrationId;
      var d = new Date();
      window.localStorage['PLATFORM'] = ionic.Platform.device().platform;
      window.localStorage['TimeZone'] = d.getTimezoneOffset();

    });

    push.on('notification', function(data) {
      //alert(JSON.stringify(data.additionalData.foreground))
      //alert(JSON.stringify(data.additionalData.Route))
     // localStorage.setItem('notificationPath', data.additionalData.Route); 

      //$rootScope.$broadcast("notificationPath", data.additionalData.Route);
      //alert(localStorage.getItem("notificationPath"))

      // $rootScope.$broadcast("notificationPath", data.additionalData.Route);
      //0-New Job,1-Offers,2-Message
      if(data.additionalData.Route=="0" && data.additionalData.foreground==false){
         $state.go('app.postlist');  
      }
      if(data.additionalData.Route=="1" && data.additionalData.foreground==false){
        $state.go('app.myjob')
    
      }
      if(data.additionalData.Route=="2" && data.additionalData.foreground==false){
       
          $state.go('app.messages');
        
      }
      if(data.additionalData.Route=="4" && data.additionalData.foreground==false){
          $state.go('app.review', {
          "userId": data.additionalData.userId
       });
      }
    });

    push.on('error', function(e) {
      // e.message
    });

  });

})
