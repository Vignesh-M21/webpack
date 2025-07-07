const transactions = [
  { category: "Food", amount: 20 },
  { category: "Transport", amount: 15 },
  { category: "Food", amount: 35 },
  { category: "Entertainment", amount: 50 },
  { category: "Transport", amount: 10 },
];

const groupAndSumTransactions = (transactions) => {
  return transactions.reduce((accumulator, { category, amount }) => {
    accumulator[category] = (accumulator[category] || 0) + amount;
    return accumulator;
  }, {});
};

const transformObjectToSortedArray = (object) => {
  return Object.entries(object).sort(
    ([, amountA], [, amountB]) => amountB - amountA
  );
};

const groupedTransactions = groupAndSumTransactions(transactions);
const sortedTransactions = transformObjectToSortedArray(groupedTransactions);

console.log(sortedTransactions);
