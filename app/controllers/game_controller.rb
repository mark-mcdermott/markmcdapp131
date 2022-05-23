class GameController < ApplicationController

  skip_before_action :logged_in_authorized, only: :index
  skip_before_action :admin_authorized, only: :index

  def index
  end
end
