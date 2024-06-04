class AddPlatformToLinks < ActiveRecord::Migration[7.0]
  def change
    add_column :links, :platform, :string
  end
end
