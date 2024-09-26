class CreateFigures < ActiveRecord::Migration[7.2]
  def change
    create_table :figures do |t|
      t.timestamps
    end
  end
end
