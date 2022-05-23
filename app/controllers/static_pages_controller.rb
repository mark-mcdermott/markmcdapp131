class StaticPagesController < ApplicationController

  skip_before_action :authorized, only: [:about, :contact]

  def about
  end
end
