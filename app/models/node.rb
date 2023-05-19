class Node < ApplicationRecord
  belongs_to :manager, class_name: "User", foreign_key: "user_id"
  belongs_to :organization

  has_and_belongs_to_many :subordinates,
                          class_name: "User",
                          foreign_key: "user_id"
end
