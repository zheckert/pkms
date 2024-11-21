class Note < ApplicationRecord

# A Note on my Note model (ha ha): models have a corresponding TABLE in the database.
# The attributes in my model (such as title, content, etc) have corresponding database COLUMNS
  belongs_to :user
  has_and_belongs_to_many :tags

  validates :title, presence: true
  validates :content, presence: true
end
