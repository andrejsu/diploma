class CreateJoinTableUserNode < ActiveRecord::Migration[7.0]
  def change
    create_join_table :users, :nodes, column_options: {type: :uuid} do |t|
      t.index [:user_id, :node_id]
      t.index [:node_id, :user_id]
    end
  end
end
