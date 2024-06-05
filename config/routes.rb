Rails.application.routes.draw do
  devise_for :users
  resources :users do
    resources :links, only: [:index, :create, :update, :destroy]
  end
  root 'home#index'
end
