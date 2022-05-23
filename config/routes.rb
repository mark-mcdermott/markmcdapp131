Rails.application.routes.draw do

  resources :scores
  resources :users

  root 'home#index'
  get  '/leaderboard', to: 'scores#leaderboard'
  get  '/api/scores/new',  to: 'scores#new_api_call'
  post '/api/scores/new',  to: 'scores#create_api_call'

end
