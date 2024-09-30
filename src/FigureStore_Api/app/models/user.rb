class Figure < ApplicationRecord
    self.table_name = 'users' # Use the schema prefix here
    has_secure_password

    # Validations
    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true, length: { minimum: 6 } # Minimum length for security
    validates :address, presence: true

    # Enum for role (optional, based on your needs)
    enum role: { user: false, admin: true }
end
