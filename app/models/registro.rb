class Registro < ActiveRecord::Base
  self.table_name = "registro"
  self.primary_key = "id_registro"

  belongs_to :usuario_projeto
end
