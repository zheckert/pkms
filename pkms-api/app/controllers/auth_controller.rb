class AuthController < ApplicationController
  # Verify the token and return the associated user

  def profile
    token = request.headers['Authorization']&.split(' ')&.last
    user = decode_token(token)
  
    if user
      render json: { id: user.id, name: user.name, email: user.email }, status: :ok
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  # Login user and issue a token
  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      token = generate_token(user.id)
      render json: { token: token, user: { id: user.id, name: user.name, email: user.email } }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  private

  # Decode JWT token and fetch the associated user
  def decode_token(token)
    decoded = JWT.decode(token, Rails.application.credentials.jwt[:secret_key], true, { algorithm: 'HS256' })
    User.find(decoded[0]['user_id'])
  rescue StandardError
    nil
  end
end
