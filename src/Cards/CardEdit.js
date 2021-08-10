/*
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateCard, readCard, readDeck } from "../utils/api/index";
import FormCard from "../Forms/FormCard";

function CardEdit() {
  const history = useHistory();
  const { deckId, cardId } = useParams();

  const cardReset = {
    id: cardId,
    front: "",
    back: "",
    deckId: deckId,
  };

  const deckReset = {
    id: deckId,
    name: "",
    description: "",
  };

  const [deckState, setDeckState] = useState(deckReset);
  const [flashcard, setFlashcard] = useState(cardReset);
  

  useEffect(() => {

    async function fetchData() {
        const abortController = new AbortController()
        try {
            const cardResponse = await readCard(cardId, abortController.signal)
            const deckResponse = await readDeck(deckId, abortController.signal)
            setFlashcard(cardResponse)
            setDeckState(deckResponse)
        } catch (error) {
            console.error('Something went wrong', error)
        }
        return() => {
            abortController.abort()
        }
    }
    fetchData()
}, [cardId, deckId])

  const handleFormChange = ({ target }) => {
    setFlashcard({
      ...flashcard,
      [target.id]: target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    await updateCard({
      ...flashcard,
      front: flashcard.front,
      back: flashcard.back,
    });
    history.goBack();
  }

  let deckName = deckState?.name ? deckState?.name : "loading...";

  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deckName}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Edit Card {cardId}
        </li>
      </ol>
    </nav>
  );

  return (
    <div>
      {breadcrumb}
      <FormCard
        handleSubmit={handleSubmit}
        handleFormChange={handleFormChange}
        flashcard={flashcard}
      />
    </div>
  );
}

export default CardEdit;
*/

import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams} from "react-router-dom";
import { readCard, updateCard, readDeck } from "../utils/api/index";
import FormCard from "../Forms/FormCard";

function CardEdit ( {deck, setDeck} ) {
    const { deckId, cardId } = useParams()
    const history = useHistory()
    
    const initialCardState = {
      id: "",
      front: "",
      back: "",
      deckId: ""
  }
    

    const [card, setCard] = useState(initialCardState)

    useEffect(() => {
      const initialDeckState = {
        id: "",
        name: "",
        description: ""
    }
      setDeck(initialDeckState)
        async function fetchData() {
            const abortController = new AbortController()
            try {
              const cardResponse = await readCard(cardId, abortController.signal)
              const deckResponse = await readDeck(deckId, abortController.signal)
              setCard(cardResponse)
              setDeck(deckResponse)
            } catch (error) {
                console.error('Something went wrong', error)
            }
            return() => {
                abortController.abort()
            }
        }
        fetchData()
    }, [cardId, deckId, setDeck])
    
    function handleChange({target}) {
        setCard({
            ...card,
            [target.name]: target.value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const abortController = new AbortController()
        const response = await updateCard({...card}, abortController.signal)
        history.push(`/decks/${deckId}`)
        return response
    }

    async function handleCancel() {
        history.push(`/decks/${deckId}`)
    }


    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>
                        {deck?.name}
                    </Link>
                </li>
                <li className="breadcrumb-item active">
                    Edit Card {cardId}
                </li>
            </ol>
            <FormCard handleChange={handleChange} 
            handleSubmit={handleSubmit} handleSecondaryAction={handleCancel} 
            title={"Edit Card"} card={card} secondaryActionText={"Cancel"} />
        </div>
    )
}

export default CardEdit;
