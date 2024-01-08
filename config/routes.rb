Rails.application.routes.draw do
  root 'pages#home'
  devise_for :super_admins
  devise_for :admins
  devise_for :users
  get 'dashboard', to: 'super_admins#dashboard', as: :super_admin_dashboard
  get 'admin_dashboard', to: 'admins#dashboard', as: :admin_dashboard

  get '/service-worker.js', to: 'service_worker#service_worker'
  get '/manifest.json', to: 'service_worker#manifest'
end
