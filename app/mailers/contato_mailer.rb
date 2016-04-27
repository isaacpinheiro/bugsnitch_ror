class ContatoMailer < ApplicationMailer
  def contato_message(contact)
    @contact = contact
    mail(:to => 'bugsnitch@gmail.com', :subject => 'Mensagem de Contato - BugSnitch')
  end
end
