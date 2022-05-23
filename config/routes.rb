Rails.application.routes.draw do

  resources :scores
  resources :users

  root 'game#index'

  get    '/login',          to: 'sessions#new'
  post   '/login',          to: 'sessions#create'
  delete '/logout',         to: 'sessions#destroy'
  get    '/signup',         to: 'users#new'
  post   '/signup',         to: 'users#create'
  get    '/about',          to: 'static_pages#about'
  get    '/leaderboard',    to: 'scores#leaderboard'
  get    '/api/scores/new', to: 'scores#new_api_call'
  post   '/api/scores/new', to: 'scores#create_api_call'

end
