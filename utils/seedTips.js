const Tip = require('../models/Tips');

const tips = [
  { content: "Use === instead of == for strict comparison in JavaScript." },
  { content: "Use `const` and `let` instead of `var` to avoid scope issues." },
  { content: "Debounce input handlers to improve performance." },
  { content: "Always handle promise rejections using .catch or try/catch." },
  { content: "`Array.map()` is great for transforming arrays into new ones." },
  { content: "Use `const` and `let` instead of `var` to avoid hoisting issues." },
  { content: "Array destructuring makes it easy to extract values from arrays." },
  { content: "Use optional chaining (?.) to safely access deeply nested properties." },
  { content: "Use template literals for cleaner string concatenation." },
  { content: "Use short-circuit evaluation for default values." },
  { content: "Use `Array.filter()` to create a new array with matching items." },
  { content: "Use `Array.reduce()` to perform complex transformations." },
  { content: "Use `includes()` to check if an array contains a value." },
  { content: "Use `Object.keys()` or `Object.entries()` for object iteration." },
  { content: "Use `setTimeout(fn, 0)` to schedule a function after the current call stack." },
  { content: "Use try/catch with async/await for better error handling in async code." },
  { content: "Avoid mutating state directly; use copies for safer state management." },
  { content: "Arrow functions do not bind their own `this`, making them great for callbacks." },
  { content: "Use `typeof` and `Array.isArray()` to check data types safely." },
  { content: "Always return something from a `.map()` callback." },
  { content: "Use `console.table()` to debug arrays/objects in a readable format." },
  { content: "Use `Number()` or `parseInt()` to convert strings to numbers." }
];

const seedTipsIfEmpty = async () => {
    try {
      let insertedCount = 0;
  
      for (const tip of tips) {
        const exists = await Tip.findOne({ content: tip.content });
        if (!exists) {
          await Tip.create(tip);
          insertedCount++;
        }
      }
  
      if (insertedCount > 0) {
        console.log(`✅ ${insertedCount} new tips added.`);
      } else {
        console.log("ℹ️ All tips already exist. No new tips inserted.");
      }
    } catch (error) {
      console.error("❌ Error seeding tips:", error);
    }
  };
  
  module.exports = {
    tips,
    seedTipsIfEmpty
  };
  
