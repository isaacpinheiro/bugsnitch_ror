"use strict";

var app = angular.module('bugsnitch', ['ngRoute', 'ngResource']);

app.config(['$routeProvider', function($routeProvider){

  $routeProvider
    .when('/', {
      templateUrl: 'templates/main.html',
      controller: 'MainController'
    })
    .when('/sobre', {
      templateUrl: 'templates/sobre.html',
    })
    .when('/equipe', {
      templateUrl: 'templates/equipe.html',
    })
    .when('/contato', {
      templateUrl: 'templates/contato.html',
      controller: 'ContatoController'
    })
    .when('/termos', {
      templateUrl: 'templates/termos.html',
    })
    .when('/signin', {
      templateUrl: 'templates/signin.html',
      controller: 'SignInController'
    })
    .when('/dashboard', {
      templateUrl: 'templates/dashboard.html',
      controller: 'DashboardController'
    })
    .otherwise({
      redirectTo: '/'
    });

}]);

app.controller('AccessController', function($scope, $window){

  $scope.logged = false;

  $scope.SignIn = function(){
    $window.location.href = '#/signin';
  };

});

app.controller('SignInController', function($scope){

  $scope.errMsg = '';
  $scope.email = '';
  $scope.senha = '';

  $scope.Entrar = function(){

    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    if($scope.email == ''){

      $scope.errMsg = 'Por favor, informe o seu E-mail.';

    }else if(!filter.test($scope.email)){

      $scope.errMsg = 'Por favor, informe um E-mail válido';

    }else if($scope.senha == ''){

      $scope.errMsg = 'Por favor, informa a sua senha.';

    }else {

      $scope.errMsg = '';
      alert('Entrar');

      // TODO

    }

  };

});

app.controller('MainController', function($scope, $http, $window){

  $scope.errMsg = '';
  $scope.nome = '';
  $scope.email = '';
  $scope.senha = '';
  $scope.confSenha = '';

  $scope.Cadastrar = function(){

    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    if($scope.nome == ''){

      $scope.errMsg = 'Por favor, informe o seu nome.';

    }else if($scope.email == ''){

      $scope.errMsg = 'Por favor, informe o seu E-mail.';

    }else if(!filter.test($scope.email)){

      $scope.errMsg = 'Por favor, informe um E-mail válido';

    }else if($scope.senha == ''){

      $scope.errMsg = 'Por favor, informa a sua nova senha.';

    }else if($scope.confSenha == ''){

      $scope.errMsg = 'Por favor, confirme a sua nova senha.';

    }else if($scope.confSenha != $scope.senha){

      $scope.errMsg = 'A confirmação está diferente da senha.';

    }else{

      $scope.errMsg = '';

      $scope.usuario = {
        id: null,
        nome: $scope.nome,
        email: $scope.email,
        senha: $scope.senha
      };

      $http({
        url: '/usuarios.json',
        method: 'POST',
        data: $scope.usuario
      })
      .then(function(response){
        $window.location.href = '#/dashboard';
      })
      .then(function(response){
        $scope.errMsg = 'Error';
      });

    }

  };

});

app.controller('ContatoController', function($scope){

  $scope.errMsg = '';
  $scope.nome = '';
  $scope.telefone = '';
  $scope.email = '';
  $scope.mensagem = '';

  $scope.Enviar = function(){

    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    if($scope.nome == ''){

      $scope.errMsg = 'Por favor, informe o seu nome.';

    }else if($scope.telefone == ''){

      $scope.errMsg = 'Por favor, informe o seu telefone.';

    }else if($scope.email == ''){

      $scope.errMsg = 'Por favor, informe o seu E-mail.';

    }else if(!filter.test($scope.email)){

      $scope.errMsg = 'Por favor, informe um E-mail válido';

    }else if($scope.mensagem == ''){

      $scope.errMsg = 'Por favor, informa a sua mensagem.';

    }else{

      $scope.errMsg = '';
      alert('Enviar');

      // TODO

    }

  };

});
