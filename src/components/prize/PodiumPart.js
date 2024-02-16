import React from "react";

const PodiumPart = ({ placement, number }) => {
  const textColor =
    number === "1st"
      ? "text-gold"
      : number === "2nd"
        ? "text-silver"
        : "text-bronze";
  return (
    <section className="flex flex-col justify-center items-center my-2 sm:max-w-[30%] w-full mx-auto border rounded-lg p-4">
      <h1 className={"normal-case mt-1 font-bold text-6xl sm:text-5xl mb-1 " + textColor}>
        {number}
      </h1>
      <p className="text-lg">
        <span className="yellowText">{placement.totalPrize} kr.</span>{" "}
        {placement.names.length > 1 ? (
          <span className="text-sm">
            {"(" + placement.sharedPrize + " kr. til hver)"}
          </span>
        ) : (
          ""
        )}
      </p>

      <p className="mt-3 text-xl flex flex-wrap justify-center normal-case">
        {placement.names.map((first, i) => {
          return placement.names.length === i + 1 ? (
            <span key={i}>{first}</span>
          ) : (
            <span className="mr-1" key={i}>
              {first},{" "}
            </span>
          );
        })}
      </p>
    </section>
  );
};

export default PodiumPart;
