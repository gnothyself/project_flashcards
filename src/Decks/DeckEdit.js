/*
import React, { useEffect, useState } from "react";
import { readDeck, updateDeck } from "../utils/api/index";
import { Link, useParams, useHistory } from "react-router-dom";
import FormDeck from "../Forms/FormDeck";


function DeckEdit() {
    const { deckId } = useParams();
    const history = useHistory();

    const formReset = {
        id: "",
        name: "",
        description: "",
    };

    const [existingDeck, setExistingDeck] = useState(formReset);

    useEffect(() => {
      async function fetchData() {
          const abortController = new AbortController()
          try {
              const response = await readDeck(deckId, abortController.signal)
              setExistingDeck(response)
          } catch (error) {
              console.error('Something went wrong', error)
          }
          return() => {
              abortController.abort()
          }
      }
      fetchData()
  }, [deckId])

    const handleFormChange = ({ target }) => {
        setExistingDeck({
            ...existingDeck,
            [target.id]: target.value,
        });
    };

    async function handleSubmit(event) {
        event.preventDefault();
        await updateDeck({
            ...existingDeck,
            id: existingDeck?.id,
            name: existingDeck?.name,
            description: existingDeck?.description,
        });
        history.goBack();
    };

    let DeckName = existingDeck?.name ? existingDeck?.name : "loading...";

    const breadcrumb = (
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{DeckName}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Deck
            </li>
          </ol>
        </nav>
    );
    
    return (
      <div>
        {breadcrumb}
        <FormDeck
          handleSubmit={handleSubmit}
          handleFormChange={handleFormChange}
          newDeck={existingDeck}
        />
      </div>
    );
};

export default DeckEdit;
*/

import React, { useState, useEffect }from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

function DeckEdit () {
    const {deckId} = useParams()
    const history = useHistory()
    const initialDeckState = {
        id: "",
        name: "",
        description: ""
    }
    const [deck, setDeck] = useState(initialDeckState)

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController()
            try {
                const response = await readDeck(deckId, abortController.signal)
                setDeck(response)
            } catch (error) {
                console.error('Something went wrong', error)
            }
            return() => {
                abortController.abort()
            }
        }
        fetchData()
    }, [deckId])

    
    function handleChange({target}) {
        setDeck({
            ...deck,
            [target.name]: target.value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const abortController = new AbortController()
        const response = await updateDeck({...deck}, abortController.signal)
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
                        {deck.name}
                    </Link>
                </li>
                <li className="breadcrumb-item active">
                    Edit Deck
                </li>
            </ol>
            <form onSubmit={handleSubmit}>
                <h1>
                    Edit Deck
                </h1>
                <div className="form-group">
                    <label>
                        Name
                    </label>
                    <input 
                        id="name"
                        name="name"
                        className="form-control"
                        onChange={handleChange} 
                        type="text"
                        value={deck.name}
                    />
                </div>
                <div className="form-group">
                    <label>
                        Description
                    </label>
                    <textarea 
                        id="description"
                        name="description"
                        className="form-control"
                        onChange={handleChange} 
                        type="text"
                        value={deck.description}
                    />
                </div>
                <button className="btn btn-secondary mx-1" onClick={() => handleCancel()}>
                    Cancel
                </button>
                <button className="btn btn-primary mx-1" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default DeckEdit;