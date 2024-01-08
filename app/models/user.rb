class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable
  enum role: { user: 0, teacher: 1, guardian: 2, student: 3 }
  after_initialize :set_default_role, if: :new_record?

  def set_default_role
    self.role ||= :user
  end
end
