json.array!(@registros) do |registro|
  json.extract! registro, :id, :data_hora, :resumo, :prioridade, :severidade, :status, :id_usuario_projeto
  json.url registro_url(registro, format: :json)
end
