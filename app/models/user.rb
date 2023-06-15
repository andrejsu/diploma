class User < ApplicationRecord
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable


  has_one :profile
  has_many :nodes

  has_and_belongs_to_many :nodes

  after_create :assign_default_role

  private

  def assign_default_role
    add_role(:employee) if roles.blank?
  end
end
