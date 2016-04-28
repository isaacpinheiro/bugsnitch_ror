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

  $scope.logged = false;
  $scope.usuario = null;

  $scope.SignIn = function(){
    $window.location.href = '#/signin';
  };

  $scope.$on('conectar', function(event, usuarioObj){
    $scope.logged = true;
    $scope.usuario = usuarioObj;
  });

  $scope.$on('desconectar', function(){
    $scope.logged = false;
    $scope.usuario = null;
    $window.location.href = '#/';
    $rootScope.$broadcast('dash_out');
  });

  $scope.SignOut = function(){
    $scope.logged = false;
    $scope.usuario = null;
    $window.location.href = '#/';
    $rootScope.$broadcast('dash_out');
  };

});

app.controller('SignInController', function($scope, $rootScope, $http, $window){

  $scope.errMsg = '';
  $scope.email = '';
  $scope.senha = '';
  $scope.usuario = null;

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

      $http({
        url: 'usuarios.json',
        method: 'GET',
      })
      .then(function(response){

        for(var i=0; i<response.data.length; i++){
          if(response.data[i].email == $scope.email){
            $scope.usuario = response.data[i];
            break;
          }
        }

        if($scope.usuario != null){

          if($scope.usuario.senha != $scope.senha){
            $scope.errMsg = 'Usuário ou senha incorretos.';
          }else{
            $rootScope.$broadcast('conectar', $scope.usuario);
            $rootScope.$broadcast('dash_in', $scope.usuario);
            $window.location.href = '#/dashboard';
          }

        }else{
          $scope.errMsg = 'Usuário inexistente.';
        }

      })
      .then(function(response){

      });

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

      $scope.errMsg = 'Por favor, informe a sua nova senha.';

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

app.controller('ContatoController', function($scope, $http){

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

      $scope.errMsg = 'Enviando ...';

      $scope.emailObj = {
        nome: $scope.nome,
        telefone: $scope.telefone,
        email: $scope.email,
        mensagem: $scope.mensagem
      }

      $http({
        url: 'contatos.json',
        method: 'POST',
        data: $scope.emailObj
      })
      .then(function(response){
        $scope.errMsg = 'Informações enviadas com sucesso.';
        $scope.nome = '';
        $scope.telefone = '';
        $scope.email = '';
        $scope.mensagem = '';
      })
      .then(function(response){

      });

    }

  };

});

app.controller('DashboardController', function($scope, $http, $window, $rootScope){

  $scope.projetoDiv = true;
  $scope.alterarContaDiv = false;
  $scope.deletarContaDiv = false;

  $scope.$on('dash_in', function(event, usuarioObj){
    $scope.usuario = usuarioObj;
  });

  $scope.$on('dash_out', function(){
    $scope.usuario = null;
  });

  if($scope.usuario == null){
    $window.location.href = '#/';
  }

  $scope.nome = $scope.usuario.nome;
  $scope.email = $scope.usuario.email;

  $scope.ProjectDiv = function(){
    $scope.projetoDiv = true;
    $scope.alterarContaDiv = false;
    $scope.deletarContaDiv = false;
  };

  $scope.AlterarDiv = function(){
    $scope.projetoDiv = false;
    $scope.alterarContaDiv = true;
    $scope.deletarContaDiv = false;
  };

  $scope.DeletarDiv = function(){
    $scope.projetoDiv = false;
    $scope.alterarContaDiv = false;
    $scope.deletarContaDiv = true;
  };

  $scope.alterarErrMsg = '';
  $scope.deletarErrMsg = '';

  $scope.Alterar = function(){

    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    if($scope.usuario.nome == ''){

      $scope.errMsg = 'Por favor, informe o seu nome.';

    }else if($scope.usuario.email == ''){

      $scope.errMsg = 'Por favor, informe o seu E-mail.';

    }else if(!filter.test($scope.usuario.email)){

      $scope.errMsg = 'Por favor, informe um E-mail válido';

    }else if($scope.usuario.senha == ''){

      $scope.errMsg = 'Por favor, informa a sua senha.';

    }else if($scope.confSenha == ''){

      $scope.errMsg = 'Por favor, confirme a sua senha.';

    }else if($scope.confSenha != $scope.usuario.senha){

      $scope.errMsg = 'A confirmação está diferente da senha.';

    }else{

      $scope.alterarErrMsg = '';

      $http({
        url: 'usuarios/' + $scope.usuario.id + '.json',
        method: 'PUT',
        data: $scope.usuario
      })
      .then(function(response){
        $scope.alterarErrMsg = 'Informações alteradas com sucesso.';
      })
      .then(function(response){

      });

    }

  };

  $scope.Deletar = function(){

    if($scope.delSenha == ''){

      $scope.deletarErrMsg = 'Por favor, informe a sua senha.';

    }else if($scope.delConfSenha == ''){

      $scope.deletarErrMsg = 'Por favor, confirme a sua senha.';

    }else if($scope.delConfSenha != $scope.delSenha){

      $scope.deletarErrMsg = 'A confirmação está diferente da senha.';

    }else if($scope.usuario.senha != $scope.delConfSenha){

      $scope.deletarErrMsg = 'Senha incorreta.';

    }else{

      $scope.deletarErrMsg = '';

      $http({
        url: 'usuarios/' + $scope.usuario.id + '.json',
        method: 'DELETE'
      })
      .then(function(response){
        $rootScope.$broadcast('desconectar');
      })
      .then(function(response){

      });

    }

  };

  $scope.usuario_projetos = [];
  $scope.projetos = [];

  $scope.$on('projetos', function(event, objUsuarioProjeto){

    $http({
      url: 'projetos.json',
      method: 'GET'
    })
    .then(function(response){

      for(var i=0; i<objUsuarioProjeto.length; i++){
        for(var j=0; j<response.data.length; j++){
          if(objUsuarioProjeto[i].id_projeto == response.data[j].id){
            $scope.projetos.push(response.data[j]);
            break;
          }
        }
      }

    })
    .then(function(response){

    });

  });

  $scope.$on('usuario_projetos', function(event, id){

    $http({
      url: 'usuario_projetos.json',
      method: 'GET'
    })
    .then(function(response){

      for(var i=0; i<response.data.length; i++){
        if(response.data[i].id_usuario == id){
          $scope.usuario_projetos.push(response.data[i]);
        }
      }

    })
    .then(function(response){

    });

  });

  $rootScope.$broadcast('usuario_projetos', $scope.usuario.id);
  $rootScope.$broadcast('projetos', $scope.usuario_projetos);

});
