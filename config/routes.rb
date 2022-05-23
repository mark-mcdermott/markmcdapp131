Rails.application.routes.draw do
  get 'sessions/new'
  get 'sessions/create'
  get 'sessions/destroy'
  get 'game/index'
  get 'static_pages/about'

  resources :scores
  resources :users

  root 'home#index'
  get  '/leaderboard', to: 'scores#leaderboard'
  get  '/api/scores/new',  to: 'scores#new_api_call'
  post '/api/scores/new',  to: 'scores#create_api_call'

end
