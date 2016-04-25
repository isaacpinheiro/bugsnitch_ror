json.array!(@anexos) do |anexo|
  json.extract! anexo, :id, :arquivo, :id_registro, :id_comentario
  json.url anexo_url(anexo, format: :json)
end
