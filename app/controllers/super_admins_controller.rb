class SuperAdminsController < ApplicationController
  before_action :authenticate_super_admin!
  layout 'super_admin'

  def dashboard; end
end
