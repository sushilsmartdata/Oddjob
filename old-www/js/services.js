var oddJobs = angular.module('oddJobs.services', ['ionic']);

oddJobs.service('IonicClosePopupService', [
            function () {
                var currentPopup;
                var htmlEl = angular.element(document.querySelector('html'));
                htmlEl.on('click', function (event) {
                    if (event.target.nodeName === 'HTML') {
                        if (currentPopup) {
                            currentPopup.close();
                        }
                    }
                });

                this.register = function (popup) {
                    currentPopup = popup;
                }
            }
        ])

.factory('socket',function(socketFactory){
    //Create socket and connect to http://chat.socket.io 
    var myIoSocket = io.connect("http://54.87.244.231:2087/",{'force new connection':true });

    mySocket = socketFactory({
        ioSocket: myIoSocket
    });
    return mySocket;
})
.factory('LoginService',function($q, $http) {
        return {
            Login: function(dataJSON) {
                var promise = $http({
                    url: USER_LOGIN,
                    method: 'POST',
                    data:   dataJSON,
                    headers: GLOBAL_HEADERS
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            UpdateProfile: function(dataJSON) {
                var promise = $http({
                    url: UPDATE_PROFILE+"/"+dataJSON._id,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']

                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
             ChangePassword: function(dataJSON) {
                var promise = $http({
                    url: CHANGE_PASSWORD,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']

                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            userDetail: function(userId) {
                var promise = $http({
                    url:USER_DETAIL+'/'+userId,
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']

                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            }  
            
        }
        
    }).factory('RegisterService',function($q, $http) {
        return {
            SignUp: function(dataJSON) {
                var promise = $http({
                    url: SIGNUP,
                    method: 'POST',
                    data:   dataJSON,
                    headers: GLOBAL_HEADERS
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            SignUpSocial: function(dataJSON) {
                var promise = $http({
                    url: SIGNUP_SOCIAL,
                    method: 'POST',
                    data:   dataJSON,
                    headers: GLOBAL_HEADERS
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            defaultScreen: function(dataJSON) {
                var promise = $http({
                    url: DEFAULT_SCREEN,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']

                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            }
         }
        
    }).factory('ForgotService',function($q, $http) {
        return {
            forgotUser: function(dataJSON) {
                var promise = $http({
                    url: FORGOT_PASSWORD,
                    method: 'POST',
                    data:   dataJSON,
                    headers: GLOBAL_HEADERS
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            }
         }
        
    }).factory('AdminService',function($q, $http) {
        return {
            adminCommission: function(dataJSON) {
                var promise = $http({
                    url: ADMIN_COMMISSION,
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']

                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            }
         }
        
    }).factory('UserService',function($q, $http) {
        return {
            getJobsCount: function(userId) {
                var promise = $http({
                    url:USER_JOBCOUNTS+'/'+userId,
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']

                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            userUpdateImage: function(dataJSON) {
                var promise = $http({
                    url: USER_UPDATE_IMAGE,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']

                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            }
         }
        
    })
    .factory('SkillsService',function($q, $http) {
          return {

            getSkillsListing: function() {
                var promise = $http({
                    method: 'GET',
                    url:GET_SKILLS,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']

                    }
                }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            },getSkill: function(skillId) {
                var promise = $http({
                    method: 'GET',
                    url:GET_SKILL+'/'+skillId,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']

                    }
                }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            },getUserSkillsListing: function(userId) {
                var promise = $http({
                    method: 'GET',
                    url:USER_SKILLS+'/'+userId,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']

                    }
                }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            }
            
         }   
    }).factory('JobService',function($q, $http) {

       
        return {
            getActiveJob: function() {
                var promise = $http({
                    method: 'GET',
                    url:JOB_TYPES,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                    }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            },
            createJob: function(dataJSON) {
                var promise = $http({
                    url: CREATE_JOB,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']

                    }
                    
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
             updateJob: function(dataJSON) {
                var promise = $http({
                    url: UPDATE_JOB+"/"+dataJSON._id,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']

                    }
                    
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            additionalJob: function(dataJSON) {
                var promise = $http({
                    url: ADDITIONAL_JOB+"/"+dataJSON.job._id,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']

                    }
                    
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            getJobList: function(dataJSON) {
                //console.log()
                var promise = $http({
                    method: 'POST',
                    url:JOB_LIST,
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                    }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            },
            JobView: function(jobId) {
                var promise = $http({
                    method: 'GET',
                    url:JOB_VIEW+'/'+jobId,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                    }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            },
            MyJob: function(userId) {
                var promise = $http({
                    method: 'GET',
                    url:MY_JOB+'/'+userId,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                    }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            },
            MyJobList: function(userId,type,limit) {
                var promise = $http({
                    method: 'GET',
                    url:MY_JOB_LIST+'/'+userId+'/'+type+'/'+limit,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                    }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            },
            GetDetailJob: function(jobId) {
                var promise = $http({
                    method: 'GET',
                    url:JOB_VIEW+'/'+jobId,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                    }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            },
            DeleteJob: function(dataJSON) {
                var promise = $http({
                    method: 'POST',
                    url:DELETE_JOB,
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                    }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            }
           
            
            
         }   
    }).factory('OfferService',function($q, $http) {
         var rating = '5';
        return {
            getDynamicRating: function () {
                var deferred = $q.defer(); 
                deferred.resolve(rating);
                return deferred.promise;
            },

            setDynamicRating: function (ratingValue) {
                var deferred = $q.defer();
                rating = ratingValue;     
                deferred.resolve(rating);
                return deferred.promise; 
            },
            createOffer: function(dataJSON) {
                var promise = $http({
                    url: CREATE_OFFER,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
             OffersList: function(jobId) {
                var promise = $http({
                    method: 'GET',
                    url:OFFERS_LIST+'/'+jobId,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                    }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            },OffersDetail: function(jobId) {
                var promise = $http({
                    method: 'GET',
                    url:OFFER_DETAIL+'/'+jobId,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                    }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            },EditOffer: function(offerData) {
                var promise = $http({
                    method: 'POST',
                    data:offerData,
                    url:EDIT_OFFER+'/'+offerData._id,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                    }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            },
            OfferAccept: function(dataJSON,offerId) {
                var promise = $http({
                    method: 'POST',
                    data:dataJSON,
                    url:ACCEPT_OFFER+'/'+offerId,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                    }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            },
            postRatingOnProfile: function(dataJSON) {
                var promise = $http({
                    method: 'POST',
                    data:dataJSON,
                    url:POST_RATING_ON_PROFILE,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                    }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            },
             offerCountUpdate: function(dataJSON) { 
                var promise = $http({
                    method: 'POST',
                    data:dataJSON,
                    url:OFFER_COUNT_UPDATE,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                    }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            }



         }
        
    }).factory('Comments',function($q, $http) {
        return {
            postComment: function(dataJSON) {
                var promise = $http({
                    url: POST_COMMENT,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            replyComment: function(dataJSON,commentId) {
                var promise = $http({
                    url: REPLY_COMMENT+'/'+commentId,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            getComments: function(commentId) {
                var promise = $http({
                    method: 'GET',
                    url:COMMENT_LIST+'/'+commentId,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                    }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            },
             getJobs: function(jobId) {
                var promise = $http({
                    method: 'GET',
                    url:COMMENT_JOB+'/'+jobId,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                    }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            },
            getCommentThread: function(jobId,userId) {
                var promise = $http({
                    method: 'GET',
                    url:GET_THREAD+'/'+jobId+'/'+userId,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                    }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            },
            deleteCommentThread: function(dataJSON) {
                var promise = $http({
                    url: DELETE_COMMENT_THREAD,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            }
         }
        
    }).factory('MessageService',function($q, $http) {
        return {
            messageContactList: function(userId) {
                var promise = $http({
                    method: 'GET',
                    url:MESSAGE_CONTACTS+'/'+userId,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                    }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            },
            messageAdd: function(dataJSON) {
                var promise = $http({
                    url: MESSAGE_ADD,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            messageReply: function(dataJSON) {
                var promise = $http({
                    url: MESSAGE_REPLY+"/"+dataJSON._id,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            messageList: function(userId) {
                var promise = $http({
                    method: 'GET',
                    url:MESSAGE_LIST+'/'+userId,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                    }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            },
            messageThread: function(userId,threadId) {
                var promise = $http({
                    method: 'GET',
                    url:MESSAGE_THREAD+'/'+userId+'/'+threadId,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                    }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            },
            userThread: function(senderId,recieverId) {

                var promise = $http({
                    method: 'GET',
                    url:USER_THREAD+'/'+senderId+'/'+recieverId,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                    }).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            }
         }
        
    }).factory('PaymentService',function($q, $http) {
        return {
            CreateCustomer: function(dataJSON) {
                var promise = $http({
                    url: CREATE_CUSTOMER,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            updateCustomer: function(dataJSON) {
                var promise = $http({
                    url: UPDATE_CUSTOMER,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            setHostInfo: function(dataJSON) {
                var promise = $http({
                    url: BANK_INFORMATION,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },updateHostInfo: function(dataJSON) {
                var promise = $http({
                    url: UPDATE_BANK_INFORMATION,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            creditCardListing: function(dataJSON) {
                var promise = $http({
                    url: LISTING_CARDS,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
             makePaymentToAdmin: function(dataJSON) {
                var promise = $http({
                    url: MAKE_PAYMENT_TO_ADMIN,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            makeAddtionalJobPaymentToAdmin: function(dataJSON) {
                var promise = $http({
                    url: MAKE_ADDITIONAL_JOB_PAYMENT_TO_ADMIN,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            fundTransfer: function(dataJSON) {
                var promise = $http({
                    url: FUND_TRANSFER,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            getBankInformation: function(dataJSON) {
                var promise = $http({
                    url: GET_BANK_INFORMATION,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            getReceivedPayment: function(dataJSON) {
                var promise = $http({
                    url: RECEIVED_PAYMENT,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            getPaidPayment: function(dataJSON) {
                var promise = $http({
                    url: PAID_PAYMENT,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            }

         }
        
    }).factory('LocationService',function($q, $http) {
        return {
            getLocations: function() {
                var promise = $http.get(DEALS_LISTING).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            },
            getLocationByLatLong: function(latitude,longitude) {

                var deferred = $q.defer();                
                deferred.resolve($http.get(GET_ADDR + latitude + ',' + longitude +'&key='+GEOCODER_API_KEY));
                return deferred.promise;

            },
            getTimezoneByLatLong: function(latitude,longitude,timestamp) {

                var deferred = $q.defer();                 
                deferred.resolve($http.get(GET_TIMEZONE + latitude + ',' + longitude + '&timestamp=' + timestamp + '&key=' + GEOCODER_API_KEY));
                return deferred.promise;

            },
             getLatLongByLocation: function(address) {

                var deferred = $q.defer();                
                deferred.resolve($http.get(GET_LAT_LONG + address +'&key='+GEOCODER_API_KEY));
                return deferred.promise;
                
            }
        }
    }).factory('SocailService',function($q, $http) {
        return {
            getFacebookDetail: function(access_token) {
              var promise = $http({
                    method: 'GET',
                    url:FACEBOOK_DETAIL+'='+'email,first_name,last_name,name,id,gender,picture&access_token='+access_token,
                    }).success(function(data, status, headers, config) {   
                    return data;
                });
                return promise;
            },
            getGoogleDetail: function(access_token) {
              var promise = $http({
                    method: 'GET',
                    url:GOOGLE_DETAIL+"&access_token="+access_token,
                    }).success(function(data, status, headers, config) {   
                    return data;
                });
                return promise;
            },
            getLinkedInDetail: function(access_token) {
              var promise = $http({
                    method: 'GET',
                    url:LinkedIn_DETAIL+access_token,
                    }).success(function(data, status, headers, config) {   
                    return data;
                });
                return promise;
            },
             getTwitterInDetail: function(address) {

                var deferred = $q.defer();                
                deferred.resolve($http.get(GET_LAT_LONG + address +'&key='+GEOCODER_API_KEY));
                return deferred.promise;
                
            }
        }
    }).factory('FeedbackService',function($q, $http) {
        return {
            PostFeedback: function(dataJSON) {
                var promise = $http({
                    url: FEED_BACK,
                    method: 'POST',
                    data:   dataJSON,
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + window.localStorage['ACCESS_TOKEN']
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            }
           }
    })