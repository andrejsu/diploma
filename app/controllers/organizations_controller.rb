class OrganizationsController < ApplicationController
  before_action :authenticate_user!
  before_action :load_users
  before_action :load_organization, only: %i[ show edit update destroy ]

  def index
    @organizations = Organization.all
  end

  def show; end

  def create
    @organization = Organization.new(organization_params)

    respond_to do |format|
      if @organization.save
        format.html { redirect_to device_url(@organization), notice: "Organization was successfully created." }
        format.json { render :show, status: :created, location: @organization }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @organization.errors, status: :unprocessable_entity }
      end
    end
  end

  def new
    @organization = Device.new
  end

  def edit; end

  def update
    respond_to do |format|
      if @organization.update(device_params)
        format.html { redirect_to organization_url(@organization), notice: "Organization was successfully updated." }
        format.json { render :show, status: :ok, location: @organization }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @organization.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def load_organization
    @organization = Organization.find(params[:id])
  end

  def load_users
    @users = User.all
  end

  def organization_params
    params.require(:device).permit(:name, :description, structure: {})
  end
end
