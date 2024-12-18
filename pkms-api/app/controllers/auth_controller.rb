class AuthController < ApplicationController

    def login
        # Find the user by their email
        user = User.find_by(email: params[:email])
      
        # Authenticate the user with the password
        if user&.authenticate(params[:password])
          # Generate a token (helper method to come next)
          token = generate_token(user.id)
      
          # Respond with token and user info
          render json: { token: token, user: { id: user.id, name: user.name, email: user.email } }, status: :ok
        else
          # Respond with an error if authentication fails
          render json: { error: "Invalid email or password" }, status: :unauthorized
        end
      end

      private

    def generate_token(user_id)
    # Define the payload (you can customize as needed)
    payload = { user_id: user_id, exp: 24.hours.from_now.to_i }

    # Encode the payload using a secret key
    JWT.encode(payload, Rails.application.credentials.jwt[:secret_key])
    end
      
end
