20.times do |n|
  email = FFaker::Internet.unique.email
  password = "619736"
  User.create!(email: email,
               password:              password,
               password_confirmation: password)
end
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?