import { useState } from "react";

export const suits = ["spades", "diamonds", "clubs", "hearts"] as const;
export const values = [
	"A",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"J",
	"Q",
	"K",
] as const;

type deckType = `${(typeof values)[number]}-${(typeof suits)[number]}`[];

export function useDeck() {
	const [deck, setDeck] = useState<deckType>([]);
	const [sumState, setSumState] = useState<{
		sum: number;
		summedCards: deckType[number][];
	} | null>(null);

	function getRandomCard() {
		return `${values[Math.floor(Math.random() * values.length)]}-${
			suits[Math.floor(Math.random() * suits.length)]
		}` as deckType[number];
	}

	function push() {
        if (deck.length === 5) {
            throw new Error("Deck is full")
        }
		const newCard = getRandomCard()
		setDeck([...deck, newCard]);
	}

	function pop() {
		setDeck(deck.slice(0, -1));
	}

	function shuffle() {
		const newDeck = [...deck];
		newDeck.sort(() => Math.random() - 0.5);
		setDeck(newDeck);
	}

	function backwards() {
		const newDeck = [...deck];
		newDeck.reverse();
		setDeck(newDeck);
	}

	function sumFn() {
		if (deck.length < 5) {
			throw new Error("Not enough cards in deck");
		}
		const newDeck = [...deck];
		let summedCards: deckType[number][] = [];
		let sum = 0;
		for (let i = 0; i < 5; i++) {
			const cardIndex = Math.floor(Math.random() * newDeck.length);
			const card = newDeck.at(cardIndex) as deckType[number];
			summedCards.push(card);
			newDeck.splice(cardIndex, 1);

			const value = card.split("-")[0];
			if (value === "A") {
				sum += 11;
			} else if (["J", "Q", "K"].includes(value)) {
				sum += 10;
			} else {
				sum += parseInt(value);
			}
		}
		setDeck(newDeck);
		setSumState({
			sum,
			summedCards,
		});
	}

	function createDeck() {
		let newDeck: deckType = [];
		for (let i = 0; i < 5; i++) {
			newDeck.push(getRandomCard());
		}
		setDeck(newDeck);
	}

	return {
		deck,
		backwards,
		createDeck,
		push,
		pop,
		sumFn,
		shuffle,
		sumState,
	};
}
