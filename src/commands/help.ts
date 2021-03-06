import * as Discord from "discord.js";
import { IBotInteraction } from "../api/capi";
const { SlashCommandBuilder } = require('@discordjs/builders');
import { helpUtil } from "..";

export default class help implements IBotInteraction {

    name(): string {
        return "help";
    } 

    help(): string {
        return "A list of all commands available to you.";
    }   
    
    cooldown(): number{
        return 2;
    }
    isThisInteraction(command: string): boolean {
        return command === "help";
    }

    data(): any {
        return new SlashCommandBuilder()
		.setName(this.name())
		.setDescription(this.help())
    }
    perms(): "teacher" | "student" | "both" {
        return 'both';
     }

    async runCommand(interaction: any, Bot: Discord.Client): Promise<void> {
        let embed = new Discord.MessageEmbed();
        let isTeacher = interaction.member!.roles?.cache.some((role: { name: string; }) => role.name === 'Teacher');
        embed.setTitle('DisCourse Command List')
        .setDescription(`Here are a list of our ${isTeacher ? 'teacher' : 'student'} commands.`)
        .setColor('BLURPLE');
        helpUtil.get().forEach((helpPerm: string[],name: string) => {
            if ((helpPerm[1] != 'student' && isTeacher) || (helpPerm[1] != 'teacher' && !isTeacher))
                embed.addField('/'+name,helpPerm[0]);
        })
        await interaction.reply({embeds: [embed], ephemeral: true});  
    }   
}
