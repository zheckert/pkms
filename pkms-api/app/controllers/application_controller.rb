class ApplicationController < ActionController::API
    skip_before_action :verify_authenticity_token

    protect_from_forgery with: :exception
    
    # current_user method used for associated notes/data w/ logged-in user.

    before_action :require_login
    
    def current_user
        @current_user ||= User.find_by(id: session[:user_id])
    end

    def logged_in?
        current_user.present?
    end

    private

    def require_login
        redirect_to login_path unless session[:user_id]
    end
end
