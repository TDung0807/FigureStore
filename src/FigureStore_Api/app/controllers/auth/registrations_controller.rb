# app/controllers/auth/registrations_controller.rb
module Auth
    class RegistrationsController < ApplicationController
      def create
        user = User.create!(
          email: params['user']['email'],
          password: params['user']['password'],
          password_confirmation: params['user']['password_confirmation']
        )
  
        if user.persisted?
          session[:user_id] = user.id
          render json: {
            status: :created,
            user: user
          }
        else
          render json: { status: 500 }
        end
      rescue ActiveRecord::RecordInvalid => e
        render json: { status: 400, errors: e.record.errors.full_messages }
      end
    end
  end
  