class CreateDatabaseSchema < ActiveRecord::Migration[7.0]
  def change
    create_table :carts, id: false do |t|
      t.integer :totalprice, default: 0
      t.jsonb :items, default: []
      t.bigint :user_id, null: false # Define user_id only once
      t.timestamps
    end
    
    execute "ALTER TABLE carts ADD PRIMARY KEY (user_id);"
    
    create_table :users, id: :bigint do |t|
      t.string :email
      t.string :password_digest
      t.timestamps
    end

    create_table :figures, id: false do |t|
      t.string :id, primary_key: true
      t.string :name
      t.string :brand
      t.string :material
      t.integer :price
      t.integer :height
      t.date :release_date
      t.string :title
      t.string :url
      t.string :image_url
      t.timestamps
    end

    create_table :envoices, id: false do |t|
      t.string :id, primary_key: true
      t.string :figure_id, array: true, default: [] # Define figure_id with array if needed
      t.integer :total_price
      t.date :date
      t.bigint :user_id # Use bigint to match user_id in users table
      t.string :discount_code
      t.integer :discount_price
      t.timestamps
    end

    add_foreign_key :carts, :users, column: :user_id
    # Remove the line below because cart_id is not defined in figures
    # add_index :figures, :cart_id  
  end
end
