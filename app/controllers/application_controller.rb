class ApplicationController < ActionController::Base

  before_action :authorized
  helper_method :current_user 
  helper_method :logged_in?
  helper_method :current_user_id_class
  helper_method :bootstrap_class_for

  def authorized
    puts 'checking authorization status: ' + logged_in?.to_s
    redirect_to '/' unless logged_in?
  end

  def current_user
    @user = User.find_by_id(session[:user_id])
  end

  def current_user_id_class  
    if (current_user) 
      current_user.id.to_s 
    else 
      ''
    end
  end

  def logged_in?
    !!current_user
  end

  def bootstrap_class_for flash_type
    case flash_type
      when "success"
        "alert-success"
      when "error"
        "alert-danger"
      when "warning"
        "alert-warning"
      when "info"
        "alert-info"
      else
        flash_type.to_s
    end
  end

end
