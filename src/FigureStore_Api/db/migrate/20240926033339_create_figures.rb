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
    end
  end
end
