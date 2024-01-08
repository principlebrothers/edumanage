class PagesController < ApplicationController
  before_action :authenticate_user!

  def home
    # redirect_to super_admin_root_path if current_user.super_admin?
  end
end
