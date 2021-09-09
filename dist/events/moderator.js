"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
const db = require("quick.db");
var badwordsArray = require('badwords/array');
var forbiddenWords = ['banana', 'apple', 'strawberry', 'pineapple', 'grape', 'melon', 'peach', 'avacado', 'mango'];
class moderator {
    name() {
        return "moderator";
    }
    help() {
        return "moderator";
    }
    runEvent(msg, Bot) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let arr = db.get(`${msg.author.id}.messages`);
            let allMessages = arr.join('');
            for (var i = 0; i < badwordsArray.length; i++) {
                if (allMessages.includes(badwordsArray[i])) {
                    db.add(`${msg.author.id}.strikes`, 1);
                    msg.reply(`${msg.author.username} now has ${db.get(`${msg.author.id}.strikes`)} strikes!`);
                    db.set(`${msg.author.id}.messages`, []);
                    break;
                }
            }
            let strikeAmount = db.get(`${msg.author.id}.strikes`);
            if (strikeAmount >= 3) {
                var role = msg.guild.roles.cache.find(role => role.name == 'Mute');
                if (msg.member.roles.cache.some((role) => role.name === 'Student')) {
                    (_a = msg.guild) === null || _a === void 0 ? void 0 : _a.members.fetch(msg.author.id).then(user => {
                        user.roles.set([role]);
                    });
                }
            }
        });
    }
}
exports.default = moderator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V2ZW50cy9tb2RlcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkIsK0JBQStCO0FBQy9CLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzlDLElBQUksY0FBYyxHQUFDLENBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxZQUFZLEVBQUUsV0FBVyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxPQUFPLENBQUMsQ0FBQztBQUMxRyxNQUFxQixTQUFTO0lBRTFCLElBQUk7UUFDQSxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sV0FBVyxDQUFDO0lBQ3ZCLENBQUM7SUFHSyxRQUFRLENBQUMsR0FBb0IsRUFBRSxHQUFtQjs7O1lBQ3BELElBQUksR0FBRyxHQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUE7WUFFM0MsSUFBSSxXQUFXLEdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUd2QyxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsYUFBYSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztnQkFFckMsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUcxQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFDckMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFBO29CQUMxRixFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQTtvQkFFdkMsTUFBTTtpQkFDUjthQUVEO1lBQ0QsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFPLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNyRCxJQUFHLFlBQVksSUFBRSxDQUFDLEVBQUM7Z0JBQ2pCLElBQUksSUFBSSxHQUFRLEdBQUcsQ0FBQyxLQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxDQUFDO2dCQUV6RSxJQUFHLEdBQUcsQ0FBQyxNQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLEVBQUM7b0JBQ25FLE1BQUEsR0FBRyxDQUFDLEtBQUssMENBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFBLEVBQUU7d0JBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtvQkFDMUIsQ0FBQyxDQUFDLENBQUE7aUJBQ0Q7YUFFRjs7S0FLTjtDQUNGO0FBOUNILDRCQThDRyJ9