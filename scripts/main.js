Hooks.on("ready", () => {
  Hooks.on("rollComplete", (roll, context) => {
    if (game.system.id === "age-of-sigmar-soulbound") {
      applyExplodingDice(roll);
    }
  });
});

function applyExplodingDice(roll) {
  roll.dice.forEach(die => {
    if (die.total === 6) {
      let rerolled = new Die("d6");
      rerolled.roll();
      die.total += rerolled.total;
      ui.notifications.info(`Exploding die! Added ${rerolled.total} to the roll.`);
    }
  });
}
