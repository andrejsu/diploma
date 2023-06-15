ActiveAdmin.register User do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :email, :encrypted_password, :reset_password_token, :reset_password_sent_at, :remember_created_at, role_ids: []
  #
  # or
  #
  # permit_params do
  #   permitted = [:email, :encrypted_password, :reset_password_token, :reset_password_sent_at, :remember_created_at]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  form do |f|
    f.inputs "User Details" do
      f.input :email
      f.input :password
      f.input :password_confirmation
      f.input :roles, as: :check_boxes, collection: Role.all
    end
    f.actions
  end

  controller do
    def update
      if params[:user][:password].blank?
        params[:user].delete "password"
        params[:user].delete "password_confirmation"
      end

      add_roles(resource)

      super
    end

    private

    def add_roles(resource)
      resource.roles = []
      params[:user][:role_ids].each { |role_id| resource.add_role Role.find(role_id).name if Role.exists?(id: role_id) }
    end
  end

  show do
    attributes_table do
      default_attribute_table_rows.each do |field|
        row field
      end
      row :roles do |r|
        r.roles.map(&:name).join(", ")
      end
    end
  end
end
