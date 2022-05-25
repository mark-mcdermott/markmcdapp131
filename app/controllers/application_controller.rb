class ApplicationController < ActionController::Base

  before_action :prevent_caching
  before_action :logged_in_authorized, :admin_authorized
  helper_method :active_page?
  helper_method :title_tag
  helper_method :current_user_is_admin?
  helper_method :current_user 
  helper_method :logged_in?
  helper_method :current_user_id_class
  helper_method :bootstrap_class_for
  helper_method :get_level
  helper_method :get_version

  # time in Central US time
  # TODO: probably move this to its own json file
  @@versions = [
    {'date' => '2022-05-20 00:00:00', 'version' => '1.0'},
    {'date' => '2022-05-24 16:30:00', 'version' => '1.1'},
    {'date' => '2022-05-25 00:00:00', 'version' => '1.2'},
  ]

  def get_level(score) 
    rowsCleared = score.to_f / 1000;
    ((rowsCleared / 10) + 1).floor;
  end

  def get_version(date)       
    zone = "Central Time (US & Canada)"  
    v_1_1_datetime = ActiveSupport::TimeZone[zone].parse(@@versions[1]['date'])
    v_1_2_datetime = ActiveSupport::TimeZone[zone].parse(@@versions[2]['date'])

    if (date < v_1_1_datetime)
      '1.0'
    elsif (v_1_1_datetime < date) && (date < v_1_2_datetime)
      '1.1'
    elsif (v_1_2_datetime < date)
      '1.2'
    end
  end

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

  private

  def prevent_caching
    response.headers["Cache-Control"] = "no-cache, no-store"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
  end

end
