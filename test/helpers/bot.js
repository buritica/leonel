'use strict'

const sinon = require('sinon')
const debug = require('debug')('helper:bot')

const noop = () => {}

function say (opts, cb) {
  debug('say')
  cb = cb || noop
  cb(null)
}

function reply (message, content, cb) {
  debug('reply')
  cb = cb || noop
  cb(null)
}

function Bot (opts) {
  opts = opts || {}

  debug('init', opts)

  const storage = opts.storage || {}
  const conversation = { say: sinon.spy() }

  function startPrivateConversation (opts, cb) {
    debug('startPrivateConversation', opts)
    cb(null, conversation)
  }

  const bot = {
    reply,
    say,
    startPrivateConversation,
    conversation,
    botkit: {
      storage
    }
  }

  sinon.spy(bot, 'reply')
  sinon.spy(bot, 'say')
  sinon.spy(bot, 'startPrivateConversation')

  return bot
}

module.exports = Bot
