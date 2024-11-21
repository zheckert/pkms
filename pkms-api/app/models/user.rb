class User < ApplicationRecord
  # Reminder: dependent: :destroy means if this user goes, their associated notes/tags go, too!
  has_many :notes, dependent: :destroy
  has_many :tags, dependent: :destroy
  has_secure_password

  validates :name, presence: true, length: { minimum: 2 }
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :about, allow_blank: true, length: { maximum: 500 }
  validates :password, presence: true, length: { minimum: 6 }, if: :password_required?

  def password_required?
    new_record? || password.present?
  end
end
