class SessionsController < ApplicationController

  skip_before_action :authorized, only: [:new, :create]

  def new
    @user = User.new
  end

  def create
    destination = '/login';
    @user = User.find_by(username: params[:username])
    if !@user
      flash[:error] = 'Invalid username'
    elsif !!@user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      destination = '/'
    else
      flash[:error] = 'Invalid password'
    end
      redirect_to destination, error: flash[:error]
  end

  def destroy
    session[:user_id] = nil
    redirect_to '/'
  end

end
