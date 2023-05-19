class OrganizationsController < ApplicationController
  before_action :authenticate_user!
  before_action :load_organization, only: %i[ show edit update destroy ]
  before_action :load_users, only: %i[ show ]

  def show; end

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
