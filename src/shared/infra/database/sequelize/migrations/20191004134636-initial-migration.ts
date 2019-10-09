
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
        is_admin_user: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        is_deleted: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
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
        type: {
          type: Sequelize.STRING(30),
          allowNull: false
        },
        title: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        text: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        link: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        slug: {
          type: Sequelize.STRING(150),
          allowNull: false,
        },
        points: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        total_num_comments: {
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
        post_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'post',
            key: 'post_id'
          }, 
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
        text: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        points: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1
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

    const CREATE_POST_VOTE = () => (
      queryInterface.createTable('post_vote', {
        post_vote_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        post_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'post',
            key: 'post_id'
          }, 
          onDelete: 'cascade',
          onUpdate: 'cascade',
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
        type: {
          type: Sequelize.STRING(10),
          allowNull: false
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

    const CREATE_COMMENT_VOTE = () => (
      queryInterface.createTable('comment_vote', {
        comment_vote_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        comment_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'comment',
            key: 'comment_id'
          }, 
          onDelete: 'cascade',
          onUpdate: 'cascade',
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
        type: {
          type: Sequelize.STRING(10),
          allowNull: false
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

    await runner.run([
      () => CREATE_BASE_USER(),
      () => CREATE_MEMBER(),
      () => CREATE_POST(),
      () => CREATE_COMMENT(),
      () => CREATE_POST_VOTE(),
      () => CREATE_COMMENT_VOTE()
    ])
  },

  down: (queryInterface, Sequelize) => {
    return runner.run([
      () => queryInterface.dropTable('base_user')
    ])
  }
};
