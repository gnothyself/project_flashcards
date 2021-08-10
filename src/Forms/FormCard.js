/*
import React from "react";
import { useHistory } from "react-router-dom";

function FormCard({ flashcard, handleFormChange, handleSubmit }) {
  const history = useHistory();


  const { id, front, back } = flashcard;

  const backButton = id ? "Cancel" : "Done";
  const nextButton = id ? "Submit" : "Save";

  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            type="text"
            className="form-control"
            id="front"
            placeholder="Add the front of the card"
            onChange={handleFormChange}
            value={front}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            type="text"
            className="form-control"
            id="back"
            placeholder="Add the back of the card"
            onChange={handleFormChange}
            value={back}
          ></textarea>
        </div>
        <button
          type="button"
          onClick={() => history.goBack()}
          className="btn btn-secondary mr-2"
        >
          {backButton}
        </button>
        <button type="submit" className="btn btn-primary">
          {nextButton}
        </button>
      </form>
    </div>
  );
}

export default FormCard;
*/

import React from "react";


function FormCard( {handleChange, handleSubmit, handleSecondaryAction, title, card, secondaryActionText} ) {

    

    return (
        <form onSubmit={handleSubmit}>
                <h2>
                    {title}
                </h2>
                <div className="form-group">
                    <label>
                        Front
                    </label>
                    <textarea 
                        id="front"
                        name="front"
                        className="form-control"
                        onChange={handleChange} 
                        type="text"
                        value={card.front}
                      
                    />
                </div>
                <div className="form-group">
                    <label>
                        Back
                    </label>
                    <textarea 
                        id="back"
                        name="back"
                        className="form-control"
                        onChange={handleChange} 
                        type="text"
                        value={card.back}
                     
                    />
                </div>
                <button className="btn btn-secondary mx-1" onClick={() => handleSecondaryAction()}>
                    {secondaryActionText}
                </button>
                <button className="btn btn-primary mx-1" type="submit">
                    Save
                </button>
            </form>

    )
}

export default FormCard;
