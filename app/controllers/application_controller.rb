class ApplicationController < ActionController::Base

  before_action :logged_in_authorized, :admin_authorized
  helper_method :active_page?
  helper_method :title_tag
  helper_method :current_user_is_admin?
  helper_method :current_user 
  helper_method :logged_in?
  helper_method :current_user_id_class
  helper_method :bootstrap_class_for

  def active_page?(current_page, this_page)
    current_page==this_page ? 'nav-link active' : 'nav-link'
  end

  def title_tag(page)
    title = 'Emoji Tetris'
    puts page
    if page && page != ''
      title += ' | ' + page
    end
    title
  end

  def admin_authorized
    puts 'checking admin status: ' + current_user_is_admin?.to_s
    redirect_to '/' unless current_user_is_admin?
  end

  def logged_in_authorized
    puts 'checking authorization status: ' + logged_in?.to_s
    redirect_to '/' unless logged_in?
  end

  def current_user_is_admin?
    current_user.admin
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
