module Api
    class FiguresController < ApplicationController
      def index
        figures = Figure.all
        render json: figures
      end
    end
  end
  