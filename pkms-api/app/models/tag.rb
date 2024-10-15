class Tag < ApplicationRecord
  belongs_to :note
  belongs_to :user
  has_and_belongs_to_many :notes

  validates :title, presence: true
end
