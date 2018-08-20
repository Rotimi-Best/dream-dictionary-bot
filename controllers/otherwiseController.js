'use strict'

const Telegram = require('telegram-node-bot');
const BaseController = Telegram.TelegramBaseController
const telegramBot = require('../index.js')

let coolGlasses = '😎'
let oneEye = '😉';
let fingerRight = '👉';

class OtherwiseController extends BaseController {
    /**
     * @param {Scope} $
     */
    handle($) {
        const myChatId = '380473669';
        let firstName = $.message.chat.firstName ? $.message.chat.firstName : $.message.chat.lastName;
        let msg = $.message.text ? $.message.text : 'Not a text';
        let userId = $.message.chat.id;
        switch(msg) {
            case '🔎 Search' :
                $.sendMessage(`You can send me a key word from your dream and I will tell you its meaning ${oneEye}.\n\nPlease click this ${fingerRight} /findbyword to continue`);
                break;
            case '🔤 By Alphabet':
                $.sendMessage(`I can tell you all available keywords that begins with an alphabet of your choice\n\nPlease click this ${fingerRight} /findbyalphabet to continue`);
                break;
            case '🔠 Spell Checker':
                $.sendMessage(`If you are not sure of your spelling, I can correct it${coolGlasses}\n\nPlease click this ${fingerRight} /spellchecker to continue`);    
                break;
            case '🔑 Help':
                $.sendMessage(`You need more explanation?\n\nPlease click this ${fingerRight} /help to continue`);
                break;
            default:
                //$.sendMessage(`To search for a word, e.g Bag\n\nJust type this:\n/findbyword Bag\n\nClick /help to see all I can do ${coolGlasses}`)
                $.sendMessage(`To search for a word, e.g Bag\n\n1. Open the menu (*it's an ICON on the top-right of your keyboard*)\n2. Click 🔎 Search\n3. Click /findbyword \n4. Enter the *word* you are looking for. ${coolGlasses}\n\nOR \n\n1. Click /findbyword \n2. Enter the *word* you are looking for. ${oneEye} `, { parse_mode: "Markdown" })
                telegramBot.api.sendMessage(myChatId, `Error =>\nUsername: ${firstName}\nUserId: ${userId}\nInput: ${msg}`)
        }
        
    }
}

module.exports = OtherwiseController