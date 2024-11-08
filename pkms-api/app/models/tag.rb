class Tag < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :notes

  validates :name, presence: true

  def instance_id
    "#{id}-#{SecureRandom.uuid}"
  end
end
