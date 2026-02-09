import React, { useState } from "react";
import "./NewItem.css";

const NewItem = () => {
  const [type, setType] = useState("Goods");
  const [salesEnabled, setSalesEnabled] = useState(true);
  const [purchaseEnabled, setPurchaseEnabled] = useState(true);

  return (
    <div className="zoho-container">
      <h2 className="page-title">New Item</h2>

      {/* BASIC INFO */}
      <div className="card">
        <div className="grid-2">
          <div>
            <label className="required">Name</label>
            <input className="input" />

            <label>Type</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  checked={type === "Goods"}
                  onChange={() => setType("Goods")}
                />
                Goods
              </label>
              <label>
                <input
                  type="radio"
                  checked={type === "Service"}
                  onChange={() => setType("Service")}
                />
                Service
              </label>
            </div>

            <label>Unit</label>
            <select className="input">
              <option>Select or type to add</option>
            </select>
          </div>

          {/* IMAGE UPLOAD */}
          <div className="image-box">
            <div className="image-placeholder">
              <span className="image-icon">🖼</span>
              <p>Drag image(s) here or</p>
              <button className="link-btn">Browse images</button>
            </div>
          </div>
        </div>
      </div>

      {/* SALES INFORMATION */}
      <div className="card">
        <label className="section-title">
          <input
            type="checkbox"
            checked={salesEnabled}
            onChange={() => setSalesEnabled(!salesEnabled)}
          />
          Sales Information
        </label>

        {salesEnabled && (
          <div className="grid-2">
            <div>
              <label className="required">Selling Price</label>
              <div className="currency-input">
                <span>INR</span>
                <input />
              </div>

              <label>Description</label>
              <textarea className="textarea" />
            </div>

            <div>
              <label className="required">Account</label>
              <select className="input">
                <option>Sales</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* PURCHASE INFORMATION */}
      <div className="card">
        <label className="section-title">
          <input
            type="checkbox"
            checked={purchaseEnabled}
            onChange={() => setPurchaseEnabled(!purchaseEnabled)}
          />
          Purchase Information
        </label>

        {purchaseEnabled && (
          <div className="grid-2">
            <div>
              <label className="required">Cost Price</label>
              <div className="currency-input">
                <span>INR</span>
                <input />
              </div>
            </div>

            <div>
              <label className="required">Account</label>
              <select className="input">
                <option>Cost of Goods Sold</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="footer">
        <button className="btn primary">Save</button>
        <button className="btn">Cancel</button>
      </div>
    </div>
  );
};

export default NewItem;
