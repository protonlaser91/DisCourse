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
const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
class shop {
    constructor() {
        this.aliases = ["shop"];
    }
    name() {
        return "shop";
    }
    help() {
        return "shop";
    }
    cooldown() {
        return 20;
    }
    isThisInteraction(command) {
        return this.aliases.includes(command);
    }
    data() {
        return new SlashCommandBuilder()
            .setName(this.name())
            .setDescription(this.help());
    }
    runCommand(interaction, Bot) {
        return __awaiter(this, void 0, void 0, function* () {
            const shopEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Shop')
                .setDescription('A marketplace to buy things!')
                .setThumbnail('https://cdn.discordapp.com/attachments/775700759869259779/885703618097983539/AKedOLQgG2F4XjLYwul4pevvcE9rrDtYeu-E7vHVl8Xf9gs900-c-k-c0x00ffffff-no-rj.png')
                .setTimestamp()
                .setFooter('Shop', 'https://i.pinimg.com/originals/80/fd/eb/80fdeb47d44130603f5a2e440c421a66.jpg');
            interaction.reply({ ephemeral: true, embeds: [shopEmbed] });
        });
    }
}
exports.default = shop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9zaG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBR3RDLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBRS9ELE1BQXFCLElBQUk7SUFBekI7UUFFcUIsWUFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7SUFxQ3ZDLENBQUM7SUFuQ0csSUFBSTtRQUNBLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFDRCxpQkFBaUIsQ0FBQyxPQUFlO1FBQzdCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNELElBQUk7UUFDQSxPQUFPLElBQUksbUJBQW1CLEVBQUU7YUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNwQixjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7SUFDaEMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxXQUF1QyxFQUFFLEdBQW1COztZQUd6RSxNQUFNLFNBQVMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7aUJBQ3ZDLFFBQVEsQ0FBQyxTQUFTLENBQUM7aUJBQ25CLFFBQVEsQ0FBQyxNQUFNLENBQUM7aUJBQ2hCLGNBQWMsQ0FBQyw4QkFBOEIsQ0FBQztpQkFDOUMsWUFBWSxDQUFDLDJKQUEySixDQUFDO2lCQUN6SyxZQUFZLEVBQUU7aUJBQ2QsU0FBUyxDQUFDLE1BQU0sRUFBRSw4RUFBOEUsQ0FBQyxDQUFDO1lBR25HLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUVsRSxDQUFDO0tBQUE7Q0FDSjtBQXZDRCx1QkF1Q0MifQ==