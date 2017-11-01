angular.module('oddJobs.routes', [])
.config(function($stateProvider,$urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.backButton.previousTitleText(false).text('');
  $ionicConfigProvider.views.swipeBackEnabled(false);
var checkRememberMe = function($q, $state, $ionicViewService, $ionicLoading, $timeout, $location,$rootScope){
var deferred = $q.defer();
// console.log("te")
// console.log(localStorage.getItem("localdata"))
// console.log("@@@@@@@@@@")
// console.log(localStorage.getItem("notificationData"))
    if (localStorage.getItem("localdata") === null) {
    // $state.go('home');
      $timeout(deferred.resolve, 0);
    }  else{
      $timeout(deferred.resolve, 0);
      $ionicViewService.nextViewOptions({disableBack: true});
      $location.path('/app/home');
      // $state.go('sidemenu.myoffer');
    }
   return deferred.promise;
 }
 $stateProvider

  .state('signin', {
        url: '/sign-in',
        cache:false,
        templateUrl: 'templates/users/login.html',
        controller: 'RegisterCtrl',
        resolve:{checked:checkRememberMe}
  }) 

  .state('register', {
      url: '/register',
      cache:false,
      templateUrl: 'templates/users/register.html',
      controller: 'RegisterCtrl'
  }) 

  .state('forgotpassword', {
      url: '/forgotpassword',
      templateUrl: 'templates/users/forgot.html',
      controller: 'RegisterCtrl'
  }) 

  .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/global/menu.html',
      controller: 'AppCtrl'
  })

  .state('app.skills', {
      url: '/skills',
      cache:false,
      views: {
          'menuContent': {
          templateUrl: 'templates/jobs/skills.html',
          controller: 'SkillsCtrl'
          }
      }
  })

  // .state('app.skillnew', {
  //     url: '/skillnew',
  //     cache:false,
  //     views: {
  //         'menuContent': {
  //         templateUrl: 'templates/users/skillnew.html',
  //         controller: 'AddprofileCtrl'
  //         }
  //     }
  // })
  

  .state('app.messages', {
      url: '/messages',
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/users/message.html',
        controller: 'MsgCtrl'
        }
      }
  })

  .state('app.messageform', {
      url: '/messageform/:Id/:msgId',//recieverId and thread Id
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/users/msgform.html',
        controller: 'MsgCtrl'
        }
      }
  })

  .state('app.postjob', {
      url: '/postjob/:skillId/:categoryId', 
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/jobs/postjob.html',
        controller: 'JobCtrl'
        }
      }
  })

   .state('app.postjobskill', {
      url: '/postjob/:categoryId', 
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/jobs/postjob.html',
        controller: 'JobCtrl'
        }
      }
  })

  .state('app.myjob', {
      url: '/myjob', 
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/users/myjob.html',
        controller: 'MyJobCtrl'
        }
      }
  })

  .state('app.postlist', {
      url: '/postlist', 
      cache:false,
      views: {
      'menuContent': {
        templateUrl: 'templates/jobs/postlist.html',
        controller: 'JobCtrl'
        }
      }
  })
  .state('app.postlistskill', {
      url: '/postlist/:skId', 
      cache:false,
      views: {
      'menuContent': {
        templateUrl: 'templates/jobs/postlistskill.html',
        controller: 'JobCtrl'
        }
      }
  })

  .state('app.myjoblist', {
      url: '/myjoblist/:userId/:type', 
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/users/myjoblist.html',
        controller: 'MyJobCtrl'
        }
      }
  })
.state('app.notification', {
      url: '/notification', 
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/users/notification.html',
        controller: 'NotificationCtrl'
        }
      }
  })
  .state('app.payment', {
      url: '/payment', 
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/users/paymentform.html',
        controller: 'PaymentCtrl'
        }
      }
  })

  .state('app.savedcard', {
      url: '/savedcard/:offerId/:budget', 
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/users/savedcard.html',
        controller: 'PaymentCtrl'
        }
      }
  })

  .state('app.carddetail', {
      url: '/carddetail/:offerId/:budget/:type', 
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/users/carddetail.html',
        controller: 'PaymentCtrl'
        }
      }
  })

  .state('app.viewjob', {
      url: '/viewjob/:jobId', 
      cache:false,
      views: {
          'menuContent': {
          templateUrl: 'templates/jobs/viewjob.html',
          controller: 'JobViewCtrl'
          }
      }
  })

  .state('app.makeoffer', {
      url: '/makeoffer/:postId', 
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/jobs/makeoffer.html',
        controller: 'MakeOfferCtrl'
        }
      }
  })

  .state('app.editoffer', {
      url: '/editoffer/:offerId/:postId', 
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/jobs/makeoffer.html',
        controller: 'MakeOfferCtrl'
        }
      }
  })

  .state('app.comment', {
      url: '/comment/:jobId/:authorId/:commentId', 
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/jobs/comment.html',
        controller: 'CommentCtrl'
        }
      }
  })

  .state('app.editjob', {
      url: '/editjob/:jobId', 
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/jobs/postjob.html',
        controller: 'JobCtrl'
        }
      }
  })

  .state('app.addprofile', {
      url: '/addprofile',
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/users/addprofile.html',
        controller: 'AddprofileCtrl'
        }
      }
  })

  .state('app.home', {
      url: '/home',
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/users/home.html',
        controller: 'HomeCtrl'
        }
      }
  })

  .state('app.userprofile', {
      url: '/userprofile/:userId',
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/users/userprofile.html',
        controller: 'UserProfileCtrl'
        }
      }
  })



  .state('app.settings', {
      url: '/settings',
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/users/changepassword.html',
        controller: 'RegisterCtrl'
        }
      }
  })

  .state('app.acceptoffer', {
      url: '/acceptoffer/:jobId/:offerId', 
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/jobs/acceptoffer.html',
        controller: 'OfferCtrl'
        }
      }
  })

  .state('app.transaction', {
      url: '/transaction', 
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/users/transaction.html',
        controller: 'TransactionCtrl'
        }
      }
  })

  .state('app.transactionlist', {
      url: '/transactionlist/:userId/:type/:limit', 
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/users/transactionlist.html',
        controller: 'TransactionCtrl'
        }
      }
  })
  .state('app.transactionview', {
      url: '/transactionview/:type/:jobId', 
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/users/transactionview.html',
        controller: 'TransactionCtrl'
        }
      }
  })
  .state('app.review', {
      url: '/review/:userId', 
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/users/review.html',
        controller: 'ReviewCtrl'
        }
      }
  })
  .state('app.feedback', {
      url: '/feedback', 
      cache:false,
      views: {
        'menuContent': {
        templateUrl: 'templates/global/feedback.html',
        controller: 'FeedbackCtrl'
        }
      }
  })
 // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/sign-in');
});
