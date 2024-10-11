class Category < ApplicationRecord
  belongs_to :user
  has_many :notes

  validates :title, presence: true
end
