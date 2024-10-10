class AddUserIdToNotes < ActiveRecord::Migration[7.1]
  def change
    add_reference :notes, :user, null: false, foreign_key: true
  end
end
