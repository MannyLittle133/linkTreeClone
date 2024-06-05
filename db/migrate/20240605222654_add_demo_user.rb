class AddDemoUser < ActiveRecord::Migration[7.0]
  def up
    User.create!(
      email: 'demo@example.com',
      password: 'password',
      password_confirmation: 'password',
      name: 'Demo User'
    )
  end

  def down
    User.find_by(email: 'demo@example.com')&.destroy
  end
end
