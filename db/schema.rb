# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_06_15_184550) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "nodes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.uuid "user_id", null: false
    t.uuid "organization_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_nodes_on_organization_id"
    t.index ["user_id"], name: "index_nodes_on_user_id"
  end

  create_table "nodes_users", id: false, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.uuid "node_id", null: false
    t.index ["node_id", "user_id"], name: "index_nodes_users_on_node_id_and_user_id"
    t.index ["user_id", "node_id"], name: "index_nodes_users_on_user_id_and_node_id"
  end

  create_table "offices", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "organizations", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "structure"
  end

  create_table "profiles", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "fullname"
    t.string "email"
    t.string "phone_number"
    t.string "city"
    t.date "date_of_birth"
    t.uuid "user_id", null: false
    t.uuid "office_id", null: false
    t.uuid "specialization_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["office_id"], name: "index_profiles_on_office_id"
    t.index ["specialization_id"], name: "index_profiles_on_specialization_id"
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "specializations", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "nodes", "organizations"
  add_foreign_key "nodes", "users"
  add_foreign_key "profiles", "offices"
  add_foreign_key "profiles", "specializations"
  add_foreign_key "profiles", "users"
end
