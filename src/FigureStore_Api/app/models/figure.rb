class Figure < ApplicationRecord
    belongs_to :cart, optional: true
    self.table_name = 'figures' # Use the schema prefix here
end
