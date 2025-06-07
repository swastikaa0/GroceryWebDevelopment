// import React from "react";

// function Addition(props) {
//   const { num1, num2 } = props;
//   const sum = Number(num1) + Number(num2);

//   return (
//     <div>
//       <p>
//         The sum of {props.num1} and {props.num2} is {sum}
//       </p>
//     </div>
//   );
// }

// export default Addition;

import React, { useState } from "react";

function Addition() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const numA = Number(a);
    const numB = Number(b);
    setResult({
      sum: numA + numB,
      difference: numA - numB,
      product: numA * numB,
      division: numB !== 0 ? numA / numB : "Cannot divide by zero",
    });
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Enter value for a"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter value for b"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />
      <button onClick={handleCalculate}>Calculate</button>
      {result && (
        <div>
          <p>Sum: {result.sum}</p>
          <p>Difference: {result.difference}</p>
          <p>Product: {result.product}</p>
          <p>Division: {result.division}</p>
        </div>
      )}
    </div>
  );
}

export default Addition;