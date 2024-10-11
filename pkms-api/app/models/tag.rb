class Tag < ApplicationRecord
  belongs_to :note
  belongs_to :user

  validates :title, presence: true
end
