Hooks.on("ready", () => {
  // Add a hook to modify the `Roll` class behavior
  Hooks.on("rollComplete", (roll, context) => {
    // Check if the roll is for the "age-of-sigmar-soulbound" system
    if (game.system.id === "age-of-sigmar-soulbound") {
      applyExplodingDice(roll);
    }
  });
});

/**
 * Function to handle exploding dice
 * If a die rolls a 6, it will explode (reroll) and add the result.
 * @param {Roll} roll - The roll object.
 */
function applyExplodingDice(roll) {
  // Check if we have any dice with a result of 6
  roll.dice.forEach(die => {
    if (die.total === 6) {
      // Create a reroll for the exploded die
      let rerolled = new Die("d6");
      rerolled.roll();
      // Add the rerolled die result to the current die total
      die.total += rerolled.total;
      // Optionally, you can add a custom message or visual effect
      ui.notifications.info(`Exploding die! Added ${rerolled.total} to the roll.`);
    }
  });
}
