require 'test_helper'

class AnexosControllerTest < ActionController::TestCase
  setup do
    @anexo = anexos(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:anexos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create anexo" do
    assert_difference('Anexo.count') do
      post :create, anexo: { arquivo: @anexo.arquivo, comentario_id: @anexo.comentario_id, registro_id: @anexo.registro_id }
    end

    assert_redirected_to anexo_path(assigns(:anexo))
  end

  test "should show anexo" do
    get :show, id: @anexo
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @anexo
    assert_response :success
  end

  test "should update anexo" do
    patch :update, id: @anexo, anexo: { arquivo: @anexo.arquivo, comentario_id: @anexo.comentario_id, registro_id: @anexo.registro_id }
    assert_redirected_to anexo_path(assigns(:anexo))
  end

  test "should destroy anexo" do
    assert_difference('Anexo.count', -1) do
      delete :destroy, id: @anexo
    end

    assert_redirected_to anexos_path
  end
end
