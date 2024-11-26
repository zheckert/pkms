class ApplicationController < ActionController::API
    # skip_before_action :verify_authenticity_token
    
    # current_user method used for associated notes/data w/ logged-in user.
    def current_user
        @current_user ||= User.find_by(id: session[:user_id])
    end

    def logged_in?
        current_user.present?
    end
end
