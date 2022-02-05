import React from "react";

export default function StepTitle({step}) {

  return (
    <>
      <div style={{ flexBasis: "4.5%" }}>
        <img src={step !== 5 ? `/${step + 1}.png` : "/claps.png"} width={55} />
      </div>
      <div style={{ flexBasis: "95.5%", color: '#363636', marginTop: '0.5%' }}>
        {step === 0 ? (
          <h1>First Step</h1>
        ) : step === 1 ? (
          <h1>Second Step</h1>
        ) : step === 2 ? (
          <h1> Third step </h1>
        ) : step === 3 ? (
          <h1> Fourth step </h1>
        ) : step == 4 ? (
          <h1> Step Five </h1>
        ) : (
          <h1> Will be renewed! </h1>
        )}
      </div>
    </>
  );
}
