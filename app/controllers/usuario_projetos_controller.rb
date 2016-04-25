class UsuarioProjetosController < ApplicationController
  before_action :set_usuario_projeto, only: [:show, :edit, :update, :destroy]

  # GET /usuario_projetos
  # GET /usuario_projetos.json
  def index
    @usuario_projetos = UsuarioProjeto.all
  end

  # GET /usuario_projetos/1
  # GET /usuario_projetos/1.json
  def show
  end

  # GET /usuario_projetos/new
  def new
    @usuario_projeto = UsuarioProjeto.new
  end

  # GET /usuario_projetos/1/edit
  def edit
  end

  # POST /usuario_projetos
  # POST /usuario_projetos.json
  def create
    @usuario_projeto = UsuarioProjeto.new(usuario_projeto_params)

    respond_to do |format|
      if @usuario_projeto.save
        format.html { redirect_to @usuario_projeto, notice: 'Usuario projeto was successfully created.' }
        format.json { render :show, status: :created, location: @usuario_projeto }
      else
        format.html { render :new }
        format.json { render json: @usuario_projeto.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /usuario_projetos/1
  # PATCH/PUT /usuario_projetos/1.json
  def update
    respond_to do |format|
      if @usuario_projeto.update(usuario_projeto_params)
        format.html { redirect_to @usuario_projeto, notice: 'Usuario projeto was successfully updated.' }
        format.json { render :show, status: :ok, location: @usuario_projeto }
      else
        format.html { render :edit }
        format.json { render json: @usuario_projeto.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /usuario_projetos/1
  # DELETE /usuario_projetos/1.json
  def destroy
    @usuario_projeto.destroy
    respond_to do |format|
      format.html { redirect_to usuario_projetos_url, notice: 'Usuario projeto was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_usuario_projeto
      @usuario_projeto = UsuarioProjeto.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def usuario_projeto_params
      params.require(:usuario_projeto).permit(:status, :usuario_id, :projeto_id)
    end
end
