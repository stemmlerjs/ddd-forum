
import runner from "../runner"

export default {
  up: async (queryInterface, Sequelize) => {
    const CREATE_BASE_USER = () => {
      return queryInterface.createTable('base_user', {
        base_user_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        user_email: {
          type: Sequelize.STRING(250),
          allowNull: false,
          unique: true
        },
        is_email_verified: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        username: {
          type: Sequelize.STRING(250),
          allowNull: false
        },
        user_password: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
       },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
        }
      })
    } 

    const CREATE_MEMBER = () => (
      queryInterface.createTable('member', {
        member_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        member_base_id: {
          type: Sequelize.UUID,
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
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
        }
      })
    )

    const CREATE_POST = () => (
      queryInterface.createTable('post', {
        post_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        member_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'member',
            key: 'member_id'
          }, 
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
        text: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        slug: {
          type: Sequelize.STRING(150),
          allowNull: false,
        },
        points: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        }
      })
    )

    const CREATE_COMMENT = () => (
      queryInterface.createTable('comment', {
        comment_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        member_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'member',
            key: 'member_id'
          }, 
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
        parent_comment_id: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'comment',
            key: 'comment_id'
          }, 
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
        text: {
          type: Sequelize.TEXT,
          allowNull: false
        }
      })
    )

    await runner.run([
      () => CREATE_BASE_USER(),
      () => CREATE_MEMBER(),
      () => CREATE_POST(),
      () => CREATE_COMMENT()
    ])
  },

  down: (queryInterface, Sequelize) => {
    return runner.run([
      () => queryInterface.dropTable('base_user')
    ])
  }
};
