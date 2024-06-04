class AddLogoUrlToLinks < ActiveRecord::Migration[7.0]
  def change
    add_column :links, :logo_url, :string
  end
end
