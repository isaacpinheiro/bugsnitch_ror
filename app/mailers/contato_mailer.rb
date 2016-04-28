class ContatoMailer < ApplicationMailer
  default from: "bugsnitch@gmail.com"

  def sample_email(contato)
    @contato = contato
    mail(to: "bugsnitch@gmail.com", subject: "Contato BugSnitch - #{@contato.nome}")
  end
end
