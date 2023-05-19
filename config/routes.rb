Rails.application.routes.draw do
  devise_for :users

  root "pages#home"

  resources :organizations, only: [:show]
end
