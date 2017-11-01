angular.module("google.places", []);

angular.module('oddJobs.controllers', ['ionic', 'ngAnimate','jrCrop', 'ngCordova', 'ngMask', 'google.places', 'angucomplete', 'ngCordovaOauth'])
  /* App Controller */
  .controller('AppCtrl', function($scope, $state, socket,$ionicLoading, $ionicModal, LoginService, $cordovaInAppBrowser,$cordovaContacts, $cordovaSocialSharing, $ionicSideMenuDelegate, $rootScope, $location, LocationService) {
    
    $scope.profileImagePath = PROFILE_IMAGE;
    $scope.profileCoverImagePath = PROFILE_COVER_IMAGE;
    $scope.skillImagePath = SKILL_IMAGE;
    $scope.skillCoverImagePath = SKILL_COVER_IMAGE;
    $scope.skillIconImagePath = SKILL_ICON_IMAGE;

    $scope.jobImagePath = JOB_IMAGE;
    $scope.jobOriginalImagePath = JOB_ORIGINAL_IMAGE;
   //var socket = io("http://52.39.212.226:4028");

    $scope.getAllReviews=function(userId){
      $state.go('app.review', {
        "userId": userId
      })
    }
    $scope.jobhistory=function(){
     
     $state.go('app.myjoblist', {
        "userId":$scope.userInformation._id,
        "type":3
      })

    }  

    $scope.$on('$ionicView.beforeEnter', function() {
      $scope.uSkill=false
    });

    $scope.$on('notificationPath', function(event, data) {
           alert(JSON.stringify(data))
          localStorage.setItem('notificationData', data);
          $state.go('signin')
    });

    $scope.uSkill=false
    $scope.profileTitle="Profile"
    $scope.urSkill=function(){
     $scope.uSkill=true
     $scope.profileTitle="Your Skills"
    }

    $scope.upSkill=function(){
     $scope.uSkill=false
     $scope.profileTitle="Profile"
    }

    $ionicLoading.hide();   
    $scope.helpPage = function() {
        var options = {
        location: 'no',
        closebuttoncaption:'Back'
     };

    $ionicLoading.show();
    $cordovaInAppBrowser.open(HELP_PAGE, '_blank',options)
        .then(function(event) {
          $ionicLoading.hide();
        })
        .catch(function(event) {
         //alert('error: ' + event.url)
        });
    }

    $scope.termPage = function() {
      $ionicLoading.show();
      var options = {
      location: 'no',
      closebuttoncaption:'Back'
    };
      
    $cordovaInAppBrowser.open(TERM_PAGE, '_blank',options)
        .then(function(event) {
          $ionicLoading.hide();
        })
        .catch(function(event) {
          //alert('error: ' + event.url)
        });
    }

    $rootScope.$on('skillViewStatusEmit', function(event, data) {
      $scope.skillViewStatus = data; // 'Some data'
    });

    if (localStorage.getItem("userData") != null) {
      $scope.userData = JSON.parse(window.localStorage['userData']);
      $scope.userInformation = $scope.userData.data;
    }
    //console.log($scope.userInformation._id)

    socket.on('currentuser_socketid', function(data) {

      socket.emit('user_socket', $scope.userInformation._id);

    });
    $scope.serverPath = SERVER_IMAGE;

    $scope.currentItem = "home";

    $scope.$on("$ionicView.leave", function() {

      $scope.currentItem = $state.current.name
        
    })

    if ($state.current.name != undefined) {
      $scope.currentItem = $state.current.name;
      $rootScope.currentState = $state.current.name;
    }
    //console.log($state.current.name)

    $scope.currentMenu = function(menuName) {
      $scope.currentItem = menuName;
      if ($ionicSideMenuDelegate.isOpen()) {
        $ionicSideMenuDelegate.toggleLeft(false);
      }
    }

    $rootScope.$on('currentMenu', function(event, data) {
        $scope.currentItem = data; // 'Some data'
    });
   

    $scope.logout = function() {
      $rootScope.$on('child', function(event, data) {
          $scope.userInformation = data; // 'Some data'
      });
      socket.emit('forceDisconnect', $scope.userInformation._id);
      $rootScope.userInformation = {};
      var loginDetail = localStorage.getItem('localdata');
      localStorage.removeItem("userData");
      localStorage.removeItem("userDetail");
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("userlongitude");
      localStorage.removeItem("userlatitude");
      localStorage.removeItem("localdata");
      $rootScope.userInformation.role = '';
      $rootScope.userInformation.skill = '';
      $location.path('/signin');
    };

    if (localStorage.getItem("userData") != null) {
      $scope.userData = JSON.parse(window.localStorage['userData']);
      $rootScope.userInformation = $scope.userData.data;
      $scope.$on("$ionicView.beforeEnter", function(event, data) {
      });
    }

    $rootScope.$on("updateProfileStatus", function(event, data) {
      $scope.userInformation.role[0] = data.data.role[0]
      $scope.userInformation.role[1] = data.data.role[1]
    });
    
    var date = new Date();
    // $cordovaGeolocation
    //   .getCurrentPosition(POS_OPTIONS)
    //   .then(function(position) {
    //     LocationService.getTimezoneByLatLong(position.coords.latitude, position.coords.longitude, (date.getTime() / 10)).then(function(data) {
    //      $scope.timezone = data.data.timeZoneId;
    //     })
    //   }, function(err) {
    // });

    $scope.toggleLeft = function() {
      //console.log($ionicSideMenuDelegate.toggleLeft())
      $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    $scope.pickContactUsingNativeUI = function() {
       $cordovaSocialSharing
        .share(INVITE_MESSAGE, 'App Invitation')
        .then(function(result) {
          console.log(result)
            // Success!
        }, function(err) {
          var alertPopup = $ionicPopup.alert({
            title: 'Error!',
            template: 'Sorry for the inconvenience.Please try again later.',
            buttons: [{
              text: '<b>Ok</b>',
              type: 'pink-white-theme-color'
            }]
          });
        });
    }
    $scope.getNumber = function(n) {
      return new Array(n);
    };
    // Open the rating modal
    $scope.userInfoData = function(userId) {
      $state.go('app.userprofile', {
        "userId": userId
      })
    };
  })
  /* Facebook,Simple login and register  Controller */
  .controller('RegisterCtrl', function($scope, LoginService, socket, $cordovaOauth, $rootScope, RegisterService, SocailService, ForgotService, $ionicLoading, $ionicPopup, $state) {
    

    $scope.user = {};
    $scope.today = new Date();
  
    $scope.selectedOption={};


    // $scope.pageOptions = ["Home", "My Jobs", "Post Jobs"];
    // $scope.selectedOption.value=$scope.pageOptions[0]
     
    //console.log($scope.userInformation.defaultScreen)
    if (localStorage.getItem("userData") != null) {
        $scope.userData = JSON.parse(window.localStorage['userData']);
        $scope.defaultScreen = $scope.userData.data.defaultScreen;
    }
    //console.log($scope.defaultScreen)
    //console.log(localStorage.getItem("defaultScreen"))

    if(localStorage.getItem("defaultScreen") != null ) {
      
      $scope.selectedOption.value = localStorage.getItem("defaultScreen");
      
    } 
    if($scope.defaultScreen && localStorage.getItem("defaultScreen") == null || localStorage.getItem("defaultScreen")=='undefined'){
      
      $scope.selectedOption.value = $scope.defaultScreen;
     
    }
    console.log($scope.selectedOption.value)

    $scope.homeScreen=function(value){
     var screenData={};
     screenData.defaultScreen=value;
     screenData._id=$scope.userData.data._id;
     var confirmPopup = $ionicPopup.confirm({
          title: '',
          template: 'Do you want to redirect to this screen after login?'
        });
        confirmPopup.then(function(res) {
          if (res) {
            RegisterService.defaultScreen(screenData).success(function(data) {
              if(data.messageId==200)
              {
                $scope.selectedOption.value=value;
                localStorage.setItem('defaultScreen', value);              
              }         
            });
          } else {
            console.log('Deletion canceled !');
          }
        });
    }

    $scope.linkedinLogin = function() {
      $ionicLoading.show();
      $cordovaOauth.linkedin(LINKEDIN_CLIENTID, LINKEDIN_CLIENTSECRET, ["r_basicprofile", "r_emailaddress"]).then(function(result) {
        //console.log(JSON.stringify(result));
        if (result.access_token == "" || result.access_token == undefined) {

          $ionicLoading.hide();

        }

      SocailService.getLinkedInDetail(result.access_token).success(
          function(profileInfo) {
            profileInfo.provider = "linkedIn";
            profileInfo.password = $scope.genratePassword();
            profileInfo.email = profileInfo.emailAddress;
            profileInfo.first_name = profileInfo.firstName;
            profileInfo.last_name = profileInfo.lastName;
            profileInfo.enable = true;
            console.log(profileInfo)
            RegisterService.SignUpSocial(profileInfo).success(function(response) {
              $ionicLoading.hide();
              //console.log(response)
              if (response.existId == 100) {
                localStorage.setItem('userData', JSON.stringify(response));
                var userInfo = JSON.parse(JSON.stringify(response));
                var userData = {};
                userData.username = userInfo.data.email.toLowerCase().replace(/\s+/g, '');
                userData.password = "@linkedIn";
                if (localStorage.getItem("deviceId") != null) {
                  userData.device_id = window.localStorage['deviceId'];
                }
                if (localStorage.getItem("PLATFORM") != null) {
                  userData.currentplatform = window.localStorage['PLATFORM'];
                }
                if (localStorage.getItem("TimeZone") != null) {
                  userData.timezone = window.localStorage['TimeZone'];
                }
                $rootScope.userInformation = {}
                $rootScope.userInformation.role = '';
                $rootScope.userInformation.skill = '';

                //console.log(userData)
                LoginService.Login(userData).success(
                  function(logindata) {
                    $ionicLoading.hide();
                    if (logindata.messageId == 200) {
                      localStorage.setItem('ACCESS_TOKEN', JSON.parse(JSON.stringify(logindata.access_token)));
                      localStorage.setItem('userData', JSON.stringify(logindata));
                      $rootScope.userInformation.role = logindata.data.role;
                      $rootScope.userInformation.skill = logindata.data.skill;
                      if (localStorage.getItem("userData") != null) {
                        $scope.userData = JSON.parse(window.localStorage['userData']);
                        $scope.userInformation = $scope.userData.data;
                        socket.emit('user_socket', $scope.userInformation._id);
                        $rootScope.$emit('child', $scope.userInformation);
                        $rootScope.$broadcast('parent', $scope.userInformation);

                      }
                      if (localStorage.getItem("userData") != null) {
                        $scope.userData = JSON.parse(window.localStorage['userData']);
                        $scope.default = $scope.userData.data.defaultScreen;
                      }
                      localStorage.removeItem("defaultScreen");
                      if($scope.default==1){

                        $state.go('app.home')

                      }else if($scope.default==2){

                        $state.go('app.myjob')

                      }else{

                        $state.go('app.skills')

                      }
                    }
                });
              }else if (response.messageId == 200) {
                localStorage.setItem('userData', JSON.stringify(response));
                var userInfo = JSON.parse(JSON.stringify(response));
                var userData = {};
                userData.username = userInfo.data.email;
                userData.password = "@linkedIn";
                if (localStorage.getItem("deviceId") != null) {
                  userData.device_id = window.localStorage['deviceId'];
                }
                if (localStorage.getItem("PLATFORM") != null) {
                  userData.currentplatform = window.localStorage['PLATFORM'];
                }
                if (localStorage.getItem("TimeZone") != null) {
                  userData.timezone = window.localStorage['TimeZone'];
                }
                
                LoginService.Login(userData).success(function(logindata) {
                    $ionicLoading.hide();
                    if (logindata.messageId == 200) {  
                      localStorage.setItem('ACCESS_TOKEN', JSON.parse(JSON.stringify(logindata.access_token)));
                      if (localStorage.getItem("userData") != null) {
                          $scope.userData = JSON.parse(window.localStorage['userData']);
                          $scope.userInformation = $scope.userData.data;
                          socket.emit('user_socket', $scope.userInformation._id);
                          $rootScope.$emit('child', $scope.userInformation);
                          $rootScope.$broadcast('parent', $scope.userInformation);
                      }
                    localStorage.removeItem("defaultScreen");  
                      $state.go('app.addprofile')
                    }
                  });
              } else {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                  title: 'Something went wrong!',
                  template: data.message,
                  buttons: [{
                    text: '<b>Ok</b>',
                    type: 'pink-white-theme-color'
                  }]
                });
              }
            });
          });
        }, function(error) {
        $ionicLoading.hide();
      });
    }

    $scope.twitterLogin = function() {
      $cordovaOauth.twitter(TWITTER_CONSUMERKEY, TWITTER_CLIENTSECRETKEY).then(function(result) {
        console.log(JSON.stringify(result));
        profileInfo = {};
        profileInfo.provider = "twitter";
        profileInfo.password = $scope.genratePassword();
        profileInfo.email = result.screen_name + '@twitter.com';
        profileInfo.enable = true;
        console.log(profileInfo)
        RegisterService.SignUpSocial(profileInfo).success(function(response) {
          $ionicLoading.hide();
          if (response.existId == 100) {
            localStorage.setItem('userData', JSON.stringify(response));
            var userInfo = JSON.parse(JSON.stringify(response));
            var userData = {};
              userData.username = userInfo.data.email.toLowerCase().replace(/\s+/g, '');
              userData.password = "@twitter";
                if (localStorage.getItem("deviceId") != null) {
                  userData.device_id = window.localStorage['deviceId'];
                }
                if (localStorage.getItem("PLATFORM") != null) {
                  userData.currentplatform = window.localStorage['PLATFORM'];
                }
                if (localStorage.getItem("TimeZone") != null) {
                  userData.timezone = window.localStorage['TimeZone'];
                }
            $rootScope.userInformation = {}
            $rootScope.userInformation.role = '';
            $rootScope.userInformation.skill = '';
            //console.log(userData)
            LoginService.Login(userData).success(function(logindata) {
                $ionicLoading.hide();
                if (logindata.messageId == 200) {
                   localStorage.setItem('ACCESS_TOKEN', JSON.parse(JSON.stringify(logindata.access_token)));
                   localStorage.setItem('userData', JSON.stringify(logindata));
                   $rootScope.userInformation.role = logindata.data.role;
                   $rootScope.userInformation.skill = logindata.data.skill;
                   if (localStorage.getItem("userData") != null) {
                      $scope.userData = JSON.parse(window.localStorage['userData']);
                      $scope.userInformation = $scope.userData.data;
                      socket.emit('user_socket', $scope.userInformation._id);
                      $rootScope.$emit('child', $scope.userInformation);
                      $rootScope.$broadcast('parent', $scope.userInformation);
                    }
                   if (localStorage.getItem("userData") != null) {
                        $scope.userData = JSON.parse(window.localStorage['userData']);
                        $scope.default = $scope.userData.data.defaultScreen;
                      }
                      localStorage.removeItem("defaultScreen");
                      if($scope.default==1){

                        $state.go('app.home')

                      }else if($scope.default==2){

                        $state.go('app.myjob')

                      }else{

                        $state.go('app.skills')

                      }
                }
              });
          } else if (response.messageId ==200) {
            localStorage.setItem('userData', JSON.stringify(response));
            var userInfo = JSON.parse(JSON.stringify(response));
            var userData = {};
            userData.username = userInfo.data.email;
            userData.password = "@linkedIn";
            if (localStorage.getItem("deviceId") != null) {
                  userData.device_id = window.localStorage['deviceId'];
            }
            if (localStorage.getItem("PLATFORM") != null) {
                  userData.currentplatform = window.localStorage['PLATFORM'];
            }
            if (localStorage.getItem("TimeZone") != null) {
                  userData.timezone = window.localStorage['TimeZone'];
            }

            LoginService.Login(userData).success(function(logindata) {
                  $ionicLoading.hide();
                  if (logindata.messageId == 200) {
                    localStorage.setItem('ACCESS_TOKEN', JSON.parse(JSON.stringify(logindata.access_token)));
                      if (localStorage.getItem("userData") != null) {
                        $scope.userData = JSON.parse(window.localStorage['userData']);
                        $scope.userInformation = $scope.userData.data;
                        socket.emit('user_socket', $scope.userInformation._id);
                        $rootScope.$emit('child', $scope.userInformation);
                        $rootScope.$broadcast('parent', $scope.userInformation);
                      }
                      localStorage.removeItem("defaultScreen");
                    $state.go('app.addprofile')
                  }
            });
          } else {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Something went wrong!',
              template: data.message,
              buttons: [{
                text: '<b>Ok</b>',
                type: 'pink-white-theme-color'
              }]
            });

          }

        });
      },function(error) {
        console.log(JSON.stringify(error));
      });
    }

    $scope.facebookLogin = function() {
      $ionicLoading.show();
      // $cordovaOauth.facebook(string clientId, array appScope, object options);
      $cordovaOauth.facebook(FACEBOOK_APPID, ["email"], {
        "auth_type": "rerequest"
      }).then(function(result) {
        // console.log(JSON.stringify(result));
        SocailService.getFacebookDetail(result.access_token).success(function(profileInfo) {
            profileInfo.provider = "facebook";
            profileInfo.password = $scope.genratePassword();
            profileInfo.enable = true;
            //console.log(profileInfo)
            RegisterService.SignUpSocial(profileInfo).success(function(response) {
              $ionicLoading.hide();
              if (response.existId == 100) {
                localStorage.setItem('userData', JSON.stringify(response));
                var userInfo = JSON.parse(JSON.stringify(response));
                var userData = {};
                userData.username = userInfo.data.email.toLowerCase().replace(/\s+/g, '');
                userData.password = "@facebook";
                userData.device_id = window.localStorage['deviceId'];
                $rootScope.userInformation = {}
                $rootScope.userInformation.role = '';
                $rootScope.userInformation.skill = '';
                //console.log(userData)
                LoginService.Login(userData).success(function(logindata) {
                    $ionicLoading.hide();
                    if (logindata.messageId == 200) {
                      localStorage.setItem('ACCESS_TOKEN', JSON.parse(JSON.stringify(logindata.access_token)));
                      localStorage.setItem('userData', JSON.stringify(logindata));
                      $rootScope.userInformation.role = logindata.data.role;
                      $rootScope.userInformation.skill = logindata.data.skill;

                        if (localStorage.getItem("userData") != null) {
                              $scope.userData = JSON.parse(window.localStorage['userData']);
                              $scope.userInformation = $scope.userData.data;
                              socket.emit('user_socket', $scope.userInformation._id);
                              $rootScope.$emit('child', $scope.userInformation);
                              $rootScope.$broadcast('parent', $scope.userInformation);
                        }

                     if (localStorage.getItem("userData") != null) {
                        $scope.userData = JSON.parse(window.localStorage['userData']);
                        $scope.default = $scope.userData.data.defaultScreen;
                      }
                      localStorage.removeItem("defaultScreen");
                      if($scope.default==1){

                        $state.go('app.home')

                      }else if($scope.default==2){

                        $state.go('app.myjob')

                      }else{

                        $state.go('app.skills')

                      }
                    }
                });
              }else if (response.messageId == 200) {
                localStorage.setItem('userData', JSON.stringify(response));
                var userInfo = JSON.parse(JSON.stringify(response));
                var userData = {};
                userData.username = userInfo.data.email;
                userData.password = "@facebook";
                if (localStorage.getItem("deviceId") != null) {
                  userData.device_id = window.localStorage['deviceId'];
                }
                if (localStorage.getItem("PLATFORM") != null) {
                  userData.currentplatform = window.localStorage['PLATFORM'];
                }
                if (localStorage.getItem("TimeZone") != null) {
                  userData.timezone = window.localStorage['TimeZone'];
                }
                LoginService.Login(userData).success(function(logindata) {
                    $ionicLoading.hide();
                    if (logindata.messageId == 200) {
                      localStorage.setItem('ACCESS_TOKEN', JSON.parse(JSON.stringify(logindata.access_token)));
                      localStorage.removeItem("defaultScreen");
                     
                      if (localStorage.getItem("userData") != null) {
                          $scope.userData = JSON.parse(window.localStorage['userData']);
                          $scope.userInformation = $scope.userData.data;
                          socket.emit('user_socket', $scope.userInformation._id);
                          $rootScope.$emit('child', $scope.userInformation);
                          $rootScope.$broadcast('parent', $scope.userInformation);
                      }
                      $state.go('app.addprofile')
                    }
                });
              } else {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                  title: 'Something went wrong!',
                  template: data.message,
                  buttons: [{
                    text: '<b>Ok</b>',
                    type: 'pink-white-theme-color'
                  }]
                });
              }
            });
        });
        // https://graph.facebook.com/me?fields=email,name,id,gender&access_token=EAAXo2yZBTRAgBAK38A2ReEZAI1sMvpkjuiJ5ZBwAGauEwGhmv6H9XzUctwYohn3SVZCHrMKJvTMHxwM4KmAe9ZAKvfccSAHRpDkU4daaswfr1rJwul5uUgobPKYmGyPiJUbHurnDgjB73z8MtaVsRWeZAtrgDJmnuA4u9ATVR0XBRqc1ZCKA4m3BzfQQmbBjJUZD
      }, function(error) {
        console.log(JSON.stringify(error));
        $ionicLoading.hide();
      });
    }

    $scope.googleLogin = function() {
      $ionicLoading.show();

      $cordovaOauth.google(GOOGLE_CLIENTID, ["email"]).then(function(result) {
        console.log(result.access_token)
        if (result.access_token == "" || result.access_token == undefined) {

          $ionicLoading.hide();

        }
        SocailService.getGoogleDetail(result.access_token).success(function(profileInfo) {
            $ionicLoading.hide();
            profileInfo.provider = "gmail";
            profileInfo.password = $scope.genratePassword();
            profileInfo.first_name = profileInfo.given_name;
            profileInfo.last_name = profileInfo.family_name;
            profileInfo.enable = true;
            console.log(profileInfo)
            RegisterService.SignUpSocial(profileInfo).success(function(response) {
              //console.log(response)
              if (response.existId == 100) {
                localStorage.setItem('userData', JSON.stringify(response));
                var userInfo = JSON.parse(JSON.stringify(response));
                var userData = {};
                userData.username = userInfo.data.email.toLowerCase().replace(/\s+/g, '');
                userData.password = "@gmail";
                if (localStorage.getItem("deviceId") != null) {
                  userData.device_id = window.localStorage['deviceId'];
                }
                if (localStorage.getItem("PLATFORM") != null) {
                  userData.currentplatform = window.localStorage['PLATFORM'];
                }
                if (localStorage.getItem("TimeZone") != null) {
                  userData.timezone = window.localStorage['TimeZone'];
                }
                $rootScope.userInformation = {}
                $rootScope.userInformation.role = '';
                $rootScope.userInformation.skill = '';
                //console.log(userData)
                LoginService.Login(userData).success(function(logindata) {
                    $ionicLoading.hide();
                    if (logindata.messageId == 200) {
                      localStorage.setItem('ACCESS_TOKEN', JSON.parse(JSON.stringify(logindata.access_token)));
                      localStorage.setItem('userData', JSON.stringify(logindata));
                      $rootScope.userInformation.role = logindata.data.role;
                      $rootScope.userInformation.skill = logindata.data.skill;
                        if (localStorage.getItem("userData") != null) {
                          $scope.userData = JSON.parse(window.localStorage['userData']);
                          $scope.userInformation = $scope.userData.data;
                          socket.emit('user_socket', $scope.userInformation._id);
                          $rootScope.$emit('child', $scope.userInformation);
                          $rootScope.$broadcast('parent', $scope.userInformation);
                        }
                    if (localStorage.getItem("userData") != null) {
                        $scope.userData = JSON.parse(window.localStorage['userData']);
                        $scope.default = $scope.userData.data.defaultScreen;
                      }
                      localStorage.removeItem("defaultScreen");
                      if($scope.default==1){

                        $state.go('app.home')

                      }else if($scope.default==2){

                        $state.go('app.myjob')

                      }else{

                        $state.go('app.skills')

                      }
                    }
                });
              } else if (response.messageId == 200) {
                localStorage.setItem('userData', JSON.stringify(response));
                var userInfo = JSON.parse(JSON.stringify(response));
                var userData = {};
                userData.username = userInfo.data.email;
                userData.password = '@gmail';
                if (localStorage.getItem("deviceId") != null) {
                  userData.device_id = window.localStorage['deviceId'];
                }
                if (localStorage.getItem("PLATFORM") != null) {
                  userData.currentplatform = window.localStorage['PLATFORM'];
                }
                if (localStorage.getItem("TimeZone") != null) {
                  userData.timezone = window.localStorage['TimeZone'];
                }
                
                LoginService.Login(userData).success(function(logindata) {
                    $ionicLoading.hide();
                    if (logindata.messageId == 200) {
                      localStorage.setItem('ACCESS_TOKEN', JSON.parse(JSON.stringify(logindata.access_token)));
                      if (localStorage.getItem("userData") != null) {
                        $scope.userData = JSON.parse(window.localStorage['userData']);
                        $scope.userInformation = $scope.userData.data;
                        socket.emit('user_socket', $scope.userInformation._id);
                        $rootScope.$emit('child', $scope.userInformation);
                        $rootScope.$broadcast('parent', $scope.userInformation);
                      }
                      localStorage.removeItem("defaultScreen");
                      $state.go('app.addprofile');
                    }
                });
              } else {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                  title: 'Something went wrong!',
                  template: data.message,
                  buttons: [{
                    text: '<b>Ok</b>',
                    type: 'pink-white-theme-color'
                  }]
                });
              }
            });
          });
      }, function(error) {
        console.log(JSON.stringify(error));
        $ionicLoading.hide();
      });
    }

    if (localStorage.getItem("userDetail") != null && $state.current.name == "signin") {
      $scope.userDetail = JSON.parse(window.localStorage['userDetail']);
      $scope.user.email = $scope.userDetail.entered_email;
      $scope.user.password = $scope.userDetail.entered_password;
      $scope.user.rememberme = true;
    }

    $scope.genratePassword = function() {
      var text = "";
      var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 9; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }
    
    $scope.login = function(user) {
      $ionicLoading.show();
      var userData = {};
      userData.username = user.email.toLowerCase().replace(/\s+/g, '');
      userData.password = user.password;
      if (localStorage.getItem("deviceId") != null) {
        userData.device_id = window.localStorage['deviceId'];
      }
      if (localStorage.getItem("PLATFORM") != null) {
        userData.currentplatform = localStorage.getItem("PLATFORM");
      }
      if (localStorage.getItem("TimeZone") != null) {
        userData.timezone = window.localStorage['TimeZone'];
      }
      //console.log(userData)
      LoginService.Login(userData).success(function(data) {
          $ionicLoading.hide();
          if (data.messageId == 200) {
            $scope.rememberme = true;
            // if (typeof $scope.user.rememberme != "undefined") {
            //   $scope.rememberme = $scope.user.rememberme;
            // }
            $rootScope.userInformation = {};
            $rootScope.userInformation.role = '';
            $rootScope.userInformation.skill = '';
            localStorage.setItem('ACCESS_TOKEN', JSON.parse(JSON.stringify(data.access_token)));
            localStorage.setItem('userData', JSON.stringify(data));
            var localdata = data.data;
            var userDetail = {};
            $rootScope.userInformation.role = localdata.role;
            $rootScope.userInformation.skill = localdata.skill;
            socket.emit('user_socket', localdata._id);
            if (localStorage.getItem("userData") != null) {
              $scope.userData = JSON.parse(window.localStorage['userData']);
              $scope.userInformation = $scope.userData.data;
              $rootScope.$emit('child', $scope.userInformation);
              $rootScope.$broadcast('parent', $scope.userInformation);
            }
            if ($scope.rememberme == true) {
              localdata.entered_email = $scope.user.email;
              localdata.entered_password = $scope.user.password;
              userDetail.entered_email = $scope.user.email;
              userDetail.entered_password = $scope.user.password;
              localStorage.setItem('localdata', JSON.stringify(localdata));
              localStorage.setItem('userDetail', JSON.stringify(userDetail));
            } else {
              localStorage.removeItem("userDetail");
            }
            if (localStorage.getItem("userData") != null) {
                        $scope.userData = JSON.parse(window.localStorage['userData']);
                        $scope.default = $scope.userData.data.defaultScreen;
            }
            localStorage.removeItem("defaultScreen");
            
            if($scope.default==1){

              $state.go('app.home')

            }else if($scope.default==2){

              $state.go('app.myjob')

            }else{

              $state.go('app.skills')

            }
            
          } else {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Login failed!',
              template: 'Please check your credentials!',
              buttons: [{
                text: '<b>Ok</b>',
                type: 'pink-white-theme-color'
              }]
            });
          }
        });
    }

    $scope.savedData = {};
    if (localStorage.getItem('userData') != null) {
      if (typeof $scope.savedData.entered_email != "undefined" && $scope.savedData.entered_email != "" && typeof $scope.savedData.entered_password != "undefined" && $scope.savedData.entered_password != "") {
        $scope.user.email = $scope.savedData.entered_email;
        $scope.user.password = $scope.savedData.entered_password;
        $scope.login();
      }
    }
    $scope.googleSignIn = function() {
      $ionicLoading.show({
        template: 'Logging in...'
      });
    };
    
    $scope.register = function(user) {
      $ionicLoading.show();
      var userData={}
      userData.email = user.email.toLowerCase().replace(/\s+/g, '');
      userData.password = user.password;
      userData.enable = true; 
      RegisterService.SignUp(userData).success(function(data) {
          $ionicLoading.hide();
          if (data.messageId == 200) {
            var userInfo = JSON.parse(JSON.stringify(data));
            $scope.userEmail = data.data.email;
            var userData = {};
            userData.username = userInfo.data.email.toLowerCase().replace(/\s+/g, '');
            userData.password = user.password;
            if (localStorage.getItem("deviceId") != null) {
              userData.device_id = window.localStorage['deviceId'];
            }
            if (localStorage.getItem("PLATFORM") != null) {
              userData.currentplatform = window.localStorage['PLATFORM'];
            }
            if (localStorage.getItem("TimeZone") != null) {
              userData.timezone = window.localStorage['TimeZone'];
            }
            LoginService.Login(userData).success(function(logindata) {
                $ionicLoading.hide();
                if (logindata.messageId == 200) {
                  localStorage.setItem('ACCESS_TOKEN', JSON.parse(JSON.stringify(logindata.access_token)));
                  localStorage.setItem('userData', JSON.stringify(logindata));
                    if (localStorage.getItem("userData") != null) {
                      $scope.userData = JSON.parse(window.localStorage['userData']);
                      $scope.userInformation = $scope.userData.data;
                      socket.emit('user_socket', $scope.userInformation._id);
                      $rootScope.$emit('child', $scope.userInformation);
                      $rootScope.$broadcast('parent', $scope.userInformation);
                    }
                //localStorage.getItem("defaultScreen")
                localStorage.removeItem("defaultScreen");
                  $state.go('app.addprofile')
                }
            });
          } else {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Registration failed!',
              template: data.message,
              buttons: [{
                text: '<b>Ok</b>',
                type: 'pink-white-theme-color'
              }]
            });
          }
        });
    }
    $scope.changePassword = function(pass) {
      $ionicLoading.show();
      if (localStorage.getItem("userData") != null) {
         $scope.userData = JSON.parse(window.localStorage['userData']);
      }
      pass._id = $scope.userData.data._id
      LoginService.ChangePassword(pass).success(function(data) {
          $ionicLoading.hide();
          if (data.messageId == 200) {
            var alertPopup = $ionicPopup.alert({
              title: 'Success!',
              template: data.message,
              buttons: [{
                text: '<b>Ok</b>',
                type: 'pink-white-theme-color'
              }]
            });
          } else {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Error!',
              template: data.message,
              buttons: [{
                text: '<b>Ok</b>',
                type: 'pink-white-theme-color'
              }]
            });
          }
        });
    }
    $scope.gotoLogin = function() {
      console.log('Sign-In');
      $state.go('landing');
    };
    $scope.forgotPassword = function(user) {
      $ionicLoading.show();
      var userdata = {};
      userdata.username = user.email
      ForgotService.forgotUser(userdata).success(function(data) {
          $ionicLoading.hide();
          if (data.messageId == 200) {
            var alertPopup = $ionicPopup.alert({
              title: 'Password has been sent successfully',
              template: 'Please check your email for new password.',
              buttons: [{
                text: '<b>Ok</b>',
                type: 'pink-white-theme-color'
              }]
            });
            $state.go('signin');
          } else {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Invalid Email!',
              template: 'Please check your email you might have mistyped!',
              buttons: [{
                text: '<b>Ok</b>',
                type: 'pink-white-theme-color'
              }]
            });
          }
      });
    }
  })
  /* Add and Edit Profile Controller*/
  .controller('AddprofileCtrl', function($scope, $window, $jrCrop, $ionicSideMenuDelegate, $cordovaGeolocation,$rootScope, $stateParams, IonicClosePopupService, $state, $location, $ionicPopup, SkillsService, LoginService, $ionicActionSheet, $ionicLoading) {
    $scope.profile = {};
    $scope.user={};
    $scope.user.skill=[];
    var myPopup;
    $scope.userInfo = {};
    $scope.userInfo.location = {};
    $scope.userInfo.type = {};
    
    if (localStorage.getItem("userData") != null) {
      $scope.profile.skill = '';
      $scope.userData = JSON.parse(window.localStorage['userData']);
      $scope.profile = $scope.userData['data'];
      if ($scope.profile.first_name == undefined) {
        $scope.profile.user_name = '';
      }
      $scope.skillData = [];
      if ($scope.profile != undefined) {
        inputObj = $scope.profile.skill;
        for (var key in inputObj) {
          $scope.skillData[key] = {
            "text": inputObj[key].skill,
            "id": inputObj[key]._id
          };
        }
        $scope.profile.tags = $scope.skillData;
      }
    }
    $scope.isshowhide_new = function(i){
            $scope['isbox_' + i ] = !$scope['isbox_' + i ];
    }
    SkillsService.getSkillsListing().success(function(skills) {
      $ionicLoading.hide();
      response=skills;
      $scope.user.skill=[]
      if(response.messageId == 200) {
          var len =  response.data.length;
          var skillPermissionlen = $scope.userData.data.skill.length;
          for( var i =0 ; i< skillPermissionlen ; i++){
            $scope.user.skill.push($scope.userData.data.skill[i]._id)

          }
          for( var i =0 ; i< len ; i++){
            if(($scope.user.skill.indexOf(response.data[i]._id)) == -1){
                      response.data[i].used = false;
            }else{  
                      response.data[i].used = true;
            }
            if(response.data[i].subSkills.length>0){
                  for( var j =0 ; j< (response.data[i].subSkills.length) ; j++){
                      if(($scope.user.skill.indexOf(response.data[i].subSkills[j]._id)) == -1){
                             response.data[i].subSkills[j].used = false;
                    }else{
                       response.data[i].subSkills[j].used = true;
                    }               
                  }
            }
          }
          $scope.skillData = response.data;
      }  
    });
    if ($scope.profile.user_name != undefined && $scope.profile.user_name != "") {
        $scope.$watch('profile.user_name', function() {
          $scope.profile.user_name = $scope.profile.user_name.toLowerCase().replace(/\s+/g, '');
        });
    }
    $scope.selectSkill = function (id) {
            if(id){
              var index = $scope.user.skill.indexOf(id);
              if(index == -1)
                  $scope.user.skill.push(id)
              else
                  $scope.user.skill.splice(index, 1)

              var skillLen = $scope.skillData.length;
              for (var a = 0; a < skillLen; ++a) {
                    if ($scope.skillData[a]._id == id) {
                            if ($scope.skillData[a].used) {
                                $scope.skillData[a].used = false;
                            } else {
                                $scope.skillData[a].used = true;
                            }        
                    }
                    if($scope.skillData[a].subSkills.length>0){
                            for( var j =0 ; j< ($scope.skillData[a].subSkills.length) ; j++){
                              if(($scope.user.skill.indexOf($scope.skillData[a].subSkills[j]._id)) == -1){
                                    $scope.skillData[a].subSkills[j].used = false;
                              }else{
                                   $scope.skillData[a].subSkills[j].used = true;
                              }
                            }
                    }
                  }
              }else{  
                if($scope.user.skill.length > 0 && $scope.selectionSkillAll){
                    $scope.user.skill = [];
                    $scope.selectionSkillAll = false;
                    var i=0;
                    angular.forEach($scope.skillData, function(item) {
                        $scope.skillData[i].used=false;
                        i++;
                    });
                }else{
                    $scope.selectionSkillAll = true
                    $scope.user.skill = [];
                    var i=0;
                    angular.forEach($scope.skillData, function(item) {
                        //alert("kk")
                        $scope.user.skill.push(item._id);

                        $scope.skillData[i].used=true;
                        i++;
                    });
                }
              }        
    } 
    // $cordovaGeolocation.getCurrentPosition(POS_OPTIONS)
    //               .then(function(position) {
    //                 $scope.profile.location={};
    //                 $scope.profile.latitude = position.coords.latitude;
    //                 $scope.profile.longitude = position.coords.longitude;
    //                 $scope.profile.location.type = "Point";
    //                 $scope.profile.location.coordinates = [position.coords.latitude, position.coords.longitude]
    //                 console.log($scope.profile)
    //               }, function(err) {
          
    //                 $scope.profile.location.type = "Point";
    //                 $scope.profile.location.coordinates = [position.coords.latitude, position.coords.longitude]
    // });

    $scope.getAddress=  function(place) {

        //console.log(place.geometry.location)
        if(place.geometry!=undefined){

        $scope.profile.address = place.formatted_address;
        var location = place.geometry.location;
        $scope.profile.latitude =  location.lat();
        $scope.profile.longitude = location.lng();
        //console.log("Address Object", place);

       $scope.profile.location= {type: "Point",coordinates: [ $scope.profile.longitude,$scope.profile.latitude]};
           console.log($scope.profile.location)  

        }

         
            
    }


    $scope.addprofile = function(profile) {

 console.log(profile.place)

        $ionicLoading.show();
        $scope.profile = profile;
        $scope.profile.skill = $scope.user.skill;
        //angular.merge($scope.profile, $scope.userInfo)
        console.log("FinalArratay")
        console.log($scope.profile)
        LoginService.UpdateProfile($scope.profile).success(function(data) {
            $ionicLoading.hide();
            if (data.messageId == 200) {
              $ionicLoading.hide();
              localStorage.setItem('userData', JSON.stringify(data));
              if (localStorage.getItem("userData") != null) {
                $scope.userData = JSON.parse(window.localStorage['userData']);
                $scope.profile = $scope.userData;
                $scope.userInformation = $scope.userData.data;
                $rootScope.userInformation.role = $scope.userData.data.role;
                $rootScope.userInformation.skill = $scope.userData.data.skill;
                $rootScope.$broadcast("updateProfileStatus", $scope.userData);
                $scope.btnStatus=true;
                $state.go('app.home');
              }
            } else {
              $ionicLoading.hide();
              var alertPopup = $ionicPopup.alert({
                title: 'Error!',
                template: 'User name already exists!',
                buttons: [{
                  text: '<b>Ok</b>',
                  type: 'pink-white-theme-color'
                }]
              });
            }
          });
    }
    $scope.cameraOptions = function() {
      var hideSheet = $ionicActionSheet.show({
          buttons: [{
            text: 'Gallery'
          }, {
            text: 'Camera'
          }],
          titleText: 'Choose option',
          cancelText: 'Cancel',
          cancel: function() {
            // add cancel code..
          },
          buttonClicked: function(index) {
            var options = {
              //allowEdit : true,
              quality: 80,
              destinationType: Camera.DestinationType.DATA_URL, // FILE_URI, DATA_URL
              sourceType: index, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
              encodingType: 0, // 0=JPG 1=PNG
              correctOrientation: true,
              targetHeight: 600,
              targetWidth: 600
            }
            navigator.camera.getPicture($scope.onSuccess, $scope.onFail, options);
            return true;
          }
        });
    };
    $scope.onSuccess = function(DATA_URL) {
        $jrCrop.crop({
          url: "data:image/jpeg;base64," + DATA_URL,
          circle: true,
          width: 250,
          height: 250
        }).then(function(canvas) {
          var image = canvas.toDataURL();
          $scope.profile.prof_image = image;
          //console.log(image);
          var profImage = document.getElementById('profileImage');
          profImage.src = image;
          profImage.style.display = "block";
          document.getElementById('fbprofileImage').style.display = "none";
          //document.getElementById('profile_image').style.display= "none";
          var unbindWatch = $scope.$watch(function() {
            if ($ionicSideMenuDelegate.isOpen()) {
              $ionicSideMenuDelegate.toggleLeft(false);
            }
          });
          setTimeout(function() {
            unbindWatch();
          }, 1000);
        }, function() {
        });
    };
    $scope.onFail = function(e) {
        console.log("On fail " + e);
    }
    $scope.covercameraOptions = function() {
        var hideSheet = $ionicActionSheet.show({
          buttons: [{
            text: 'Gallery'
          }, {
            text: 'Camera'
          }],
          titleText: 'Choose option',
          cancelText: 'Cancel',
          cancel: function() {
            // add cancel code..
          },
          buttonClicked: function(index) {
            var options = {
              //  allowEdit : true,
              quality: 80,
              destinationType: Camera.DestinationType.DATA_URL, // FILE_URI, DATA_URL
              sourceType: index, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
              encodingType: 0, // 0=JPG 1=PNG
              correctOrientation: true,
              targetHeight: 600,
              targetWidth: 600
            }
            navigator.camera.getPicture($scope.onCoverSuccess, $scope.onCoverFail, options);
            return true;
          }
        });
    };
    $scope.onCoverSuccess = function(DATA_URL) {
        $jrCrop.crop({
          url: "data:image/jpeg;base64," + DATA_URL,
          width: 411,
          height: 146
        }).then(function(canvas) {
          // success!
          var image = canvas.toDataURL();
          $scope.profile.cover_image = image;

          //console.log(image);
          var coverImage = document.getElementById('coverImage');
          coverImage.src = image;
          coverImage.style.display = "block";
          document.getElementById('coverprofileImage').style.display = "none";
          //document.getElementById('cover_image').style.display= "none";
          var unbindWatch = $scope.$watch(function() {
            if ($ionicSideMenuDelegate.isOpen()) {
              $ionicSideMenuDelegate.toggleLeft(false);
            }
          });
          setTimeout(function() {
            unbindWatch();
          }, 1000);

        }, function() {
          // User canceled or couldn't load image.
        });
    };
    $scope.onCoverFail = function(e) {
        console.log("On fail " + e);
    }
  })
  /* Get Skills Controller */
  .controller('SkillsCtrl', function($scope, $location, $rootScope,$state,$parse, $ionicLoading, $ionicPopup, SkillsService,$ionicActionSheet) {
    $ionicLoading.show();
    $rootScope.$emit('currentMenu', "app.skills");
    if (localStorage.getItem("userData") != null) {
      $scope.Data = JSON.parse(window.localStorage['userData']);
      $scope.userData = $scope.Data.data;
    }
    $rootScope.$emit('skillViewStatusEmit',true);
    $scope.addDynamicheight = function(){
      document.getElementById('skill_container').style.height = (window.screen.height - 180) + 'px'
    }
    $scope.backSkill = function(){
      $scope.skillViewStatus=true;
      $scope.skillquery='';
      document.getElementById('skill_container').style.height = 0 + 'px'
    } 
    $scope.getCategoryList=function(){
      $rootScope.$broadcast('skillViewStatus',false);
      $rootScope.$emit('skillViewStatusEmit',false);
      $scope.addDynamicheight()
    }   
    $rootScope.$on('skillViewStatus', function(event, data) {
      $scope.skillViewStatus = data; // 'Some data'
    });
    $scope.skillDetail = function(categoryId,skillName,subSkill) {
      $scope.subSkill = [];
      angular.forEach(subSkill, function (value, key) {
              if(!value.is_deleted){
                 $scope.subSkill.push({
                    "text":value.skill,
                    "skillId":value._id 
                  });
              }   
      });
     if($scope.subSkill.length>0){
      $ionicActionSheet.show({
        buttons: $scope.subSkill,
        titleText: skillName,
        cancelText: 'Cancel',
        cssClass:'skillactionsheet',
        cancel: function() {
        },
        buttonClicked: function(index,data) {
           $location.path("app/postjob/" + data.skillId+'/'+categoryId);
        }
      });
     }else{
        $location.path("app/postjob/" + categoryId);
     }
    }
    SkillsService.getSkillsListing().success(function(Skills) {
      $ionicLoading.hide();
      if (Skills.messageId == 200) {
        $scope.skills = Skills.data;
      }
    });
  })
  /* Add,List,Delete,Edit Post Controller*/
  .controller('JobCtrl', function($scope, $state, $jrCrop, LoginService, SkillsService, $timeout, $ionicSideMenuDelegate, $cordovaGeolocation, $ionicActionSheet, IonicClosePopupService, $stateParams, $ionicLoading, $ionicPopup, JobService, LocationService) {
    $scope.currentDate = new Date()
    $scope.maxDate = new Date()
    $scope.currentDate.setDate($scope.currentDate.getDate());
    $scope.maxDate.setYear($scope.maxDate.getFullYear() + 1);
    $scope.userStatusData = {};
    if (localStorage.getItem("userData") != null) {
      $scope.userData = JSON.parse(window.localStorage['userData']);
      $scope.userInformation = $scope.userData.data;
      if ($scope.userInformation.status === false) {
        LoginService.userDetail($scope.userInformation._id).success(function(userStatusData) {
          if (userStatusData.messageId == 200) {
            localStorage.setItem('userData', JSON.stringify(userStatusData));
            $scope.userInformation = userStatusData.data;
          }
        });
      }
    }
    $scope.validateDate=function(valDate){
     $scope.currentDate = new Date();
     $scope.maxDate = new Date();
      console.log(valDate);
    }

    $scope.listAllJob=function(){   
      $ionicLoading.show();
      var job = {};
      $cordovaGeolocation.getCurrentPosition(POS_OPTIONS).then(function(position) {
            job.latitude = position.coords.latitude;
            job.longitude = position.coords.longitude;
            job.skill = $scope.userInformation.skill;
           // job.pageNumber = 1;
            console.log(job)
            $scope.job = job;
            console.log($scope.type)
            $scope.findJob(job,$scope.type);
        },function(err) {
          console.log(err)
          job.latitude = '';
          job.longitude = '';
          job.user_location = '';
          job.country = '';
          job.continent = '';
          $scope.findJob(job,$scope.type);
        });
    }  
    if ($stateParams.skId==undefined) { 
         $scope.type=1;
    } 
    if ($stateParams.skId!=undefined) {
        $scope.type=0;
        var skill=[];
        skill=[{"_id":$stateParams.skId}];
        $scope.userInformation.skill=skill;
        $scope.listAllJob();
    }  
    if ($stateParams.categoryId) {
        SkillsService.getSkill($stateParams.categoryId).success(function(skillDetail) {
          $scope.skillDetail = skillDetail.data;
        });
    }
    $scope.locationRange = false;
    $scope.locationMapRange = false;
    $scope.JobOrder = false;
    $scope.searchJob = false;
    $scope.listViewToggle = false;
    $scope.listMapToggle = false;
    $scope.viewListToggle = function(listViewToggle) {
        if (listViewToggle == false) {
          $scope.listViewToggle = true;
        } else {
          $scope.listViewToggle = false;
        }
        $scope.JobOrder = false;
        $scope.locationRange = false;
        $scope.listMapToggle = false;
    }

    $scope.viewMapToggle = function(listMapToggle) {
        if (listMapToggle == false) {
          $scope.listMapToggle = true;
        } else {
          $scope.listMapToggle = false;
        }
        $scope.locationMapRange = false;
        $scope.searchJob = false;
        $scope.listViewToggle = false;
    }

    $scope.locationToggle = function(locationRange) {
        if (locationRange == false) {
          $scope.locationRange = true;
        } else {
          $scope.locationRange = false;
        }
        $scope.listViewToggle = false;
        $scope.JobOrder = false;

    }

    $scope.jobToggle = function(JobOrder) {
        if (JobOrder == false) {
          $scope.JobOrder = true;
        } else {
          $scope.JobOrder = false;
        }
        $scope.locationRange = false;
        $scope.listViewToggle = false;
    }

    $scope.locationMapToggle = function(locationMapRange) {
        if (locationMapRange == false) {
          $scope.locationMapRange = true;
        } else {
          $scope.locationMapRange = false;
        }
        $scope.listMapToggle = false;
        $scope.searchJob = false;

    }

    $scope.searchToggle = function(searchJob) {
          if (searchJob == false) {
            $scope.searchJob = true;
          } else {
            $scope.searchJob = false;
          }
          $scope.locationMapRange = false;
          $scope.listMapToggle = false;
    }

    $scope.detailJob = function(jobId) {
      $state.go('app.viewjob', {
          "jobId": jobId
        })
    }
    $scope.dataslider = {};
    $scope.dataslider.distanceRadius = 20;
    $scope.job={};
    $scope.getdistance = function(distance,type) {
        $scope.dataslider.distanceval = parseInt(distance);
        $scope.dataslider.distanceRadius = $scope.dataslider.distanceval;
        $scope.job.range = distance;
        if(type!=undefined)
        {
          $scope.type=type

        }
        $scope.findJob($scope.job,$scope.type);
        $scope.JobOrder=false;
    }

    $scope.getMapdistance = function(distance,type) {
        $scope.dataslider.distanceval = parseInt(distance);
        $scope.dataslider.distanceRadius = $scope.dataslider.distanceval;
        $scope.job.range = distance;
        $ionicLoading.show();
        $scope.viewJob(true, false, $scope.job.range, type, 0);
    }

    $scope.deletejob = function(jobId) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Delete',
          template: 'Are you sure you want to delete this job?'
        });
        confirmPopup.then(function(res) {
          if (res) {
            $ionicLoading.show();
            data = {};
            job = {};
            job.id = jobId;
            job.is_deleted = true;
            data.data = [job];
            JobService.DeleteJob(data).success(function(data) {

              if (data.messageId == 200) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                  title: 'Success!',
                  template: 'Job has been deleted successfully!',
                  buttons: [{
                    text: '<b>Ok</b>',
                    type: 'pink-white-theme-color'
                  }]
                });

                var job = {};
                $cordovaGeolocation
                  .getCurrentPosition(POS_OPTIONS)
                  .then(function(position) {
                    job.latitude = position.coords.latitude;
                    job.longitude = position.coords.longitude;
                    job.skill = $scope.userInformation.skill;
                    //job.pageNumber = 1;
                    console.log(job)
                    $scope.job = job;
                    $scope.findJob(job);

                  }, function(err) {
                    user.latitude = '';
                    user.longitude = '';
                    user.user_location = '';
                    user.country = '';
                    user.continent = '';
                    $scope.findJob(job);
                  });
              }


            });
          } else {
            console.log('Deletion canceled !');
          }
        });
    }
    // $scope.JobList =[];
    // $scope.findJob = function(jobDetail,type,pageNumber) { 

    //   //console.log(pageNumber)
    //    if(pageNumber!=undefined && pageNumber!=''){

    //     jobDetail.pageNumber=pageNumber;
    //    }
         
    //     if(jobDetail.pageNumber==1){
    //       $ionicLoading.show();
    //     }
    //     $scope.jobData = jobDetail;
    //     $scope.type=type;
    //     jobDetail.type = $scope.type;
    //     //$scope.JobList =[];
    //     //console.log(jobDetail)
    //     JobService.getJobList(jobDetail).success(function(JobList) {
          
    //         if (JobList.messageId == 200) {
    //           $ionicLoading.hide();
    //           //console.log(JobList.data)
    //           //angular.extend($scope.JobList,JobList.data)
    //           if($scope.JobList.length==0){
    //             $scope.JobList = JobList.data;
    //           }else{
    //             for(var i=0;i<JobList.data.length;i++){

    //               $scope.JobList.push(JobList.data[i])
    //             }
    //           }
    //           console.log($scope.JobList)
    //           //$scope.JobList = JobList.data;
    //           // localStorage.setItem('JoblistCount', JSON.stringify(JobList.data.length));
    //           //console.log("Response")
    //           //console.log($scope.JobList)


    //         } else {
    //           $ionicLoading.hide();
    //           var alertPopup = $ionicPopup.alert({
    //             title: 'Error!',
    //             template: "Location is not correct",
    //             buttons: [{
    //               text: '<b>Ok</b>',
    //               type: 'pink-white-theme-color'
    //             }]
    //           });
    //         }
    //     });
    //     $scope.JobOrder=false;
    //   }
    $scope.findJob = function(jobDetail,type) {
      // console.log(jobDetail)

      $ionicLoading.show();
      console.log(jobDetail)
      $scope.jobData = jobDetail;
      jobDetail
      //jobDetail.type = 1;
      $scope.type=type;

      //console.log($scope.type)
      jobDetail.type = $scope.type;
      // if(type!=undefined){
      //   jobDetail.type = type;
      //  }
      jobDetail.userId=$scope.userInformation._id;
      console.log("asdas",jobDetail)
      JobService.getJobList(jobDetail).success(function(JobList) {
        //console.log(JobList)
        if (JobList.messageId == 200) {
          $ionicLoading.hide();
          $scope.JobList = JobList.data;
          // localStorage.setItem('JoblistCount', JSON.stringify(JobList.data.length));
          console.log("Response")
          console.log($scope.JobList)


        } else {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Error!',
            template: "Location is not correct",
            buttons: [{
              text: '<b>Ok</b>',
              type: 'pink-white-theme-color'
            }]
          });
        }

      });
      $scope.JobOrder=false;
    }

    $scope.findMyJob = function(jobData,type) {
        $ionicLoading.show();
        $scope.type = type;
        jobData.type = $scope.type;
        jobData.userId=$scope.userInformation._id;
        JobService.getJobList(jobData).success(function(JobList) {
          $ionicLoading.hide();
          $scope.JobList = JobList.data;
        });
        $scope.JobOrder=false;
    }

    //$scope.numberOfItemsToDisplay = $scope.JobList.length; // Use it with limit to in ng-repeat
    // $scope.addMoreItem = function(done) {
      
    //     $timeout(function() {
    //       if ($scope.JobList.length > $scope.numberOfItemsToDisplay) {
    //         //$ionicLoading.hide()
    //         $scope.numberOfItemsToDisplay +=  5; // load number of more items
    //         $scope.job.pageNumber+= 1;

    //         //console.log($scope.job)
    //         $scope.findJob($scope.job,$scope.type);

    //         $scope.$broadcast('scroll.infiniteScrollComplete')
    //       }

    //     }, 1000);
    // }

    $scope.numberOfItemsToDisplay = 2; // Use it with limit to in ng-repeat
    $scope.addMoreItem = function(done) {

      $timeout(function() {
        if ($scope.JobList.length > $scope.numberOfItemsToDisplay) {
          //$ionicLoading.hide()
          $scope.numberOfItemsToDisplay += 2; // load number of more items
          $scope.$broadcast('scroll.infiniteScrollComplete')
        }

      }, 500);
    }

    $scope.getAlljob = function(distance,type) {
        $scope.searchJob=false;
        $scope.type=type
        $scope.viewJob(true, false, distance, type, 0);
    }

    $scope.getmyJob = function(distance,type) {
        $scope.type=type
        $scope.searchJob=false;
        $scope.viewJob(true, false, distance, type,0);
    }

    $scope.getJobType = function(distance, jobId,type) {
        $scope.searchJob=false;
        $scope.viewJob(true, false, distance, type, jobId);
    }

    $scope.getJobDetail = function() {
        if ($stateParams.jobId != undefined && $stateParams.jobId != "") {
          JobService.JobView($stateParams.jobId).success(function(data) {
            console.log(data)
          });
      }
    }

    $scope.findJobdetail = function() {
        if ($stateParams.jobId) {
          JobService.GetDetailJob($stateParams.jobId).success(function(data) {
            $scope.skillDetail = {};
            $scope.post = data.data;

            $scope.post.place = data.data.address;

            if (data.data.category[0].cover_image) {
              $scope.skillDetail.cover_image = data.data.category[0].cover_image;
            }
            $scope.skillDetail.skill = data.data.category[0].skill;

            console.log($scope.skillDetail)
            $scope.jobtype = data.data.jobtype[0]._id;
            $scope.pricevalue = data.data.contract_type;
            $scope.post.due_date = new Date(data.data.due_date);
            $scope.currentDate = new Date();
            $scope.buttonStatus = false;


          });
        }
    }

    $scope.propertyName = 'title';
    $scope.reverse = true;
    $scope.sortBy = function(propertyName, Order) {
        $scope.reverse = Order;
        $scope.propertyName = propertyName;
        $scope.JobOrder=false;
    };

    $scope.skillImage = $stateParams.skillImage;
    $scope.skillName = $stateParams.skillName;
    JobService.getActiveJob().success(function(Job) {
        $scope.jobtype = Job.data[1]._id;
        if (Job.messageId == 200) {
          $scope.activeJobs = Job.data;
        }
    });

    $scope.getType = function(value) {
        $scope.jobtype = value;
    }

    $scope.pricevalue = '0';
    $scope.getPriceType = function(value) {
        $scope.pricevalue = value;
    }
    $scope.viewlisting = true;
    $scope.viewJob = function(viewMapListing, viewlisting, range, type, jobtype) {
        $scope.listMapToggle=false;
        $scope.listViewToggle=false;
        $ionicLoading.hide();
        $scope.viewMapListing = viewMapListing;
        $scope.viewlisting = viewlisting;
        $cordovaGeolocation.getCurrentPosition(POS_OPTIONS).then(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            putMarkerLastStep(latitude, longitude);
          }, function(err) {
            console.log("asdsa",err);
            var latitude = "";
            var longitude ="";
            putMarkerLastStep(latitude, longitude);
        });

        var putMarkerLastStep = function(latitude, longitude) {
            var myOptions = {
              center: new google.maps.LatLng(latitude, longitude),
              zoom: 10,
              mapTypeId: google.maps.MapTypeId.ROADMAP
              
            };
            if (localStorage.getItem("userData") != null) {
              var userData = JSON.parse(window.localStorage['userData']);
              var userInformation = userData.data;
              // $scope.userInformation=$scope.userData.data;
            }

            var map = new google.maps.Map(document.getElementById("map"), myOptions);
            var job = {};
            var userData = JSON.parse(window.localStorage['userData']);
            var user_id = userData.data._id;
            job.latitude = latitude;
            job.longitude = longitude;
            job.skill = userInformation.skill;
            job.range = range;
            job.type = type;
            job.jobtype = jobtype;
            job.userId=$scope.userInformation._id;
            console.log("map",job)
            JobService.getJobList(job).then(function(jobs) {
              var business_coordinates = jobs.data;
              var loan = 'loan';
              for (var i = 0; i < jobs.data.data.length; i++) {
                var latdata = jobs.data.data[i].location[0].coordinates[0];
                var longdata = jobs.data.data[i].location[0].coordinates[1];

                latlongDataset = new google.maps.LatLng(longdata,latdata);
                var marker = new google.maps.Marker({
                  map: map,
                  title: loan,
                  position: latlongDataset,
                  icon: "img/mark.png"
                });
                map.setCenter(marker.getPosition())

                var content = jobs.data.data[i]._id;
                var infowindow = new google.maps.InfoWindow()
                google.maps.event.addListener(marker, 'click', (function(marker, content, infowindow) {
                  return function() {
                    var date = new Date();
                    $cordovaGeolocation.getCurrentPosition(POS_OPTIONS).then(function(position) {
                        LocationService.getTimezoneByLatLong(position.coords.latitude, position.coords.longitude, (date.getTime() / 10)).then(function(data) {
                          var timezone = data.data.timeZoneId;
                          JobService.JobView(content).then(function(Jobdetail) {
                            // console.log($scope.jobImagePath)
                            if (Jobdetail.data.length == 0) {
                              var windowContent = 'We\'ve No Job on this Address for now.';
                            } else {
                             var windowContent = "<p class='title-names'><span class='map_title'>Job:</span><a class='pink-colo-font' style='text-decoration:none;color:#929292;margin:0px 0px 0px 5px;font-size:12px'  href=#/app/viewjob/" + Jobdetail.data.data._id + ">" + Jobdetail.data.data.title + "</a></p>"
                             // var windowContent = "<p class='title-names'><strong>Job:</strong><a class='pink-colo-font' style='text-decoration:none;color:#929292;margin:0px 0px 0px 5px;font-size:12px'  href=#/app/viewjob/" + Jobdetail.data.data._id + ">" + Jobdetail.data.data.title + "</a></p><div  class='your-Reviews findjobs'> <div class='row'><div class='col'><div class='img-wrap item-avatar' style='min-height:26px'>"
                              // if (Jobdetail.data.data.image) {
                              //   windowContent += "<img  style='position:absolute;top:24px;' class='jobimage map-title'  height='100' widht='100' src=" + $scope.jobImagePath + Jobdetail.data.data.image + ">"
                              // } else if (!Jobdetail.data.data.image) {
                              //   windowContent += "<img  style='position:absolute;top:24px;margin:0px 0px 0px 7px' class='jobimage map-title'' height='100' widht='100' src=" + $scope.serverPath + "/defaultjob.png" + ">"

                              // }
                              windowContent += "</div></div>"
                              windowContent += '</div></div>';

                            }
                            // console.log(data.data.data.length)                                
                            infowindow.setContent(windowContent);
                            infowindow.open(map, marker);
                          });
                        });
                      }, function(err) {
                        latitude = undefined;
                        longitude = undefined;
                      });
                  };
                })(marker, content, infowindow));
                  marker.setMap(map);
                 // infowindow.setMap(map);
                }
            });
        }

    }
    
    // $scope.autocompleteOptions = {
    //                    // componentRestrictions: { country: 'us' },
    //                     types: ['geocode']
    // }

    $scope.jobPost = function(postJob) {
      //console.log("222")
        $ionicLoading.show();
        postJob.creator = $scope.userInformation._id;
        console.log($scope.post)
        
        if ($stateParams.skillId == undefined && !$stateParams.categoryId) {
               postJob.skill = $scope.post.category[0]._id
        } else {
               postJob.skill = $stateParams.skillId;
        }
        if ($stateParams.categoryId!=undefined) {
               postJob.category = $stateParams.categoryId;
        } 
        postJob.jobtype = $scope.jobtype;
        postJob.contract_type = $scope.pricevalue;
        if (postJob.place.formatted_address != undefined && postJob._id == undefined) {
          postJob.address = postJob.place.formatted_address;
          var place = postJob.place;
          postJob.address_var = {};

          if (place.address_components[place.address_components.length - 1].types[0] == 'postal_code') {
            postJob.address_var.zipcode = Number(place.address_components[place.address_components.length - 1].long_name);
          };

          // FINDING COUNTRY
          if (place.address_components[place.address_components.length - 1].types[0] == 'country' ||
            place.address_components[place.address_components.length - 2].types[0] == 'country') {
            if (place.address_components[place.address_components.length - 1].types[0] == 'country') {
              postJob.address_var.country = place.address_components[place.address_components.length - 1].long_name;
            } else {
              postJob.address_var.country = place.address_components[place.address_components.length - 2].long_name;
            }
          };

          // FINDING STATE
          if (place.address_components[place.address_components.length - 1].types[0] == 'administrative_area_level_1' ||
            place.address_components[place.address_components.length - 2].types[0] == 'administrative_area_level_1' ||
            place.address_components[place.address_components.length - 3].types[0] == 'administrative_area_level_1') {

            if (place.address_components[place.address_components.length - 1].types[0] == 'administrative_area_level_1') {
              postJob.address_var.state = place.address_components[place.address_components.length - 1].long_name;
            } else if (place.address_components[place.address_components.length - 2].types[0] == 'administrative_area_level_1') {
              postJob.address_var.state = place.address_components[place.address_components.length - 2].long_name;
            } else {
              postJob.address_var.state = place.address_components[place.address_components.length - 3].long_name;
            }
          };

          // FINDING CITY
          if (place.address_components[place.address_components.length - 1].types[0] == 'administrative_area_level_2' ||
            place.address_components[place.address_components.length - 2].types[0] == 'administrative_area_level_2' ||
            place.address_components[place.address_components.length - 3].types[0] == 'administrative_area_level_2' ||
            place.address_components[place.address_components.length - 4].types[0] == 'administrative_area_level_2' ||
            place.address_components[place.address_components.length - 1].types[0] == 'sublocality_level_1' ||
            place.address_components[place.address_components.length - 2].types[0] == 'sublocality_level_1' ||
            place.address_components[place.address_components.length - 3].types[0] == 'sublocality_level_1' ||
            place.address_components[place.address_components.length - 4].types[0] == 'sublocality_level_1') {
            if (place.address_components[place.address_components.length - 1].types[0] == 'administrative_area_level_2' ||
              place.address_components[place.address_components.length - 1].types[0] == 'sublocality_level_1') {
              postJob.address_var.city = place.address_components[place.address_components.length - 1].long_name;
            } else if (place.address_components[place.address_components.length - 2].types[0] == 'administrative_area_level_2' ||
              place.address_components[place.address_components.length - 2].types[0] == 'sublocality_level_1') {
              postJob.address_var.city = place.address_components[place.address_components.length - 2].long_name;
            } else if (place.address_components[place.address_components.length - 3].types[0] == 'administrative_area_level_2' ||
              place.address_components[place.address_components.length - 3].types[0] == 'sublocality_level_1') {
              postJob.address_var.city = place.address_components[place.address_components.length - 3].long_name;
            } else {
              postJob.address_var.city = place.address_components[place.address_components.length - 4].long_name;
            }
          };
          var promise = LocationService.getLatLongByLocation(postJob.address);
          promise.then(function(payload) {
            console.log(payload)
            var address = {};
            postJob.location = {};
            postJob.location.type = {};
            var userLocationData = payload.data;
            postJob.latitude = payload.data.results[0].geometry.location.lat;
            postJob.longitude = payload.data.results[0].geometry.location.lng;
            postJob.location.type = "Point";
            postJob.location.coordinates = [postJob.longitude,postJob.latitude]
            postJob.image = $scope.Jobimage;
            console.log("asdas",postJob)
            if ($scope.pricevalue == 0) {
              postJob.hours = 0;
            }
            JobService.createJob(postJob).success(
              function(data) {
                $ionicLoading.hide();
                if (data.messageId == 200) {

                  var alertPopup = $ionicPopup.alert({
                    title: 'Success!',
                    template: 'Your job has been added successfully.',
                    buttons: [{
                      text: '<b>Ok</b>',
                      type: 'pink-white-theme-color'
                    }]
                  });
                  $state.go('app.myjob')
                } else {
                  $ionicLoading.hide();
                  var alertPopup = $ionicPopup.alert({
                    title: 'Error!',
                    template: data.message,
                    buttons: [{
                      text: '<b>Ok</b>',
                      type: 'pink-white-theme-color'
                    }]
                  });
                }

              });
          });
        } else if (postJob.place.formatted_address != undefined) {

          postJob.address = postJob.place.formatted_address;
          var place = postJob.place;
          postJob.address_var = {};

          if (place.address_components[place.address_components.length - 1].types[0] == 'postal_code') {
            postJob.address_var.zipcode = Number(place.address_components[place.address_components.length - 1].long_name);
          };

          // FINDING COUNTRY
          if (place.address_components[place.address_components.length - 1].types[0] == 'country' ||
            place.address_components[place.address_components.length - 2].types[0] == 'country') {
            if (place.address_components[place.address_components.length - 1].types[0] == 'country') {
              postJob.address_var.country = place.address_components[place.address_components.length - 1].long_name;
            } else {
              postJob.address_var.country = place.address_components[place.address_components.length - 2].long_name;
            }
          };

          // FINDING STATE
          if (place.address_components[place.address_components.length - 1].types[0] == 'administrative_area_level_1' ||
            place.address_components[place.address_components.length - 2].types[0] == 'administrative_area_level_1' ||
            place.address_components[place.address_components.length - 3].types[0] == 'administrative_area_level_1') {

            if (place.address_components[place.address_components.length - 1].types[0] == 'administrative_area_level_1') {
              postJob.address_var.state = place.address_components[place.address_components.length - 1].long_name;
            } else if (place.address_components[place.address_components.length - 2].types[0] == 'administrative_area_level_1') {
              postJob.address_var.state = place.address_components[place.address_components.length - 2].long_name;
            } else {
              postJob.address_var.state = place.address_components[place.address_components.length - 3].long_name;
            }
          };

          // FINDING CITY
          if (place.address_components[place.address_components.length - 1].types[0] == 'administrative_area_level_2' ||
            place.address_components[place.address_components.length - 2].types[0] == 'administrative_area_level_2' ||
            place.address_components[place.address_components.length - 3].types[0] == 'administrative_area_level_2' ||
            place.address_components[place.address_components.length - 4].types[0] == 'administrative_area_level_2' ||
            place.address_components[place.address_components.length - 1].types[0] == 'sublocality_level_1' ||
            place.address_components[place.address_components.length - 2].types[0] == 'sublocality_level_1' ||
            place.address_components[place.address_components.length - 3].types[0] == 'sublocality_level_1' ||
            place.address_components[place.address_components.length - 4].types[0] == 'sublocality_level_1') {
            if (place.address_components[place.address_components.length - 1].types[0] == 'administrative_area_level_2' ||
              place.address_components[place.address_components.length - 1].types[0] == 'sublocality_level_1') {
              postJob.address_var.city = place.address_components[place.address_components.length - 1].long_name;
            } else if (place.address_components[place.address_components.length - 2].types[0] == 'administrative_area_level_2' ||
              place.address_components[place.address_components.length - 2].types[0] == 'sublocality_level_1') {
              postJob.address_var.city = place.address_components[place.address_components.length - 2].long_name;
            } else if (place.address_components[place.address_components.length - 3].types[0] == 'administrative_area_level_2' ||
              place.address_components[place.address_components.length - 3].types[0] == 'sublocality_level_1') {
              postJob.address_var.city = place.address_components[place.address_components.length - 3].long_name;
            } else {
              postJob.address_var.city = place.address_components[place.address_components.length - 4].long_name;
            }
          };
          var promise = LocationService.getLatLongByLocation(postJob.address);
          promise.then(function(payload) {
            var address = {};
            postJob.location = {};
            postJob.location.type = {};
            var userLocationData = payload.data;
            postJob.latitude = payload.data.results[0].geometry.location.lat;
            postJob.longitude = payload.data.results[0].geometry.location.lng;
            postJob.location.type = "Point";
            postJob.location.coordinates = [postJob.longitude,postJob.latitude]
            postJob.image = $scope.Jobimage;
            console.log("edit",postJob)
            if ($scope.pricevalue == 0) {
              postJob.hours = 0;
            }
            JobService.updateJob(postJob).success(
              function(data) {
                $ionicLoading.hide();
                if (data.messageId == 200) {

                  var alertPopup = $ionicPopup.alert({
                    title: 'Success!',
                    template: 'Your job has been updated successfully.',
                    buttons: [{
                      text: '<b>Ok</b>',
                      type: 'pink-white-theme-color'
                    }]
                  });
                  $state.go('app.myjob')
                } else {
                  $ionicLoading.hide();
                  var alertPopup = $ionicPopup.alert({
                    title: 'Error!',
                    template: data.message,
                    buttons: [{
                      text: '<b>Ok</b>',
                      type: 'pink-white-theme-color'
                    }]
                  });
                }

              });
          });


        } else {
          postJob.address = postJob.place;
          postJob.image = $scope.Jobimage;
          if ($scope.pricevalue == 0) {
            postJob.hours = 0;
          }
          console.log($scope.pricevalue)
          //console.log("asdas",postJob.undefined)
          JobService.updateJob(postJob).success(
            function(data) {
              $ionicLoading.hide();
              if (data.messageId == 200) {

                var alertPopup = $ionicPopup.alert({
                  title: 'Success!',
                  template: 'Your job has been updated successfully.',
                  buttons: [{
                    text: '<b>Ok</b>',
                    type: 'pink-white-theme-color'
                  }]
                });
                $state.go('app.myjob')
              } else {
                if(postJob.address_var==undefined){
                      $ionicLoading.hide();
                      var alertPopup = $ionicPopup.alert({
                      title: 'Error!',
                      template: 'Location not valid!',
                      buttons: [{
                        text: '<b>Ok</b>',
                        type: 'pink-white-theme-color'
                      }]
                    });

                }else{
                  $ionicLoading.hide();
                   var alertPopup = $ionicPopup.alert({
                  title: 'Error!',
                  template: data.message,
                  buttons: [{
                    text: '<b>Ok</b>',
                    type: 'pink-white-theme-color'
                  }]
                });

                }
                
              }

            });
        }
    }
    $scope.cameraOptions = function() {
        var hideSheet = $ionicActionSheet.show({
          buttons: [{
            text: 'Gallery'
          }, {
            text: 'Camera'
          }],
          titleText: 'Choose option',
          cancelText: 'Cancel',
          cancel: function() {
            // add cancel code..
          },
          buttonClicked: function(index) {
            var options = {
              //allowEdit : true,
              quality: 80,
              destinationType: Camera.DestinationType.DATA_URL, // FILE_URI, DATA_URL
              sourceType: index, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
              encodingType: 0, // 0=JPG 1=PNG
              correctOrientation: true,
              targetHeight: 600,
              targetWidth: 600
            }
            navigator.camera.getPicture($scope.onSuccess, $scope.onFail, options);
            return true;
          }
        });
    };
    $scope.onSuccess = function(DATA_URL) {
        $scope.Jobimage = image;
          // console.log(image);
        

      var image = document.getElementById('profileImage');
      
      $scope.Jobimage = "data:image/jpeg;base64," + DATA_URL;
      
      image.src = "data:image/jpeg;base64," + DATA_URL;
      image.style.display = "block";
      document.getElementById('fbprofileImage').style.display = "none";




        // $jrCrop.crop({
        //   url: "data:image/jpeg;base64," + DATA_URL,
        //   width: 204,
        //   height: 140
        // }).then(function(canvas) {
        //   // success!
        //   var image = canvas.toDataURL();
        //   $scope.Jobimage = image;
        //   // console.log(image);
        //   var image = document.getElementById('profileImage');
        //   image.src = "data:image/jpeg;base64," + DATA_URL;
        //   image.style.display = "block";
        //   document.getElementById('fbprofileImage').style.display = "none";
        //   var unbindWatch = $scope.$watch(function() {
        //     if ($ionicSideMenuDelegate.isOpen()) {
        //       $ionicSideMenuDelegate.toggleLeft(false);
        //     }
        //   });
        //   setTimeout(function() {
        //     unbindWatch();
        //   }, 1000);

        // }, function() {
        //   // User canceled or couldn't load image.
        // });
    };
    $scope.onFail = function(e) {
        console.log("On fail " + e);
    }
  })
  /* MakeOffer Controller*/
  .controller('MakeOfferCtrl', function($scope, $state, $location, OfferService, JobService, $ionicLoading, $ionicPopup, $ionicModal, $stateParams, $ionicPopover,OfferService) {
    if (localStorage.getItem("userData") != null) {
      $scope.userData = JSON.parse(window.localStorage['userData']);
      $scope.userInformation = $scope.userData.data;
    }
    $scope.findJobdetail = function() {
      if ($stateParams.postId) {
        JobService.GetDetailJob($stateParams.postId).success(function(data) {
          $scope.job = data.data;
          console.log($scope.job)
        });
      }
    }
    if($stateParams.offerId!=undefined){
     $scope.offerId=$stateParams.offerId;
      OfferService.OffersDetail($stateParams.offerId).success(function(offerDetail) {
          $ionicLoading.hide();
          console.log(offerDetail)
          if (offerDetail.messageId == 200) {
            //console.log(Skills)
            $scope.offerDetail = offerDetail.data;
            $scope.offer = offerDetail.data;

            console.log($scope.offerDetail)
          }
        });
    }
    $scope.updateOffer = function(offer) {
      $ionicLoading.show();
      var offerData = {};
      offerData.userid = $scope.userInformation._id;
      offerData.jobid = $stateParams.postId;
      offerData._id = $stateParams.offerId;
      offerData.budget = offer.budget;
      offerData.comment = offer.comment;
      OfferService.EditOffer(offerData).success(function(data) {
        
        if (data.messageId == 200) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Success!',
            template: 'Your offer has been posted successfully.',
            buttons: [{
              text: '<b>Ok</b>',
              type: 'pink-white-theme-color'
            }]
          });
          $location.path("app/viewjob/" + data.data.jobid[0]._id)
        } else {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Error!',
            template: data.message,
            buttons: [{
              text: '<b>Ok</b>',
              type: 'pink-white-theme-color'
            }]
          });
        }
      })
    }
    $scope.creatOffer = function(offer) {
      $ionicLoading.show();
      var offerData = {};
      offerData.userid = $scope.userInformation._id;
      offerData.jobid = $stateParams.postId;
      offerData.budget = offer.budget;
      offerData.comment = offer.comment;
      OfferService.createOffer(offerData).success(function(data) {
        $ionicLoading.hide();
        if (data.messageId == 200) {

          var alertPopup = $ionicPopup.alert({
            title: 'Success!',
            template: 'Your offer has been posted successfully.',
            buttons: [{
              text: '<b>Ok</b>',
              type: 'pink-white-theme-color'
            }]
          });
          console.log(data)
          $location.path("app/viewjob/" + data.data.jobid[0])
        } else {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Error!',
            template: data.message,
            buttons: [{
              text: '<b>Ok</b>',
              type: 'pink-white-theme-color'
            }]
          });
        }
      })
    }
  })
  /* Job View Controller*/
  .controller('JobViewCtrl', function($scope, $state, $ionicModal, $stateParams, OfferService, JobService, PaymentService, Comments, $ionicPopup, $ionicLoading, $timeout, $cordovaGeolocation) {
    $scope.$on('$ionicView.loaded', function() {
      $ionicLoading.show();
    });

    $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };
 
    $ionicModal.fromTemplateUrl('jobprocess.html', {
      scope: $scope,
    }).then(function(modal) {
      $scope.jobProcess = modal;
    });

    $scope.openjobProcess = function(jobId,workStatus) {
      $scope.popupJobId=jobId;
      $scope.popupWorkStatus=workStatus;
      $scope.jobProcess.show();
    };

    $scope.closejobProcess = function() {
      $scope.jobProcess.hide();
    };

 
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    $scope.showImage = function() {
      $scope.openModal();
    }
    $scope.viewOffer = function(jobId,offerId) {
      $state.go('app.acceptoffer', {
          "jobId": jobId,
          "offerId":offerId
        })
    }
    $scope.viewComment = function(jobId,creatorId,commentId) {
        $state.go('app.comment', {
           "jobId": jobId,
           "authorId": creatorId,
            "commentId": commentId
         })
    }
    $scope.bankStatus = function(userStripeId, jobId) {
      if (userStripeId == undefined) {
        var alertPopup = $ionicPopup.alert({
          title: 'Bank Credtential',
          template: 'Please add bank credentials.',
          buttons: [{
            text: '<b>Ok</b>',
            type: 'pink-white-theme-color'
          }]
        });
        alertPopup.then(function(res) {
          $state.go('app.payment')

        });

      } else {
        $state.go('app.makeoffer', {
          "postId": jobId
        });

      }
    }
    $scope.$on('$ionicView.enter', function() {
      $timeout(function() {
        $ionicLoading.hide();
      }, 1000);
    });

    $scope.formatNumber = function(i) {
      return Math.round(i * 100) / 100;
    }

    if (localStorage.getItem("userData") === null) {
      $state.go('signin');
    } else {
      $scope.userData = JSON.parse(window.localStorage['userData']);
      $scope.userInformation = $scope.userData.data;
    }
    if ($stateParams.jobId != "" && $stateParams.jobId != undefined) {
      JobService.JobView($stateParams.jobId).then(function(job) {
        $scope.job = job.data.data;
        if ($scope.job != undefined && $scope.job.creator[0]._id == $scope.userInformation._id) {

          OfferService.offerCountUpdate(jobData).success(function(status) {
            if (status.messageId == 200) {}
          });

        }
      });
    }

    $scope.editOffer=function(postId,offerId){
      $state.go("app.editoffer",{
        "postId":postId,
        "offerId":offerId
      })
    }
    if ($stateParams.jobId != undefined && $stateParams.jobId != "") {
      OfferService.OffersList($stateParams.jobId).then(function(offers) {
        $scope.offers = offers.data.data;
        console.log($scope.offers)
        $scope.userIds = [];
        angular.forEach($scope.offers, function (value, key) {
              //console.log(value.userid[0]._id)
              $scope.userIds.push(value.userid[0]._id);
          });
        
        $scope.makeOfferStatus=1;
        if($scope.userIds.indexOf($scope.userInformation._id) !== -1) {
         $scope.makeOfferStatus = 0;
        }
        

        console.log($scope.userIds)
        $scope.currentDate = new Date();
        $scope.previousDay = new Date($scope.currentDate);
        $scope.previousDay.setDate($scope.currentDate.getDate() - 1);
      });
      Comments.getJobs($stateParams.jobId).success(function(comments) {
        console.log("Offers")
        console.log(comments)
        $scope.comments = comments.data;

      });
      Comments.getCommentThread($stateParams.jobId, $scope.userInformation._id).success(function(commentThreadId) {
        $scope.commentThreadId = '';
        console.log(commentThreadId)
        if (commentThreadId.data != undefined && commentThreadId.data.length > 0) {
          $scope.commentThreadId = commentThreadId.data[0]._id;
          console.log($scope.commentThreadId)
        }
      });
    }

    var jobData = {}
    jobData.data = [{
      "jobid": $stateParams.jobId,
      "is_read": true
    }];

    $scope.deleteThread = function(threadId) {

      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete',
        template: 'Are you sure you want to delete this chat?'
      });
      confirmPopup.then(function(res) {
        if (res) {
          $ionicLoading.show();
          deleteThread = {}
          deleteThread.data = [{
            id: threadId,
            is_deleted: true
          }];
          Comments.deleteCommentThread(deleteThread).success(function(commentThreadId) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Success!',
              template: 'Comment Thread been deleted successfully!',
              buttons: [{
                text: '<b>Ok</b>',
                type: 'pink-white-theme-color'
              }]
            });
            $state.go($state.current, {}, {
              reload: true
            });
          });
        }
      });
    }
    $scope.changeJobStatus = function(jobId, jobStatus) {
    //  console.log(jobStatus)

      jobData = {};
      jobData.data = [{
        "id": jobId,
        "work_status": jobStatus
      }];
      if (jobStatus == 4) {

        jobData.data = [{
          "id": jobId,
          "job_status": 3,
          "work_status": jobStatus
        }];
      } else {
        jobData.data = [{
          "id": jobId,
          "work_status": jobStatus
        }];
      }
      JobService.DeleteJob(jobData).success(function(data) {
        $state.go('app.myjob')
      });
    }

    $scope.data = {
      rating: 1,
      max: 5
    }
    $scope.offerDetail={};
    //$scope.offerDetail.userid=[];
    //$scope.offerDetail.userid=[{first_name:$scope.job.winner_offer[0].first_name,last_name:$scope.job.winner_offer[0].last_name}];
   
    // Create the rating modal 
    $ionicModal.fromTemplateUrl('templates/users/rate.html', {
      id: '1',
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal1 = modal;
    });

    // Open the rating modal
    $scope.rate = function() {
      $scope.oModal1.show();
      
      $scope.offerDetail.userid=[];
      $scope.offerDetail.userid=[{first_name:$scope.job.winner[0].first_name,last_name:$scope.job.winner[0].last_name}];
    //console.log('$scope.offerDetail',$scope.offerDetail);
    };
    $scope.closeLogin = function() {
      $scope.oModal1.hide();
    };
    
     //console.log('$scope.offerDetail',$scope.job);
    

    $scope.postRating = function(data) {
      //console.log()
      var ratingData = {};
      ratingData.rating = {};
      ratingData.user_id = $scope.job.winner[0]._id
      ratingData.rating.job_author_id = $scope.job.creator[0]._id;
      ratingData.rating.job_id = $scope.job._id;
      ratingData.rating.offer_id = $scope.job.winner_offer[0]._id;
      ratingData.rating.review = data.review
      ratingData.rating.max = 5
      console.log('ratingData',ratingData);
      OfferService.getDynamicRating().then(function(value) {
        ratingData.rating.value = value;
        //ratingData.user_id = value._id
        console.log(value)

        $scope.newRating = console.log('New rating valuekey: "value",  '+value);
        OfferService.postRatingOnProfile(ratingData).success(function(data) {

          console.log("after rating data ",data);

          $ionicLoading.hide();

          if (data.messageId == 200) {

            var alertPopup = $ionicPopup.alert({
              title: 'Rated Successfully!',
              template: 'Your rating has been posted successfully.',
              buttons: [{
                text: '<b>Ok</b>',
                type: 'pink-white-theme-color'
              }]
            });

          // $state.go('app.viewjob', {
          // "jobId": $scope.job._id
          // });
          $state.go('app.myjob');
          } else {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Anonymously failed!',
              template: 'Oop\'s! it seems like something went wrong.',
              buttons: [{
                text: '<b>Ok</b>',
                type: 'pink-white-theme-color'
              }]
            });
          }

          $scope.closeLogin();

        });
      });
    };

    $scope.approvedJob = function(JobId) {
      $ionicLoading.show();
      var jobData = {};
      jobData.job_id = JobId;
      jobData.job_id = JobId;

      PaymentService.fundTransfer(jobData).success(function(response) {
        $ionicLoading.hide();
        //  console.log(creditCard) 
        if (response.messageId == 200) {
          var alertPopup = $ionicPopup.alert({
            title: 'Success!',
            template: 'Payment has been transfered successfully!',
            buttons: [{
              text: '<b>Ok</b>',
              type: 'pink-white-theme-color'
            }]
          });
          alertPopup.then(function(res) {
            console.log('Tapped!');
            $scope.rate();
            //$state.go('app.postlist')

          });
        } else {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Error!',
            template: response.message,
            buttons: [{
              text: '<b>Ok</b>',
              type: 'pink-white-theme-color'
            }]
          });
          alertPopup.then(function(res) {
            console.log('Tapped!');
          });
        }

      });
    }
  })
  /* Home Controller*/
  .controller('HomeCtrl', function($scope, $state, $ionicLoading, $cordovaGeolocation,$ionicActionSheet, $ionicSideMenuDelegate, $jrCrop, $rootScope, LoginService,$ionicPopup, UserService, IonicClosePopupService) {
    $ionicLoading.show();
    var myPopup;
    var mycoverPopup;
    $scope.getNumber = function(n) {
        return new Array(n);
    };
    if (localStorage.getItem("userData") != null) {
        $ionicLoading.hide();
        $scope.userData = JSON.parse(window.localStorage['userData']);
        LoginService.userDetail($scope.userInformation._id).success(function(userStatusData) {
          if (userStatusData.messageId == 200) {
            localStorage.setItem('userData', JSON.stringify(userStatusData));
            $scope.userInformation = userStatusData.data;
             console.log($scope.userInformation )
          }
        });
        // $scope.userInformation = $scope.userData.data;
        // console.log($scope.userInformation )
        UserService.getJobsCount($scope.userInformation._id).success(function(jobsCount) {
          $ionicLoading.hide();
          console.log(jobsCount)
          if (jobsCount.messageId == 200) {
            //console.log(Jobs)
            $scope.complted_job = jobsCount.complted_job;
            $scope.posted_job = jobsCount.posted_job;
            $scope.review = jobsCount.review;
            $scope.reviewList = jobsCount.review_list;

            $scope.profile_rating_plus = parseInt(jobsCount.profile_rating);
            $scope.profile_rating_half = parseFloat(jobsCount.profile_rating - parseInt(jobsCount.profile_rating));

            $scope.profile_rating_loss = parseInt(5 - jobsCount.profile_rating);

          }
        });
    }
    $scope.findJobbySkills=function(skill){ 
     $state.go('app.postlistskill',{"skId": skill})
    }   
    $scope.completedJobs=function(userId){
      $state.go('app.myjoblist',{"userId":userId})
    } 
    $scope.myJobs=function(){
      $state.go('app.myjob')
    } 
    $scope.myReviews=function(userId){
        $state.go('app.review',{"userId":userId})
    } 
    $scope.cameraOptions = function() {
        var hideSheet = $ionicActionSheet.show({
          buttons: [{
            text: 'Gallery'
          }, {
            text: 'Camera'
          }],
          titleText: 'Choose option',
          cancelText: 'Cancel',
          cancel: function() {
            // add cancel code..
          },
          buttonClicked: function(index) {
            var options = {
              //allowEdit : true,
              quality: 80,
              destinationType: Camera.DestinationType.DATA_URL, // FILE_URI, DATA_URL
              sourceType: index, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
              encodingType: 0, // 0=JPG 1=PNG
              correctOrientation: true,
              targetHeight: 600,
              targetWidth: 600
            }
            navigator.camera.getPicture($scope.onSuccess, $scope.onFail, options);
            return true;
          }
        });
    };
    $scope.covercameraOptions = function() {
        var hideSheet = $ionicActionSheet.show({
          buttons: [{
            text: 'Gallery'
          }, {
            text: 'Camera'
          }],
          titleText: 'Choose option',
          cancelText: 'Cancel',
          cancel: function() {
            // add cancel code..
          },
          buttonClicked: function(index) {
            var options = {
              //  allowEdit : true,
              quality: 80,
              destinationType: Camera.DestinationType.DATA_URL, // FILE_URI, DATA_URL
              sourceType: index, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
              encodingType: 0, // 0=JPG 1=PNG
              correctOrientation: true,
              targetHeight: 600,
              targetWidth: 600
            }
            navigator.camera.getPicture($scope.onCoverSuccess, $scope.onCoverFail, options);
            return true;
          }
        });
    };
    $scope.onSuccess = function(DATA_URL) {
        $jrCrop.crop({
          url: "data:image/jpeg;base64," + DATA_URL,
          circle: true,
          width: 250,
          height: 250
        }).then(function(canvas) {
          // success!
          var image = canvas.toDataURL();
          $scope.picData = image;
          //console.log(image);
          var proimage = document.getElementById('profileImage');
          proimage.src = image;
          proimage.style.display = "block";
          document.getElementById('fbprofileImage').style.display = "none";
          var unbindWatch = $scope.$watch(function() {
            if ($ionicSideMenuDelegate.isOpen()) {
              $ionicSideMenuDelegate.toggleLeft(false);
            }
          });
          setTimeout(function() {
            unbindWatch();
          }, 1000);


          $scope.updateUserImage($scope.picData, 2)
        }, function() {
          // User canceled or couldn't load image.
        });
    };
    $scope.onFail = function(e) {
        console.log("On fail " + e);
    }
    $scope.onCoverSuccess = function(DATA_URL) {
        $jrCrop.crop({
          url: "data:image/jpeg;base64," + DATA_URL,
          width: 411,
          height: 146
        }).then(function(canvas) {
          var image = canvas.toDataURL();
          $scope.coverImageData = image;
          //console.log("data:image/jpeg;base64," + DATA_URL);
          var proimage = document.getElementById('cvImg');
          proimage.src = image;
          proimage.style.display = "block";
          document.getElementById('coverprofileImage').style.display = "none";
          $scope.updateUserImage($scope.coverImageData, 1)


          var unbindWatch = $scope.$watch(function() {
            if ($ionicSideMenuDelegate.isOpen()) {
              $ionicSideMenuDelegate.toggleLeft(false);
            }
          });
          setTimeout(function() {
            unbindWatch();
          }, 1000);



        }, function() {
          // User canceled or couldn't load image.
        });
    };
    $scope.onCoverFail = function(e) {
        console.log("On fail " + e);
    }
    $scope.updateUserImage = function(image, type) {
        $ionicLoading.show();
        var imageData = {}
        imageData.user_id = $scope.userInformation._id;
        if (type == 1) {
          imageData.cover_image = image

        } else {
          imageData.prof_image = image
        }
        
        UserService.userUpdateImage(imageData).success(function(imageResponse) {
          if (imageResponse.messageId == 200) {
            $ionicLoading.hide();
            localStorage.setItem('userData', JSON.stringify(imageResponse));
            if (localStorage.getItem("userData") != null) {
              $scope.userData = JSON.parse(window.localStorage['userData']);
              $scope.userInformation = $scope.userData.data;
            }

          }
        });
      }
  })
  /* UserProfile Controller*/
  .controller('UserProfileCtrl', function($scope,$state, $stateParams, $ionicLoading, LoginService, UserService) {
    if ($stateParams.userId != '' && $stateParams.userId != undefined) {
      UserService.getJobsCount($stateParams.userId).success(function(jobsCount) {
        $ionicLoading.hide();
        if (jobsCount.messageId == 200) {
          $scope.complted_job = jobsCount.complted_job;
          $scope.posted_job = jobsCount.posted_job;
          $scope.review = jobsCount.review;
          $scope.reviewList = jobsCount.review_list;
        }
      });
      $scope.myReviews=function(userId){
        $state.go('app.review',
        {
          "userId":userId

        })
      } 
      LoginService.userDetail($stateParams.userId).success(function(userData) {
          if (userData.messageId == 200) {
            $scope.userInfo = userData.data;
            if (userData.data.rating.length > 0) {
              $scope.profile_rating_plus = parseInt(userData.data.rating[0].value);
              $scope.profile_rating_half = parseFloat(userData.data.rating[0].value - parseInt(userData.data.rating[0].value));
              $scope.profile_rating_loss = parseInt(5 - userData.data.rating[0].value);
            }
          }
      });
    }
  })
  /* Message Controller*/
  .controller('MsgCtrl', function($scope, $rootScope, $ionicPlatform, $cordovaNativeAudio, $state, $ionicHistory, $timeout, socket, $sanitize, $ionicScrollDelegate, $ionicLoading, $filter, $ionicModal, $stateParams, $ionicPopup, LoginService, MessageService) {
    if (localStorage.getItem("userData") != null) {
      $scope.userData = JSON.parse(window.localStorage['userData']);
      $scope.userInformation = $scope.userData.data;

    }  
    $scope.profileImagePath = PROFILE_IMAGE;
    socket.emit("getOnline", "type");
    $scope.allUsers = [];
    socket.on('usernames', function(data) {
        $scope.allUsers = data;
        if ($scope.contactLists != undefined) {
          angular.forEach($scope.contactLists, function(value, key) {
            if (value._id != undefined) {
              if ($scope.allUsers.indexOf(value._id) > -1) {
                $scope.contactLists[key].userStatus = 'online'
                 
              } else {
                $scope.contactLists[key].userStatus = 'offline'
              }
            }
          });
        }
        if ($scope.userInfo != undefined) {
          if ($scope.allUsers.indexOf($scope.userInfo._id) > -1) {
            $scope.userInfo.userStatus = 'online'
          } else {
            $scope.userInfo.userStatus = 'offline'
          }     
        }
      });

    var self = this;
    var typing = false;
    var lastTypingTime;
    var TYPING_TIMER_LENGTH = 400;
    connected = true
    self.typemessages = []
    socket.on('typing', function(data) {
        console.log("@@@@",data)
        addChatTyping(data);
    });

      // Whenever the server emits 'stop typing', kill the typing message
    socket.on('stop typing', function(data) {
        removeChatTyping(data.username);
    });
     
    $scope.updateTyping = function(userId) {
        sendUpdateTyping(userId)
    }

      // Updates the typing event
    function sendUpdateTyping(userId) {
        //console.log(userId)
        //console.log(115)
        if (connected) {
          if (!typing) {
            console.log(116)
            typing = true;
            socket.emit('typing', {
              from: $scope.userInformation.first_name,
              fromId: $scope.userInformation._id,
              to: userId
            });
          }
        }
        lastTypingTime = (new Date()).getTime();
        $timeout(function() {
          var typingTimer = (new Date()).getTime();
          var timeDiff = typingTimer - lastTypingTime;
          if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
            socket.emit('stop typing', {
              from: $scope.userInformation.first_name,
              fromId: $scope.userInformation._id,
              to: userId
            });
            typing = false;
          }
        }, TYPING_TIMER_LENGTH)
      }
    function addChatTyping(data) {
        addMessageToList(data.username, data.fromId, true, "typing...");
    }

      // Removes the visual chat typing message
    function removeChatTyping(username) {
        self.typemessages = self.typemessages.filter(function(element) {
          return element.username != username || element.content != "typing..."
        })
        $scope.typemessages = self;
    }

      //Generate color for the same user.
    function getUsernameColor(username) {
        // Compute hash code
        var hash = 7;
        for (var i = 0; i < username.length; i++) {
          hash = username.charCodeAt(i) + (hash << 5) - hash;
        }
        // Calculate color
        var index = Math.abs(hash % COLORS.length);
        return COLORS[index];
    }

      // Display message by adding it to the message list
    function addMessageToList(username, fromId, style_type, message) {
        username = $sanitize(username)
        removeChatTyping(username)
        var color = style_type ? getUsernameColor(username) : null
        self.typemessages.push({
          content: $sanitize(message),
          fromId: fromId,
          style: style_type,
          username: username,
          color: color
        })
        $scope.typemessages = self;
        $rootScope.$broadcast('showtyping', $scope.typemessages)
         
    }
    $rootScope.$on('showtyping', function(event, data) {
        $scope.$apply(function() {
          $scope.typemessages = data;
          console.log($scope.typemessages)
        });
    });
    $scope.currentDate = new Date();
    $scope.previousDay = new Date($scope.currentDate);
    $scope.previousDay.setDate($scope.currentDate.getDate() - 1);
    $scope.msgList = true;
    $scope.cntList = false;
    $scope.messageList = function() {
        $scope.msgList = true;
        $scope.cntList = false;
    }
    $scope.contactList = function() {
        $scope.msgList = false;
        $scope.cntList = true;
    }
    $scope.msgId = $stateParams.msgId;
    $scope.msgform = function(recieverId, msgId=null) {
          MessageService.userThread($scope.userInformation._id, recieverId).success(function(threadData) {
            console.log(threadData.data.length)
            if (threadData.messageId == 200) {
              if (threadData.data.length > 0) {

                $state.go('app.messageform', {
                  "Id": recieverId,
                  "msgId": threadData.data[0]._id
                })

              } else {

                $state.go('app.messageform', {
                  "Id": recieverId,
                  "msgId": msgId
                })
              }
            }
          });
    }
    $scope.msgthred = function(recieverId, msgId) {
        $state.go('app.messageform', {
          "Id": recieverId,
          "msgId": msgId
        })
    }
    if($stateParams.Id != undefined) {
        $scope.RecieverId = $stateParams.Id
        LoginService.userDetail($scope.RecieverId).success(function(userData) {
          if (userData.messageId == 200) {
            $scope.userInfo = userData.data;
            if ($scope.userInfo != undefined) {
              if ($scope.allUsers.indexOf($scope.userInfo._id) > -1) {
                $scope.userInfo.userStatus = 'online'
              } else {
                $scope.userInfo.userStatus = 'offline'
              }
            }
          }
        });
    }
    if ($stateParams.msgId != undefined) {
        MessageService.messageThread($scope.userInformation._id, $stateParams.msgId).success(function(data) {
          $ionicLoading.hide();
          if (data.messageId == 200) {
            $scope.messages = data.data[0];
            $timeout(function() {

              $ionicScrollDelegate.$getByHandle('userMessageScroll').scrollBottom(true);

            }, 0);
          }
        });

    }
    $scope.messages = {}
    $scope.messages.message = []
    socket.on('receive', function(msgs) {
        var pushMessage = {
          "senderid": {
            "_id": $stateParams.Id,

          },
          "recieverid": $scope.userInformation._id,
          "text": msgs.message,
          "_id": "57edff80234426c664d800c5",
          "created_date": new Date(),
          "is_deleted": false,
          "is_read": false
        };
        if (msgs.user_id == $stateParams.Id && msgs.to == $scope.userInformation._id) {
          $scope.messages.message.push(pushMessage);

        }
        $timeout(function() {
          $ionicScrollDelegate.$getByHandle('userMessageScroll').scrollBottom(true);
        }, 0);
    });
    socket.on('send', function(msgs) { 
    });
    $scope.postMessage = function(message, msgId) {
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
        var messageData = {}
        messageData.senderid = $scope.userInformation._id;
        messageData.recieverid = $stateParams.Id;

    socket.emit('chat message', $scope.userInformation.first_name + " " + $scope.userInformation.last_name, $scope.userInformation._id, $stateParams.Id, message);
        if (msgId == undefined || msgId == "") {
          messageData.message = {};
          messageData.message.senderid = $scope.userInformation._id;
          messageData.message.recieverid = $stateParams.Id;
          messageData.message.text = message;
          console.log(messageData)

          MessageService.messageAdd(messageData).success(function(data) {

            $scope.msgId = data.data._id;
            var pushMessage = {
              "senderid": {
                "_id": $scope.userInformation._id,

              },
              "recieverid": messageData.recieverid,
              "text": message,
              "_id": "57edff80234426c664d800c5",
              "created_date": new Date(),
              "is_deleted": false,
              "is_read": false
            };
            $scope.messages.message.push(pushMessage);
          });
        } else {
          messageData.text = message;
          messageData._id = msgId;
          MessageService.messageReply(messageData).success(function(messageThread) {
            //console.log(messageThread)
            if (messageThread.messageId == 200) {

              // $scope.messageThread=messageThread.data;

              var pushMessage = {

                "senderid": {
                  "_id": $scope.userInformation._id,
                  "email": $scope.userInformation.email,
                  "first_name": $scope.userInformation.first_name,
                  "last_name": $scope.userInformation.last_name,
                  "prof_image": $scope.userInformation.prof_image
                },
                "recieverid": messageData.recieverid,
                "_id": "57ecbdd7c32aacf20c0a3e9e",
                "text": message,
                "created_date":new Date(),
                "is_deleted": false,
                "is_read": false

              };

              //console.log(pushMessage)
              $scope.messages.message.push(pushMessage);
              $timeout(function() {

                $ionicScrollDelegate.$getByHandle('userMessageScroll').scrollBottom(true);

              }, 0);

              //$scope.$apply() 
              //console.log($scope.messages)
              //$state.go('app.messageform',{"Id":threadId})

            }

          });
        }
    }
    $scope.numberOfMessageToDisplay = 20; // Use it with limit to in ng-repeat
    $scope.addMoreItem = function(done) {
        $timeout(function() {
          if ($scope.messages.message.length > $scope.numberOfMessageToDisplay) {
            //$ionicLoading.hide()
            $scope.numberOfMessageToDisplay += 20; // load number of more items
            $scope.$broadcast('scroll.infiniteScrollComplete')
          }

        }, 500);
      }
    if ($scope.userInformation != undefined) {
        MessageService.messageContactList($scope.userInformation._id).success(function(contactList) {
          $scope.userStatus = 'offline';
          if (contactList.messageId == 200) {
            $scope.contactLists = contactList.data;
            angular.forEach($scope.contactLists, function(value, key) {
              if (value._id != undefined) {
                if ($scope.allUsers.indexOf(value._id) !== -1) {
                  $scope.contactLists[key].userStatus = 'online'
                }
              }

            });
          }
        });
        MessageService.messageList($scope.userInformation._id).success(function(messageList) {
          $scope.userStatus = 'offline';
          if (messageList.messageId == 200) {

            $scope.messageLists = messageList.data;
            
          }

        });
      }
  })
  /* Payment Controller*/
  .controller('PaymentCtrl', function($scope, $state, $ionicLoading, $stateParams, $ionicPopup, PaymentService, LoginService, OfferService, AdminService) {
    //console.log($scope.commission)
    if (localStorage.getItem("userData") != null) {
      $scope.userData = JSON.parse(window.localStorage['userData']);
      $scope.userInformation = $scope.userData.data;
    }
    var date = new Date();
    $scope.minDate = date.setDate((new Date()).getDate() - 3650);
    $scope.currentDate = new Date();
    //console.log($scope.userInformation)
    var customer = {}
    if ($scope.userInformation.connected_cust_id != undefined && $scope.userInformation.connected_cust_id != "") {
      customer.connected_cust_id = $scope.userInformation.connected_cust_id;
      PaymentService.creditCardListing(customer).success(function(creditCard) {
        if (creditCard.messageId == 200) {
          $scope.creditCards = creditCard.data.data;
          console.log($scope.creditCards)
        }
      });
    }
    $scope.details = {};
    $scope.paymentProceed = true
    $scope.checkStatus = function(cardCVV) {
      //console.log($scope.details.card_cvv)
      $scope.paymentProceed = false;

    }
    if ($scope.userInformation.connected_stripe_id != undefined && $scope.userInformation.connected_stripe_id != "") {
      var bankData = {};
      bankData.connected_stripe_id = $scope.userInformation.connected_stripe_id;
      PaymentService.getBankInformation(bankData).success(function(bankInfo) {
        console.log(bankInfo)
        if (bankInfo.messageId == 200) {
          $scope.bankInfo = bankInfo.data.external_accounts.data;
        }
      });

    }
    AdminService.adminCommission().success(function(data) {
      $scope.commission = data.data;
      console.log("@@@@@@")
      console.log($scope.commission)
      if ($stateParams.budget != undefined) {
        $scope.budget = $stateParams.budget;
        $scope.actualCost = Number($scope.budget) + Number($scope.budget * $scope.commission.job_poster / 100);
      }
    });
    $scope.creditCard = true;
    $scope.bankInformation = false;
    $scope.listCreditcard = false;

    $scope.credit_card = function() {
      $scope.listCreditcard = false;
      $scope.creditCard = true;
    }
    $scope.card_listing = function() {
      $scope.listCreditcard = true;
      $scope.creditCard = false;
    }
    $scope.bank_information = function() {
      $scope.bankInformation = true;
      $scope.creditCard = false;
    }
    $scope.makeAddtionalJobPayment=function(details){
      var paymentData = {}
      paymentData.offer_id = $stateParams.offerId;
      paymentData.host_id = $scope.userInformation._id;
      paymentData.email = $scope.userInformation.email;

      if ($scope.userInformation.connected_cust_id != undefined) {

        paymentData.email = $scope.userInformation.email;
        paymentData.connected_cust_id = $scope.userInformation.connected_cust_id;
        paymentData.card = details;
        console.log(paymentData)

        PaymentService.makeAddtionalJobPaymentToAdmin(paymentData).success(function(response) {
          console.log(response) 
          // $scope.creditCards=creditCard.data.data;
          if (response.messageId == 200) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                  title: 'Success!',
                  template: 'Offer has been accepted successfully!',
                  buttons: [{
                    text: '<b>Ok</b>',
                    type: 'pink-white-theme-color'
                  }]
                });
            alertPopup.then(function(res) {
                  console.log('Tapped!', res);
                  $state.go('app.myjob')
            });


           
            } else {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Error!',
              template: response.message,
              buttons: [{
                text: '<b>Ok</b>',
                type: 'pink-white-theme-color'
              }]
            });
            alertPopup.then(function(res) {
              console.log('Tapped!');
              //$state.go('app.myjob')
            });

          }

        });


      }


    }
    $scope.makePayment = function(details) {
      $ionicLoading.show();
      console.log(details)
      if ($stateParams.type != undefined) {
       details.type=$stateParams.type;
      }
      var paymentData = {}
      paymentData.offer_id = $stateParams.offerId;
      paymentData.host_id = $scope.userInformation._id;
      paymentData.email = $scope.userInformation.email;

      // console.log($scope.userInformation.connected_cust_id)

      if ($scope.userInformation.connected_cust_id == undefined) {
        paymentData.card = details;
        console.log(paymentData)

        PaymentService.makePaymentToAdmin(paymentData).success(function(response) {
          //  console.log(creditCard) 
          // $scope.creditCards=creditCard.data.data;
          if (response.messageId == 200) {

            var acceptOffer = {};
            acceptOffer.status = 2;

            OfferService.OfferAccept(acceptOffer, $stateParams.offerId).success(function(data) {
              $ionicLoading.hide();
              if (data.messageId == 200) {

                var alertPopup = $ionicPopup.alert({
                  title: 'Success!',
                  template: 'Offer has been accepted successfully!',
                  buttons: [{
                    text: '<b>Ok</b>',
                    type: 'pink-white-theme-color'
                  }]
                });
                alertPopup.then(function(res) {
                  console.log('Tapped!', res);
                  $state.go('app.myjob')
                });

                //$ionicHistory.clearCache().then(function(){ $state.go('app.myjob') })
              }
            });
          } else {
            $ionicLoading.hide();

            var alertPopup = $ionicPopup.alert({
              title: 'Error!',
              template: response.message,
              buttons: [{
                text: '<b>Ok</b>',
                type: 'pink-white-theme-color'
              }]
            });
            alertPopup.then(function(res) {
              console.log('Tapped!');
              //$state.go('app.myjob')
            });

          }

        });


      } else if ($scope.userInformation.connected_cust_id != undefined) {

        paymentData.email = $scope.userInformation.email;
        paymentData.connected_cust_id = $scope.userInformation.connected_cust_id;
        paymentData.card = details;
        console.log(paymentData)

        PaymentService.makePaymentToAdmin(paymentData).success(function(response) {
          console.log(response) 
          // $scope.creditCards=creditCard.data.data;
          if (response.messageId == 200) {

            var acceptOffer = {};
            acceptOffer.status = 2;


            OfferService.OfferAccept(acceptOffer, $stateParams.offerId).success(function(data) {
              $ionicLoading.hide();
              if (data.messageId == 200) {

                var alertPopup = $ionicPopup.alert({
                  title: 'Success!',
                  template: 'Offer has been accepted successfully!',
                  buttons: [{
                    text: '<b>Ok</b>',
                    type: 'pink-white-theme-color'
                  }]
                });
                alertPopup.then(function(res) {
                  console.log('Tapped!', res);
                  $state.go('app.myjob')
                });

                //$ionicHistory.clearCache().then(function(){ $state.go('app.myjob') })
              }
            });
          } else {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Error!',
              template: response.message,
              buttons: [{
                text: '<b>Ok</b>',
                type: 'pink-white-theme-color'
              }]
            });
            alertPopup.then(function(res) {
              console.log('Tapped!');
              //$state.go('app.myjob')
            });

          }

        });


      } else {

        paymentData.card_id = details.card_id;
        paymentData.cvv = details.card_cvv;
        console.log(paymentData)

        PaymentService.makePaymentToAdmin(paymentData).success(function(response) {
          //  console.log(creditCard) 
          // $scope.creditCards=creditCard.data.data;
          if (response.messageId == 200) {

            var acceptOffer = {};
            acceptOffer.status = 2;

            OfferService.OfferAccept(acceptOffer, $stateParams.offerId).success(function(data) {
              $ionicLoading.hide();
              if (data.messageId == 200) {

                var alertPopup = $ionicPopup.alert({
                  title: 'Success!',
                  template: 'Offer has been accepted successfully!',
                  buttons: [{
                    text: '<b>Ok</b>',
                    type: 'pink-white-theme-color'
                  }]
                });
                alertPopup.then(function(res) {
                  console.log('Tapped!', res);
                  $state.go('app.myjob')
                });

                //$ionicHistory.clearCache().then(function(){ $state.go('app.myjob') })
              }
            });
          } else {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Error!',
              template: response.message,
              buttons: [{
                text: '<b>Ok</b>',
                type: 'pink-white-theme-color'
              }]
            });
            alertPopup.then(function(res) {
              console.log('Tapped!');
              //$state.go('app.myjob')
            });

          }

        });
      }

    }

    $scope.addBankInformation = function(details) {
      $ionicLoading.show();
      var bankDetail = {}
      bankDetail = {
        'bank_account_info': details
      };
      bankDetail.email = $scope.userInformation.email;
      bankDetail.host_id = $scope.userInformation._id;
      bankDetail.first_name = $scope.userInformation.first_name;
      bankDetail.last_name = $scope.userInformation.last_name;
      bankDetail.connected_stripe_id = $scope.userInformation.connected_stripe_id;
      bankDetail.ssn_last_4 = details.ssn_last_4;
      bankDetail.personal_id_number = details.personal_id_number;

      //console.log(details);
      if (details.place.formatted_address != undefined) {

        var place = details.place;
        bankDetail.address = {};
        bankDetail.address.line1 = details.place.formatted_address;

        if (place.address_components[place.address_components.length - 1].types[0] == 'postal_code') {
          bankDetail.address.postal_code = Number(place.address_components[place.address_components.length - 1].long_name);
        };

        // FINDING COUNTRY
        if (place.address_components[place.address_components.length - 1].types[0] == 'country' ||
          place.address_components[place.address_components.length - 2].types[0] == 'country') {
          if (place.address_components[place.address_components.length - 1].types[0] == 'country') {
            bankDetail.address.country = place.address_components[place.address_components.length - 1].long_name;
          } else {
            bankDetail.address.country = place.address_components[place.address_components.length - 2].long_name;
          }
        };

        // FINDING STATE
        if (place.address_components[place.address_components.length - 1].types[0] == 'administrative_area_level_1' ||
          place.address_components[place.address_components.length - 2].types[0] == 'administrative_area_level_1' ||
          place.address_components[place.address_components.length - 3].types[0] == 'administrative_area_level_1') {

          if (place.address_components[place.address_components.length - 1].types[0] == 'administrative_area_level_1') {
            bankDetail.address.state = place.address_components[place.address_components.length - 1].long_name;
          } else if (place.address_components[place.address_components.length - 2].types[0] == 'administrative_area_level_1') {
            bankDetail.address.state = place.address_components[place.address_components.length - 2].long_name;
          } else {
            bankDetail.address.state = place.address_components[place.address_components.length - 3].long_name;
          }
        };

        // FINDING CITY
        if (place.address_components[place.address_components.length - 1].types[0] == 'administrative_area_level_2' ||
          place.address_components[place.address_components.length - 2].types[0] == 'administrative_area_level_2' ||
          place.address_components[place.address_components.length - 3].types[0] == 'administrative_area_level_2' ||
          place.address_components[place.address_components.length - 4].types[0] == 'administrative_area_level_2' ||
          place.address_components[place.address_components.length - 1].types[0] == 'sublocality_level_1' ||
          place.address_components[place.address_components.length - 2].types[0] == 'sublocality_level_1' ||
          place.address_components[place.address_components.length - 3].types[0] == 'sublocality_level_1' ||
          place.address_components[place.address_components.length - 4].types[0] == 'sublocality_level_1') {
          if (place.address_components[place.address_components.length - 1].types[0] == 'administrative_area_level_2' ||
            place.address_components[place.address_components.length - 1].types[0] == 'sublocality_level_1') {
            bankDetail.address.city = place.address_components[place.address_components.length - 1].long_name;
          } else if (place.address_components[place.address_components.length - 2].types[0] == 'administrative_area_level_2' ||
            place.address_components[place.address_components.length - 2].types[0] == 'sublocality_level_1') {
            bankDetail.address.city = place.address_components[place.address_components.length - 2].long_name;
          } else if (place.address_components[place.address_components.length - 3].types[0] == 'administrative_area_level_2' ||
            place.address_components[place.address_components.length - 3].types[0] == 'sublocality_level_1') {
            bankDetail.address.city = place.address_components[place.address_components.length - 3].long_name;
          } else {
            bankDetail.address.city = place.address_components[place.address_components.length - 4].long_name;
          }
        };

        var onlydate = new Date(details.dob);
        var month = onlydate.getMonth() + 1;
        var day = onlydate.getDate();
        var year = onlydate.getFullYear();
        bankDetail.dob = {
          day: day,
          month: month,
          year: year
        };

        if ($scope.userInformation.connected_cust_id != undefined) {

          bankDetail.connected_cust_id = $scope.userInformation.connected_cust_id;

        }
       

        if ($scope.userInformation.connected_stripe_id == undefined || $scope.userInformation.connected_stripe_id == "") {
          PaymentService.setHostInfo(bankDetail).success(function(data) {
            $ionicLoading.hide();

            if (data.messageId == 200) {
              $ionicLoading.hide();
              var alertPopup = $ionicPopup.alert({
                title: 'Success!',
                template: 'Your bank detail has been added successfully!',
                buttons: [{
                  text: '<b>Ok</b>',
                  type: 'pink-white-theme-color'
                }]
              });
              alertPopup.then(function(res) {
                console.log('Tapped!');
                LoginService.userDetail($scope.userInformation._id).success(function(logindata) {
                  if (data.messageId == 200) {
                    localStorage.setItem('userData', JSON.stringify(logindata));
                  }
                });
                $state.go('app.postlist')
              });
            } else {

              $ionicLoading.hide();
              var alertPopup = $ionicPopup.alert({
                title: 'Error!',
                template: data.message,
                buttons: [{
                  text: '<b>Ok</b>',
                  type: 'pink-white-theme-color'
                }]
              });
              alertPopup.then(function(res) {
                console.log('Tapped!');
              });
            }

          });

        } else {
          bankDetail.connected_cust_id = $scope.userInformation.connected_cust_id;
          bankDetail.connected_cust_id = $scope.userInformation.connected_cust_id;

          PaymentService.updateHostInfo(bankDetail).success(function(data) {

            if (data.messageId == 200) {
              $ionicLoading.hide();
              var alertPopup = $ionicPopup.alert({
                title: 'Success!',
                template: 'Your bank detail has been updated successfully!',
                buttons: [{
                  text: '<b>Ok</b>',
                  type: 'pink-white-theme-color'
                }]
              });
              alertPopup.then(function(res) {
                console.log('Tapped!');
                LoginService.userDetail($scope.userInformation._id).success(function(data) {
                  if (data.messageId == 200) {
                    localStorage.setItem('userData', JSON.stringify(data));
                  }
                });
                $state.go('app.postlist')
              });

              //$scope.myjob();
            } else {

              $ionicLoading.hide();
              var alertPopup = $ionicPopup.alert({
                title: 'Error!',
                template: data.message,
                buttons: [{
                  text: '<b>Ok</b>',
                  type: 'pink-white-theme-color'
                }]
              });
              alertPopup.then(function(res) {
                LoginService.userDetail($scope.userInformation._id).success(function(data) {
                  if (data.messageId == 200) {
                    localStorage.setItem('userData', JSON.stringify(data));
                  }
                });
              });
            }
          });
        }
      }
    }
  })
  /* My job Controller*/
  .controller('MyJobCtrl', function($scope, $state, $timeout, $stateParams, $location, $ionicLoading, $ionicPopup, JobService) {

    if (localStorage.getItem("userData") != null) {
      $scope.userData = JSON.parse(window.localStorage['userData']);
      $scope.userInformation = $scope.userData.data;
      $scope.$on("$ionicView.enter", function() {
        //$scope.jobs = []
        $ionicLoading.show()
        $scope.myjob();
      })
    }
    $scope.acceptOffer = function(offerId, budget) {
      if ($scope.userInformation.connected_cust_id != undefined && $scope.userInformation.connected_cust_id != "") {
        // $ionicLoading.show();
        $state.go('app.carddetail', {
          "offerId": offerId,
          "budget": budget,
          "type":1
        });
      } else {

        $state.go('app.carddetail', {
          "offerId": offerId,
          "budget": budget,
          "type":1
        });
      }
    }
    $scope.addtionalRequest = function(job,addtional) {

     var addtionalJob={};
     addtionalJob=addtional;
     addtionalJob.job=job;
      JobService.additionalJob(addtionalJob).success(function(data) {

            if (data.messageId == 200) {
              $ionicLoading.hide();
              var alertPopup = $ionicPopup.alert({
                title: 'Success!',
                template: 'Change request submitted successfully.',
                buttons: [{
                  text: '<b>Ok</b>',
                  type: 'pink-white-theme-color'
                }]
              });

            //  $scope.myjob();
              alertPopup.then(function(res) {
               
          $state.go($state.current, {}, {
            reload: true
          });

              });
            }

          });
     
    }

    $scope.detailJob = function(jobId) {


      $state.go('app.viewjob', {
        "jobId": jobId
      })
    }
    $scope.editjob = function(Job) {
      $state.go('app.editjob', {
        "jobId": Job
      })
    }

    $scope.deletejob = function(jobId) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete',
        template: 'Are you sure you want to delete this job?'
      });

      confirmPopup.then(function(res) {
        if (res) {
          $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
          });
          data = {};
          job = {};
          job.id = jobId;
          job.is_deleted = true;
          data.data = [job];
          console.log(data)
          JobService.DeleteJob(data).success(function(data) {

            if (data.messageId == 200) {
              $ionicLoading.hide();
              var alertPopup = $ionicPopup.alert({
                title: 'Success!',
                template: 'Job has been deleted successfully!',
                buttons: [{
                  text: '<b>Ok</b>',
                  type: 'pink-white-theme-color'
                }]
              });

              $scope.myjob();
            }

          });
        } else {
          console.log('Deletion canceled !');
        }
      });
    }
   
    $scope.myjob = function() {

      JobService.MyJob($scope.userInformation._id).success(function(Jobs) {
        $ionicLoading.hide();
        //console.log(Jobs)
        if (Jobs.messageId == 200) {
          
          $scope.jobs = Jobs.data;
          $scope.assingedJobs = Jobs.assingedJob;
          $scope.completedJob = Jobs.completedJob;
          $scope.currentDate = new Date()
          $scope.myjobType = $stateParams.type;
          //console.log($scope.myjobType)
          // /console.log($scope.jobs.length)
          if($scope.jobs.length==0){
              $scope.numberOfItemsToshow = 5; 
          }
          if($scope.assingedJobs.length==0){
              $scope.numberOfItemsToshow = 5; 
          }
        }
      });
    }
   $scope.numberOfItemsToshow = 2;

    // Use it with limit to in ng-repeat
    $scope.addMoreItem = function(done) {

      $timeout(function() {
        if ($scope.jobs.length > $scope.numberOfItemsToshow) {
          //$ionicLoading.hide()
          $scope.numberOfItemsToshow += 2; // load number of more items
          $scope.$broadcast('scroll.infiniteScrollComplete')
        }

      }, 500);
    }

    $scope.limitJob = 1;


    $scope.addMoreData = function(totalRecord) {
      $timeout(function() {
        if (totalRecord > $scope.limitJob) {
          //$ionicLoading.hide()
          $scope.limitJob += 1; // load number of more items
          $scope.$broadcast('scroll.infiniteScrollComplete')
          $scope.jobListing($scope.limitJob)
        }
      }, 500);
    }
    $scope.myJobs =[];
    $scope.jobListing = function(limit) {
      if (limit == undefined) {
        limit = 1;
      }
      //console.log(limit)
        // $ionicLoading.show();
        //console.log($stateParams.userId)
      if ($stateParams.type == 1) {
        $scope.typeJob = "Posted";

      } else if ($stateParams.type == 2) {
        $scope.typeJob = "Working";

      } else {
        $scope.typeJob = "Completed";

      }
      JobService.MyJobList($stateParams.userId, $stateParams.type, limit).success(function(myJobs) {
        if (myJobs.messageId == 200) {


              $ionicLoading.hide();
              //$scope.myJobs = myJobs.data;
              //console.log(JobList.data)
              //angular.extend($scope.JobList,JobList.data)
              if($scope.myJobs.length==0){
                $scope.myJobs = myJobs.data;

              }else{
                angular.forEach(myJobs.data, function(value, key) {
                  var exists = false;
                  angular.forEach($scope.myJobs, function(val2, key) {
                    if(angular.equals(value._id, val2._id)){ exists = true }; 
                  });
                  if(exists == false && value.id != "") { $scope.myJobs.push(value); }
                });
          
              }

               
            
              
              //console.log($scope.myJobs)

          
          $scope.totalRecord = myJobs.totalRecord;
          $state.go('app.myjoblist')
        }
      });

    }
  })
  /* Offer Controller*/
  .controller('OfferCtrl', function($scope, OfferService, JobService, $location, $state, $stateParams, $ionicLoading, $ionicPopup, LocationService, $ionicModal) {
    if (localStorage.getItem("userData") != null) {
      $scope.userData = JSON.parse(window.localStorage['userData']);
      $scope.userInformation = $scope.userData.data;
    }

    $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      // animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    $scope.showImage = function() {

      $scope.openModal();
    }
    $ionicLoading.show();
    OfferService.OffersDetail($stateParams.offerId).success(function(offerDetail) {
      $ionicLoading.hide();
      console.log(offerDetail)
      if (offerDetail.messageId == 200) {
        //console.log(Skills)
        $scope.offerDetail = offerDetail.data;
        console.log($scope.offerDetail)
      }
    });
    JobService.JobView($stateParams.jobId).success(function(jobDetail) {
      $ionicLoading.hide();
      if (jobDetail.messageId == 200) {
        $scope.JobDetail = jobDetail.data;
      }
    });
    $scope.data = {
      rating: 1,
      max: 5
    }

    // Create the rating modal 
    $ionicModal.fromTemplateUrl('templates/users/rate.html', {
      id: '1',
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal1 = modal;
    });

    // Open the rating modal
    $scope.rate = function() {
      $scope.oModal1.show();
    };
    $scope.closeLogin = function() {
      $scope.oModal1.hide();
    };

    $scope.acceptOffer = function(offerId, budget) {
      if ($scope.userInformation.connected_cust_id != undefined && $scope.userInformation.connected_cust_id != "") {
        // $ionicLoading.show();
        $state.go('app.savedcard', {
          "offerId": offerId,
          "budget": budget
        });
      } else {

        $state.go('app.savedcard', {
          "offerId": offerId,
          "budget": budget
        });
      }
    }

    $scope.postRating = function(data) {
      //console.log()
      var ratingData = {};
      ratingData.rating = {};
      ratingData.user_id = $scope.offerDetail.userid[0]._id
      ratingData.rating.job_author_id = $scope.offerDetail.jobid[0].creator[0];
      ratingData.rating.job_id = $scope.offerDetail.jobid[0]._id;
      ratingData.rating.offer_id = $scope.offerDetail._id;
      ratingData.rating.review = data.review
      ratingData.rating.max = 5
      OfferService.getDynamicRating().then(function(value) {
        ratingData.rating.value = value;
        //ratingData.user_id = value._id
        console.log(value)

        $scope.newRating = console.log('New rating valuekey: "value",  '+value);
        OfferService.postRatingOnProfile(ratingData).success(function(data) {

          console.log(data);

          $ionicLoading.hide();

          if (data.messageId == 200) {

            var alertPopup = $ionicPopup.alert({
              title: 'Rated Successfully!',
              template: 'Your rating has been posted successfully.',
              buttons: [{
                text: '<b>Ok</b>',
                type: 'pink-white-theme-color'
              }]
            });

          $state.go('app.viewjob', {
          "jobId": $scope.offerDetail.jobid[0]._id
          });

          } else {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Anonymously failed!',
              template: 'Oop\'s! it seems like something went wrong.',
              buttons: [{
                text: '<b>Ok</b>',
                type: 'pink-white-theme-color'
              }]
            });
          }

          $scope.closeLogin();

        });
      });
    };
  })
  /* Comment Controller*/
  .controller('CommentCtrl', function($scope, Comments, $location, $state, $stateParams, $ionicScrollDelegate,$ionicLoading, $ionicPopup, $timeout) {
    $scope.replycomment = ''
    if (localStorage.getItem("userData") != null) {
      $scope.userData = JSON.parse(window.localStorage['userData']);
      $scope.userInformation = $scope.userData.data;
    }
    if ($stateParams.jobId != undefined) {
      $scope.jobId = $stateParams.jobId
    }
    if ($stateParams.commentId != undefined) {
      Comments.getComments($stateParams.commentId, $stateParams.authorId).success(function(data) {
        $ionicLoading.hide();
        if (data.messageId == 200) {
          $scope.comments = data.data;
          $timeout(function() {
            $ionicScrollDelegate.$getByHandle('userMessageScroll').scrollBottom(true);

          }, 0);
        }
      });
    }
    $scope.postComment = function(comment, commentId) {
      var commentData = {};
      commentData.comment = [];
      commentData.jobid = $scope.jobId;
      commentData.userid = $scope.userInformation._id;
      commentData.authorid = $stateParams.authorId;
      commentData.comment = [{
        userid: $scope.userInformation._id,
        text: comment
      }]
      if (commentId == undefined) {
        Comments.postComment(commentData).success(function(data) {
          if (data.messageId == 200) {
            $scope.comments = data.comment;
          }
        });
      } else {
        var reply = {
          comment: commentData.comment[0]
        };
        Comments.replyComment(reply, commentId).success(function(data) {
          if (data.messageId == 200) {
            var pushComment = {
              "id": "57d814bc1d6a90ce30e445ed",
              "comment_date": new Date(),
              "is_deleted": false,
              "text": comment,
              "userid": $scope.userInformation._id
            };
            $scope.comments.comment.push(pushComment);
            $timeout(function() {
              $ionicScrollDelegate.$getByHandle('userMessageScroll').scrollBottom(true);
            }, 0);
          }
        });
      }
    }
  })
  /* Transaction Controller*/
  .controller('TransactionCtrl', function($scope, Comments, $location, $state, $stateParams, $ionicLoading, $ionicPopup, $timeout, JobService) {
    $scope.currentDate = new Date();
    $scope.convertToDate = function(stringDate) {
      var dateOut = new Date(stringDate);
      dateOut.setDate(dateOut.getDate() + 1);
      return dateOut;
    };
    if (localStorage.getItem("userData") != null) {
      $scope.userData = JSON.parse(window.localStorage['userData']);
      $scope.userInformation = $scope.userData.data;
    }
    $ionicLoading.show()
    $scope.limitJob = 2;
    $scope.addMoreData = function(totalRecord) {
      $timeout(function() {
        if (totalRecord > $scope.limitJob) {
          $scope.limitJob += 2; // load number of more items
          $scope.$broadcast('scroll.infiniteScrollComplete')
          $scope.paymentListing($scope.limitJob)
        }
      }, 500);
    }
    $scope.paymentListing = function(limit) {
      if (limit == undefined) {
        limit = 4;
      }
      $scope.paymentType = $stateParams.type;
      JobService.MyJobList($stateParams.userId, $stateParams.type, limit).success(function(myJobs) {
        $ionicLoading.hide();
        if (myJobs.messageId == 200) {
          $scope.paidList = myJobs.data;
          $scope.totalRecord = myJobs.totalRecord;
          $scope.totalAmnt = myJobs.totalAmt;
        }
      });
    }
    $scope.paymentList = function() {
      JobService.MyJobList($scope.userInformation._id, "paid", 2).success(function(myJobs) {
        $ionicLoading.hide();
        if (myJobs.messageId == 200) {
          console.log(myJobs.data)
          $scope.paidList = myJobs.data;
          $scope.totalRecord = myJobs.totalRecord;
          $scope.paidTotalAmount = myJobs.totalAmt;
         }
      });
      JobService.MyJobList($scope.userInformation._id, "recieved", 2).success(function(myJobs) {
        if (myJobs.messageId == 200) {
          $scope.recievedList = myJobs.data;
          $scope.totalRecord = myJobs.totalRecord;
          $scope.recievedprice=0;
          
          angular.forEach($scope.recievedList,function(value,index){
          $scope.recievedprice +=(parseFloat(value.worker_payment[0].transaction_amount)-(parseFloat(value.worker_payment[0].transaction_amount) * parseFloat(value.admin_commission.job_finder) /100) );
          })
          //console.log($scope.recievedprice)
          
          //paidList.worker_payment[0].transaction_amount-(paidList.worker_payment[0].transaction_amount * paidList.admin_commission.job_finder /100
          //console.log(myJobs)
          $scope.recievedTotalAmount = myJobs.totalAmt;
        }
      });
    }
    if ($stateParams.jobId != "" && $stateParams.jobId != undefined) {
      $ionicLoading.show();
      $scope.paymentType = $stateParams.type;

      JobService.JobView($stateParams.jobId).then(function(job) {
        $ionicLoading.hide();
        $scope.job = job.data.data;
      });
    }
    $scope.detailJob = function(type, jobId) {
      $state.go('app.transactionview', {
        "type": type,
        "jobId": jobId
      })
    }
  })
  /* Get Review Controller */
  .controller('ReviewCtrl', function($scope, $location, $state, $ionicLoading, $stateParams,$ionicPopup, UserService) {
      $ionicLoading.show();
      $scope.getNumber = function(n) {
        return new Array(n);
      };
      if (localStorage.getItem("userData") != null) {
        $ionicLoading.hide();
        $scope.userData = JSON.parse(window.localStorage['userData']);
        $scope.userInformation = $scope.userData.data;
      }
      if($stateParams.userId!=undefined){

        $scope.userId=$stateParams.userId;
      }
      UserService.getJobsCount($scope.userId).success(function(jobsCount) {
        $ionicLoading.hide();
        if (jobsCount.messageId == 200) {
          $scope.complted_job = jobsCount.complted_job;
          $scope.posted_job = jobsCount.posted_job;
          $scope.review = jobsCount.review;
          $scope.reviewList = jobsCount.review_list;
          $scope.profile_rating_plus = parseInt(jobsCount.profile_rating);
          $scope.profile_rating_half = parseFloat(jobsCount.profile_rating - parseInt(jobsCount.profile_rating));
          $scope.profile_rating_loss = parseInt(5 - jobsCount.profile_rating);
        }
      });
    })
  /* Get Review Controller */
  .controller('FeedbackCtrl', function($scope, $location, $state, $ionicSideMenuDelegate, $jrCrop, $ionicLoading, $ionicPopup, FeedbackService) {
    $scope.options = [{
      name: 'Suggestion',
      value: 'suggestion'
    }, {
      name: 'Bug',
      value: 'bug'
    }];
    if (localStorage.getItem("userData") != null) {
      $ionicLoading.hide();
      $scope.userData = JSON.parse(window.localStorage['userData']);
      $scope.userInformation = $scope.userData.data;
    }
    $scope.feedback = function(feed) {
      $ionicLoading.show();
      var feedbackData = feed;
      feedbackData.user_id = $scope.userInformation._id;
      feedbackData.type = feed.type.name;
      feedbackData.attachment = $scope.feedImageData
      FeedbackService.PostFeedback(feedbackData).success(function(data) {
        $ionicLoading.hide();
        if (data.messageId == 200) {

          var alertPopup = $ionicPopup.alert({
            title: 'Success!',
            template: 'Thanks for helping us make OddJob better!',
            buttons: [{
              text: '<b>Ok</b>',
              type: 'pink-white-theme-color'
            }]
          });

          $state.go($state.current, {}, {
            reload: true
          });
        }
      });
    }

    $scope.cameraOptions = function() {
      var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL, // FILE_URI, DATA_URL
        sourceType: 2, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
        encodingType: 0, // 0=JPG 1=PNG
        correctOrientation: true,
       
      }

      navigator.camera.getPicture($scope.onSuccess, $scope.onFail, options);
      return true;
    };

    $scope.onSuccess = function(DATA_URL) {
        $scope.feedImageData = "data:image/jpeg;base64," +DATA_URL;
        var profImage = document.getElementById('feebackImage');
        profImage.src = "data:image/jpeg;base64," + DATA_URL;
        profImage.style.display = "block";
    };
    $scope.onFail = function(e) {
      console.log("On fail " + e);
    }
  })
  /* Message Controller*/
  .controller('CallCtrl', function($scope, $rootScope, $ionicPlatform, $cordovaNativeAudio, $state, $ionicHistory, $timeout, socket, $sanitize, $ionicScrollDelegate, $ionicLoading, $filter, $ionicModal, $stateParams, $ionicPopup, LoginService, MessageService) {
    if (localStorage.getItem("userData") != null) {
      $scope.userData = JSON.parse(window.localStorage['userData']);
      $scope.userInformation = $scope.userData.data;

    }

    $rootScope.$on('parent', function(event, data) {
      $scope.userInformation = data; // 'Some data'
    });
    //console.log("33trl")
    //console.log($scope.userInformation)
    $scope.profileImagePath = PROFILE_IMAGE;
    var r = new Random();

    var id = r.integer(10000, 99999);
    $scope.id = id;

    $scope.contact = {};
    $scope.muted=false;


    $scope.callInProgress = false;
    $scope.callIgnored = false;
    $scope.callEnded = false;


    socket.emit('login', {
      'id': id
    });


    $ionicModal.fromTemplateUrl('templates/global/call-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.call_modal = modal;
    });


    function call(isInitiator, peer_id) {

      var config = {
        isInitiator: isInitiator,
        stun: {
          host: 'stun:stun.l.google.com:19302'
        },
        turn: {
          host: 'turn:numb.viagenie.ca',
          username: 'webrtc@live.com',
          password: 'muazkh'
        },
        streams: {
          audio: true,
          video: false
        }
      };

      var session = new cordova.plugins.phonertc.Session(config);

      $scope.callingId = $stateParams.Id

      if ($scope.calllerId != undefined) {

        $scope.callingId = $scope.calllerId
      }

      session.on('sendMessage', function(data) {
        socket.emit('sendMessage', {
          'id': $scope.userInformation._id,
          'peer_id': $scope.callingId,
          'type': 'phonertc_handshake',
          'data': JSON.stringify(data)
        });
      });

      session.on('disconnect', function() {
        // socket.emit('sendMessage', { 'id': $scope.userInformation._id, 'peer_id': $stateParams.Id, 'type': 'ignore' });
        socket.emit('sendMessage', {
          'name': $scope.userInformation.first_name + " " + $scope.userInformation.last_name,
          'fromImage': $scope.userInformation.prof_image,
          'peer_id': $scope.callingId,
          type: 'ignore'
        });

        $scope.call_modal.hide();
      });

      session.call();

      $scope.contact = session;
    }
    
    $scope.userToCall;
    $scope.startCall = function(firstName, lastName, userImage) {
      $scope.isCalling = true;
      $scope.callIgnored = false;
      $scope.callEnded = false;

      $scope.userToCall = firstName + " " + lastName;

      $scope.userProfile = userImage;

      console.log($scope.userInformation)
      socket.emit('sendMessage', {
        'userId': $scope.userInformation._id,
        'name': $scope.userInformation.first_name + " " + $scope.userInformation.last_name,
        'fromImage': $scope.userInformation.prof_image,
        'peer_id': $stateParams.Id,
        type: 'call'
      });
      $scope.call_modal.show();
    }
    $scope.closeModal = function() {
      $scope.call_modal.hide();
      socket.emit('sendMessage', {
        'name': $scope.userInformation.first_name + " " + $scope.userInformation.last_name,
        'fromImage': $scope.userInformation.prof_image,
        'peer_id': $scope.callingId,
        'type': 'ignore'
      });
    };

    $scope.ignore = function() {
      $scope.vm.stop('hi-hat');
      socket.emit('sendMessage', {
        'name': $scope.userInformation.first_name + " " + $scope.userInformation.last_name,
        'fromImage': $scope.userInformation.prof_image,
        'peer_id': $scope.callingId,
        'type': 'ignore'
      });
      $scope.call_modal.hide();
    };
    $scope.busy = function() {
      $scope.callInProgress = false;
      $scope.callEnded = true;
      $scope.vm.stop('hi-hat')
      $scope.call_modal.hide();
    };

    $scope.end = function() {
      $scope.vm.stop('hi-hat');
      $scope.contact.close();
      $scope.contact = {};
      socket.emit('sendMessage', {
        'name': $scope.userInformation.first_name + " " + $scope.userInformation.last_name,
        'fromImage': $scope.userInformation.prof_image,
        'peer_id': $scope.callingId,
        'type': 'end'
      });
      $scope.callInProgress = false;
      $scope.callEnded = true;
      $scope.call_modal.hide();
    };


    $scope.answer = function() {
      $scope.vm.stop('hi-hat')

      if ($scope.callInProgress) {
        return;
      }

      $scope.callInProgress = true;

      call(false, $scope.peer_id);

      $timeout(function() {
        socket.emit('sendMessage', {
          'name': $scope.userInformation.first_name + " " + $scope.userInformation.last_name,
          'fromImage': $scope.userInformation.prof_image,
          'peer_id': $scope.callingId,
          'type': 'answer'
        });
      }, 100);
    };


    function onMessageReceive(message) {
      //console.log(message)

      switch (message.type) {

        case 'answer':

          $scope.$apply(function() {
            $scope.callInProgress = true;
            $scope.calllerId = message.userId;
          });

          call(true, message.name);

          break;

        case 'ignore':
          $scope.callInProgress = false;
          $scope.callIgnored = true;
          $scope.callEnded = false;
          $scope.vm.stop('hi-hat');

          break;

        case 'phonertc_handshake':

          $scope.contact.receiveMessage(JSON.parse(message.data));

          break;

        case 'call':
          $scope.isCalling = false;
          $scope.callIgnored = false;
          $scope.callEnded = false;
          $scope.vm.play('hi-hat')
          $scope.call_modal.show();

          //console.log(message)

          $scope.peer_id = message.name;
          $scope.peer_image = message.fromImage;
          $scope.calllerId = message.userId;


          $scope.current_modal = 'call_modal';
          break;

        case 'end':
          $scope.callInProgress = false;
          $scope.callEnded = true;
          $scope.callIgnored = false;
          break;

      }
    }

    socket.on('messageReceived', onMessageReceive);


    $scope.$on('$destroy', function() {
      socket.removeListener('messageReceived', onMessageReceive);
    });


    var vm = this;
    $ionicPlatform.ready(function() {


      $cordovaNativeAudio.preloadComplex('hi-hat', 'audio/snare.mp3', 1, 1)
        .then(function(msg) {
          console.log(msg);
        })
        .catch(function(error) {
          console.error(error);
        });


    });
    vm.play = function(sound) {
      //console.log("1")
      $cordovaNativeAudio.loop(sound)
        .then(function(msg) {
          console.log(msg);
        })
        .catch(function(error) {
          console.error(error);
        });
    };
    vm.stop = function(sound) {
      //console.log("2")
      $cordovaNativeAudio.stop(sound);
      return true;
      //$cordovaNativeAudio.unload(sound);
    };

    $scope.vm = vm;
  })
 
  .directive('imageonload', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.bind('load', function() {
          document.getElementById(attrs.type).style.display = "none";
          //$("#"+attrs.type).hide();
        });
        element.bind('error', function() {
          //alert('image could not be loaded');
        });
      }
    };
  })
  .directive('compareTo', [function() {
    return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo"
      },
      link: function(scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function(modelValue) {
          return modelValue == scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function() {
          ngModel.$validate();
        });
      }
    };
  }]);

  /*************************************** RATING ********************************/
   angular.module('ionic.rating', [])
  .constant('ratingConfig', {
    max: 5,
    stateOn: null,
    stateOff: null
  })
  .controller('RatingController', function($scope, $attrs, ratingConfig, OfferService) {
    var ngModelCtrl;
    ngModelCtrl = {
      $setViewValue: angular.noop
    };
    this.init = function(ngModelCtrl_) {
      var max, ratingStates;
      ngModelCtrl = ngModelCtrl_;
      ngModelCtrl.$render = this.render;
      this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;
      this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;
      max = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max;
      ratingStates = angular.isDefined($attrs.ratingStates) ? $scope.$parent.$eval($attrs.ratingStates) : new Array(max);
      return $scope.range = this.buildTemplateObjects(ratingStates);
    };
    this.buildTemplateObjects = function(states) {
      var i, j, len, ref;
      ref = states.length;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        states[i] = angular.extend({
          index: 1
        }, {
          stateOn: this.stateOn,
          stateOff: this.stateOff
        }, states[i]);
      }
      return states;
    };

    $scope.rate = function(value) {
      //alert(1)
      OfferService.setDynamicRating(value).then(function() {
        console.log('New rating valuekey: "value",  ' + value);
      });

      console.log('rate me! ' + value);
      if (!$scope.readonly && value >= 0 && value <= $scope.range.length) {
        ngModelCtrl.$setViewValue(value);
        return ngModelCtrl.$render();
      }
    };
    $scope.reset = function() {
      $scope.value = ngModelCtrl.$viewValue;
      return $scope.onLeave();
    };
    $scope.enter = function(value) {
      if (!$scope.readonly) {
        $scope.value = value;
      }
      return $scope.onHover({
        value: value
      });
    };
    $scope.onKeydown = function(evt) {
      if (/(37|38|39|40)/.test(evt.which)) {
        evt.preventDefault();
        evt.stopPropagation();
        return $scope.rate($scope.value + (evt.which === 38 || evt.which === 39 ? {
          1: -1
        } : void 0));
      }
    };
    this.render = function() {
      return $scope.value = ngModelCtrl.$viewValue;
    };
    return this;
  })
  .directive('rating', function() {
    return {
      restrict: 'EA',
      require: ['rating', 'ngModel'],
      scope: {
        readonly: '=?',
        onHover: '&',
        onLeave: '&'
      },
      controller: 'RatingController',
      template: '<ul class="rating" ng-mouseleave="reset()" ng-keydown="onKeydown($event)">' + '<li ng-repeat="r in range track by $index" ng-click="rate($index + 1)"><i class="icon" ng-class="$index < value && (r.stateOn || \'ion-ios-star\') || (r.stateOff || \'ion-ios-star-outline\')"></i></li>' + '</ul>',
      replace: true,
      link: function(scope, element, attrs, ctrls) {
        var ngModelCtrl, ratingCtrl;
        ratingCtrl = ctrls[0];
        ngModelCtrl = ctrls[1];
        if (ngModelCtrl) {
          return ratingCtrl.init(ngModelCtrl);
        }
      }
    };
  })
  .directive('onlyrating', function() {
    return {
      restrict: 'EA',
      require: ['onlyrating', 'ngModel'],
      scope: {
        readonly: '=?',
        onHover: '&',
        onLeave: '&'
      },
      controller: 'RatingController',
      template: '<ul class="rating onlyrating" ng-mouseleave="reset()" ng-keydown="onKeydown($event)">' + '<li ng-repeat="r in range track by $index"><i class="icon" ng-class="$index < value && (r.stateOn || \'ion-ios-star\') || (r.stateOff || \'ion-ios-star-outline\')"></i></li>' + '</ul>',
      replace: true,
      link: function(scope, element, attrs, ctrls) {
        var ngModelCtrl, ratingCtrl;
        ratingCtrl = ctrls[0];
        ngModelCtrl = ctrls[1];
        if (ngModelCtrl) {
          return ratingCtrl.init(ngModelCtrl);
        }
      }
    };
  })
  .directive("averageStarRating", function() {
    return {
      restrict: "EA",
      template: "<div class='average-rating-container'>" +
        "  <ul class='rating background' class='readonly'>" +
        "    <li ng-repeat='star in stars' class='star'>" +
        "      <i class='fa fa-star'></i>" + //&#9733
        "    </li>" +
        "  </ul>" +
        "  <ul class='rating foreground' class='readonly' ng-attr-style='width:{{filledInStarsContainerWidth}}%'>" +
        "    <li ng-repeat='star in stars' class='star filled'>" +
        "      <i class='fa fa-star'></i>" + //&#9733
        "    </li>" +
        "  </ul>" +
        "</div>",
      scope: {
        averageRatingValue: "=ngModel",
        max: "=?", //optional: default is 5
      },
      link: function(scope, elem, attrs) {
        if (scope.max == undefined) {
          scope.max = 5;
        }

        function updateStars() {
          scope.stars = [];
          for (var i = 0; i < scope.max; i++) {
            scope.stars.push({});
          }
          var starContainerMaxWidth = 100; //%
          scope.filledInStarsContainerWidth = scope.averageRatingValue / scope.max * starContainerMaxWidth;
        };
        scope.$watch("averageRatingValue", function(oldVal, newVal) {
          if (newVal) {
            updateStars();
          }
        });
      }
    };
  })
  .filter('orderObjectBy', function() {
    return function(items, field, reverse) {
      var filtered = [];
      angular.forEach(items, function(item) {
        filtered.push(item);
      });
      filtered.sort(function(a, b) {
        return (a[field] > b[field] ? 1 : -1);
      });
      if (reverse) filtered.reverse();
      return filtered;
    };
  })
  .filter('cut', function() {
    return function(value, wordwise, max, tail) {
      if (!value) return '';

      max = parseInt(max, 10);
      if (!max) return value;
      if (value.length <= max) return value;

      value = value.substr(0, max);
      if (wordwise) {
        var lastspace = value.lastIndexOf(' ');
        if (lastspace != -1) {
          //Also remove . and , so its gives a cleaner result.
          if (value.charAt(lastspace - 1) == '.' || value.charAt(lastspace - 1) == ',') {
            lastspace = lastspace - 1;
          }
          value = value.substr(0, lastspace);
        }
      }

      return value + (tail || ' …');
    };
  })
  .directive('errSrc', function() {
    return {
      link: function(scope, element, attrs) {
        element.bind('error', function() {
          if (attrs.src != attrs.errSrc) {
            attrs.$set('src', attrs.errSrc);
          }
        });
        attrs.$observe('ngSrc', function(value) {
          if (!value && attrs.errSrc) {
            attrs.$set('src', attrs.errSrc);
          }
        });
      }
    }
  })
  .directive('convertToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(val) {
        return val != null ? parseInt(val, 10) : null;
      });
      ngModel.$formatters.push(function(val) {
        return val != null ? '' + val : null;
      });
    }
  };
 })
  .filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
  })
  .filter('unique', function() {

    return function(items, filterOn) {

      if (filterOn === false) {
        return items;
      }

      if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
        var hashCheck = {},
          newItems = [];

        var extractValueToCompare = function(item) {
          if (angular.isObject(item) && angular.isString(filterOn)) {
            return item[filterOn];
          } else {
            return item;
          }
        };

        angular.forEach(items, function(item) {
          var valueToCheck, isDuplicate = false;

          for (var i = 0; i < newItems.length; i++) {
            if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
              isDuplicate = true;
              break;
            }
          }
          if (!isDuplicate) {
            newItems.push(item);
          }

        });
        items = newItems;
      }
      return items;
    };
  }).filter('removeSpaces', [function() {
    return function(string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace(/[\s]/g, '');
    };
}])
  .filter('dateCompare', function() {
    return function(dueDate) {
      var onlydate = new Date(dueDate);
      var month = onlydate.getMonth() + 1;
      var day = onlydate.getDate();
      var year = onlydate.getFullYear();
      //dueDate = month+'/'+day+'/'+year+' '+hour+':'+min+':'+sec;
      var end_date2 = new Date();
      var month1 = end_date2.getMonth() + 1;
      var day1 = end_date2.getDate();
      var year1 = end_date2.getFullYear();
      //console.log(month+'day' +day+'year'+year1)
      // console.log(month1+'day1' +day1+'year1'+year1)
      if ((month1 >= month && day1 > day && year1 >= year) || (month1 > month && year1 >= year) || (year1 > year)) {
        return true;
      } else {
        return false;
      }
    };
  })
