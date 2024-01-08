class ApplicationController < ActionController::Base
  def after_sign_in_path_for(resource)
    case resource
    when User
      root_path
    when SuperAdmin
      super_admin_dashboard_path
    when Admin
      admin_dashboard_path
    end
  end
end
