ActiveRecord::Schema[7.2].define(version: 2024_10_07_082039) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "carts", id: :string, force: :cascade do |t|
    t.string "figure_id", default: [], array: true
    t.integer "totalprice"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "envoices", id: :string, force: :cascade do |t|
    t.string "figure_id", default: [], array: true
    t.integer "total_price"
    t.date "date"
    t.string "user_id"
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
end
