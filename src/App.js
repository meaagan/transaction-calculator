import './App.css';

function App() {
  const axios = require('axios');

  axios.get('https://shakepay.github.io/programming-exercise/web/transaction_history.json')
    .then(function (response) {
      const dataSet = response.data
      const reducer = (acc, cv) => acc + cv

      
      // convert BTC to CAD
      console.log(dataSet)
      
      dataSet.forEach((transaction) => {
        if (transaction.currency === "BTC") {
          return transaction.amount * 21060.39
        }
      })

      // sort debit 
      const cadDebitTrans = dataSet.filter(function(data) {
        return data.direction === "debit"
      })    

      const cadDebit = []
      
      cadDebitTrans.forEach((transaction) => {
          cadDebit.push(transaction.amount)
      })

      const cadDebitSum = cadDebit.reduce(reducer)

      console.log("Debit sum = " + cadDebitSum)


      // sort credit
      const cadCreditTrans = dataSet.filter(function(data) {
        return data.direction === "credit"
      })    

      const cadCredit = []
      
      cadCreditTrans.forEach((transaction) => {
          cadCredit.push(transaction.amount)
      })

      const cadCreditSum = cadCredit.reduce(reducer)

      console.log("Credit sum = " + cadCreditSum)
      // find total
      console.log("Total = " + (cadCreditSum - cadDebitSum))
    })

  return (
    <div className="App">
      <div>

      </div> 
    </div>
  );
}

export default App;
