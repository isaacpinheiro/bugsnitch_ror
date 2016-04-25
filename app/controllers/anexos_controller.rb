class AnexosController < ApplicationController
  before_action :set_anexo, only: [:show, :edit, :update, :destroy]

  # GET /anexos
  # GET /anexos.json
  def index
    @anexos = Anexo.all
  end

  # GET /anexos/1
  # GET /anexos/1.json
  def show
  end

  # GET /anexos/new
  def new
    @anexo = Anexo.new
  end

  # GET /anexos/1/edit
  def edit
  end

  # POST /anexos
  # POST /anexos.json
  def create
    @anexo = Anexo.new(anexo_params)

    respond_to do |format|
      if @anexo.save
        format.html { redirect_to @anexo, notice: 'Anexo was successfully created.' }
        format.json { render :show, status: :created, location: @anexo }
      else
        format.html { render :new }
        format.json { render json: @anexo.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /anexos/1
  # PATCH/PUT /anexos/1.json
  def update
    respond_to do |format|
      if @anexo.update(anexo_params)
        format.html { redirect_to @anexo, notice: 'Anexo was successfully updated.' }
        format.json { render :show, status: :ok, location: @anexo }
      else
        format.html { render :edit }
        format.json { render json: @anexo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /anexos/1
  # DELETE /anexos/1.json
  def destroy
    @anexo.destroy
    respond_to do |format|
      format.html { redirect_to anexos_url, notice: 'Anexo was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_anexo
      @anexo = Anexo.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def anexo_params
      params.require(:anexo).permit(:arquivo, :registro_id, :comentario_id)
    end
end
