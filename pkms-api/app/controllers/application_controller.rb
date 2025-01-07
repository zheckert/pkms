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
end