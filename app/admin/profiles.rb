ActiveAdmin.register Profile do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :fullname, :email, :phone_number, :city, :date_of_birth, :user_id, :office_id, :specialization_id
  #
  # or
  #
  # permit_params do
  #   permitted = [:fullname, :email, :phone_number, :city, :date_of_birth, :user_id, :office_id, :specialization_id]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

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
