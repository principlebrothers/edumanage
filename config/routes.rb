Rails.application.routes.draw do
  root 'pages#home'
  devise_for :users

  get '/service-worker.js', to: 'service_worker#service_worker'
  get '/manifest.json', to: 'service_worker#manifest'
end
