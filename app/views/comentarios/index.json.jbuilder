json.array!(@comentarios) do |comentario|
  json.extract! comentario, :id, :texto_comentario, :data_hora, :id_registro, :id_usuario_projeto
  json.url comentario_url(comentario, format: :json)
end
