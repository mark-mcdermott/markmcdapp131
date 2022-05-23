class StaticPagesController < ApplicationController

  skip_before_action :logged_in_authorized, only: [:about, :contact]
  skip_before_action :admin_authorized, only: [:about, :contact]

  def about
  end
end
