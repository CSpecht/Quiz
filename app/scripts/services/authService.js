// (function () {
//     'use strict';
//     angular.module('yapp')
//         .factory('authService', function ($state, $localStorage, $http) {

//             return {
//                 isLogged: false,
//                 tokenStillValid: false,
//                 check: check,
//                 decodeToken: decodeToken,
//                 logout: logout
//             };


//             function check() {
//                 /*jshint validthis: true */

//                 if ($localStorage.token && $localStorage.user) {
//                     var decoded = decodeToken($localStorage.token);
//                     if (!(decoded && checkExpire(decoded.exp))) {
//                         logout();
//                         return;
//                     }
//                     this.isLogged = true;

//                 } else {
//                     this.isLogged = false;
//                 }


//             }


//             function urlBase64Decode(str) {
//                 var output = str.replace(/-/g, '+').replace(/_/g, '/');
//                 switch (output.length % 4) {
//                     case 0:
//                     {
//                         break;
//                     }
//                     case 2:
//                     {
//                         output += '==';
//                         break;
//                     }
//                     case 3:
//                     {
//                         output += '=';
//                         break;
//                     }
//                     default:
//                     {
//                         throw 'Illegal base64url string!';
//                     }
//                 }
//                 return decodeURIComponent(escape(window.atob(output)));
//             }


//             function decodeToken(token) {
//                 /*jshint validthis: true */

//                 var parts = token.split('.');

//                 if (parts.length !== 3) {
//                     console.log('not a token');
//                     return false;
//                 }

//                 var decoded = urlBase64Decode(parts[1]);
//                 if (!decoded) {
//                     console.log('error while decoding');
//                     return false;
//                 }
//                 return JSON.parse(decoded);
//             }

//             function checkExpire(exp) {
//                 return Math.round(new Date().getTime() / 1000) <= exp;
//             }


//             function logout() {
//                 /*jshint validthis: true */

//                 var self = this;

//                 $http.post('//localhost:9000/logout').then(function () {
//                     self.isLogged = false;
//                     $localStorage.$reset();
//                     $state.go('login');

//                 }, function (err) {
//                     console.log(err);
//                 });


//             }

//         });
// })();
