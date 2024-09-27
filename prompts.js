module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Project name',
    validate: (value) => !!value
  },
  {
    type: 'input',
    name: 'description',
    message: 'Project description',
    default: 'Joyrun H5 activity'
  },
  {
    type: 'input',
    name: 'author',
    message: 'Author'
  },
  {
    type: 'input',
    name: 'license',
    message: 'License',
    default: 'MIT'
  },
  {
    type: 'input',
    name: 'shareHost',
    message: 'share url host in wechat',
    default: 'webevent.thejoyrun.com'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Project description',
    default: 'Joyrun H5 activity'
  },
  {
    type: 'list',
    name: 'cssPerprocessor',
    message: 'Whether or not to use css perprocessor?',
    choices: [
      {
        name: 'yes, use less',
        value: 'less'
      },
      {
        name: 'yes, use sass',
        value: 'sass'
      },
      {
        name: 'no',
        value: 'none'
      }
    ]
  },
  {
    type: 'list',
    name: 'animateType',
    message: 'animation type when the router change',
    choices: [
      {
        name: 'fade (fade in and fade out)',
        value: 'fade'
      },
      {
        name: 'none (no animation)',
        value: 'none'
      }
    ]
  },
  {
    type: 'list',
    name: 'isUseScriptSetup',
    message: 'use script setup?',
    choices: [
      {
        name: 'no',
        value: 'no'
      },
      {
        name: 'yes',
        value: 'yes'
      }
    ]
  }
]