Hooks.on("diceSoNiceRollStart", async (messageId) => {
  const message = game.messages.get(messageId);
  if (!message) return;

  const roll = message.rolls?.[0];
  if (!roll || !roll.terms?.length) return;

  const term = roll.terms.find(t => t.faces === 6);
  if (!term) return; // Not a d6 roll

  const results = term.results.map(die => die.result);
  const sixes = results.filter(r => r === 6).length;

  if (sixes === 0) return;

  // Explode the sixes
  const explosions = [];
  for (let i = 0; i < sixes; i++) {
    let result;
    do {
      const r = new Roll("1d6");
      await r.evaluate({ async: true });
      const dieVal = r.total;
      explosions.push(dieVal);

      // Display the new roll
      await r.toMessage({
        speaker: ChatMessage.getSpeaker(),
        flavor: `Exploding 6!`,
        flags: { "dice-so-nice": { showRoll: true } }
      });

      result = dieVal;
    } while (result === 6);
  }

  // Optional: Summary message
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker(),
    content: `<strong>Exploding Dice:</strong> [${explosions.join(", ")}]`
  });
});
