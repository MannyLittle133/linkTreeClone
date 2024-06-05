# frozen_string_literal: true

class AddDeviseToUsers < ActiveRecord::Migration[6.0]
  def up
    change_table :users, bulk: true do |t|
      # Remove the email column addition if it already exists in your schema
      # t.string :email, null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      t.string :reset_password_token
      t.datetime :reset_password_sent_at
      t.datetime :remember_created_at
      t.integer :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.string :current_sign_in_ip
      t.string :last_sign_in_ip

      # Uncomment the following line if timestamps were not included in your original model.
      # t.timestamps null: false
    end

    add_index :users, :email, unique: true
    add_index :users, :reset_password_token, unique: true
  end

  def down
    # By default, Devise provided down method is fine
    raise ActiveRecord::IrreversibleMigration
  end
end
