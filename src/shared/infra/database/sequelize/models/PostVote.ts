

export default (sequelize, DataTypes) => {
  const PostVote = sequelize.define('post_vote', {
    post_vote_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    post_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'post',
        key: 'post_id'
      }, 
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    member_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'member',
        key: 'member_id'
      }, 
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  },{
    timestamps: true,
    underscored: true, 
    tableName: 'post_vote'
  });

  PostVote.associate = (models) => {
    PostVote.belongsTo(models.Member, { foreignKey: 'member_id', targetKey: 'member_id', as: 'Member' })
    PostVote.belongsTo(models.Post, { foreignKey: 'post_id', targetKey: 'post_id', as: 'Post' })
  }

  return PostVote;
};
