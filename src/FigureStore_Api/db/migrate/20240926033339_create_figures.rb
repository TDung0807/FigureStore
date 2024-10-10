class CreateFigures < ActiveRecord::Migration[7.2]
  def change
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

    # create_table :users, id: false do |t| 
    #   t.string :id, primary_key: true 
    #   t.string :username
    #   t.string :password
    #   t.boolean :gender
    #   t.boolean :role
    #   t.string :email
    #   t.string :address

    #   t.timestamps
    # end

    create_table :carts, id: false do |t|  
      t.string :id, primary_key: true 
      t.string :figure_id, array: true, default: [] 
      t.integer :totalprice

      t.timestamps
    end

    create_table :envoices, id: false do |t|
      t.string :id, primary_key: true 
      t.string :figure_id, array: true, default: [] 
      t.integer :total_price
      t.date :date
      t.string :user_id  
      t.string :discount_code
      t.integer :discount_price

      t.timestamps
    end
  end
end
