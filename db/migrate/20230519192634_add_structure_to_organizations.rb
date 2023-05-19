class AddStructureToOrganizations < ActiveRecord::Migration[7.0]
  def change
    add_column :organizations, :structure, :jsonb
  end
end
