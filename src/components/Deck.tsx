import { values, suits, useDeck } from "@/lib/useDeck";
import { useEffect, useRef, useState } from "react";

export function Deck() {
	const { createDeck, backwards, deck, pop, sumFn, sumState, shuffle } = useDeck();

	return (
		<>
			<div className="flex justify-between w-full">
				<button
					className="px-4 py-2 bg-blue-500 text-white rounded-md"
					onClick={createDeck}
				>
					Reset Deck
				</button>
				<button
					className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
					onClick={pop}
					disabled={deck.length < 1}
				>
					Pop Card
				</button>
				<button
					className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
					onClick={shuffle}
					disabled={ deck.length < 1}
				>
					Shuffle
				</button>
				<button
					className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
					onClick={backwards}
					disabled={ deck.length < 1}
				>
					Backwards
				</button>
				<button
					className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
					disabled={deck.length < 5}
					onClick={sumFn}
				>
					Sum Deck
				</button>
			</div>
			{sumState && (
				<>
					<h1 className="text-2xl font-bold text-center">
						Sum State
					</h1>
					<div className="grid grid-cols-6 items-center columns-3 w-full gap-4 max-w-xl">
						{sumState.summedCards.map((value, index) => {
							const [cardValue, suit] = value.split("-");
							return (
								<Card
									suit={suit as (typeof suits)[number]}
									value={cardValue as (typeof values)[number]}
									key={index}
								/>
							);
						})}{" "}
						<span className="text-lg">
							{" "}
							= <b>{sumState.sum} </b>
						</span>
					</div>
				</>
			)}
			<h1 className="text-2xl font-bold">Deck</h1>
			<div className="grid grid-cols-5 columns-3 w-full gap-4">
				{deck.map((value, index) => {
					const [cardValue, suit] = value.split("-");
					return (
						<Card
							suit={suit as (typeof suits)[number]}
							value={cardValue as (typeof values)[number]}
							key={index}
						/>
					);
				})}
			</div>
		</>
	);
}

const suitsMapper: {
	[key in (typeof suits)[number]]: string;
} = {
	spades: "♠",
	hearts: "♥",
	diamonds: "♦",
	clubs: "♣",
};

function Card({
	suit,
	value,
}: {
	suit: (typeof suits)[number];
	value: (typeof values)[number];
}) {
	return (
		<div className="bg-white p-4 rounded-md flex flex-row text-center justify-between items-center">
			{value}
			<div className="p-2 h-8 w-8 justify-center items-center flex bg-black text-white rounded">
				{suitsMapper[suit]}
			</div>
		</div>
	);
}
