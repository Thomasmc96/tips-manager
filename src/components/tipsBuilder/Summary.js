import React from "react";

const Summary = () => {
  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-center text-3xl">Så du med i kampen! ⚽</h1>
      <p className="text-center mt-2">...næsten</p>
      <p className="text-center mt-10">
        💰 Husk at overføre
        <span className="text-sandBeige text-lg mx-2">100 kr.</span>
        til
        <span className="text-sandBeige text-lg mx-2">30 32 12 12</span>
      </p>

      <p className="text-center mt-5">
        Du har også modtaget en mail med dine tips 📧
      </p>
    </div>
  );
};
export default Summary;
