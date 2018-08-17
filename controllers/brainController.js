'use strict'

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController

const lib = require('../text/libArray')
const fs = require('fs')
const telegramBot = require('../index.js')
const myChatId = '380473669';

let success = '🕺';
let smile = '🙂';
let sad = '😞';
let coolGlasses = '😎'
let waitingSticker = 'CAADAgADPQgAAnlc4gkSO7rndkwKigI';

class BrainController extends TelegramBaseController{
    /**
     * @param {Scope} $
     */
    wordSearchHandler($) {
        // $.sendMessage('I am here to help you.')
        let user = $.message.chat.firstName ? $.message.chat.firstName : $.message.chat.lastName;
        let userId = $.message.chat.id;
        let msg = $.message.text;
        let val = msg.split(' ').slice(1).join(' ');
        if(msg == '/findbyword'){
            $.sendMessage(`*Send me the word you want to lookup.*\n\nI am waiting...${smile}`, {parse_mode: 'Markdown'});
            $.sendSticker(`${waitingSticker}`);
            $.waitForRequest
                .then($ => {
                    val = $.message.text;
                    this.findWordLogic($, val, msg, user, userId)
                })
        } else if(val != '') {
            this.findWordLogic($, val, msg, user, userId)
        } else{
            $.sendMessage(`Sorry ${user} ${sad}, your input isn't valid. click /help for more info.`)
            telegramBot.api.sendMessage(myChatId, `InvalidInputError[/findbyword] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}`)
        }
    }

    /**
     * @param {Scope} $
     */
    alphSearchHandler($) {
        let user = $.message.chat.firstName ? $.message.chat.firstName : $.message.chat.lastName;
        let userId = $.message.chat.id;
        let msg = $.message.text;
        let val = msg.split(' ').slice(1).join(' ')
        if(val){
            this.findAlphabetLogic($, val, msg, user, userId)
        } else if(msg == '/findbyalphabet') {
            let scope = $;
            $.runInlineMenu({
                layout: 4,
                method: 'sendMessage',
                params: ['Choose an alphabet to see all the words you can search for'],
                menu: [
                    { text:'A', callback: () => {this.findAlphabetLogic(scope, 'A', msg, user, userId)} },
                    { text:'B', callback: () => {this.findAlphabetLogic(scope, 'B', msg, user, userId)} },  
                    { text:'C', callback: () => {this.findAlphabetLogic(scope, 'C', msg, user, userId)} }, 
                    { text:'D', callback: () => {this.findAlphabetLogic(scope, 'D', msg, user, userId)} }, 
                    { text:'E', callback: () => {this.findAlphabetLogic(scope, 'E', msg, user, userId)} }, 
                    { text:'F', callback: () => {this.findAlphabetLogic(scope, 'F', msg, user, userId)} }, 
                    { text:'G', callback: () => {this.findAlphabetLogic(scope, 'G', msg, user, userId)} }, 
                    { text:'H', callback: () => {this.findAlphabetLogic(scope, 'H', msg, user, userId)} }, 
                    { text:'I', callback: () => {this.findAlphabetLogic(scope, 'I', msg, user, userId)} }, 
                    { text:'J', callback: () => {this.findAlphabetLogic(scope, 'J', msg, user, userId)} }, 
                    { text:'K', callback: () => {this.findAlphabetLogic(scope, 'K', msg, user, userId)} }, 
                    { text:'L', callback: () => {this.findAlphabetLogic(scope, 'L', msg, user, userId)} }, 
                    { text:'M', callback: () => {this.findAlphabetLogic(scope, 'M', msg, user, userId)} }, 
                    { text:'N', callback: () => {this.findAlphabetLogic(scope, 'N', msg, user, userId)} }, 
                    { text:'O', callback: () => {this.findAlphabetLogic(scope, 'O', msg, user, userId)} }, 
                    { text:'P', callback: () => {this.findAlphabetLogic(scope, 'P', msg, user, userId)} }, 
                    { text:'Q', callback: () => {this.findAlphabetLogic(scope, 'Q', msg, user, userId)} }, 
                    { text:'R', callback: () => {this.findAlphabetLogic(scope, 'R', msg, user, userId)} }, 
                    { text:'S', callback: () => {this.findAlphabetLogic(scope, 'S', msg, user, userId)} }, 
                    { text:'T', callback: () => {this.findAlphabetLogic(scope, 'T', msg, user, userId)} },                          
                    { text:'U', callback: () => {this.findAlphabetLogic(scope, 'U', msg, user, userId)} }, 
                    { text:'V', callback: () => {this.findAlphabetLogic(scope, 'V', msg, user, userId)} }, 
                    { text:'W', callback: () => {this.findAlphabetLogic(scope, 'W', msg, user, userId)} }, 
                    { text:'X', callback: () => {this.findAlphabetLogic(scope, 'X', msg, user, userId)} }, 
                    { text:'Y', callback: () => {this.findAlphabetLogic(scope, 'Y', msg, user, userId)} }, 
                    { text:'Z', callback: () => {this.findAlphabetLogic(scope, 'Z', msg, user, userId)} }, 
                ]
            });
        } else {
            $.sendMessage(`Sorry ${user} ${sad}, your input isn't valid. click /help for more info.`)
            telegramBot.api.sendMessage(myChatId, `InvalidInputError[/findbyalpahbet] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}`)
        }
    }

