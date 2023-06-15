class CreateProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :profiles, id: :uuid do |t|
      t.string :fullname
      t.string :email
      t.string :phone_number
      t.string :city
      t.date :date_of_birth
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.references :office, null: false, foreign_key: true, type: :uuid
      t.references :specialization, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
