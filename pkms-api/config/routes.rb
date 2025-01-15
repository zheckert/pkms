Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # todo: research for proper routing order in routes.rb
  get 'auth/profile', to: 'auth#profile'
  post 'auth/login', to: 'auth#login'

  namespace :auth do
    post 'verify', to: 'auth#verify'
  end

  # I only need to use one crud request from the users controller. Well, there is only one anyway.
  resources :users, only: [:create]

  # For tags. todo: do I need all of these routes?
  resources :tags, only: [:index, :show, :create, :update, :destroy]

  # todo: I don't quite get the to syntax here. I need to understand how the routing works better!
  # I think what's happening is we're hitting the filter_by_tags method living in the notes controller, right? What about the first part?
  get 'notes/filter_by_tags', to: 'notes#filter_by_tags'

  resources :notes, only: [:index, :show, :create, :update, :destroy]

  # Defines the root path route ("/")
  # root "posts#index"
end
