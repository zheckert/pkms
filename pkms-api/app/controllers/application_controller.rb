class ApplicationController < ActionController::API
  # Method for authenticating the user. Call in controllers to restrict access.
  def authenticate_user!
    header = request.headers['Authorization']
    token = header.split(' ').last if header
    begin
      decoded = JWT.decode(token, Rails.application.credentials.jwt[:secret_key], true, { algorithm: 'HS256' })
      @current_user = User.find(decoded[0]['user_id'])
    rescue JWT::DecodeError
      render json: { errors: 'Unauthorized' }, status: :unauthorized
    end
  end

  # Method to access current_user (useful in controllers)
  def current_user
    @current_user
  end

  # Generate JWT token
  def generate_token(user_id)
    payload = { user_id: user_id, exp: 24.hours.from_now.to_i }
    JWT.encode(payload, Rails.application.credentials.jwt[:secret_key])
  end
end