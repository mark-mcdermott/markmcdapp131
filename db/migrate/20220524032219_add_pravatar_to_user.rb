class AddPravatarToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :pravatar, :integer, :default => 49
  end
end
