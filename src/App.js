import React, { useState, useEffect } from 'react';

import { firestore } from "./firebase";

import './App.css';

const Burrito = () => {
  const [selectValue, setselectValue] = useState('');
  const [historyOffers, sethistoryOffers] = useState({ offers: {} });
  const [message, setmessage] = useState();

  useEffect(() => {
    firestore
      .collection("HistoryOffersNotificationCenter")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => { return { ...doc.data(), id: doc.id }; });
        console.log(data);
        sethistoryOffers({ offers: data });
      });

  }, []);

  const handleSubmit = (e) => {
    setmessage();
    e.preventDefault();

    if (selectValue !== '') {
      const splitValue = selectValue.split('|');
      firestore.collection("ConfirmationPayments").doc(`offer_${selectValue}`).set({
        offerId: splitValue[0],
        date: new Date().toLocaleString(),
        userId: splitValue[1],
        status: "RESUME",
      });

      setmessage({ text: '¡Se ha validado el pago exitosamente!', type: 'success' });
    } else setmessage({ text: '¡Ocurrió un problema, intentalo nuevamente!', type: 'warning' });

  };

  const handleChange = (value) => {
    setselectValue(value.target.value);
  };

  return historyOffers.offers.length > 0 ? (
    <div className="main-container">
      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
      <form className="form-container" method="POST" onSubmit={handleSubmit}>
        <label className="label-container">
          {`Selecciona la oferta a realizar validación de pago: `}
          <select className="select-container" value={selectValue} onChange={handleChange}>
            {historyOffers.offers.map((offer) => (
              <option className="select-option" value={`${offer.id}|${offer.userId}`}>{`Origen: ${offer.currentCity} - destino: ${offer.destinationCity} - offerId: ${offer.id} - valor: ${offer.offerValue} `}</option>
            ))}
          </select>
        </label>
        <div className="btn-container">
          <input className="btn" type="submit" value="Cargar" />
        </div>
      </form>
    </div>
  ) : <p>Cargando...</p>;
}

export default Burrito;