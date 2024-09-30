class CreateFigures < ActiveRecord::Migration[7.2]
  def change
    create_table :figures do |t| 
      t.string :name
      t.string :brand
      t.string :material
      t.decimal :price, precision: 8, scale: 2
      t.integer :height
      t.date :release_date
      t.string :title
      t.string :url
      t.string :image_url

      t.timestamps  
    end

    create_table :users do |t|  
      t.text :username
      t.text :password
      t.boolean :gender
      t.boolean :role
      t.text :email
      t.text :address

      t.timestamps
    end

    create_table :carts do |t| 
      t.text :id
      t.text[] :figure_id 
      t.integer :totalprice

      t.timestamps
    end

    create_table :envoices do |t| 
      t.text :id
      t.text[] :figure_id 
      t.integer :total_price
      t.date :date
      t.text :user_id  
      t.text :discount_code
      t.integer :discount_price

      t.timestamps
    end
  end
end
