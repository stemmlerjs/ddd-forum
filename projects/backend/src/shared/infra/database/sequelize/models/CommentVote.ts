

export default (sequelize, DataTypes) => {
  const CommentVote = sequelize.define('comment_vote', {
    comment_vote_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    comment_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'comment',
        key: 'comment_id'
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
    tableName: 'comment_vote'
  });

  CommentVote.associate = (models) => {
    CommentVote.belongsTo(models.Member, { foreignKey: 'member_id', targetKey: 'member_id', as: 'Member' })
    CommentVote.belongsTo(models.Comment, { foreignKey: 'comment_id', targetKey: 'comment_id', as: 'Comment' })
  }

  return CommentVote;
};
