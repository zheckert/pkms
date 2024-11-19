class SessionsController < ApplicationController
    #This controller handles logging in and out. Create and destroy log a user in and out, respectively.
    def create
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: {message: "Logged in successfully!"}
        else
            render json: { error: "Invalid email or password"}, status: :unauthorized
        end
    end

    def destroy
        session[:user_id] = nil
        render json: { message: "Logged out successfully!"}
    end
end
