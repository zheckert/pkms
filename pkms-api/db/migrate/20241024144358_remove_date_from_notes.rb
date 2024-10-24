class RemoveDateFromNotes < ActiveRecord::Migration[7.1]
  def change
    remove_column :notes, :date, :date
  end
end
