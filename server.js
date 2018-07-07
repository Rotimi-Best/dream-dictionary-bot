`use strict`

            // Dream dictionary bot  
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const bot = new Telegram.Telegram('529605138:AAFGYfp_bNUWaxGnbiG5VGMGrQ-Q4bFK324', {
    workers: 1
});
const lib = require('./text/libArray')

class BrainController extends TelegramBaseController{
    /**
     * @param {Scope} $
     */
    wordSearchHandler($) {
        // $.sendMessage('I am here to help you.')
        let user = $.message.chat.username
        let val = $.message.text.split(' ').slice(1).join(' ')
        if(val != ''){
            let input = val.trim().replace(/ /g, '');
            let found = false
            let matched, page
            let firstLetter = input.match(/\w/);
            lib.arr.forEach((element) => {
                let alphabet = element.container.alph
                if(alphabet == firstLetter['0']){
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
                $.sendMessage(`Hurray, the word ${matched.charAt(0).toUpperCase() + matched.slice(1)} was found in page ${page}`)
            } else {
                $.sendMessage(`Sorry ${user}, your ${input} wasn't found, try adding/removing (s) at the end of the word`)
            }
        } else {
            $.sendMessage(`Sorry ${user}, your input isn't valid. click /help for more info.`)
        }
    }

    /**
     * @param {Scope} $
     */
    alphSearchHandler($) {
        let user = $.message.chat.username
        let val = $.message.text.split(' ').slice(1).join(' ')

        if(val){
            let input = val.trim()
            let checker = false
            let wordArr = []
            let pageArr = []
            lib.arr.forEach((element) => {
                let alphabet = element.container.alph
                if(alphabet == input){
                    $.sendMessage(`${user}, Here are all the words in the alphabet`)
                    let words = element.container.words
                    let pages = element.container.pages
                    checker = true
                    words.forEach((el, index) => {
                        wordArr.push(el)
                        pageArr.push(index)
                    })
                    $.sendMessage(``, { parse_mode: "Markdown"})
                } 
            });
            if(!checker){
                $.sendMessage(`Sorry ${user}, Such alphabet doesn\'t exist, check your spelling`)
            }
        } else {
            $.sendMessage(`Sorry ${user}, your input isn't valid. click /help for more info.`)
        }
    }

    /**
     * @param {Scope} $
     */
    helpHandler($) {
        $.sendMessage(`To use my current version you need to have bought the book.\nhttps://www.amazon.com/Dictionary-Dreams-Tella-Olayeri/dp/B0053B58RQ\nIn my current version here is what I can do:\n\n1. You can check if a word is in the dictionary and find its page. To do this use /findbyword command and then the word \ne.g /findbyword football \n\n2. Show you all the words in a particular an alphabet. To do this use /findbyalphabet command followed by the alphabet \ne.g /findbyalphabet p \n In the coming version you can be able to find the interpretaions directly from the bot without the dream dictionary.\n\nHave any question? Ask my [creator](https://t.me/Lover_Of_Jesus)`, { parse_mode: "Markdown"})
    }

    get routes() {
        return {
            'wordSearchCommand': 'wordSearchHandler',
            'alphSearchCommand' : 'alphSearchHandler',
            'helpCommand' : 'helpHandler'
        }
    }
}

const OtherwiseController = require('./controllers/otherwise')

bot.router
    .when(new TextCommand('/findbyword', 'wordSearchCommand'), new BrainController())
    .when(new TextCommand('/findbyalphabet', 'alphSearchCommand'), new BrainController())
    .when(new TextCommand('/help', 'helpCommand'), new BrainController())
    .otherwise(new OtherwiseController()) 

