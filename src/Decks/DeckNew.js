
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";
//import FormDeck from "../Forms/FormDeck";

function DeckNew() {
  const history = useHistory();

  const initialState = {
    name: "",
    description: "",
  };

  const [newDeck, setNewDeck] = useState(initialState);

  const handleFormChange = ({ target }) => {
    setNewDeck({
      ...newDeck,
      [target.name]: target.value,
    });
  };

  async function handleSubmit(event) {
    console.log("event")
    event.preventDefault()
    const abortController = new AbortController()
    const response = await createDeck({...newDeck}, abortController.signal)
    history.push("/")
    return response
}

  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Create Deck
        </li>
      </ol>
    </nav>
  );

  return (
    <div>
      {breadcrumb}
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="form-control form-control-lg"
              id="name"
              placeholder="Enter name of new deck"
              onChange={handleFormChange}
              value={newDeck.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="description"
              className="form-control"
              id="description"
              placeholder="add deck description"
              onChange={handleFormChange}
              value={newDeck.description}
            />
          </div>
          <button
            type="button"
            onClick={() => history.goBack()}
            className="btn btn-secondary mr-2"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeckNew;
/*

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function DeckNew () {
    const history = useHistory()
    const initialState = {
        name: "",
        description: "",
    }
    const [newDeck, setNewDeck] = useState(initialState)

    function handleChange({target}) {
        setNewDeck({
            ...newDeck,
            [target.name]: target.value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const abortController = new AbortController()
        const response = await createDeck({...newDeck}, abortController.signal)
        history.push("/")
        return response
    }

    async function handleCancel() {
        history.push('/')
    }


    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li className="breadcrumb-item active">
                    Create Deck
                </li>
            </ol>
            <form onSubmit={(event) => handleSubmit(event)}>
                <h1>
                    Create Deck
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
                        value={newDeck.name}
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
                        value={newDeck.description}
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

export default DeckNew;
*/
