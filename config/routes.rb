Rails.application.routes.draw do
  resources :scores
  resources :users

  root 'home#index'




end
