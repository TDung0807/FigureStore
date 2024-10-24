class Cart < ApplicationRecord
  self.primary_key = 'user_id'
  belongs_to :user
  after_initialize :set_defaults
  
  validates :user_id, presence: true
  
  def add_item(figure_id, quantity)
    existing_item = items.find { |item| item[:figure_id] == figure_id }

    if existing_item
      existing_item[:quantity] += quantity
    else
      items << { figure_id: figure_id, quantity: quantity }
    end

    self.totalprice += Figure.find(figure_id).price * quantity
    save
  end

  private

  def set_defaults
    self.items ||= []
    self.totalprice ||= 0
  end
end
