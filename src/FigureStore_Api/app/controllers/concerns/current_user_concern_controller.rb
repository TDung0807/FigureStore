# app/controllers/concerns/current_user_concern_controller.rb
module CurrentUserConcernController
  extend ActiveSupport::Concern

  included do
    before_action :set_current_user
  end

  def set_current_user
    @current_user = User.find_by(id: session[:user_id])

    if @current_user.nil?
      # Log the user out and reset the session if the user is not found
      reset_session
    end
  end
end
