class ContatosController < ApplicationController

  # GET /contatos/new
  def new
    @contato = Contato.new
  end

  # POST /contatos
  # POST /contatos.json
  def create
    @contato = Contato.new(contato_params)

    if @contato.valid?
      ContatoMailer.contato_message(params[:contact]).deliver_now
      redirect_to :action => 'new'
      return
    end

    render :action => 'new'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_contato
      @contato = Contato.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def contato_params
      params.require(:contato).permit(:name, :email, :subject, :message)
    end
end
