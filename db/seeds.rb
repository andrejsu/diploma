10.times do |n|
  Specialization.create!(name: FFaker::Job.title)
end

3.times do |n|
  Office.create!(name: FFaker::CompanyIT.name)
end

50.times do |n|
  email = FFaker::Internet.unique.email
  password = "619736"

  user = User.create!(email: email,
                      password:              password,
                      password_confirmation: password)
  Profile.create!(fullname: FFaker::NameRU.unique.name,
                  email: FFaker::Internet.unique.email,
                  phone_number: FFaker::PhoneNumberRU.phone_number,
                  city: FFaker::AddressRU.city,
                  date_of_birth: Date.new(1985, 12, 8),
                  user: user,
                  office: Office.all.sample,
                  specialization: Specialization.all.sample)
end

email = "test@test.com"
password = "123456"
user = User.create!(email: email,
                    password:              password,
                    password_confirmation: password)
user.add_role :admin
Profile.create!(fullname: "Андрей Сухих",
                email: "sukhikh.andrew@gmail.com",
                phone_number: "+79780504388",
                city: "Севастополь",
                date_of_birth: Date.new(2001, 12, 8),
                user: user,
                office: Office.all.sample,
                specialization: Specialization.all.sample)

AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')
