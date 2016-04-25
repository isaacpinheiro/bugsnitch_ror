class UsuarioProjeto < ActiveRecord::Base
  self.table_name = "usuario_projeto"
  self.primary_key = "id_usuario_projeto"

  belongs_to :usuario
  belongs_to :projeto
end
