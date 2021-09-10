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
class help {
    name() {
        return "help";
    }
    help() {
        return "Gives a list of all commands available to you";
    }
    cooldown() {
        return 2;
    }
    isThisInteraction(command) {
        return command === "help";
    }
    data() {
        return new SlashCommandBuilder()
            .setName(this.name())
            .setDescription(this.help());
    }
    runCommand(interaction, Bot) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let embed = new Discord.MessageEmbed();
            if ((_a = interaction.member.roles) === null || _a === void 0 ? void 0 : _a.cache.some((role) => role.name === 'Student')) {
                embed.setTitle('DisCourse Command List')
                    .setDescription('Here are a list of our student commands.')
                    .setColor('#5865F2')
                    .addFields({ name: "/help", value: "Shows all available commands for that user" }, { name: "/leaderboard", value: "Shows the top 10 members with the most points in the class" }, { name: "/askq", value: "Ask a question that can be answered by other students or a teacher" }, { name: "/replys", value: "Reply to a question another student has asked" }, { name: "/answerq", value: "Answer an open-ended question a teacher has asked" });
            }
            else if (interaction.member.roles.cache.some((role) => role.name === 'Teacher')) {
                embed.setTitle('DisCourse Command List')
                    .setDescription('Here are a list of our teacher commands.')
                    .setColor('#5865F2')
                    .addFields({ name: "/help", value: "Shows all available commands for that user" }, { name: "/attendance", value: "Sends a message to all students so that they can mark that they are present; the message will disappear after a certain amount of time" }, { name: "/strike", value: "Mutes target user for certain amount of time and warns them with a custom message" }, { name: "/announcement", value: "Sends a message visible to all students in a channel" }, { name: "/replyt", value: "Reply to a question a student has asked" }, { name: "/changepoints", value: "Change the number of points a student has by adding or subtracting a certain amount" }, { name: "/leaderboard", value: "Shows the top 10 members with the most points in the class" }, { name: "/mcq", value: "Create a multiple choice question that students can answer within a specified time and gives points if answered correctly" }, { name: "/oeq", value: "Create an open-ended question that students can answer within a specified time and gives points if answered correctly" }, { name: "/mcq", value: "Create a multiple choice question that students can answer within a specified time and gives points if answered correctly" });
            }
            interaction.reply({ embeds: [embed], ephemeral: true });
        });
    }
}
exports.default = help;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9oZWxwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBRXRDLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBRy9ELE1BQXFCLElBQUk7SUFFckIsSUFBSTtRQUNBLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTywrQ0FBK0MsQ0FBQztJQUMzRCxDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUNELGlCQUFpQixDQUFDLE9BQWU7UUFDN0IsT0FBTyxPQUFPLEtBQUssTUFBTSxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxJQUFJLG1CQUFtQixFQUFFO2FBQ3JDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDcEIsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQzFCLENBQUM7SUFFSyxVQUFVLENBQUMsV0FBZ0IsRUFBRSxHQUFtQjs7O1lBQ2xELElBQUksS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3ZDLElBQUksTUFBQSxXQUFXLENBQUMsTUFBTyxDQUFDLEtBQUssMENBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQXVCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLEVBQUM7Z0JBQzVGLEtBQUssQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUM7cUJBQ3ZDLGNBQWMsQ0FBQywwQ0FBMEMsQ0FBQztxQkFDMUQsUUFBUSxDQUFDLFNBQVMsQ0FBQztxQkFDbkIsU0FBUyxDQUNOLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsNENBQTRDLEVBQUMsRUFDbEUsRUFBQyxJQUFJLEVBQUMsY0FBYyxFQUFFLEtBQUssRUFBQyw0REFBNEQsRUFBQyxFQUN6RixFQUFDLElBQUksRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLG9FQUFvRSxFQUFDLEVBQzFGLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsK0NBQStDLEVBQUMsRUFDdkUsRUFBQyxJQUFJLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBQyxtREFBbUQsRUFBQyxDQUMvRSxDQUFDO2FBQ0w7aUJBQ0ksSUFBRyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBdUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsRUFBQztnQkFDOUYsS0FBSyxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQztxQkFDdkMsY0FBYyxDQUFDLDBDQUEwQyxDQUFDO3FCQUMxRCxRQUFRLENBQUMsU0FBUyxDQUFDO3FCQUNuQixTQUFTLENBQ04sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyw0Q0FBNEMsRUFBQyxFQUNsRSxFQUFDLElBQUksRUFBQyxhQUFhLEVBQUUsS0FBSyxFQUFDLHdJQUF3SSxFQUFDLEVBQ3BLLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsbUZBQW1GLEVBQUMsRUFDM0csRUFBQyxJQUFJLEVBQUMsZUFBZSxFQUFFLEtBQUssRUFBQyxzREFBc0QsRUFBQyxFQUNwRixFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLHlDQUF5QyxFQUFDLEVBQ2pFLEVBQUMsSUFBSSxFQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUMscUZBQXFGLEVBQUMsRUFDbkgsRUFBQyxJQUFJLEVBQUMsY0FBYyxFQUFFLEtBQUssRUFBQyw0REFBNEQsRUFBQyxFQUN6RixFQUFDLElBQUksRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLDJIQUEySCxFQUFDLEVBQ2hKLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsdUhBQXVILEVBQUMsRUFDNUksRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQywySEFBMkgsRUFBQyxDQUNuSixDQUFDO2FBQ0w7WUFDTCxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7O0tBQ3pEO0NBQ0E7QUF4REQsdUJBd0RDIn0=