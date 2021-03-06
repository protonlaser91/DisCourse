import * as Discord from "discord.js";
import * as db from "quick.db";
import { IBotInteraction } from "../api/capi";
const { SlashCommandBuilder } = require('@discordjs/builders');

export default class attendance implements IBotInteraction {

    name(): string {
        return "attendance";
    } 

    help(): string {
        return "Attendance made easy!";
    }   
    
    cooldown(): number{
        return 6;
    }

    isThisInteraction(command: string): boolean {
        return command === this.name();
    }

    perms(): "teacher" | "student" | "both" {
       return 'teacher';
    }

    data(): any {
        return new SlashCommandBuilder()
		.setName(this.name())
		.setDescription(this.help())
		.addStringOption((option:any) =>
		option.setName('time')
			.setDescription('Enter a time! (in 24 hour format!)')
			.setRequired(true))
        .addIntegerOption((option:any) =>
            option.setName('exptime')
                .setDescription('The amount of time attendance is valid for!'));
    }

    async runCommand(interaction: Discord.CommandInteraction, Bot: Discord.Client): Promise<void> { // TODO: exptime is in seconds, change to minutes later
        let allRoleUsers: Set<Discord.GuildMember> = new Set();
        await interaction.guild!.members.fetch();
        let role = interaction.guild!.roles.cache.find((role: Discord.Role) => role.name == 'Student') as Discord.Role;
        interaction.guild!.members.cache.forEach((v: Discord.GuildMember) => {
            if (v.roles.cache.has(role!.id)){
                allRoleUsers.add(v);
            }
        });

        //console.log(allRoleUsers);

        var exptime: number = interaction.options.getInteger('exptime') as number;
        if (exptime == null)
            exptime = 10;
        const time = interaction.options.getString('time')!.split(':');
        let ti: any = new Date();
        let now = new Date();
        ti.setHours(parseInt(time[0]));
        ti.setMinutes(parseInt(time[1]));
        ti.setSeconds(0);
        let ms = ti.getTime() - now.getTime();
        if (ms < 0){
            ms += 24*60*60*1000;
        }
        let endTime = new Date(ti.getTime() + exptime*60000);
      //  console.log(ms);
        await interaction.reply({ephemeral: true, content:`Attendance will appear at ${time[0].toString().padStart(2,"0")}:${time[1].toString().padStart(2,"0")} and end at ${endTime.getHours().toString().padStart(2,"0")}:${endTime.getMinutes().toString().padStart(2,"0")}`});
        setTimeout(() => {
            this.eric(Bot,interaction,exptime,allRoleUsers, role);
            setInterval(this.eric,24*60*60*1000, Bot, interaction, exptime, allRoleUsers, role);
        },ms) // ms
        
    }

    async eric(Bot: Discord.Client, interaction: Discord.CommandInteraction, exptime: number, allRoleUsers: Set<Discord.GuildMember>, role: any){
     //   console.log("running timeout");
        const marked: Discord.Collection<string,boolean> = new Discord.Collection();
        let msgToHold: Discord.Message;
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('attend')
                    .setLabel(`I'm here!`)
                    .setStyle('PRIMARY'),
            );
        const channel: Discord.TextChannel = interaction.guild?.channels.cache.find((channel) => channel.name == 'announcements') as Discord.TextChannel;
        msgToHold = await channel.send({ content: `Click here to mark yourself present! \n <@&${role.id}>`, components: [row] });

        const filter = (i: Discord.ButtonInteraction) => i.customId === 'attend';
    
        const collector: Discord.InteractionCollector<Discord.ButtonInteraction> = channel.createMessageComponentCollector(
            { filter, time: exptime*1000 }
            );
        
        collector.on('collect', async (i: Discord.ButtonInteraction) => {
            //console.log(marked);
            if (i.customId == 'attend'){
                i.deferUpdate();
                if (!(i.member as Discord.GuildMember).roles.cache.has(role.id)){
                    i.followUp({content: "You aren't a student!", ephemeral: true});
                } else {
                if (!marked.has(i.member!.user.id)){
                    i.followUp({content: `Marked you here! You earned a point!`, ephemeral:true});
                    marked.set(i.member!.user.id,false);
                    allRoleUsers.delete(i.member as Discord.GuildMember);
                    db.set(`${i.member!.user.id}.points`,db.get(`${i.member!.user.id}.points`)+1);
                }
                else if (!marked.get(i.member!.user.id)){
                    i.followUp({content: `You have already been marked!`, ephemeral:true});
                    marked.set(i.member!.user.id,true);
                }
            }
        }
            
        });
    
        collector.on('end', async () => {
            Array.from(allRoleUsers).sort((a,b) => {
                const aAb = db.get(`${a.id}.absences`);
                const bAb = db.get(`${b.id}.absences`);
                if (aAb > bAb)
                    return 1
                else if (bAb > aAb)
                    return -1
                return 0;
            });

            const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('attend')
                    .setLabel(`Expired`)
                    .setStyle('DANGER')
                    .setDisabled(true),
            );
            msgToHold.edit({ content: `You were too late! \n <@&${role.id}>`, components: [row] });

            const ailunicEmbed = new Discord.MessageEmbed()
            .setColor('#FFFFFF')
            .setTitle('Absent Students!')
            .setDescription('These people did not mark themselves present!')
            .setThumbnail('https://images.pexels.com/photos/963486/pexels-photo-963486.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');

            allRoleUsers.forEach((member: Discord.GuildMember) => {
                db.add(`${member.id}.absences`,1);
                ailunicEmbed.addField(`${member.displayName}#${member.user.discriminator}`, `${db.get(`${member.id}.absences`)} absence(s)`);
            })
            ailunicEmbed.setTimestamp()
            .setFooter('DisCourse Report!');


            const channel: Discord.TextChannel = interaction.guild?.channels.cache.find((channel) => channel.name == 'teacher') as Discord.TextChannel;
            channel.send({embeds: [ailunicEmbed]});
        }
        );
        }
}

