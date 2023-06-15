class ProfilesController < ApplicationController
  def index
    @profiles = Profile.includes(:office, :specialization).all
  end
end
