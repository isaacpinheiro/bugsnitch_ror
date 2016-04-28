# Preview all emails at http://localhost:3000/rails/mailers/contato_mailer
class ContatoMailerPreview < ActionMailer::Preview
  def sample_mail_preview
    ContatoMailer.sample_email(Contato.first)
  end
end
