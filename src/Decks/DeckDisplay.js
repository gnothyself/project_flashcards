/*
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api/index";


function DeckDisplay() {
    const [deckState, setDeckState] = useState([]);
    useEffect(() => {
    async function getDecks() {
      const decksFromAPI = await listDecks();
      setDeckState(decksFromAPI);
    }
    getDecks();
    }, []);

    return (
        <div>
            <Link to="/decks/new">
                <button type="button" className="btn btn-secondary mb-4">
                    + Create Deck
                </button>              
            </Link>
            {deckState}
        </div>
    );
};

export default DeckDisplay


import React, { useEffect } from "react";
import { listDecks, deleteDeck } from "../utils/api/index";
import { Link, useHistory } from "react-router-dom";

function DeckDisplay ({decks, setDecks} ) {
    const history = useHistory()

    useEffect (() => {
        async function fetchData() {
            const abortController = new AbortController()
            try {
                const deckResponse = await listDecks(abortController.signal)
                setDecks(deckResponse)
            } catch (error) {
                console.error('Something went wrong', error)
            }
            return() => {
                abortController.abort()
            }
        }
        fetchData()
    }, [setDecks])

    async function handleDelete(deck) {
        if (window.confirm(`Delete this deck? You will not be able to recover it`)) {
            history.go(0)
            return await deleteDeck(deck.id)
        }
    }

    return (
        <div className="container">
            <Link className="btn btn-secondary mb-2" to="/decks/new">
                Create Deck
            </Link>
            <div className="card-deck">
                {decks.map((deck) => {
                    return (
                        <div className="card" style={{ width: '30rem'}} key={deck.id}>
                            <div className="card-body">
                                <div className="card-title">
                                    {`${deck.name}`}
                                </div>
                                <div className="card-subtitle mb-2 text-muted">
                                    {`${deck.cards.length} cards`}
                                </div>
                                <div className="card-text">
                                    {`${deck.description}`}
                                </div>
                                <Link className="btn btn-secondary mx-1" to={`/decks/${deck.id}`}>
                                    View
                                </Link>
                                <Link className="btn btn-primary mx-1" to={`/decks/${deck.id}/study`}>
                                    Study
                                </Link>
                                <button type="button" className="btn btn-danger mx-1" onClick={() => handleDelete(deck)}>
                                    Delete
                                </button>
                             </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )     
}

export default DeckDisplay;


const history = useHistory();

    
useEffect(() => {
    async function getDecks() {
        const decksFromAPI = await listDecks();
        setDeckState(decksFromAPI)
    }
    getDecks();
}, []);


useEffect (() => {
    async function fetchData() {
        const abortController = new AbortController()
        try {
            const deckResponse = await listDecks(abortController.signal)
            setDeckState(deckResponse)
        } catch (error) {
            console.error('Something went wrong', error)
        }
        return() => {
            abortController.abort()
        }
    }
    fetchData()
}, [])
*/
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";
import DeckButtons from "./DeckButtons";




function DeckDisplay({ decks, setDecks}) {
    const history = useHistory();

    
    useEffect(() => {
        async function getDecks() {
            const decksFromAPI = await listDecks();
            setDecks(decksFromAPI)
        }
        getDecks();
    }, [setDecks]);
    
    /*
    useEffect (() => {
        async function fetchData() {
            const abortController = new AbortController()
            try {
                const deckResponse = await listDecks(abortController.signal)
                setDecks(deckResponse)
            } catch (error) {
                console.error('Something went wrong', error)
            }
            return() => {
                abortController.abort()
            }
        }
        fetchData()
    }, [setDecks])
    */
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this deck?")) {
            deleteDeck(id);

            setDecks((currentDecks) => 
                currentDecks.filter((deck) => deck.id !== id)
            );

            history.push("/");
        }
    };

    const deckList = decks.map((deck) => {
        return (
            <Deck
                key={deck?.id}
                id={deck?.id}
                name={deck?.name}
                description={deck?.description}
                totalCards={deck?.cards?.length}
                handleDelete={handleDelete}
            />
        );
    });

    function Deck( { id, name, description, totalCards, handleDelete }) {
        const totalCardsDisplay = totalCards === 1 ? "1 card" : `${totalCards} cards`;
    
        return (
            <div className="card mb-2" key={id}>
                <div className="card-body">
                    <div className="row justify-content-between">
                        <h5 className="card-title">{name}</h5>
                        <p className="text text-secondary">{totalCardsDisplay}</p>
                    </div>
                    <p className="card-text">{description}</p>
                    <DeckButtons id={id} handleDelete={handleDelete} />
                </div>
            </div>
        );
    };


    return (
        <div>
        <Link to="/decks/new">
            <button type="button" className="btn btn-secondary mb-4">
            + Create Deck
            </button>
        </Link>    
        {deckList}
        </div>
    );
};

export default DeckDisplay;

