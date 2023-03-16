const Sequelize = require('sequelize');
const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Rating = require('./Rating');
const Meeting = require('./Meeting');

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: true,
      notEmpty: true,
      isEmail: true,
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      // length controlled via hook
      notNull: true,
      notEmpty: true,
    }
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 18,
      notNull: true,
      notEmpty: true
    }
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['M', 'F', 'Other', 'DidNotDisclose']],
      notEmpty: true,
      notNull: true,
    }
  },
  address1: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true
    }
  },
  address2: {
    type: Sequelize.STRING,
    allowNull: true,
    notEmpty: false,
    notNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    }
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['AL',
      'AK',
      'AS',
      'AZ',
      'AR',
      'CA',
      'CO',
      'CT',
      'DE',
      'DC',
      'FL',
      'GA',
      'GU',
      'HI',
      'ID',
      'IL',
      'IN',
      'IA',
      'KS',
      'KY',
      'LA',
      'ME',
      'MD',
      'MA',
      'MI',
      'MN',
      'MS',
      'MO',
      'MT',
      'NE',
      'NV',
      'NH',
      'NJ',
      'NM',
      'NY',
      'NC',
      'ND',
      'MP',
      'OH',
      'OK',
      'OR',
      'PA',
      'PR',
      'RI',
      'SC',
      'SD',
      'TN',
      'TX',
      'UT',
      'VT',
      'VA',
      'VI',
      'WA',
      'WV',
      'WI',
      'WY'
      ]],
      notEmpty: true,
      notNull: true,
      isUppercase: true,
    }
  },
  zip: {
    type: Sequelize.INTEGER(5),
    allowNull: false,
    validate: {
      min: 00000,
      max: 99999,
      notEmpty: true,
      notNull: true
    }
  },
  avatarUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '/assets/defaultAvatar.svg',
    validate: {
      notEmpty: true,
      notNull: true,
    }
  },
  aboutMe: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: `This buddy hasn't written anything yet. If you meet them, maybe give them a nudge!`,
    validate: {
      notEmpty: true,
      notNull: true
    }
  },
  isVerified: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notEmpty: true,
      notNull: true
    }
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'user',
    validate: {
      isIn: [['user', 'admin']],
      notEmpty: true,
      notNull: true
    }
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'inactive',
    validate: {
      isIn: [['inactive','active','suspended','banned']],
      notEmpty: true,
      notNull: true
    }
  },
  fullName: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    set() {
      throw new Error('Cannot directly set fullName value -- must set firstName and lastName individually.');
    }
  },
  avgRating: {
    type: Sequelize.VIRTUAL,
    async get() {
      const scoreCount = await Rating.count({where: {buddyId: this.id}});
      const scoreSum = await Rating.sum('rating', {where: {buddyId: this.id}});
      if (!scoreCount || !scoreSum >= 0) return null;
      return scoreSum / scoreCount;
    },
    set() {
      throw new Error('Cannot directly set avgRating - this is calculated from other records')
    }
  },
  meetingCount: {
    type: Sequelize.VIRTUAL,
    async get() {
      const userCount = await Meeting.count({where: {userId: this.id}});
      const buddyCount = await Meeting.count({where: {buddyId: this.id}});
      return userCount + buddyCount;
    },
    set() {
      throw new Error('Cannot directly set meetingCount - this is calculated from other records');
    }
  },
  reportCount: {
    type: Sequelize.VIRTUAL,
    async get() {
      const count = await Rating.count({where: {buddyId: this.id, isReport: true}})
      return count || 0;
    },
    set() {
      throw new Error('Cannot directly set reportCount - this is calculated from other records');
    }
  },
  strikeCount: {
    type: Sequelize.VIRTUAL,
    async get() {
      const count = await Rating.count({where: {buddyId: this.id, isReport: true, isUpheld: true}})
      return count || 0;
    },
    set() {
      throw new Error('Cannot directly set strikeCount - this is calculated from other records');
    }
  }
})

/**
 * HOOKS
 */

User.beforeValidate((user) => {
  const MIN_PASSWORD_LENGTH = 8;

  const pw = user.password;
  if (pw.length < MIN_PASSWORD_LENGTH) {
    const err = new Error();
    err.message = `Minimum password requirement not met (${MIN_PASSWORD_LENGTH} characters)`;
    throw err;
  }
});

/**
 * AUTH CLASS METHODS
 */

User.verifyByToken = async (token) => {
  try {
    const { id } = jwt.verify(token, SECRET);
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['age', 'gender', 'address1', 'address2', 'city', 'state', 'zip', 'password', 'avgRating', 'reportCount', 'strikeCount'],
      },
    });
    if (user) {
      return user;
    } else {
      const error = new Error('bad credentials / bad token');
      error.status = 401;
      throw error;
    }
  } catch (err) {
    console.log('verification error: ', err);
  }
};

User.authenticate = async ({ email, password }) => {
  try {
    const user = await User.findOne({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        SECRET
      );
    }
    const error = new Error('bad credentials');
    error.status = 401;
    throw error;
  } catch (err) {
    console.log('Authentication error:', err);
  }
};

module.exports = User;