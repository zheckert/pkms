class SessionsController < ApplicationController

    #todo: we want to move to token-based authentication. this is a temporary solution.
    #This controller handles logging in and out. Create and destroy log a user in and out, respectively.
    def create
        Rails.logger.debug("Session user_id: #{session[:user_id]}")
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: {
                id: user.id,
                email: user.email,
                message: "Logged in successfully!"
            }
        else
            render json: { error: "Invalid email or password"}, status: :unauthorized
        end
    end

    def destroy
        session[:user_id] = nil
        render json: { message: "Logged out successfully!"}
    end
end
