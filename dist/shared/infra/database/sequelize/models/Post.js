"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
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
        type: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        link: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        slug: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        timestamps: true,
        underscored: true,
        tableName: 'post'
    });
    Post.associate = (models) => {
    };
    return Post;
};
//# sourceMappingURL=Post.js.map