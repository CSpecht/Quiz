'use strict';

angular
    .module('yapp', [
        'ui.router',
        'ui.date',
        'snap',
        'ngAnimate',
        'timer',
        'ngStorage'


    ])

    .value('nodeServer', '//localhost:9004')
    //TODO Wenn USER eingeloggt && route localhost:8000 wählt umleitung auf Dashboard
    .run(function($rootScope, $location) {
        //authService.check();

        // console.log($rootScope);
        // $rootScope.$on("$routeChangeStart", function (event, next, current) {
        //     if ($rootScope.loggedInUser == null) {
        //         // no logged user, redirect to /login
        //         if (next.templateUrl === "views/login.html") {
        //         } else {
        //             $location.path("/login");

        //         }
        //     }
        // });

        // $rootScope.$on('$stateChangeStart', function (event, nextRoute) {
        //     if (!authService.isLogged && nextRoute.name !== 'login') {
        //         console.log(1);
        //         event.preventDefault();
        //         $state.go('login');
        //     }
        // });

        // $rootScope.$on('$stateChangeSuccess', function (event, nextRoute) {
        //     if (authService.isLogged === true && nextRoute.name === 'login') {
        //         console.log(2);
        //         event.preventDefault();
        //         $state.go('dashboard');
        //     }
        // });




    })

    .config(function ($stateProvider, $urlRouterProvider) {

       // $urlRouterProvider.when('/dashboard', '/dashboard/overview', '/test');
       // $urlRouterProvider.otherwise('/login');

       // $localStorageProvider.setKeyPrefix('hdm.');


        $urlRouterProvider.when('/dashboard', '/dashboard/overview', '/test');
        $urlRouterProvider.otherwise('/login');

       // $httpProvider.interceptors.push('tokenInterceptor');

        $stateProvider
            .state('base', {
                abstract: true,
                url: '',
                templateUrl: 'views/base.html'
            })
            .state('login', {
                url: '/login',
                parent: 'base',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .state('logout', {
                url: '/logout',
                parent: 'base',
                templateUrl: 'views/login.html',
                controller: 'LogoutCtrl'
            })
            .state('test', {
                url: '/test',
                parent: 'dashboard',
                templateUrl: 'views/test.html',
                controller: 'TestCtrl'
            })
            .state('createQuiz', {
                url: '/createQuiz',
                parent: 'dashboard',
                templateUrl: 'views/Quiz/createQuiz.html',
                controller: 'createQuizCtrl'
            })
            .state('createQuestion', {
                url: '/createQuestion',
                parent: 'dashboard',
                templateUrl: 'views/Quiz/createQuestion.html',
                controller: 'createQuestionCtrl'
            })
            .state('createUser', {
                url: '/createUser',
                parent: 'dashboard',
                templateUrl: 'views/User/createUser.html',
                controller: 'createUserCtrl'
            })
            .state('editUser', {
                url: '/editUser',
                parent: 'dashboard',
                templateUrl: 'views/User/editUser.html',
                controller: 'editUserCtrl'
            })
            .state('dashboard', {
                url: '/dashboard',
                parent: 'base',
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .state('overview', {
                url: '/overview',
                parent: 'dashboard',
                templateUrl: 'views/dashboard/overview.html'
            })
            .state('reports', {
                url: '/reports',
                parent: 'dashboard',
                templateUrl: 'views/dashboard/reports.html'
            })

    })

