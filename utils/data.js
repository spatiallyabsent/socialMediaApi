const names = ['Jacob', 'Age', 'Finn', 'Jossie', 'Lily', 'Mia', 'Sarah'];

const thoughtsText = [
    'another day another play',
    'I woke up this morning with a spider on my face',
    'Sometimes I feel like I am the only who understands what its like to be a fish',
    'Do not drink the warm milk',
    'I met a clown on the way to work today',
    'Fish fries are made with love every time',
];

const getRandomArrItem = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomName = () => {
    return getRandomArrItem(names);
};

const getRandomEmail = () => {
    return `${getRandomName()}@gmail.com`;
};

const getRandomThought = () => {
    return getRandomArrItem(thoughtsText);
};

const getRandomUser = () => {
    return {
        name: getRandomName(),
        email: getRandomEmail(),
        thought: getRandomThought(),
    };
};

module.exports = { getRandomUser, getRandomThought };

// const names = ["James", "Leo", "Evelyn", "Rosy", "Divia", "Sergio", "Oliver"];

// const thoughtsText = [
//   "It is going to be a great week!",
//   "I cannnot wait for the weekend!",
//   "Hope you are doing well",
//   "I love working and coding!",
// ];

// const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// const getRandomName = () => `${getRandomArrItem(names)}`;

// const getRandomEmail = () => {
//   const randomNum = Math.floor(Math.random() * 1000);
//   return `${getRandomName().split(" ").join(".")}${randomNum}@email.com`;
// };

// const getRandomThoughtText = () => getRandomArrItem(thoughtsText);

// const getRandomUsers = (int) => {
//   const results = [];
//   for (let i = 0; i < int; i++) {
//     results.push({
//       username: `${getRandomArrItem(names)}`,
//       email: getRandomEmail(),
//     });
//   }
//   return results;
// };

// const getRandomThoughts = (users, int) => {
//   const results = [];
//   for (let i = 0; i < int; i++) {
//     results.push({
//       thoughtText: getRandomThoughtText(),
//       username: getRandomArrItem(users).username,
//     });
//   }
//   return results;
// };

// // Export the functions for use in seed.js
// module.exports = { getRandomUsers, getRandomThoughts };