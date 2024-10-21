Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # Defines the root path route ("/")
  # root "posts#index"
  ####User actions
  namespace :auth do
    #Login: http://localhost:3000/auth/login - post
    resources :login, only: [:create], controller: 'sessions'

    #register: http://localhost:3000/auth/registrations - post
    resources :registrations, only: [:create], controller: 'registrations'

    #logout: http://localhost:3000/auth/logout - delete
    delete :logout, to: "sessions#logout"

    #logged_in: http://localhost:3000/auth/logged_in - get
    get :logged_in, to: "sessions#logged_in"
  end

  namespace :api do
    resources :figures, only: [:index] do
      collection do
        get :search
      end
    end
    #api/figure/:id
    get 'figure/:id', to: 'figures#detail', as: 'api_figure_detail'
    resources :users, param: :username, only: [:show, :create, :update, :destroy]
  end
end
