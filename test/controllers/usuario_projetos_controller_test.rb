require 'test_helper'

class UsuarioProjetosControllerTest < ActionController::TestCase
  setup do
    @usuario_projeto = usuario_projetos(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:usuario_projetos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create usuario_projeto" do
    assert_difference('UsuarioProjeto.count') do
      post :create, usuario_projeto: { projeto_id: @usuario_projeto.projeto_id, status: @usuario_projeto.status, usuario_id: @usuario_projeto.usuario_id }
    end

    assert_redirected_to usuario_projeto_path(assigns(:usuario_projeto))
  end

  test "should show usuario_projeto" do
    get :show, id: @usuario_projeto
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @usuario_projeto
    assert_response :success
  end

  test "should update usuario_projeto" do
    patch :update, id: @usuario_projeto, usuario_projeto: { projeto_id: @usuario_projeto.projeto_id, status: @usuario_projeto.status, usuario_id: @usuario_projeto.usuario_id }
    assert_redirected_to usuario_projeto_path(assigns(:usuario_projeto))
  end

  test "should destroy usuario_projeto" do
    assert_difference('UsuarioProjeto.count', -1) do
      delete :destroy, id: @usuario_projeto
    end

    assert_redirected_to usuario_projetos_path
  end
end
