class Api::FiguresController < ApplicationController
  # Action to list all figures
  def index
    figures = Figure.all
    render json: figures
  end
  # Search figures by name
  def search
    query = params[:query]
    figures = Figure.where("name ILIKE ?", "%#{query}%").limit(5)
    render json: figures
  end
  # Get figure details by ID
  def detail
    id = params[:id]
    figure = Figure.find_by(id: id)
    if figure
      render json: figure
    else
      render json: { error: "Figure not found" }, status: :not_found
    end
  end
end
