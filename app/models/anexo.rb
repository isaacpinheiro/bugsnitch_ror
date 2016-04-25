class Anexo < ActiveRecord::Base
  self.table_name = "anexo"
  self.primary_key = "id_anexo"

  belongs_to :registro
  belongs_to :comentario
end
