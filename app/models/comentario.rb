class Comentario < ActiveRecord::Base
  self.table_name = "comentario"
  self.primary_key = "id_comentario"

  belongs_to :registro
  belongs_to :usuario_projeto
end