    /**
     * @param {Scope} $
     */
    helpHandler($) {
        $.sendMessage(`To use my current version you need to have bought the book.\nhttps://www.amazon.com/Dictionary-Dreams-Tella-Olayeri/dp/B0053B58RQ\nIn my current version here is what I can do:\n\n1. You can check if a word is in the dictionary and find its page. To do this use /findbyword command and then the word \ne.g /findbyword football. \n\n2. Show you all the words in a particular alphabet. To do this use /findbyalphabet command followed by the alphabet \ne.g /findbyalphabet p \n\n*NOTE:*Click the backslash (right side of your text input area), and pressdown the command you want before you type a word (don't click on the command, if you do it will send immediately).\n\n  In the coming version you can be able to find the interpretaions directly from the bot without the dream dictionary.\n\nHave any question? Ask my [creator](https://t.me/Lover_Of_Jesus)`, { parse_mode: "Markdown"})
        let user = $.message.chat.firstName ? $.message.chat.firstName : $.message.chat.lastName;
        let userId = $.message.chat.id;
        telegramBot.api.sendMessage(myChatId, `Someone needs help.\nUsername: ${user}\nUserId: ${userId}`)
    }

    /**
     * @param {Scope} $
     */
    startHandler($) {
        $.sendMessage(`To get started *click the backslash* on the _top right of your keyboard_ ( it looks like this / ).\nThere you would see the list of commands available for you to use.\nClick on /help to see examples of how to use those commands.`, { parse_mode: "Markdown"})
        let user = $.message.chat.firstName ? $.message.chat.firstName : $.message.chat.lastName;
        let userId = $.message.chat.id;
        telegramBot.api.sendMessage(myChatId, `You have a new user.\n\nUsername: ${user}\nUserId: ${userId}`)
    }

    get routes() {
        return {
            'wordSearchCommand': 'wordSearchHandler',
            'alphSearchCommand' : 'alphSearchHandler',
            'helpCommand' : 'helpHandler',
            'startCommand' : 'startHandler'
        }
    }

    _serializeList(user, words, pages) {
        let serialized = `*Here You Go ${user} ${smile}*\n`;
        words.forEach((word, index) => {
            serialized +=  `${word.charAt(0).toUpperCase() + word.slice(1)} => ${pages[index]}\n`
        })
        return serialized;
    }

    findWordLogic($, val, msg, user, userId){
        let input = val.trim().replace(/ /g, '');
        let found = false
        let matched, page
        let firstLetter = input.match(/\w/);

            if(firstLetter){
            lib.arr.forEach((element) => {
                let alphabet = element.container.alph
                if(alphabet == firstLetter['0'].toLowerCase()){
                    let words = element.container.words
                    words.forEach((el, index) => {
                        let reg = new RegExp('\\b' + input + '\\b', 'gi')
                        let matchWord = el.match(reg)
                        if(matchWord){
                            found = true
                            matched = matchWord['0']
                            page = element.container.pages[index]
                        }
                    })
                }	
            });
            if(found){
                $.sendMessage(`Hurray ${success}, the word ${matched.charAt(0).toUpperCase() + matched.slice(1)} was found in page ${page}`)
                telegramBot.api.sendMessage(myChatId, `User ${user} used the wordSearchHandler`) 
                let imagesFile = fs.readFileSync('images.json', 'utf8');
                let jsonImages = JSON.parse(imagesFile);
                let image = jsonImages.images[page];
                if(image){
                const send = $.sendPhoto(image);
                send.catch((error) => {
                    $.sendMessage(`Unfortunately ${user} ${sad}, no image for ${matched.charAt(0).toUpperCase() + matched.slice(1)} yet. It would be available soon${coolGlasses}`);
                    telegramBot.api.sendMessage(myChatId, `ImageSendError[/findbyWord] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}\nPage: ${page}`)
                    telegramBot.api.sendMessage(myChatId, `Description => ${error.description}`)
                });
               } else {
                    $.sendMessage(`Unfortunately ${user} ${sad}, no image for ${matched.charAt(0).toUpperCase() + matched.slice(1)} yet. It would be available soon${coolGlasses}`);
                    telegramBot.api.sendMessage(myChatId, `ImageSendError[/findbyWord] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}\nPage: ${page}\nDescription => Cannot read property 'url' of undefined`);
               }
            
                //$.sendMessage(`Hurray, the word ${matched.charAt(0).toUpperCase() + matched.slice(1)} was found in page ${page}`)		
            } else {
                telegramBot.api.sendMessage(myChatId, `NotFoundError[/findbyWord] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}`)
                $.sendMessage(`Sorry ${user} ${sad}, ${input} wasn't found, try adding/removing (s) at the end of the word or try using the /spellchecker command to correct your spelling.\n\nLike this: /spellchecker ${input}`)
            }
        } else {
            $.sendMessage(`Sorry ${user} ${sad}, your input isn't valid. Make sure you entered an english word`)
            telegramBot.api.sendMessage(myChatId, `NotEnglishError =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}`)
        }
    }

    findAlphabetLogic($, val, msg, user, userId){
        let input = val.trim().toLowerCase()
        let checker = false
        lib.arr.forEach((element) => {
            let alphabet = element.container.alph
            if(alphabet == input){
                let words = element.container.words
                let pages = element.container.pages
                checker = true
                $.sendMessage(this._serializeList(user, words, pages), {parse_mode: 'Markdown'})
                telegramBot.api.sendMessage(myChatId, `User ${user} used the alphabetSearchHandler`)                  
            } 
        });
        if(!checker){
            $.sendMessage(`Sorry ${user} ${sad}, Such alphabet doesn't exist, check your spelling`)
            telegramBot.api.sendMessage(myChatId, `NotFoundError[/findbyalpahbet] =>\nUsername: ${user}\nUserId: ${userId}\nInput: ${msg}`)
        }
    }
}

module.exports = BrainController