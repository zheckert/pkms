class User < ApplicationRecord
  has_many :notes
  has_many :categories
  has_many :tags

  validates :name, presence: true, length: { minimum: 2 }
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :about, allow_blank: true, length: { maximum: 500 }
end
