var GLOBAL_HEADERS = {
    'Content-Type': 'application/json'
};

var SENDER_ID = '692191949673';
var FACEBOOK_APPID = "1663402977215496";
var GOOGLE_CLIENTID = "173159061770-5sre6lsqbhof9djmn82kvm80ogukbr3f.apps.googleusercontent.com";
var TWITTER_CONSUMERKEY = "VOmIToZfxoqh2hfO23k3HuP2w";
var TWITTER_CLIENTSECRETKEY = "WS7PCHHoRkb65GbsSycTsKjxcWt3xBNUY2KFpPb6A93LeeHoAq";
var LINKEDIN_CLIENTID = "81budfqhac2ucs";
var LINKEDIN_CLIENTSECRET = "uGv0woVksqZ9ytbb";

//var HOST = 'http://52.39.212.226:4019/';

var HOST = 'http://54.87.244.231:2078/';


var DOWNLOAD_LINK = 'http://google.com';

var PROFILE_IMAGE=HOST+'assets/upload/profileImg/';
var PROFILE_COVER_IMAGE=HOST+'assets/upload/profileImg/cover/';
var SKILL_IMAGE=HOST+'assets/upload/skills/';
var SKILL_COVER_IMAGE=HOST+'assets/upload/skills/cover/';
var SKILL_ICON_IMAGE=HOST+'assets/upload/skills/icon/';
var JOB_IMAGE=HOST+'assets/upload/jobs/';
var JOB_ORIGINAL_IMAGE=HOST+'assets/upload/jobs/original/';
var SERVER_IMAGE=HOST+'images';
var HELP_PAGE="http://getoddjob.com/help/";
var TERM_PAGE="http://getoddjob.com/help/terms.html";

var INVITE_MESSAGE = 'Hey, \n Great app to download. You can get jobs near by you. \n Click on DOWNLOAD LINK to download the app OR visit http://getoddjob.com to sign up. \nDownload Link: '+DOWNLOAD_LINK+'\nCheers';




var POS_OPTIONS = {
  timeout: 10000, 
  enableHighAccuracy: false
};
var GEOCODER_API_KEY = '';				
//var GEOCODER_API_KEY  = 'AIzaSyCzy3gZHHtst0Qudi-vIqDBzl6_e1cH36U';
var USER_LOGIN                 = HOST + 'users/authenticate';
var SIGNUP                     = HOST + 'users/add';
var SIGNUP_SOCIAL              = HOST + 'users/add';
var FORGOT_PASSWORD            = HOST + 'users/forgot_password';
var CHANGE_PASSWORD            = HOST + 'users/changePassword';
var UPDATE_PROFILE             = HOST + 'users/update';
var USER_SKILLS                = HOST + 'users/userSkills';
var USER_DETAIL                = HOST + 'users/userOne';
var USER_JOBCOUNTS             = HOST + 'users/userJobsCount';
var USER_UPDATE_IMAGE          = HOST + 'users/updateUserImage';
var GET_SKILLS                 = HOST + 'skills/getSkills';
var GET_SKILL                  = HOST + 'skills/skill';
var JOB_TYPES                  = HOST + 'jobtypes/activeList';
var CREATE_JOB                 = HOST + 'jobs/create';
var JOB_LIST                   = HOST + 'jobs/getJobs';
var JOB_VIEW                   = HOST + 'jobs/job';
var MY_JOB                     = HOST + 'jobs/userJobs';

var MY_JOB_LIST                = HOST + 'jobs/userAllJobs';

var DELETE_JOB                 = HOST + 'jobs/bulkUpdate';
//var GET_DETAIL_JOB             = HOST + 'jobs/job';
var UPDATE_JOB                 = HOST + 'jobs/update';


var ADDITIONAL_JOB             = HOST + 'jobs/additionalJob';

var CREATE_OFFER              = HOST + 'offers/add';
var OFFERS_LIST               = HOST + 'offers/job';
var OFFER_DETAIL              = HOST + 'offers/offer';
var OFFER_COUNT_UPDATE        = HOST + 'offers/bulkUpdate';
var ACCEPT_OFFER              = HOST + 'offers/update';
var EDIT_OFFER                = HOST + 'offers/edit';
var POST_COMMENT              = HOST + 'comments/add';
var REPLY_COMMENT             = HOST + 'comments/update';
var COMMENT_LIST              = HOST + 'comments/comment';
var COMMENT_JOB               = HOST + 'comments/job';

var GET_THREAD               = HOST + 'comments/thread';
var DELETE_COMMENT_THREAD    = HOST + 'comments/bulkUpdate';
var DELETE_COMMENT_THREAD    = HOST + 'comments/bulkUpdate';

