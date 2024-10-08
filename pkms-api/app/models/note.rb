class Note < ApplicationRecord
  belongs_to :user
  has_many :tags
  has_many :categories
end