.directive('ngSlideDown', [
    '$timeout',
    function ($timeout) {
      var getTemplate, link;
      getTemplate = function (tElement, tAttrs) {
        if (tAttrs.lazyRender !== void 0) {
          return '<div ng-if=\'lazyRender\' ng-transclude></div>';
        } else {
          return '<div ng-transclude></div>';
        }
      };
      link = function (scope, element, attrs, ctrl, transclude) {
        var closePromise, duration, elementScope, emitOnClose, getHeight, hide, lazyRender, onClose, show;
        duration = attrs.duration || 1;
        elementScope = element.scope();
        emitOnClose = attrs.emitOnClose;
        onClose = attrs.onClose;
        lazyRender = attrs.lazyRender !== void 0;
        if (lazyRender) {
          scope.lazyRender = scope.expanded;
        }
        closePromise = null;
        element.css({
          overflow: 'hidden',
          transitionProperty: 'height',
          transitionDuration: '' + duration + 's',
          transitionTimingFunction: 'ease-in-out'
        });
        getHeight = function (passedScope) {
          var c, children, height, _i, _len;
          height = 0;
          children = element.children();
          for (_i = 0, _len = children.length; _i < _len; _i++) {
            c = children[_i];
            height += c.clientHeight;
          }
          return '' + height + 'px';
        };
        show = function () {
          //element.removeAttribute("height");
          if (closePromise) {
            $timeout.cancel(closePromise);
          }
          if (lazyRender) {
            scope.lazyRender = true;
          }
          return element.css('min-height', getHeight());
        };
        hide = function () {
          element.css('min-height', '0px');
          element.css('height', '0px');
          if (emitOnClose || onClose || lazyRender) {
            return closePromise = $timeout(function () {
              if (emitOnClose) {
                scope.$emit(emitOnClose, {});
              }
              if (onClose) {
                elementScope.$eval(onClose);
              }
              if (lazyRender) {
                return scope.lazyRender = false;
              }
            }, duration * 1000);
          }
        };
        scope.$watch('expanded', function (value, oldValue) {
          if (value) {
            return $timeout(show);
          } else {
            return $timeout(hide);
          }
        });
        return scope.$watch(getHeight, function (value, oldValue) {
          if (scope.expanded && value !== oldValue) {
            return $timeout(show);
          }
        });
      };
      return {
        restrict: 'A',
        scope: { expanded: '=ngSlideDown' },
        transclude: true,
        link: link,
        template: function (tElement, tAttrs) {
          return getTemplate(tElement, tAttrs);
        }
      };
    }
  ]);

