class RenameTitleToName < ActiveRecord::Migration[7.1]
  def change
    rename_column :tags, :title, :name
  end
end
