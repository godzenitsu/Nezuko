import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

const alive = async (m, Matrix) => {
  const uptimeSeconds = process.uptime();
  const days = Math.floor(uptimeSeconds / (24 * 3600));
  const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeSeconds % 60);
  
  const prefix = /^[\\/!#.]/gi.test(m.body) ? m.body.match(/^[\\/!#.]/gi)[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).toLowerCase() : '';
    if (['alive', 'uptime', 'runtime'].includes(cmd)) {

  const uptimeMessage = `*𝙽𝙴𝚉𝚄𝙺𝙾 𝙸𝚂 𝙰𝙻𝙸𝚅𝙴*
_________________________________________

*⛯ ${days} Day*
*⛯ ${hours} Hour*
*⛯ ${minutes} Minute*
*⛯ ${seconds} Second*
_________________________________________
`;

  const buttons = [
        {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "𝙼𝙰𝙸𝙽-𝙼𝙴𝙽𝚄",
            id: `.menu`
          })
        },
        {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "𝙿𝙸𝙽𝙶",
            id: `.ping`
          })
        }
        ];

  const msg = generateWAMessageFromContent(m.from, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: uptimeMessage
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "© QUEEN-NEZUKO"
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: "",
            gifPlayback: true,
            subtitle: "",
            hasMediaAttachment: false 
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons
          }),
          contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363298863716797@newsletter',
                  newsletterName: "𝐐𝐮𝐞𝐞𝐧 𝐍𝐞𝐳𝐮𝐤𝐨",
                  serverMessageId: 143
                }
              }
        }),
      },
    },
  }, {});

  await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
    messageId: msg.key.id
  });
    }
};

export default alive;
