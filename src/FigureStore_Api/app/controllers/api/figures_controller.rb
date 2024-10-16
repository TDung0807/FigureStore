module Api
  class FiguresController < ApplicationController
    def index
      figures = Figure.all
      render json: figures
    end

    def search
      query = params[:query]
      figures = Figure.where("name ILIKE ?", "%#{query}%")
      render json: figures
    end
  end
end
