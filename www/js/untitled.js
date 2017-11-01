$scope.twitterLogin = function() {
        // $cordovaOauth.twitter(string consumerKey, string consumerSecretKey, object options);
       // TWITTER_CONSUMERKEY

        $cordovaOauth.twitter(TWITTER_CONSUMERKEY,TWITTER_CLIENTSECRETKEY).then(function(result) {
            console.log(JSON.stringify(result));
            profileInfo={};
            profileInfo.provider = "twitter";
            profileInfo.password=$scope.genratePassword();
            profileInfo.email=result.screen_name+'@twitter.com';
            profileInfo.enable=true;   
            console.log(profileInfo)
            RegisterService.SignUpSocial(profileInfo).success(function (response) {
              $ionicLoading.hide();
               //console.log(response)
                if(response.existId==100){
                    localStorage.setItem('userData', JSON.stringify(response));
                           
                    var userInfo=JSON.parse(JSON.stringify(response));
                    var userData = {};
                   
                   
                   
                    userData.username = userInfo.data.email.toLowerCase().replace(/\s+/g,'');
                    userData.password = "@twitter";
                   if(localStorage.getItem("deviceId")!=null) {
                    userData.device_id =window.localStorage['deviceId'];
                      }
                      if(localStorage.getItem("PLATFORM")!=null) {
                         userData.currentplatform =window.localStorage['PLATFORM'];
                      } 
                      if(localStorage.getItem("TimeZone")!=null) {
                         userData.timezone =window.localStorage['TimeZone'];
                    }

                    $rootScope.userInformation={}
                    $rootScope.userInformation.role='';
                    $rootScope.userInformation.skill='';
                //console.log(userData)
                      LoginService.Login(userData).success(
                      function(logindata) {     
                            $ionicLoading.hide();
                            if (logindata.messageId == 200) {
                              
                              localStorage.setItem('ACCESS_TOKEN', JSON.parse(JSON.stringify(logindata.access_token)));
                              localStorage.setItem('userData', JSON.stringify(logindata));
                              //conssole.log("tsts");
                              //console.log(logindata)
                              $rootScope.userInformation.role=logindata.data.role;
                              $rootScope.userInformation.skill=logindata.data.skill;
                              if(localStorage.getItem("userData")!=null) {
                                              $scope.userData = JSON.parse(window.localStorage['userData']);
                                              $scope.userInformation=$scope.userData.data;
                                              socket.emit('user_socket',$scope.userInformation._id);
                                              $rootScope.$emit('child', $scope.userInformation);
                                              $rootScope.$broadcast('parent', $scope.userInformation);
  
                              }
                              $state.go('app.home')
                                
                            }
                    });

                      // $state.go('app.addprofile')
                  }else if(response.messageId=200){

                        localStorage.setItem('userData', JSON.stringify(response));
                                
                               //$state.go('app.addprofile')

                        var userInfo=JSON.parse(JSON.stringify(response));
                       
                        var userData = {};
                        userData.username = userInfo.data.email;
                        userData.password = "@linkedIn"; 
                        if(localStorage.getItem("deviceId")!=null) {
                          userData.device_id =window.localStorage['deviceId'];
                        }
                        if(localStorage.getItem("PLATFORM")!=null) {
                           userData.currentplatform =window.localStorage['PLATFORM'];
                        } 
                        if(localStorage.getItem("TimeZone")!=null) {
                           userData.timezone =window.localStorage['TimeZone'];
                        }
                        
                        LoginService.Login(userData).success(
                        function(logindata) {     
                              $ionicLoading.hide();
                              if (logindata.messageId == 200) {
                              
                                localStorage.setItem('ACCESS_TOKEN', JSON.parse(JSON.stringify(logindata.access_token)));
                                if(localStorage.getItem("userData")!=null) {
                                              $scope.userData = JSON.parse(window.localStorage['userData']);
                                              $scope.userInformation=$scope.userData.data;
                                              socket.emit('user_socket',$scope.userInformation._id);
                                              $rootScope.$emit('child', $scope.userInformation);
                                              $rootScope.$broadcast('parent', $scope.userInformation);
  
                                }
                                $state.go('app.addprofile')
                                
                                  
                              }
                      });

                 }else{
                  $ionicLoading.hide();
                   var alertPopup = $ionicPopup.alert({
                                  title:    'Something went wrong!',
                                  template: data.message,
                                  buttons:[
                                    {
                                      text: '<b>Ok</b>',
                                      type: 'pink-white-theme-color'
                                    }
                                  ]
                              });

                 }

        }); 
       
        }, function(error) {
            console.log(JSON.stringify(error));
        });
    }

    $scope.facebookLogin = function() {
      $ionicLoading.show();
        // $cordovaOauth.facebook(string clientId, array appScope, object options);
        $cordovaOauth.facebook(FACEBOOK_APPID, ["email"], {"auth_type": "rerequest"}).then(function(result) {
           // console.log(JSON.stringify(result));
        SocailService.getFacebookDetail(result.access_token).success(

          function(profileInfo) {     

            profileInfo.provider = "facebook";
            profileInfo.password=$scope.genratePassword();
            profileInfo.enable=true;   
            console.log(profileInfo)
            RegisterService.SignUpSocial(profileInfo).success(function (response) {
              $ionicLoading.hide();
               //console.log(response)
                if(response.existId==100){
                    localStorage.setItem('userData', JSON.stringify(response));
                           
                    var userInfo=JSON.parse(JSON.stringify(response));

                    var userData = {};
                   
                    userData.username = userInfo.data.email.toLowerCase().replace(/\s+/g,'');
                    userData.password = "@facebook";
                    userData.device_id = window.localStorage['deviceId'];
                    $rootScope.userInformation={}
                    $rootScope.userInformation.role='';
                    $rootScope.userInformation.skill='';
                //console.log(userData)
                      LoginService.Login(userData).success(
                      function(logindata) {     
                            $ionicLoading.hide();
                            if (logindata.messageId == 200) {
                              
                              localStorage.setItem('ACCESS_TOKEN', JSON.parse(JSON.stringify(logindata.access_token)));
                              localStorage.setItem('userData', JSON.stringify(logindata));
                              //conssole.log("tsts");
                              //console.log(logindata)
                              $rootScope.userInformation.role=logindata.data.role;
                              $rootScope.userInformation.skill=logindata.data.skill;

                              if(localStorage.getItem("userData")!=null) {
                                $scope.userData = JSON.parse(window.localStorage['userData']);
                                $scope.userInformation=$scope.userData.data;
                                socket.emit('user_socket',$scope.userInformation._id);
                                $rootScope.$emit('child', $scope.userInformation);
                                $rootScope.$broadcast('parent', $scope.userInformation);
  
                              }
                              $state.go('app.home')
                                
                            }
                    });

                      // $state.go('app.addprofile')
                  }else if(response.messageId=200){

                        localStorage.setItem('userData', JSON.stringify(response));
                                
                               //$state.go('app.addprofile')

                        var userInfo=JSON.parse(JSON.stringify(response));
                       
                        var userData = {};
                        userData.username = userInfo.data.email;
                        userData.password = "@facebook"; 
                        if(localStorage.getItem("deviceId")!=null) {
                              userData.device_id =window.localStorage['deviceId'];
                          }
                          if(localStorage.getItem("PLATFORM")!=null) {
                             userData.currentplatform =window.localStorage['PLATFORM'];
                          } 
                          if(localStorage.getItem("TimeZone")!=null) {
                             userData.timezone =window.localStorage['TimeZone'];
                          }
                        
                        LoginService.Login(userData).success(
                        function(logindata) {     
                              $ionicLoading.hide();
                              if (logindata.messageId == 200) {
                              
                                localStorage.setItem('ACCESS_TOKEN', JSON.parse(JSON.stringify(logindata.access_token)));
                                 $state.go('app.addprofile')

                              if(localStorage.getItem("userData")!=null) {
                                $scope.userData = JSON.parse(window.localStorage['userData']);
                                $scope.userInformation=$scope.userData.data;
                                socket.emit('user_socket',$scope.userInformation._id);
                                $rootScope.$emit('child', $scope.userInformation);
                                $rootScope.$broadcast('parent', $scope.userInformation);
  
                              }

                                
                                  
                              }
                      });

                 }else{
                  $ionicLoading.hide();
                   var alertPopup = $ionicPopup.alert({
                                  title:    'Something went wrong!',
                                  template: data.message,
                                  buttons:[
                                    {
                                      text: '<b>Ok</b>',
                                      type: 'pink-white-theme-color'
                                    }
                                  ]
                              });

                 }

        });    
            //console.log(data)
         
          });  

            // https://graph.facebook.com/me?fields=email,name,id,gender&access_token=EAAXo2yZBTRAgBAK38A2ReEZAI1sMvpkjuiJ5ZBwAGauEwGhmv6H9XzUctwYohn3SVZCHrMKJvTMHxwM4KmAe9ZAKvfccSAHRpDkU4daaswfr1rJwul5uUgobPKYmGyPiJUbHurnDgjB73z8MtaVsRWeZAtrgDJmnuA4u9ATVR0XBRqc1ZCKA4m3BzfQQmbBjJUZD
        }, function(error) {
            console.log(JSON.stringify(error));
             $ionicLoading.hide();
        });
    }