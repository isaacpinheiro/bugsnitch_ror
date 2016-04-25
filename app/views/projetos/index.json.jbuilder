json.array!(@projetos) do |projeto|
  json.extract! projeto, :id, :descricao, :area, :status, :data_inicio, :data_fim
  json.url projeto_url(projeto, format: :json)
end
