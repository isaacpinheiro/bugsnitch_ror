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

app.controller('AccessController', function($scope, $rootScope, $window){

  $scope.logged = true;
  $scope.usuario = null;

  $scope.SignIn = function(){
    $window.location.href = '#/signin';
  };

  $scope.$on('conectar', function(event, usuarioObj){
    $scope.logged = true;
    $scope.usuario = usuarioObj;
  });

  $scope.SignOut = function(){
    $scope.logged = false;
    $scope.usuario = null;
    $window.location.href = '#/';
    $rootScope.$broadcast('dash_out');
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

app.controller('MainController', function($scope, $rootScope, $http, $window){

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
        url: 'usuarios.json',
        method: 'POST',
        data: $scope.usuario
      })
      .then(function(response){
        $rootScope.$broadcast('conectar', $scope.usuario);
        $rootScope.$broadcast('dash_in', $scope.usuario);
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

app.controller('DashboardController', function($scope, $window){

  $scope.$on('dash_in', function(event, usuarioObj){
    $scope.usuario = usuarioObj;
  });

  $scope.$on('dash_out', function(){
    $scope.usuario = null;
  });

  if($scope.usuario == null){
    $window.location.href = '#/';
  }

  $scope.projeto = [
    {

      "id": 1,
      "descricao": "Site da Melro Lanches",
      "area": "Frontend",
      "status": "Concluído",
      "data_inicio": "2016-04-01T00:00:01.000Z",
      "data_fim": "2016-04-10T23:59:59.000Z",
      "url": "http://172.31.216.12:3000/projetos/1.json"

    },
    {

      "id": 2,
      "descricao": "Projeto Arduino",
      "area": "Embarcado",
      "status": "Andamento",
      "data_inicio": "2016-04-03T03:00:01.000Z",
      "data_fim": "2016-04-25T14:30:00.000Z",
      "url": "http://172.31.216.12:3000/projetos/2.json"

    },
    {

      "id": 3,
      "descricao": "Monitor de tráfego aéreo",
      "area": "51",
      "status": "Andamento",
      "data_inicio": "2016-04-03T03:00:01.000Z",
      "data_fim": "2017-09-16T15:00:00.000Z",
      "url": "http://172.31.216.12:3000/projetos/3.json"

    },
    {

      "id": 4,
      "descricao": "Análise aerodinâmica de aileron",
      "area": "Aeroespacial",
      "status": "Andamento",
      "data_inicio": "2016-04-03T09:00:01.000Z",
      "data_fim": "2017-09-16T14:00:00.000Z",
      "url": "http://172.31.216.12:3000/projetos/4.json"

    },
    {

      "id": 5,
      "descricao": "Aplicativo de aviso de processo",
      "area": "Direito/Jurídica",
      "status": "Andamento",
      "data_inicio": "2016-04-13T09:00:01.000Z",
      "data_fim": "2017-09-19T14:00:00.000Z",
      "url": "http://172.31.216.12:3000/projetos/5.json"

    },
    {

      "id": 6,
      "descricao": "Estatística de desperdício de alimentos (RU)",
      "area": "Alimentícia",
      "status": "Andamento",
      "data_inicio": "2015-04-03T09:00:01.000Z",
      "data_fim": "2018-09-16T14:00:00.000Z",
      "url": "http://172.31.216.12:3000/projetos/6.json"

    },
    {

      "id": 7,
      "descricao": "Tratamento de dados de batida de automóveis",
      "area": "Automobilística",
      "status": "Andamento",
      "data_inicio": "2015-04-03T09:00:01.000Z",
      "data_fim": "2020-09-16T14:00:00.000Z",
      "url": "http://172.31.216.12:3000/projetos/7.json"

    },
    {

      "id": 8,
      "descricao": "Firewall com ajuste inteligente de risco",
      "area": "IT",
      "status": "Andamento",
      "data_inicio": "2016-04-03T09:00:01.000Z",
      "data_fim": "2016-09-16T14:00:00.000Z",
      "url": "http://172.31.216.12:3000/projetos/8.json"

    },
    {

      "id": 9,
      "descricao": "Algoritmo aritmético para solução de PI",
      "area": "Matemática",
      "status": "Andamento",
      "data_inicio": "2016-04-03T09:00:01.000Z",
      "data_fim": "2017-09-16T14:00:00.000Z",
      "url": "http://172.31.216.12:3000/projetos/9.json"

    },
    {

      "id": 10,
      "descricao": "Resolução de NP-difícil",
      "area": "Matemática",
      "status": "Andamento",
      "data_inicio": "2016-04-03T09:00:01.000Z",
      "data_fim": "2022-09-16T19:00:00.000Z",
      "url": "http://172.31.216.12:3000/projetos/10.json"

    }
  ];

});
