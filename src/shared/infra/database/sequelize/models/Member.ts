
export default (sequelize, DataTypes) => {
  const Member = sequelize.define('member', {
    member_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    member_base_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'base_user',
        key: 'base_user_id'
      }, 
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    reputation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
  },{
    timestamps: true,
    underscored: true, 
    tableName: 'member'
  });

  Member.associate = (models) => {
    Member.belongsTo(models.BaseUser, { foreignKey: 'member_base_id', targetKey: 'base_user_id', as: 'BaseUser' })
    Member.hasMany(models.Post, { foreignKey: 'member_id',  as: 'Post' })
  }

  return Member;
};
