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

ActiveRecord::Schema[7.2].define(version: 2024_10_23_101538) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "carts", primary_key: "user_id", id: :bigint, default: nil, force: :cascade do |t|
    t.integer "totalprice", default: 0
    t.jsonb "items", default: []
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "envoices", id: :string, force: :cascade do |t|
    t.string "figure_id", default: [], array: true
    t.integer "total_price"
    t.date "date"
    t.bigint "user_id"
    t.string "discount_code"
    t.integer "discount_price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "figures", id: :string, force: :cascade do |t|
    t.string "name"
    t.string "brand"
    t.string "material"
    t.integer "price"
    t.integer "height"
    t.date "release_date"
    t.string "title"
    t.string "url"
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "carts", "users"
end
