import React from "react";

const PodiumPart = ({placement, number}) => {
    console.log(placement)
    const textColor = number === "1st" ? "text-gold" : (number === "2nd" ? "text-silver" : "text-bronze")
    console.log(textColor)
    return (
        <section className="flex flex-col justify-center items-center my-2">
            <h1 className={"font-bold text-5xl mb-1 " + textColor}>{number}</h1>
            <p className="text-sm">
            {placement.totalPrize} kr.</p>
            {placement.names.length > 1 ? 
            <p className="text-xs">{"(" + placement.sharedPrize + " kr. til hver)"}</p> : ""
            }
            <p className="mt-3">
            {placement.names.map((first, i) => {
                return placement.names.length === i + 1 ? (
                <span key={i}>{first}</span>
                ) : (
                <span key={i}>{first}, </span>
                );
            })}
            </p>
        </section>
    )
}

export default PodiumPart;