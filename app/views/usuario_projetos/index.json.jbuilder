json.array!(@usuario_projetos) do |usuario_projeto|
  json.extract! usuario_projeto, :id, :status, :id_usuario, :id_projeto
  json.url usuario_projeto_url(usuario_projeto, format: :json)
end
