class Usuario < ActiveRecord::Base
  self.table_name = "usuario"
  self.primary_key = "id_usuario"
end