var POST_RATING_ON_PROFILE   = HOST + 'users/addRating';

var DEFAULT_SCREEN           = HOST + 'users/defaultScreen';

/* Message APIs */

var MESSAGE_CONTACTS         = HOST + 'messages/allContacts';
var MESSAGE_ADD              = HOST + 'messages/add';
var MESSAGE_REPLY            = HOST + 'messages/update';
var MESSAGE_LIST             = HOST + 'messages/list';
var MESSAGE_THREAD           = HOST + 'messages/thread';

var USER_THREAD              = HOST + 'messages/userThread';



/* Feedback APIs */

var FEED_BACK               = HOST + 'feedbacks/create';





/* Payment APIs */

var CREATE_CUSTOMER           = HOST + 'stripe_payments/CreatCustomer';
var UPDATE_CUSTOMER           = HOST + 'stripe_payments/UpdateCustomer';

var LISTING_CARDS             = HOST + 'stripe_payments/savedCard';

var BANK_INFORMATION          = HOST + 'stripe_payments/setHostInfo';

var GET_BANK_INFORMATION      = HOST + 'stripe_payments/stripeIdInfo '

var UPDATE_BANK_INFORMATION   = HOST + 'stripe_payments/updateHostInfo';

var MAKE_PAYMENT_TO_ADMIN     = HOST + 'stripe_payments/makePaymentToAdmin';

var MAKE_ADDITIONAL_JOB_PAYMENT_TO_ADMIN  = HOST + 'stripe_payments/makeAdditionalJobPaymentToAdmin';


var FUND_TRANSFER             = HOST + 'stripe_payments/fundTransfer';

var ADMIN_COMMISSION          = HOST + 'adminlogin/getCommission';

var RECEIVED_PAYMENT          = HOST + 'stripe_payments/receivedPayment';

var PAID_PAYMENT              = HOST + 'stripe_payments/paidPayment';


var FACEBOOK_DETAIL         = "https://graph.facebook.com/me?fields"

var GOOGLE_DETAIL           = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json"

var LinkedIn_DETAIL         = "https://api.linkedin.com/v1/people/~:(email-address,first-name,last-name,picture-url)?format=json&oauth2_access_token="

//var TWITTTER_DETAIL           = "https://api.linkedin.com/v1/people/~:(email-address,first-name,last-name,picture-url)?format=json&oauth2_access_token="



 

















var GET_LAT_LONG        	= 'https://maps.googleapis.com/maps/api/geocode/json?address=';
var GET_ADDR              = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
var GET_TIMEZONE         	= 'https://maps.googleapis.com/maps/api/timezone/json?location=';

