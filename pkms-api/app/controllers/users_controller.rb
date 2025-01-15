class UsersController < ApplicationController
    def create
        user = User.new(user_params)
        if user.save
        token = generate_token(user.id) # Reuse `generate_token` from `AuthController`
        render json: { token: token, user: { id: user.id, name: user.name, email: user.email } }, status: :created
        else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end
    
    private
    
    def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end

