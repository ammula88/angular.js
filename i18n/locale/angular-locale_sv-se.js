window.angular = window.angular || {};
angular.module = angular.module || {};
angular.module.NG_LOCALE = ["$provide", function($provide) {
var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
$provide.value("$locale", {"NUMBER_FORMATS":{"DECIMAL_SEP":",","GROUP_SEP":" ","PATTERNS":[{"minInt":1,"minFrac":0,"macFrac":0,"posPre":"","posSuf":"","negPre":"-","negSuf":"","gSize":3,"lgSize":3,"maxFrac":3},{"minInt":1,"minFrac":2,"macFrac":0,"posPre":"","posSuf":" \u00A4","negPre":"-","negSuf":" \u00A4","gSize":3,"lgSize":3,"maxFrac":2}],"CURRENCY_SYM":"kr"},"pluralCat":function (n) {  if (n == 1) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;},"DATETIME_FORMATS":{"MONTH":["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"],"SHORTMONTH":["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"],"DAY":["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag"],"SHORTDAY":["sön","mån","tis","ons","tors","fre","lör"],"AMPMS":["fm","em"],"medium":"d MMM y HH:mm:ss","short":"yyyy-MM-dd HH:mm","fullDate":"EEEE'en' 'den' d:'e' MMMM y","longDate":"d MMMM y","mediumDate":"d MMM y","shortDate":"yyyy-MM-dd","mediumTime":"HH:mm:ss","shortTime":"HH:mm"},"id":"sv-se"});
}];