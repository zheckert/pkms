class User < ApplicationRecord
  has_many :notes, dependent: :destroy
  has_many :categories, dependent: :destroy
  has_many :tags, dependent: :destroy

  validates :name, presence: true, length: { minimum: 2 }
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :about, allow_blank: true, length: { maximum: 500 }
end