var CONTINENTS				= {
  "AD": "Europe",
  "AE": "Asia",
  "AF": "Asia",
  "AG": "North America",
  "AI": "North America",
  "AL": "Europe",
  "AM": "Asia",
  "AN": "North America",
  "AO": "Africa",
  "AQ": "Antarctica",
  "AR": "South America",
  "AS": "Australia",
  "AT": "Europe",
  "AU": "Australia",
  "AW": "North America",
  "AZ": "Asia",
  "BA": "Europe",
  "BB": "North America",
  "BD": "Asia",
  "BE": "Europe",
  "BF": "Africa",
  "BG": "Europe",
  "BH": "Asia",
  "BI": "Africa",
  "BJ": "Africa",
  "BM": "North America",
  "BN": "Asia",
  "BO": "South America",
  "BR": "South America",
  "BS": "North America",
  "BT": "Asia",
  "BW": "Africa",
  "BY": "Europe",
  "BZ": "North America",
  "CA": "North America",
  "CC": "Asia",
  "CD": "Africa",
  "CF": "Africa",
  "CG": "Africa",
  "CH": "Europe",
  "CI": "Africa",
  "CK": "Australia",
  "CL": "South America",
  "CM": "Africa",
  "CN": "Asia",
  "CO": "South America",
  "CR": "North America",
  "CU": "North America",
  "CV": "Africa",
  "CX": "Asia",
  "CY": "Asia",
  "CZ": "Europe",
  "DE": "Europe",
  "DJ": "Africa",
  "DK": "Europe",
  "DM": "North America",
  "DO": "North America",
  "DZ": "Africa",
  "EC": "South America",
  "EE": "Europe",
  "EG": "Africa",
  "EH": "Africa",
  "ER": "Africa",
  "ES": "Europe",
  "ET": "Africa",
  "FI": "Europe",
  "FJ": "Australia",
  "FK": "South America",
  "FM": "Australia",
  "FO": "Europe",
  "FR": "Europe",
  "GA": "Africa",
  "GB": "Europe",
  "GD": "North America",
  "GE": "Asia",
  "GF": "South America",
  "GG": "Europe",
  "GH": "Africa",
  "GI": "Europe",
  "GL": "North America",
  "GM": "Africa",
  "GN": "Africa",
  "GP": "North America",
  "GQ": "Africa",
  "GR": "Europe",
  "GS": "Antarctica",
  "GT": "North America",
  "GU": "Australia",
  "GW": "Africa",
  "GY": "South America",
  "HK": "Asia",
  "HN": "North America",
  "HR": "Europe",
  "HT": "North America",
  "HU": "Europe",
  "ID": "Asia",
  "IE": "Europe",
  "IL": "Asia",
  "IM": "Europe",
  "IN": "Asia",
  "IO": "Asia",
  "IQ": "Asia",
  "IR": "Asia",
  "IS": "Europe",
  "IT": "Europe",
  "JE": "Europe",
  "JM": "North America",
  "JO": "Asia",
  "JP": "Asia",
  "KE": "Africa",
  "KG": "Asia",
  "KH": "Asia",
  "KI": "Australia",
  "KM": "Africa",
  "KN": "North America",
  "KP": "Asia",
  "KR": "Asia",
  "KW": "Asia",
  "KY": "North America",
  "KZ": "Asia",
  "LA": "Asia",
  "LB": "Asia",
  "LC": "North America",
  "LI": "Europe",
  "LK": "Asia",
  "LR": "Africa",
  "LS": "Africa",
  "LT": "Europe",
  "LU": "Europe",
  "LV": "Europe",
  "LY": "Africa",
  "MA": "Africa",
  "MC": "Europe",
  "MD": "Europe",
  "ME": "Europe",
  "MG": "Africa",
  "MH": "Australia",
  "MK": "Europe",
  "ML": "Africa",
  "MM": "Asia",
  "MN": "Asia",
  "MO": "Asia",
  "MP": "Australia",
  "MQ": "North America",
  "MR": "Africa",
  "MS": "North America",
  "MT": "Europe",
  "MU": "Africa",
  "MV": "Asia",
  "MW": "Africa",
  "MX": "North America",
  "MY": "Asia",
  "MZ": "Africa",
  "NA": "Africa",
  "NC": "Australia",
  "NE": "Africa",
  "NF": "Australia",
  "NG": "Africa",
  "NI": "North America",
  "NL": "Europe",
  "NO": "Europe",
  "NP": "Asia",
  "NR": "Australia",
  "NU": "Australia",
  "NZ": "Australia",
  "OM": "Asia",
  "PA": "North America",
  "PE": "South America",
  "PF": "Australia",
  "PG": "Australia",
  "PH": "Asia",
  "PK": "Asia",
  "PL": "Europe",
  "PM": "North America",
  "PN": "Australia",
  "PR": "North America",
  "PS": "Asia",
  "PT": "Europe",
  "PW": "Australia",
  "PY": "South America",
  "QA": "Asia",
  "RE": "Africa",
  "RO": "Europe",
  "RS": "Europe",
  "RU": "Europe",
  "RW": "Africa",
  "SA": "Asia",
  "SB": "Australia",
  "SC": "Africa",
  "SD": "Africa",
  "SE": "Europe",
  "SG": "Asia",
  "SH": "Africa",
  "SI": "Europe",
  "SJ": "Europe",
  "SK": "Europe",
  "SL": "Africa",
  "SM": "Europe",
  "SN": "Africa",
  "SO": "Africa",
  "SR": "South America",
  "ST": "Africa",
  "SV": "North America",
  "SY": "Asia",
  "SZ": "Africa",
  "TC": "North America",
  "TD": "Africa",
  "TF": "Antarctica",
  "TG": "Africa",
  "TH": "Asia",
  "TJ": "Asia",
  "TK": "Australia",
  "TM": "Asia",
  "TN": "Africa",
  "TO": "Australia",
  "TR": "Asia",
  "TT": "North America",
  "TV": "Australia",
  "TW": "Asia",
  "TZ": "Africa",
  "UA": "Europe",
  "UG": "Africa",
  "US": "North America",
  "UY": "South America",
  "UZ": "Asia",
  "VC": "North America",
  "VE": "South America",
  "VG": "North America",
  "VI": "North America",
  "VN": "Asia",
  "VU": "Australia",
  "WF": "Australia",
  "WS": "Australia",
  "YE": "Asia",
  "YT": "Africa",
  "ZA": "Africa",
  "ZM": "Africa",
  "ZW": "Africa"
};