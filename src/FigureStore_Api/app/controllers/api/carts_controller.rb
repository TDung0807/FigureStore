module Api
  class CartsController < ApplicationController
    before_action :set_cart

    # GET /api/cart
    def show
      render json: { status: '200', cart: @cart }
    end

    # POST /api/cart/add_item
    def add_item
      figure_id = params[:figure_id]
      quantity = params[:quantity].to_i
      Rails.logger.debug("Figure add ID: #{figure_id}, Add Quantity: #{quantity}")
      
      if figure_id && quantity > 0  
        figure = Figure.find_by(id: figure_id)
    
        if figure
          existing_item = @cart.items.find { |item| item["figure_id"] == figure_id }
    
          if existing_item
            existing_item["quantity"] += quantity  # Update quantity for existing item
          else
            @cart.items << { figure_id: figure_id, quantity: quantity }  # Add new item
          end
    
          # Update total price based on the current item
          @cart.totalprice = @cart.items.sum { |item| Figure.find_by(id: item["figure_id"]).price * item["quantity"] }
          @cart.save
          render json: { status: 'success', cart: @cart }, status: :ok
        else
          render json: { status: '401', message: 'Figure not found' }, status: :not_found
        end
      else
        render json: { status: '402', message: 'Invalid item or quantity' }, status: :bad_request
      end
    end

    # PUT /api/cart/update_item
    def update_item
      figure_id = params[:figure_id].to_s  # Ensure figure_id is a string
      new_quantity = params[:quantity].to_i

      if figure_id.present? && new_quantity >= 0
        # Find the existing item by matching figure_id
        existing_item = @cart.items.find { |item| item["figure_id"] == figure_id }

        Rails.logger.debug("Found Item: #{existing_item.inspect}")

        if existing_item
          if new_quantity > 0
            existing_item["quantity"] = new_quantity  # Update quantity
          else
            @cart.items.delete(existing_item)  # Remove item if quantity is zero
          end

          @cart.totalprice = @cart.items.sum { |item| Figure.find_by(id: item["figure_id"]).price * item["quantity"] }
          @cart.save
          render json: { status: '200', cart: @cart }, status: :ok
        else
          render json: { status: '401', message: 'Item not found in cart' }, status: :not_found
        end
      else
        render json: { status: '402', message: 'Invalid item or quantity' }, status: :bad_request
      end
    end

    private

    def set_cart
      unless current_user
        render json: { error: 'Not authenticated' }, status: :unauthorized
        return
      end
      @cart = Cart.find_or_initialize_by(user_id: current_user.id)
      @cart.items ||= []  # Ensure items is an array
    end

    def update_total_price
      @cart.totalprice = @cart.items.sum do |item|
        figure = Figure.find_by(id: item[:figure_id]) # Assuming figure_id is stored as a string
        figure ? figure.price * item[:quantity] : 0
      end
    end
  end
end
