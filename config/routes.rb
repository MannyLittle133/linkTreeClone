Rails.application.routes.draw do
  resources :users, only: [:show] do
    resources :links, only: [:index, :create, :update, :destroy]
  end
end


