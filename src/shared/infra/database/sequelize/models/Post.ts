
export default (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
    post_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
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
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },{
    timestamps: true,
    underscored: true, 
    tableName: 'post'
  });

  Post.associate = (models) => {
    
  }

  return Post;
};
